import React from "react";
import "../order/OrderStyles.css";
import "../user/User.css";
import "./DashboardStyles.css"
import strings from "../../common/strings/strings";
import { chart } from "./chart";


export default function DashboardHome() {
    return (
        <div className="full-container">
            <div className="title-search-content">
                <h1 className="menu-title-text">{strings.dashboard}</h1> 
            </div>
            <hr/>

            <div className="action-bar">
                <div style={{display:'inline-flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h4>Sales</h4>
                    <div>
                        <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Daily</button>
                        <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Weekly </button>
                        <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Monthly</button>
                    </div>
                </div>
            </div>

            <div className="dashboard-sales-graph-content">
                <div className="dashboard-sales-graph">

                </div>

            </div>



        </div>
    )
}
