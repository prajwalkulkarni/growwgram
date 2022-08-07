import React, { Fragment, useCallback, useMemo } from "react"
import useFetch from "../../hooks/useFetch";
import { useStore } from "../../store/store";
import { PostItemType } from "../../types/types";
const options = {
    root: document.querySelector('container'),
    rootMargin: '0px',
    threshold: 0.8
}


export default function infiniteScroll(Component: React.FC<{ loading: boolean, data: any, targetElement: any, error: null|string }>, endpoint: string) {

   
    return function WrappedComponent(props:{username?:string}) {
        const observer = React.useRef<IntersectionObserver | null>(null);
        const [postCount, setPostCount] = React.useState<number>(0);

        // const { username, pageCount, incrementPageCount } = useStore(state => state)

        // const username = useStore(state => state.username)
        const pageCount = useStore(state => state.pageCount)
        const incrementPageCount = useStore(state => state.incrementPageCount)
        const newsFeedPosts = useStore(state => state.newsFeedPosts)
        const setIsLoading = useStore(state => state.setIsLoading)
        const hasMore = useStore(state => state.hasMore)
       
        if (endpoint.includes('users')) {
            endpoint = `/users/${props.username}/photos?page=${pageCount}`
        }
        
        
        const {loading, data, error}  = useFetch(endpoint, postCount);
        const memoizedData = useMemo(() => data, [data])
        const targetElement = useCallback((node: HTMLDivElement) => {


            if (loading) return

            if (observer.current) {
                observer.current.disconnect()
            }

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    console.log("Is Intersecting")
                    
                  if(!(!!error)){
                    if(endpoint.includes('users')){
                        if(hasMore){
                            incrementPageCount()
                        }
                        
                    }
                    else{
                        if(newsFeedPosts.length<10){
                            setIsLoading(true)
                            setPostCount(prev => prev + 1)
                        }
                    }
                  }
                    
                }
            }, options)

            if (node) observer.current.observe(node)

        }, [loading])

        return (
            <React.Fragment>
                <Component targetElement={targetElement} loading={loading} data={memoizedData} error={error} />
            </React.Fragment>
        )
    }
}