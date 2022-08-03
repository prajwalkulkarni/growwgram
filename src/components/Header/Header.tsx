import React from "react"
import './Header.css'

const Header:React.FC<{}> = (props) =>{

    return (
        <div className="header-bar">
            <div className="menu-items">
                <img src={require('../../assets/logo.png')} height="100" width={100} />
                <h1>GrowwGram</h1>
            </div>

           
        </div>
    )
} 

export default Header