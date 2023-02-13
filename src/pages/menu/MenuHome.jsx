import React from "react";
import "../feedback/FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";
import SideBar from '../../component/Sidebar'
import MenuCard from "./MenuCard";

export default function MenuHome()
{
 
    return(
        <div className="fullContainer">
            <div className="sideBar">
                <SideBar/>
            </div>
            <div className="leftContainer">
                <TopBar
                    title ="Menu"
                    action="Search Bar"
                />
                <TabBar />
                <div className="detailContainer">
                   <MenuCard/>
                </div>
            </div>
        </div>
    );
}