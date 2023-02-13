import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Header.css";

export default function TabBar({action}){

    const[state, setState] = useState(action);
    const[mealType, setMealType] = useState("Lunch");

    function frequencyCal(){

    }
    function orderCountCal(){
        
    }
    function orderAmountCal(){
        
    }
    useEffect=()=>{
        setState("");
    }

    return(
        <div className="tabBarContainer">
           {state=="1" &&(
            <div className="userTab">
                <table>
                    <tr>
                        <td><button onClick={frequencyCal}>Frequency</button></td>
                        <td><button onClick={orderCountCal}>Order Count</button></td>
                        <td><button onClick={orderAmountCal}>Sales</button></td>
                    </tr>
                </table>
            </div>
           )}
{/* 
State changing error - multiple render */}
            {state=="2" &&(
                <div className="userTab">
                    <table>
                        <tr>
                            <td><button onClick={setMealType("Lunch")}>Lunch</button></td>
                            <td><button onClick={setMealType("Dinner")}>Dinner</button></td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    );
}