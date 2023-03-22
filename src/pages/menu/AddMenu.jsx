import React from "react";
import {BsPlusCircleFill} from "react-icons/bs";

export default function AddMenu()
{
    return(
        <>
        <div className="full-container">
            <div className="add-menu-container">
                <div className="add-menu-row">
                        <h4>Vegetables</h4> 
                        <BsPlusCircleFill size={20}/>
                        <ol>
                            <input type="text" className="add-menu-row-item"/>
                        </ol>
                </div>
                <div className="add-menu-row">
                        <h4>Stew</h4><BsPlusCircleFill size={20}/>
                        <ol>
                            <input type="text" className="add-menu-row-item"/>
                        </ol>
                </div>
                <div className="add-menu-row">
                        <h4>Meat Items</h4><BsPlusCircleFill size={20}/>
                        <ol>
                            <input type="text" className="add-menu-row-item"/>
                        </ol>
                </div>
            </div>
            <button>ADD MENU</button>
        </div>
        </>
    );
}