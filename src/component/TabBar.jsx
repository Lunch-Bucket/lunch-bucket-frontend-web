import React from "react";
import "./Header.css";

export default function TabBar({action}){

    function frequencyCal(){

    }
    function orderCountCal(){
        
    }
    function orderAmountCal(){
        
    }

    return(
        <div className="tabBarContainer">
           {action==="1" &&(
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
        </div>
    );
}