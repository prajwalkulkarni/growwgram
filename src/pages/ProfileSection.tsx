import ProfileHeader from "../components/Profile/ProfileHeader"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SwitchView from "../components/Profile/SwitchView"
import './ProfileSection.css'
import { useStore } from "../store/store"
import GridViewWithInfiniteScroll from "../components/Profile/GridView"
import ListViewWithInifniteScroll from "../components/Profile/ListView"
import Card from "../components/UI/Card/Card"
// export default function ProfileSection(){
//     const {username} = useParams()
//     const [viewType, setViewType] = useState<string>("grid");
//     const [page, setPage] = useState<number>(1);
//     const [userPhotos, setUserPhotos] = useState<any[]>([]);
//     const {loading,data} = useFetch(`/users/${username}/photos?page=${page}`,0)

//     useEffect(()=>{
//         if(data){
//             setUserPhotos(data)
//         }
//     },[data])

//     return(
//         <div>
//             <ProfileHeader
//             username={username ?? 'test'}/>

//            <GridView posts={userPhotos}/>
//         </div>
//     )
// }


export default function ProfileSection(){
    const {username} = useParams()
    const [viewType, setViewType] = useState<string>("grid");
    // const {pageCount, setUsername} = useStore(state=>state)

    const pageCount = useStore(state=>state.pageCount)
    
    
    const resetPageCount = useStore(state=>state.resetPageCount)
    const resetPosts = useStore(state=>state.resetPosts)
  
    useEffect(()=>{
        resetPageCount()
        resetPosts()
    },[])


    console.log("Fix this man")
    
    return(
        <div className="posts-container">
            <ProfileHeader
            username={username ?? 'elijahp'}/>

            <SwitchView setViewType={setViewType}/>
                {viewType === 'grid' ? <GridViewWithInfiniteScroll username={username ??'elijahp'}/> : <ListViewWithInifniteScroll username={username ??'elijahp'}/>}
           
        </div>
    )
}