import React, { PropsWithChildren } from "react";
import './Card.css';


const Card: React.FC<PropsWithChildren & {className?: string}> = (props) => {
    return (
        <div className={`card ${props.className}`}>
            {props.children}
        </div>

    )
}

export default Card