import { PostItemType, ProfileType } from "../../types/types"
import React, {useEffect, Ref} from "react"
import './GridView.css'
import infiniteScroll from "../HOC/InfiniteScroll";
import { useStore } from "../../store/store";


type Photos = { 
    id: string; 
    created_at: string; 
    blur_hash: string; 
    urls: { regular: string; small: string; thumb: string; }; 
}

function GridView(props:{loading:boolean,data:any,targetElement:Ref<HTMLDivElement>}) {

    // const [postss, setPosts] = React.useState<PostItemType[]>([]);

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

   
    return(
        
            <div className="profile-posts">
                {posts?.map((post,index)=>{
                    if(posts.length === index+1){
                        return(
                            
                                <div className="profile-post-item" key={post.id} ref={props.targetElement}>
                                    <img src={post.urls.regular}/>
                                </div>
                        )
                    }
                    else{
                        return(
                            <div className="profile-post-item" key={post.id}>
                                <img src={post.urls.small} />
                            </div>
                        )
                    }
                })}
            </div>
    )
}

const GridViewWithInfiniteScroll = infiniteScroll(GridView,`/users/username`)

export default GridViewWithInfiniteScroll