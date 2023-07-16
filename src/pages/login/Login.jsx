import React from "react";
import './Login.css';
import '../../common/styles/CommonStyles.css';
import LoginImg from '../../resources/images/loginVector.png'

export default function Login()
{
    return(
        <>
        <div className="full-container" >
            <div className="login-form-container">
                <div className="login-form-container-left">
                    <div className="login-form-input-content">
                        <h2>Login</h2>
                        <input className="login-form-input-field" type="text" placeholder="User Name" /><br/>
                        <input className="login-form-input-field" type="text" placeholder="Password" />
                    </div>
                </div>
                <div>
                    <img src={LoginImg} alt="login vector" className="login-img" />
                </div>
            </div>
        </div>
        </>
    );
}