import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import './ProfileHeader.css'
import { ProfileType } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { BsMapFill, BsInstagram, BsFillImageFill } from "react-icons/bs";
import {  AiFillHeart } from "react-icons/ai";
import { useStore } from "../../store/store";
import { Link } from "react-router-dom";


const ProfileHeader:React.FC<{username:string}> = (props) => {

    const {loading,data} = useFetch(`/users/${props.username}`,0)
    const theme = useStore(state => state.theme)
    
    const [userData, setUserData] = useState<ProfileType & {total_likes: number, total_photos:number}>();
    
    useEffect(()=>{
        if(data){
            setUserData(data)
        }
    },[data])

    return (
        <Card className={`card-style ${theme}`}>
            <div className="profile-header">
                <div className="profile-header__overview">
                    <div className="profile-header__overview__image">
                        <img src={userData?.profile_image.large ?? require('../../assets/user-light.png')} alt="profile-header" />
                    </div>
                    <div className={`profile-header__overview__info ${theme}`}>
                        <h2>{userData?.name}</h2>
                        <h4>{props.username}</h4>
                    </div>
                </div>
                <div className={`profile-header__likes ${theme}`}>
                    <p><AiFillHeart/> {userData?.total_likes}</p>
                    {userData?.location && <p><BsMapFill/> {userData?.location}</p>}
                    <p><BsFillImageFill/> {userData?.total_photos}</p>
                    {userData?.social.instagram_username && 
                    <a href={`https://instagram.com/${userData?.social.instagram_username}`} target="_blank">
                        <p>
                        <BsInstagram/> {userData?.social.instagram_username}
                        </p>
                    </a>}
                    
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