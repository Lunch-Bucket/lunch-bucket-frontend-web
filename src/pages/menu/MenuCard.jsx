import React from "react";
import { useState } from "react";
import "./MenuStyles.css";
import { HiUpload } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";

export default function MenuCard()
{   
    const[expand, setExpand] = useState(false);
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
                  <div className="menu-card-header"><h3>{item.name}</h3><span><HiUpload size={20}/><FaTrashAlt size={20}/></span></div>  
                    <p contentEditable={true}>{item.vege1}</p>
                    <p contentEditable={true}>{item.vege2}</p>
                    <p contentEditable={true}>{item.vege3}</p>
                    <p contentEditable={true}>{item.stew}</p>
                    <p contentEditable={true}>{item.meat}</p>
            </div>))}
        </div>
        </>
    );
}