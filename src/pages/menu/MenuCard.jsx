import React from "react";
import { useState } from "react";
import "./MenuStyles.css";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export default function MenuCard()
{   
    const[editable, setEditabale] = useState(false);
    const[menuList, setMenuList] = useState([
        {id: '0', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '1', name: 'Menu 2', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '2', name: 'Menu 3', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '3', name: 'Menu 4', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '5', name: 'Menu 5', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
    ]);


    return(
        <>
        <div className="menucontainer">
          {menuList.map((item, id) => (
            <div className="cardContainer">
                  <div className="menu-card-header">
                    <h3>{item.name}</h3>
                    <span><AiFillEdit size={20} onClick={()=>{setEditabale(true)}}/><FaTrashAlt size={20}/></span>
                  </div>  
                  <div className="menu-card-content">
                    <h4 className="menu-card-content-item" contentEditable={editable}>{item.vege1}</h4>
                    <h4 className="menu-card-content-item" contentEditable={editable}>{item.vege2}</h4>
                    <h4 className="menu-card-content-item" contentEditable={editable}>{item.vege3}</h4>
                    <h4 className="menu-card-content-item" contentEditable={editable}>{item.stew}</h4>
                    <h4 className="menu-card-content-item" contentEditable={editable}>{item.meat}</h4>
                    {editable && <button>Update</button>}
                 </div>
                 <button>APPLY</button>
            </div>))}
        </div>
        </>
    );
}