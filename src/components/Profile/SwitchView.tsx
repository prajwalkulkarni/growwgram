import { SwitchLayoutGroupContext } from "framer-motion"
import React from "react"
import './SwitchView.css'
import { BsListUl, BsGrid3X3GapFill } from "react-icons/bs"
import Card from "../UI/Card/Card"
import { useStore } from "../../store/store"
const SwitchView: React.FC<{ setViewType: Function }> = (props) => {
    
    const theme = useStore(state=>state.theme)
    return (
        <Card className={`cardstyle ${theme}`}>
            <div className={`switchview-container ${theme}`}>
                <div className={`gridview ${theme}`} onClick={() => props.setViewType("grid")}>
                    <BsGrid3X3GapFill />
                </div>

                <div className={`listview ${theme}`} onClick={() => props.setViewType("list")}>
                    <BsListUl />
                </div>

            </div>
        </Card>
    )
}

export default SwitchView