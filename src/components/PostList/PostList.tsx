import React, { Ref, useEffect } from "react";
import { PostItemType } from "../../types/types";
import PostItem from "../PostItem/PostItem";
import Spinner from "../UI/Spinner/Spinner";
import infiniteScroll from "../HOC/InfiniteScroll";
import { useStore } from "../../store/store";

import Toast from "../UI/Toast/Toast";

// const PostList: React.FC<{}> = (props) => {

    
//     const [postCount, setPostCount] = React.useState<number>(0); 
    

//     // const [loading, setLoading] = useState<boolean>(true );

//     const {loading, data} = useFetch('/photos/random',postCount);




//     const [posts, setPosts] = React.useState<any[]>([]);
//     const observer = React.useRef<IntersectionObserver | null>(null);

//     const targetElement = useCallback((node:HTMLDivElement)=>{

        
//         if(loading) return

//         // if(observer.current){
//         //     observer.current.disconnect()
//         // }

//         // observer.current = new IntersectionObserver(entries=>{
//         //     if(entries[0].isIntersecting){
          
                
//         //         setPostCount(p=>p+1)
//         //     }
//         // },options)

//         // if(node) observer.current.observe(node)

//     },[loading])


//     useEffect(()=>{
//         if(data){

//             setPosts(prev => [...prev, data]);
//         }
    
//     },[data])
//     // useEffect(() => {
//     //     async function fetchData() {
//     //         setLoading(true)
//     //         const data = await getData();
//     //         setPosts(prev => [...prev, data]);
//     //         setLoading(false)
//     //     }

//     //     observer.current = new IntersectionObserver(entries => {
//     //         entries.forEach(entry => {
//     //             console.log(entry)
//     //             if (entry.isIntersecting) {
//     //                 fetchData();
//     //             }
//     //         })
//     //     }, options);

//     //     if (targetElement.current) {
//     //         observer.current.observe(targetElement.current);
//     //     }
//     // }, [targetElement])

 


//     return (
//         <React.Fragment>
            
//             {posts.map((post: PostItemType,idx) => {
//                 if(posts.length === idx + 1){
//                     return (
//                         <PostItem key={post.id}
//                             ref={targetElement}
//                             created_at={post.created_at}
//                             description={post.description}
//                             urls={{ small: post.urls.small }}
//                             likes={post.likes}
//                             id={post.id}
//                             user={{ name: post.user.name, profile_image:{medium: post.user.profile_image?.medium}, 
//                             username: post.user.username }} />
//                     )
//                 }
//                 else{
//                     return (
//                         <PostItem key={post.id}
//                             created_at={post.created_at}
//                             description={post.description}
//                             urls={{ small: post.urls.small }}
//                             likes={post.likes}
//                             id={post.id}
//                             user={{ name: post.user.name, profile_image:{medium: post.user.profile_image?.medium}, 
//                             username: post.user.username }} />
                        
//                     )
//                 }
//             })}

//             {loading && <div style={{display:'flex',justifyContent:'center'}}>
//                 <Spinner/></div>}
//         </React.Fragment>
//     )

// }


const PostList: React.FC<{loading:boolean,data:any,targetElement:Ref<HTMLDivElement>,error:null|string}> = (props) => {

    

    // const [loading, setLoading] = useState<boolean>(true );

    
    // const [posts, setPosts] = React.useState<PostItemType[]>([]);

    const posts = useStore(state=>state.newsFeedPosts)
    const setPosts = useStore(state=>state.setNewsFeedPosts)
    const setIsLoading = useStore(state=>state.setIsLoading)
    const theme = useStore(state=>state.theme)
    
    useEffect(()=>{
        if(props.data){

            // setPosts(prev => [...prev, props.data]);
            setPosts(props.data);
            setIsLoading(false)
        }
    
    },[props.data])

    
    return (
        <React.Fragment>
            
            {posts.map((post: PostItemType,idx) => {
                if(posts.length === idx + 1){
                    return (
                        <PostItem key={post.id}
                            ref={props.targetElement}
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

            {props.loading && <div style={{display:'flex',justifyContent:'center'}}>
                <Spinner/></div>}

            {props.error && <Toast/>}
            {props.error && <h1 className={`message ${theme}`}> Could not load data :( </h1>}
            {posts.length===11 && <h1 className={`message ${theme}`}>Fetched all posts</h1>}

        </React.Fragment>
    )

}


const PostListWithInfiniteScroll = infiniteScroll(PostList,'/photos/random');
export default PostListWithInfiniteScroll
