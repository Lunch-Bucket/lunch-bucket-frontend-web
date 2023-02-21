import React from "react";
import "../feedback/FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";
import MenuCard from "./MenuCard";

export default function MenuHome()
{
 
    return(
        <div className="full-container">

                <TopBar
                    title ="Menu"
                    action="Search Bar"
                />
                <TabBar />
                <div className="detail-container">
                   <MenuCard/>
                </div>
        </div>
    );
}