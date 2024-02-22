import React, {useState, useEffect} from "react";
import "./Sidebar.css";
import {Link, NavLink} from "react-router-dom";
import PATHS from "../../common/paths/paths";
import logo from '../../resources/images/LunchBucketLogo.png'

const Sidebar = () => {

    const isLoggedIn= localStorage.getItem('loginStatus') === 'true';
    const [nodeEnv, setNodeEnv] = useState(false);
    const tokenGeneratedTime = parseInt(localStorage.getItem("tokenGeneratedTime"), 10);
    const tokenExpiryTime = tokenGeneratedTime + 3550000;
    const [remainingTime, setRemainingTime] = useState(tokenExpiryTime - Date.now());
    function nodeConfig(){
        if(process.env.NODE_ENV==='development'){
            setNodeEnv(false);
        }
    }
    
    useEffect(() => {
        nodeConfig();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newRemainingTime = tokenExpiryTime - Date.now();
            if (newRemainingTime <= 0) {
                clearInterval(interval);
                localStorage.setItem('loginStatus', false);
                // window.location.replace(PATHS.login);
            } else {
                setRemainingTime(newRemainingTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tokenExpiryTime]);


    const formatTime = (time) => {
        const minutes = Math.floor(time / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${minutes} min ${seconds} secs`;
    };

  
    
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo-container">
            {remainingTime > 0 &&
                <div className="countdown-timer">
                    <p style={{fontSize:'12px',color:'green'}}>Session ends in {formatTime(remainingTime)}</p>
                </div>
            }
                {!nodeEnv &&
                    <p style={{fontSize:'10px',color:'red'}}>DEVELOPMENT</p>
                }
                <span className="sidebar-logo">
                    <Link to={PATHS.login}>
                        <img src={logo} alt="logo" className="sidebar-logo-img"/>
                    </Link>
                </span>
            </div>
          {isLoggedIn && <div className="side-bar-page-list">
                <p className="side-bar-page-list-item" ><NavLink to={PATHS.orderLunch}>Lunch Orders</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.orderDinner}>Dinner Orders</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.menu}>Food List</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.specialMenu}>Special Foods</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.user}>Users</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.chat}>Chats</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.setting}>Settings</NavLink></p>

              
            </div>
            } 
        </div>
    );
};

export default Sidebar;