import React, {useState, useEffect} from "react";
import "./Sidebar.css";
import {Link, NavLink} from "react-router-dom";
import PATHS from "../../common/paths/paths";
import logo from '../../resources/images/LunchBucketLogo.png'

const Sidebar = () => {

    const isLoggedIn= localStorage.getItem('loginStatus') === 'true';
    
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo-container">
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

                {/* <p className="side-bar-page-list-item" style={{marginTop:'4rem'}}><NavLink to={PATHS.dashboard}>Dashboard</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.promotion}>Promotions</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.winner}>DailyWinner</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.feedback}>Feedbacks</NavLink></p> */}
            </div>
            } 
        </div>
    );
};

export default Sidebar;