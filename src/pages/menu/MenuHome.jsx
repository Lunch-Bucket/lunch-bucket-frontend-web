import React from "react";
import "../feedback/FeedbackStyles.css";
import MenuCard from "./MenuCard";

export default function MenuHome() {
    return (
        <div className="full-container">
            <div className="detail-container">
                <MenuCard/>
            </div>
        </div>
    );
}