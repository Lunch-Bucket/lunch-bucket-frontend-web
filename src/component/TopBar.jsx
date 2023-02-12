import React from "react";
import "./Header.css";

export default function TopBar({title}, {action}){
    return(
        <div className="container">
            <div className="titleContainer">
                <h1>{title}</h1>
            </div>
            <div className="actionContainer">
                <h2>{action}</h2>
            </div>
        </div>
    );
}