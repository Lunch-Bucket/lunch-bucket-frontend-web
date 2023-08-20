import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./SettingStyles.css";
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";


function SettingHome() {

    const [showmealCount, setShowMealCount] = useState(false)
    const count = 100;

    function handleDailyMealCount(){
            setShowMealCount(false);
    }

    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="title-text">{strings.setting}</h1>    
            </div>
            <hr/>
            <div className="setting-container">
                <div className="setting-card" >
                    <h4>Daily Meal Count</h4>
                    {showmealCount ?<div>
                        <input type="number" className="setting-card-input-count"/>
                        <button onClick={handleDailyMealCount}>Submit</button>
                    </div>: 
                    <div>
                        <h2>{count}</h2>
                        <button onClick={()=>{setShowMealCount(true)}}>Edit</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default withTokenExpirationCheck(SettingHome);