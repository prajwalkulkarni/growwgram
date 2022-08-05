import { ProfileType, PostItemType } from "../../types/types"
import React, { useEffect, Ref } from "react"
import './GridView.css'
import PostItem from "../PostItem/PostItem"
import { useStore } from "../../store/store"
import infiniteScroll from "../HOC/InfiniteScroll"


type Photos = { 
    id: string; 
    created_at: string; 
    blur_hash: string; 
    urls: { regular: string; small: string; thumb: string; }; 
}

function ListView(props:{loading:boolean,data:any,targetElement:Ref<HTMLDivElement>}) {


    const posts = useStore(state=>state.posts)

    const addPosts = useStore(state=>state.addPosts)
    
    useEffect(()=>{
        if(props.data){

            // setPosts(prev => [...prev, ...props.data]);

            
            // const mergedData = 
            const copy = posts.filter(item=>item.id)
            const filteredData:PostItemType[]=[]

            props.data.forEach((item:any)=>{
                if(!copy.includes(item.id)){
                    filteredData.push(item)
                }
            })
            
            console.log(filteredData)
            addPosts(filteredData)
        }
    
    },[props.data])

    console.log(props)
    return(
        <React.Fragment>
                {posts?.map((post,index)=>{
                    if(posts.length === index + 1){
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
           </React.Fragment>
    )
}

const ListViewWithInifniteScroll = infiniteScroll(ListView,`/users/username`)

export default ListViewWithInifniteScroll