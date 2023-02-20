import "./Order.scss";
import Sidebar from "../../component/Sidebar"

import React from "react";

export default function Order() {
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
          <h1>Orders</h1>
        </div>
        <hr></hr>

        <div >
          <p className="txt1">Due                  Completed (Last 24H)</p>
         
        </div>
        <hr></hr>

        <div className="App">
      <table>
        <tr>
        
          <th>Order</th>
          <th>User ID</th>
          <th>Meal Details</th>
          <th>Notes</th>
          <th>Price</th>
        </tr>
        
      </table>
     

    </div> 
        <div className="txt2">
          <p>Add Today's winner</p>
          
        </div>


         
      </div>
    </div>
  );
         
        
    
}