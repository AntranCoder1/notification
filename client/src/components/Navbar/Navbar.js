import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import Notification from "../../img/icons8-notification.png";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";

const Navbar = ({ socket }) => {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     socket.on("getNotification", (data) => {
    //         setNotifications((prev) => [...prev, data]);
    //     })
    // }, [socket]);
    useEffect(() => {
        socket.on("getText", (data) => {
            setNotifications((prev) => [...prev, data]);
        })
    }, [socket]);

    console.log(notifications)

    const displayNotification = ({ senderName, text }) => {
        let action;

        // if (type === 1) {
        //     action = "liked";
        // } else if (type === 2) {
        //     action = "commented";
        // } else {
        //     action = "shared";
        // }

        return (
            // <span className="notification">{`${senderName} ${action} your post.`}</span>
            <span className="notification">{`${senderName}: ${text}`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };

    return (
        <div className="navbar">
            <span className="logo">Lama App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="iconImg" alt="" />
                    {
                        notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Message} className="iconImg" alt="" />
                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Settings} className="iconImg" alt="" />
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar