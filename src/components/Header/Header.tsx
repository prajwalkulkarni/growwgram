import React from "react"
import { useStore } from "../../store/store"
import './Header.css'
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { Link } from "react-router-dom"
const Header: React.FC<{}> = (props) => {
    const theme = useStore(state => state.theme)
    const setTheme = useStore(state => state.setTheme)
    return (

        <div className={`header-bar ${theme}`}>
            <div className={`menu-items ${theme}`}>
                <Link to="/">
                    <img src={require('../../assets/logo.png')} height="100" width={100} />
                </Link>
                <Link to="/">

                    <h1>GrowwGram</h1>
                </Link>
            </div>

            <div onClick={() => theme === '' ? setTheme('dark') : setTheme('')} className={`menu-items ${theme}`}>
                {theme === '' ? <h2 className="moon-yellow"><BsFillMoonStarsFill /></h2> : <h2><BsFillSunFill /></h2>}
            </div>

        </div>
    )
}

export default Header