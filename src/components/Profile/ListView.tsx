import { ProfileType, PostItemType } from "../../types/types"
import React, { useEffect, Ref } from "react"
import './GridView.css'
import PostItem from "../PostItem/PostItem"
import { useStore } from "../../store/store"
import infiniteScroll from "../HOC/InfiniteScroll"
import Spinner from "../UI/Spinner/Spinner"
import Toast from "../UI/Toast/Toast"

type Photos = {
    id: string;
    created_at: string;
    blur_hash: string;
    urls: { regular: string; small: string; thumb: string; };
}

function ListView(props: { loading: boolean, data: any, targetElement: Ref<HTMLDivElement>, error: null | string }) {


    const posts = useStore(state => state.posts)
    const setHasMore = useStore(state => state.setHasMore)
    const hasMore = useStore(state => state.hasMore)
    const theme = useStore(state => state.theme)

    const addPosts = useStore(state => state.addPosts)

    useEffect(() => {
        if(props.data?.length===0) setHasMore(false)
        if (props.data) {

            // setPosts(prev => [...prev, ...props.data]);


            // const mergedData = 
            const copy = posts.map(item => item.id)

            const filteredData: PostItemType[] = []

            props.data.forEach((item: any) => {
                
                if (!copy.includes(item.id)) {
                    filteredData.push(item)
                }
            })

            addPosts(filteredData)
        }

    }, [props.data])

    return (
        <React.Fragment>
            {posts?.map((post, index) => {
                if (posts.length === index + 1) {
                    return (
                        <PostItem key={post.id}
                            ref={props.targetElement}
                            created_at={post.created_at}
                            description={post.description}
                            urls={{ small: post.urls.small }}
                            likes={post.likes}
                            id={post.id}
                            user={{
                                name: post.user.name, profile_image: { medium: post.user.profile_image?.medium },
                                username: post.user.username
                            }} />
                    )
                }
                else {
                    return (
                        <PostItem key={post.id}
                            created_at={post.created_at}
                            description={post.description}
                            urls={{ small: post.urls.small }}
                            likes={post.likes}
                            id={post.id}
                            user={{
                                name: post.user.name, profile_image: { medium: post.user.profile_image?.medium },
                                username: post.user.username
                            }} />

                    )
                }
            })}

            {props.loading && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner /></div>}

            {props.error && <Toast />}
            {props.error && <h1 className={`message ${theme}`}> Could not load data :( </h1>}
            {!hasMore && <h1 className={`message ${theme}`}> All Posts fetched </h1>}
        </React.Fragment>
    )
}

const ListViewWithInifniteScroll = infiniteScroll(ListView, `/users/username`)

export default ListViewWithInifniteScroll