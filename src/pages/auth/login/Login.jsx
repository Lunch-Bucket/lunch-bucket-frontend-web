import React from "react";
import "./Login.css";

export default function Login() {
    return (
        <div className="Container">
            <div className="item1">
                <div className="form">
                    <form>
                        <h1 className="Header">Login</h1>
                        <div className="input">
                            <label> <input type="text" placeholder="User Name"/> </label>
                            <br></br>
                            <label> <input type="text" placeholder="Password"/> </label>
                        </div>
                        <div className="sbt-button">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="item2">
                <div className="style-box">
                    hi
                </div>
            </div>
        </div>
    )
}



