import React, { useState } from "react";
import "../menu/MenuStyles.css";
import {BsPlusCircleFill} from "react-icons/bs";

export default function MenuHome() {
    const[mealType, setmealType] = useState(0)

    const[addLunchVege, setAddLunchVege] = useState(false)
    const[addLunchStew, setAddLunchStew] = useState(false)
    const[addLunchMeat, setAddLunchMeat] = useState(false)
    const[addDinnerVege, setAddDinnerVege] = useState(false)
    const[addDinnerStew, setAddDinnerStew] = useState(false)
    const[addDinnerMeat, setAddDinnerMeat] = useState(false)

    const[lunchMenuList, setLunchMenuList]= useState([
       {
            VegeList: ([
                'Pumpkin-Lunch','Cucumber','Brinjal','Cabbage','Moringa','Beat Root'
            ]),
            StewList: ([
                'Meat Stew','Fish Stew','Egg Stew','Vege Stew'
            ]),
            MeatList: ([
                'Chicken','Fish','Egg','Pork','Beef','Mutton'
            ]),
       },
    ])
    const[dinnerMenuList, setDinnerMenuList]= useState([
        {
             VegeList: ([
                 'Pumpkin-Dinner','Cucumber','Brinjal','Cabbage','Moringa','Beat Root'
             ]),
             StewList: ([
                 'Meat Stew-Dinner','Fish Stew','Egg Stew','Vege Stew'
             ]),
             MeatList: ([
                 'Chicken-Dinner','Fish','Egg','Pork','Beef','Mutton'
             ]),
        },
     ])
    return (
        <div className="full-container">
            <div className="menu-tab-bar">
                <button className="menu-tab-bar-btn" onClick={(e)=>{setmealType(0)}}>Lunch</button>
                <button className="menu-tab-bar-btn" onClick={(e)=>{setmealType(1)}}>Dinner</button>
            </div>
           {mealType===0 && <div className="menu-detail-content">
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Vegetables</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddLunchVege(true)}}/>
                    </div> 
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.VegeList.map((item,id)=>( <li>{item}</li>))}
                          {addLunchVege && 
                          <li className="menu-list-add-input">
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Stew</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddLunchStew(true)}}/>
                    </div>
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.StewList.map((item,id)=>( <li>{item}</li>))}
                          {addLunchStew && 
                          <li>
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Meat</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddLunchMeat(true)}}/>
                    </div>
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.MeatList.map((item,id)=>( <li>{item}</li>))}
                          {addLunchMeat && 
                          <li>
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
            </div>
}
           {mealType===1 && <div className="menu-detail-content">
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Vegetables</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddDinnerVege(true)}}/>
                    </div> 
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.VegeList.map((item,id)=>( <li>{item}</li>))}
                          {addDinnerVege && 
                          <li>
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Stew</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddDinnerStew(true)}}/>
                    </div>
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.StewList.map((item,id)=>( <li>{item}</li>))}
                          {addDinnerStew && 
                          <li>
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Meat</h3><BsPlusCircleFill size={20}  onClick={(e)=>{setAddDinnerMeat(true)}}/>
                    </div>
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.MeatList.map((item,id)=>( <li>{item}</li>))}
                          {addDinnerMeat && 
                          <li>
                            <input type="text" /><button>ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
            </div>
            }
        </div>
    );
}