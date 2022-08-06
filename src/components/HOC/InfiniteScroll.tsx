import React, { Fragment, useCallback } from "react"
import useFetch from "../../hooks/useFetch";
import { useStore } from "../../store/store";


const options = {
    root: document.querySelector('container'),
    rootMargin: '0px',
    threshold: 1.0
}
export default function infiniteScroll(Component: React.FC<{ loading: boolean, data: any, targetElement: any, error: null|string }>, endpoint: string) {

    return function WrappedComponent() {
        const observer = React.useRef<IntersectionObserver | null>(null);
        const [postCount, setPostCount] = React.useState<number>(0);

        // const { username, pageCount, incrementPageCount } = useStore(state => state)

        const username = useStore(state => state.username)
        const pageCount = useStore(state => state.pageCount)
        const incrementPageCount = useStore(state => state.incrementPageCount)

        if (endpoint.includes('users')) {
            endpoint = `/users/${username}/photos?page=${pageCount}`
        }
        
        const { loading, data, error } = useFetch(endpoint, postCount);
        const targetElement = useCallback((node: HTMLDivElement) => {


            if (loading) return

            if (observer.current) {
                observer.current.disconnect()
            }

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {

                    if(endpoint.includes('users')){
                        incrementPageCount()
                    }
                    else{
                        setPostCount(prev => prev + 1)
                    }
                    
                }
            }, options)

            if (node) observer.current.observe(node)

        }, [loading])

        return (
            <React.Fragment>
                <Component targetElement={targetElement} loading={loading} data={data} error={error} />
            </React.Fragment>
        )
    }
}