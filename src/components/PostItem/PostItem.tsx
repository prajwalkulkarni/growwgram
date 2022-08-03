import React from "react";
import './PostItem.css'
import Card from '../Card/Card';
import { PostItemType } from "../../types/types";
const PostItem: React.FC<PostItemType> = (props) => {
    return (
        
            <div className="post-item">
                <div className="post-item__image">
                    <img src= {props.urls.small} />
                </div>

                <div className="post-item__content">

                    <div className="post-item__imageDetails">
                        <div className="post-item__imageDetails__numbers">
                            <p>Created At {props.created_at}</p>
                            <p>Likes {props.likes}</p>
                        </div>
                        <article>Description</article>
                    </div>
                    <div className="post-item__profileInfo">
                        <img src={require('../../assets/logo.png')} height="50" width={50} />
                        <p>Name: {props.user.name}</p>
                    </div>

                </div>

            </div>
        

    )
}

export default PostItem