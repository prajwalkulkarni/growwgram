import React from "react";
import './PostItem.css'
import { PostItemType } from "../../types/types";
import { Link } from "react-router-dom";
const PostItem = React.forwardRef<HTMLDivElement,PostItemType>((props,ref) => {
    return (

        <div className="post-item" ref={ref}>
            <div className="post-item__image">
                <img src={props.urls.small} />
            </div>

            <div className="post-item__content">

                <div className="post-item__imageDetails">
                    <div className="post-item__imageDetails__numbers">
                        <p>Created At {props.created_at}</p>&nbsp;&nbsp;&nbsp;
                        <p>Likes {props.likes}</p>
                    </div>
                    <article>Description</article>
                </div>
                <div className="post-item__profileInfo">
                    <Link to={`/user/${props.user.username}`}>
                        <img src={props.user.profile_image?.medium} height="50" width={50} />
                    </Link>
                    <Link to={`/user/${props.user.username}`}>
                        <p><b>{props.user.name}</b></p>
                    </Link>
                </div>

            </div>

        </div>


    )
})

export default PostItem