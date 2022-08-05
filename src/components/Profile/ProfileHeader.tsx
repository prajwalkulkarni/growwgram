import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import './ProfileHeader.css'
import { ProfileType } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { BsMapFill, BsInstagram, BsTwitter } from "react-icons/bs";
import {  AiFillHeart } from "react-icons/ai";

const ProfileHeader:React.FC<{username:string}> = (props) => {

    const {loading,data} = useFetch(`/users/${props.username}`,0)
    const [userData, setUserData] = useState<ProfileType & {total_likes: number}>();
    
    useEffect(()=>{
        if(data){
            setUserData(data)
        }
    },[data])

    return (
        <Card>
            <div className="profile-header">
                <div className="profile-header__overview">
                    <div className="profile-header__overview__image">
                        <img src={userData?.profile_image.large} alt="profile-header" />
                    </div>
                    <div className="profile-header__overview__info">
                        <h2>{userData?.name}</h2>
                        <h4>{props.username}</h4>
                    </div>
                </div>
                <div className="profile-header__likes">
                    <p><AiFillHeart/> {userData?.total_likes}</p>
                    {userData?.location && <p><BsMapFill/> {userData?.location}</p>}
                    {userData?.social.instagram_username && <p><BsInstagram/> {userData?.social.instagram_username}</p>}
                    {userData?.social.twitter_username && <p><BsTwitter/> {userData?.social.twitter_username}</p>}

                </div>
            </div>

        </Card>
    )
}

export default React.memo(ProfileHeader,(prevProps, nextProps)=>{
  
    if(prevProps.username === nextProps.username){
        return true
    }

    return false
})