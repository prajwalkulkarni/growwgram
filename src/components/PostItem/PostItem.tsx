import React from "react";
import './PostItem.css'
import { PostItemType } from "../../types/types";
import { Link } from "react-router-dom";
import { AiFillClockCircle, AiFillHeart } from "react-icons/ai";
import { useStore } from "../../store/store";

const PostItem = React.forwardRef<HTMLDivElement,PostItemType>((props,ref) => {

    const setUsername = useStore(state=>state.setUsername)
    const theme = useStore(state=>state.theme)
    const date = new Date(props.created_at).toString().split(" ").slice(0,4).join(" ")
    return (

        <div className={`post-item ${theme}`} ref={ref}>
            <div className="post-item__image">
                <img src={props.urls.small} loading="lazy" />
            </div>

            <div className={`post-item__content ${theme}`}>

                <div className="post-item__imageDetails">
                    <div className={`post-item__imageDetails__numbers ${theme}`}>
                        <h4><AiFillClockCircle/> {`${date}`}</h4>&nbsp;&nbsp;&nbsp;
                        <h4><AiFillHeart/> {props.likes}</h4>
                    </div>
                    
                    {props.description && <article>{props.description}</article>}
                </div>
                <hr/>
                <div className="post-item__profileInfo">
                    <Link to={`/user/${props.user.username}`} >
                        <img src={props.user.profile_image?.medium} height="50" width={50} loading="lazy" />
                    </Link>
                    <Link to={`/user/${props.user.username}`} >
                        <h4>{props.user.name}</h4>
                    </Link>
                </div>

            </div>

        </div>


    )
})

export default PostItem

//onClick={()=>setUsername(props.user.username)}