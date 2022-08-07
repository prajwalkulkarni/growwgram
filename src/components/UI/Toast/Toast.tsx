import React, { useState, useEffect } from "react"
import './Toast.css'

const toastData = [
    {
        id: 1,
        title: "Error",
        description: "Something went wrong, please try again later.",
        icon: require('../../../assets/error.svg')
    }
]

const autoDelete = true
const autoDeleteTime = 3000
const Toast: React.FC<{}> = (props) => {


    const [list, setList] = useState<{ id: number, title: string, description: string, icon: any }[]>(toastData);


    useEffect(() => {
        setList([...toastData]);
    }, [toastData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastData.length && list.length) {
                deleteToast(toastData[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastData, autoDelete, autoDeleteTime, list]);

    const deleteToast = (id: number) => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastData.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastData.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <div className="notification-container top-right">

            {
                list.map((toast, i) =>
                    <div
                        key={i}
                        className={`notification toast top-right`}
                    >
                        <button onClick={() => deleteToast(toast.id)}>
                            X
                        </button>
                        <div className="notification-image">
                            <img src={toast.icon} alt="" />
                        </div>
                        <div>
                            <p className="notification-title">{toast.title}</p>
                            <p className="notification-message">
                                {toast.description}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Toast