import "./Chat.scss";
import Sidebar from "../../component/Sidebar"

import React from "react";

export default function Chat() {
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
          <h1>User #001</h1>
        </div>
        {/* <div className="txtarea">
        <textarea />
        </div>
         */}

         <div className="txtarea">
           <input type="text"></input>
           <input type="button" value ="send"></input>
         </div>
      </div>
    </div>
  );
         
        
    
}
