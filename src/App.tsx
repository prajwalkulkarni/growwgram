import React from "react";
import Header from "./components/Header/Header";
import PostList from "./components/PostList/PostList";
import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import NewsFeed from "./pages/NewsFeed";
import ProfileSection from "./pages/ProfileSection";
export default function App(){

    return (
        <div className="container">
            
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<NewsFeed/>}/>
                    <Route path="/user/:username" element={<ProfileSection/>}/>
                    <Route path="*" element = {<Navigate to='/' replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )

}