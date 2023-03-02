import React from "react";
import { useState } from "react";
import "../feedback/FeedbackStyles.css";
import TopBar from "../../component/TopBar";

export default function Winner()
{

    return(
            <div className="full-container">
                <TopBar
                    title ="Add Winner"
                />
                <div className="detail-container">
                   <form>
                        <label className="form-label" htmlFor="">User ID</label>
                        <input className="form-input" type='text'/><br/>
                        <label className="form-label"  htmlFor="">Number of Meals</label>
                        <input className="form-input" type='text'/><br/>
                        <label className="form-label"  htmlFor="">Price</label>
                        <input className="form-input" type='text'/><br/>
                        <label className="form-label"  htmlFor="">Cover Image</label>
                        <input type='file'/>
                   </form>
                </div>
            </div>
    );
}