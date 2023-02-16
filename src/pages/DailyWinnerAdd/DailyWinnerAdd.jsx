import "./DailyWinnerAdd.scss";
import Sidebar from "../../component/Sidebar"

import React from "react";

export default function DailyWinnerAdd() {
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
        <div >

        <form >
        <label className="label">User ID <input className="txtinput"  type="text" name="UID" /></label>
        <br></br>  <br></br>  <br></br> <br></br>
        <label className="label">Number of Meals <input className="txtinput"  type="text" name="nM" /></label>
        <br></br> <br></br>  <br></br> <br></br>
        <label className="label">Price <input className="txtinput"  type="text" name="price" /></label>
        <br></br> <br></br>  <br></br> <br></br>
        <label className="label">Cover Image <input className="txtarea"  type="text" name="CImage" /></label>
        <div className="coverimage">
                 <input id="profilePic" type="file" />
              </div>
        <input className="btn" type="submit" value="Submit" />
        </form>
        </div>
        
      </div>
    </div>
  );
         
        
    
}
