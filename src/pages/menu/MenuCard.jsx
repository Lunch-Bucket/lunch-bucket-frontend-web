import React from "react";
import { useState } from "react";
import "./MenuStyles.css";

export default function MenuCard()
{   
    const[expand, setExpand] = useState(false);
    const[menuList, setMenuList] = useState([
        {id: '1', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '2', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '3', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '4', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
        {id: '5', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg'},
    ]);

    function expandFunc(){
        if(expand==true)
            setExpand(false);
        
        else{
            setExpand(true);
        }
       
    }


    return(
        <>
        <div className="menucontainer">
          {menuList.map((item, id) => (
            <div className="cardContainer"
            onClick={expandFunc}>
                <h3>{item.name}</h3>
                {expand===true && item.id==='1' &&<div className="expandCard">
                        <p>{item.vege1}</p>
                        <p>{item.vege2}</p>
                        <p>{item.vege3}</p>
                        <p>{item.stew}</p>
                        <p>{item.meat}</p>
                </div>}
            </div>))}
        </div>
        </>
    );
}