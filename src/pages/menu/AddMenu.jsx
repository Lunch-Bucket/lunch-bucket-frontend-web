import React from "react";

export default function AddMenu()
{
    return(
        <>
        <div className="add-menu-full-container">
        <div className="add-menu-container">
           <div className="add-menu-row">
                <h4>Vegetables</h4>
                <ol>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                </ol>
           </div>
           <div className="add-menu-row">
                <h4>Stew</h4>
                <ol>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                </ol>
           </div>
           <div className="add-menu-row">
                <h4>Meat Items</h4>
                <ol>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                    <input type="text" className="add-menu-row-item"/>
                </ol>
           </div>
        </div>
        <button>ADD MENU</button>
        </div>
        </>
    );
}