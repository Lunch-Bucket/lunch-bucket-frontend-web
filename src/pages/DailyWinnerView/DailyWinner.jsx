import "./DailyWinnerView.scss";
import Sidebar from "../../component/Sidebar"

import React from "react";

export default function DailyWinnerView() {
    return (
      //   <div>
           
      //     <Sidebar/>
      //     <p></p>
      
         
        
      //   <div className="bottomContainer">
      //     <p>hi</p>
      //     <div className="right">
            
          
      //   </div>
      // </div>
      //  </div>

      <div className="new">
      <Sidebar />
      <div className="newContainer">
        
        <div className="topContainer">
          <h1>Daily Winner</h1>
        </div>
        
        <div className="txt1">
          <p>You haven't selected the winner today</p>
        </div>
        
        <div className="txt2">
          <p>Add Today's winner</p>
          
        </div>


         
      </div>
    </div>
  );
         
        
    
}