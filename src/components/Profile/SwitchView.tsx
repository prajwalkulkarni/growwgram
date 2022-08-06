import { SwitchLayoutGroupContext } from "framer-motion"
import React from "react"
import './SwitchView.css'
import { BsListUl, BsGrid3X3GapFill } from "react-icons/bs"
import Card from "../UI/Card/Card"
const SwitchView: React.FC<{ setViewType: Function }> = (props) => {

    return (
        <Card className="cardstyle">
            <div className="switchview-container">
                <div className="gridview" onClick={() => props.setViewType("grid")}>
                    <BsGrid3X3GapFill />
                </div>

                <div className="listview" onClick={() => props.setViewType("list")}>
                    <BsListUl />
                </div>

            </div>
        </Card>
    )
}

export default SwitchView