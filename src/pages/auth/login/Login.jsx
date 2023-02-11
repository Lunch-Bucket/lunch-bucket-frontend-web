// Nethmi - Complete this component to display the login page
import "./Login.scss";

import React from "react";
//import SplitPane from "react-split-pane";
//import mainLoop from "./MainLoop.js";
// route - http://localhost:3000/auth/login


export default function Login() {
    return (
        <div>
            <div className="Container">
            <div className="Item1">
              <div className="form" >
              <form>
                  <h1 className="Header">Login</h1>
                <div className="input">
                <label> <input type="text" placeholder="User Name" /> </label>
                <br></br>
                <label> <input type="text" placeholder="Password" /> </label>
                </div>
                <div className="sbtbutton">
                <input type ="submit" value="Login"/>
                </div>
               
                
            </form>


              </div>
            </div>
            <div className="Item2">
              <div className="stylebox" >
                  hi
              </div>
            </div>    
           
            </div>

        </div>
    )
}



