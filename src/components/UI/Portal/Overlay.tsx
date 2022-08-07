import React,{ MouseEventHandler, PropsWithChildren } from "react";
import './Backdrop.css'
const Overlay:React.FC<PropsWithChildren & {onClick:MouseEventHandler<HTMLDivElement>}> = (props) => {

    return(
        <div className="backdrop" onClick={props.onClick}>
            
            <div>
            {props.children}
            </div>

        </div>
    )
}

export default Overlay