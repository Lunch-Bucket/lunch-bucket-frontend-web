import React, { useState } from "react";
import "../menu/MenuStyles.css";
import {BsPlusCircleFill} from "react-icons/bs";
import {FaTrashAlt} from "react-icons/fa";
import { useEffect } from "react";

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
            <div className="menu-title">
              <h1 className="menu-title-text">Menu</h1>
              
            </div>
            <hr/>
            <div className="menu-tab-bar">
                <button className="menu-tab-bar-btn" onClick={(e)=>{setmealType(0)}}>Lunch</button>
                <button className="menu-tab-bar-btn" onClick={(e)=>{setmealType(1)}}>Dinner</button>
            </div>
            <hr/> 
           {mealType===0 && <div className="menu-detail-content">
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Vegetables</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill size={30}  onClick={(e)=>{setAddLunchVege(!addLunchVege)}}/></div>
                    </div> 
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.VegeList.map((item,id)=>( 
                            <li className="menu-detail-list-item">
                              <div className="menu-detail-list-item-name">{item}</div>
                              <div className="menu-detail-list-item-trash">
                                <FaTrashAlt size={14}  style={{marginLeft:'5px'}}/>
                              </div>
                            </li>
                            ))}
                          {addLunchVege && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>

                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Stew</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill size={30}  onClick={(e)=>{setAddLunchStew(!addLunchStew)}}/></div>
                    </div>
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.StewList.map((item,id)=>(  
                             <li className="menu-detail-list-item">
                              <div className="menu-detail-list-item-name" style={{display:'flex', justifyContent:'space-between'}}>{item} <BsFillCheckCircleFill/> </div>
                              <div className="menu-detail-list-item-trash">
                                <FaTrashAlt size={14}  style={{marginLeft:'5px'}}/>
                              </div>
                           </li>
                          ))}
                          {addLunchStew && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Meat</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill size={30}  onClick={(e)=>{setAddLunchMeat(!addLunchMeat)}}/></div>
                    </div>
                        {lunchMenuList.map((data,id)=>( <ul>
                          {data.MeatList.map((item,id)=>( <li>{item}</li>))}
                          {addLunchMeat && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
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
                        <h3>Vegetables</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill  size={30} onClick={(e)=>{setAddDinnerVege(!addDinnerVege)}}/></div>
                    </div> 
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.VegeList.map((item,id)=>( 
                             <li className="menu-detail-list-item">
                             <div className="menu-detail-list-item-name">{item}</div>
                             <div className="menu-detail-list-item-trash">
                               <FaTrashAlt size={14}  style={{marginLeft:'5px'}}/>
                             </div>
                          </li>
                          ))} 
                          {addDinnerVege && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
                           
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Stew</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill size={30}  onClick={(e)=>{setAddDinnerStew(!addDinnerStew)}}/></div>
                    </div>
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.StewList.map((item,id)=>( <li style={{display:'flex', justifyContent:'space-between'}}>{item} <BsFillCheckCircleFill/> </li>))}
                          {data.StewList.map((item,id)=>( 
                               <li className="menu-detail-list-item">
                               <div className="menu-detail-list-item-name">{item}</div>
                               <div className="menu-detail-list-item-trash">
                                 <FaTrashAlt size={14}  style={{marginLeft:'5px'}}/>
                               </div>
                            </li>
                            ))}
                          {addDinnerStew && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
                          </li>
                          }
                        </ul>
                        ))}
                </div>
                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">
                        <h3>Meat</h3><div className="menu-detail-list-title-icon"><BsPlusCircleFill size={30}  onClick={(e)=>{setAddDinnerMeat(!addDinnerMeat)}}/></div>
                    </div>
                        {dinnerMenuList.map((data,id)=>( <ul>
                          {data.MeatList.map((item,id)=>( 
                               <li className="menu-detail-list-item">
                               <div className="menu-detail-list-item-name">{item}</div>
                               <div className="menu-detail-list-item-trash">
                                 <FaTrashAlt size={14}  style={{marginLeft:'5px'}}/>
                               </div>
                            </li>
                          ))}
                          {addDinnerMeat && 
                          <li className="menu-list-add-input">
                            <input type="text" className="menu-list-add-input-box"/>
                            <button className="menu-list-add-input-box-add">ADD</button>
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