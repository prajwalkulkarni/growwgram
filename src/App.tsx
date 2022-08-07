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
import { useStore } from "./store/store";

export default function App(){
    const theme = useStore(state => state.theme)
    return (
        <div className="container">
            <style>{`body{ background-color: ${theme===''?'lightgray': '#4b4b4b'};}`}</style>
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