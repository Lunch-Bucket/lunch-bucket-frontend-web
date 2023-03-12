import React from "react";
import "./Header.css";
import AddButton from "./HeaderButton";

export default function TopBar({action}){

    return(
        <div className="container">
            <div className="title-container">
            <h2 className="page-title">{action}</h2>
            </div>
            <div className="action-container">           
                <AddButton title={action}/>
            </div>
        </div>
    );
}