import "./OrderList.scss";
import Sidebar from "../../component/Sidebar"

import React from "react";

export default function OrderList() {
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
          <h1>Order #001</h1>
        </div>
        <hr></hr>
        
        <div className="details">
            <p>User ID</p>
            <p>Delivery Address</p>
            <p>Special Notes</p>

        </div>
        <hr></hr>

        <div className="App">
      <table>
        <tr>
          <th>Meal</th>
          <th>Items</th>
          <th>Quantity</th>
          <th>Price (Rs.)</th>
        </tr>
        
      </table>
     

    </div>
   
        <div className="total">
            <p>Total Sales</p>
        </div>

        <div className="Number">
            <p>3500</p>
        </div>


         
      </div>
    </div>
  );
         
        
    
}