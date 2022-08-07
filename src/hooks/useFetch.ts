import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { PostItemType } from "../types/types";


interface IObjectKeys {
    [endpoint: string]: PostItemType | PostItemType[];
}
const cache: IObjectKeys = {}
export default function useFetch(endpoint: string, postCount: number) {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const posts = useStore((state) => state.newsFeedPosts);
    const setNewsFeedPosts = useStore((state) => state.setNewsFeedPostsOnReload);
    const isLoading = useStore((state) => state.isLoading);

    const getData = async () => {

        const res = await fetch(`https://api.unsplash.com${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: 'Client-ID ' + 'lfMvwQQUVDLcNQ_UwXC3AmDtPMe2IP1ZbaUU29gVJto'
            }

        })

        const toJson = await res.json();

        return toJson
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if (localStorage.getItem(endpoint) && !endpoint.includes('random')) {
                    console.log("return from cache")
                    setLoading(true)
                    // const data = cache[endpoint as keyof typeof cache];
                    const endpointdata = localStorage.getItem(endpoint)
                    setData(JSON.parse(endpointdata || '{}'))
                    setError(null)
                    setLoading(false)
                }
                else {
                    console.log("fetching from api",isLoading)
                    setLoading(true)
                    // const data = await getData();
                    if (endpoint.includes('random')) {
                        // cache[endpoint as keyof IObjectKeys] = data;
                        if (localStorage.getItem(endpoint) && posts.length !== 0) {

                            if (isLoading) {
                                const postdata = await getData();
                                const arrData = localStorage.getItem(endpoint)
                                const arr = JSON.parse(arrData || '[]')
                                arr.push(postdata)
                                localStorage.setItem(endpoint, JSON.stringify(arr))
                                setData(postdata)
                            }
                            else {
                                const arrData = localStorage.getItem(endpoint)
                                const arr = JSON.parse(arrData || '[]')
                                // setData(arr)
                                setNewsFeedPosts(arr)
                            }
                           

                        } else if (localStorage.getItem(endpoint) && posts.length === 0) {
                            const arrData = localStorage.getItem(endpoint)
                            const arr = JSON.parse(arrData || '[]')
                            // setData(arr)
                            setNewsFeedPosts(arr)
                        }
                        else if (!localStorage.getItem(endpoint)) {
                            const postdata = await getData();

                            console.log(postdata)
                            localStorage.setItem(endpoint, JSON.stringify([postdata]))

                            setTimeout(() => {
                                localStorage.removeItem(endpoint)
                            }, 6000000)
                            setData(postdata)
                        }



                    }
                    else {
                        const postdata = await getData();
                        localStorage.setItem(endpoint, JSON.stringify(postdata))
                        setTimeout(() => {
                            // delete cache[endpoint as keyof typeof cache];
                            localStorage.removeItem(endpoint)
                        }, 6000000)


                        setData(postdata);
                    }

                    setLoading(false);
                    setError(null)

                }
            }
            catch (err) {
                setError("Something went wrong")
                setLoading(false);
                throw new Error("Something went wrong");
            }
        }

        fetchData()

    }, [endpoint, postCount])


    return {
        loading,
        data,
        error
    }
}