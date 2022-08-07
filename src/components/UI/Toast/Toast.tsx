import React from "react"
import './Toast.css'
const Toast: React.FC<{}> = (props) => {

    return (
        <div className="notification-container top-right">

            <div className="notification toast top-right">
                <button>
                    X
                </button>
                <div className="notification-image">
                    <img src={require('../../../assets/error.svg')} alt="" />
                </div>
                <div>
                    <p className="notification-title">Error</p>
                    <p className="notification-message">Something went wrong, please try again later.</p>
                </div>
            </div>
        </div>
    )
}

export default Toast