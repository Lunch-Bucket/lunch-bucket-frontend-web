import {Outlet} from 'react-router-dom';
import Sidebar from "../components/sidebar/Sidebar";
import React from "react";
import './routeStyles.css';

export default function AdminRoutes() {
    return (
        <div className="main">
            <Sidebar/>
            <div className="main-container">
                <Outlet/>
            </div>
        </div>
    )
}
