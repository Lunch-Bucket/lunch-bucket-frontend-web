import React from "react";
import "../header/Header.css";
import AddButton from "../header/HeaderButton";

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