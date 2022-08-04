import React, { RefObject, useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { PostItemType } from "../../types/types";
import PostItem from "../PostItem/PostItem";
import Spinner from "../UI/Spinner/Spinner";

const options = {
    root: document.querySelector('container'),
    rootMargin: '0px',
    threshold: 1.0
}
const PostList: React.FC<{}> = (props) => {

    
    const [postCount, setPostCount] = React.useState<number>(0); 
    

    // const [loading, setLoading] = useState<boolean>(true );

    const {loading, data} = useFetch('/photos/random',postCount);




    const [posts, setPosts] = React.useState<any[]>([]);
    const observer = React.useRef<IntersectionObserver | null>(null);

    const targetElement = useCallback((node:HTMLDivElement)=>{

        
        if(loading) return

        if(observer.current){
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
          
                
                setPostCount(p=>p+1)
            }
        })

        if(node) observer.current.observe(node)

    },[loading])


    useEffect(()=>{
        if(data){

            setPosts(prev => [...prev, data]);
        }
    
    },[data])
    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true)
    //         const data = await getData();
    //         setPosts(prev => [...prev, data]);
    //         setLoading(false)
    //     }

    //     observer.current = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             console.log(entry)
    //             if (entry.isIntersecting) {
    //                 fetchData();
    //             }
    //         })
    //     }, options);

    //     if (targetElement.current) {
    //         observer.current.observe(targetElement.current);
    //     }
    // }, [targetElement])

 


    return (
        <div>
            
            {posts.map((post: PostItemType,idx) => {
                if(posts.length === idx + 1){
                    return (
                        <PostItem key={post.id}
                            ref={targetElement}
                            created_at={post.created_at}
                            description={post.description}
                            urls={{ small: post.urls.small }}
                            likes={post.likes}
                            id={post.id}
                            user={{ name: post.user.name, profile_image:{medium: post.user.profile_image?.medium}, 
                            username: post.user.username }} />
                    )
                }
                else{
                    return (
                        <PostItem key={post.id}
                            created_at={post.created_at}
                            description={post.description}
                            urls={{ small: post.urls.small }}
                            likes={post.likes}
                            id={post.id}
                            user={{ name: post.user.name, profile_image:{medium: post.user.profile_image?.medium}, 
                            username: post.user.username }} />
                        
                    )
                }
            })}

            {loading && <div style={{display:'flex',justifyContent:'center'}}>
                <Spinner/></div>}
        </div>
    )

}

export default PostList
