import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./SettingStyles.css";
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import { getLunchMenu, getDinnerMenu } from "../../services/menuService";


function SettingHome() {

    const [showmealCount, setShowMealCount] = useState(false)
    // Lunch
    const [meatMenuLunch, setMeatMenuLunch] = useState([]);
    const [vegeMenuLunch, setVegeMenuLunch] = useState([]);
    const [stewMenuLunch, setStewMenuLunch] = useState([]);
    const [specialMenuLunch, setSpecialMenuLunch] = useState([]);
    const [riceMenuLunch, setRiceMenuLunch] = useState([]);
   
    // Dinner
    const [meatMenuDinner, setMeatMenuDinner] = useState([]);
    const [vegeMenuDinner, setVegeMenuDinner] = useState([]);
    const [stewMenuDinner, setStewMenuDinner] = useState([]);
    const [specialMenuDinner, setSpecialMenuDinner] = useState([]);
    const [riceMenuDinner, setRiceMenuDinner] = useState([]);

    let count = 100;


    function handleDailyMealCount(){
            setShowMealCount(false);
    }

    async function fetchMenu() {
        try {
            const menuListLunch = await getLunchMenu([]);
            const menuListDinner = await getDinnerMenu([]);
            setVegeMenuLunch(menuListLunch.data.vege_menu_lunch);
            setMeatMenuLunch(menuListLunch.data.meat_menu_lunch);
            setStewMenuLunch(menuListLunch.data.stew_menu_lunch);
            setRiceMenuLunch(menuListLunch.data.rice_menu_lunch);
            setSpecialMenuLunch(menuListLunch.data.special_menu_lunch);

            setVegeMenuDinner(menuListDinner.data.vege_menu_dinner);
            setMeatMenuDinner(menuListDinner.data.meat_menu_dinner);
            setStewMenuDinner(menuListDinner.data.stew_menu_dinner);
            setRiceMenuDinner(menuListDinner.data.rice_menu_dinner);
            setSpecialMenuDinner(menuListDinner.data.special_menu_dinner);
  

        } catch (error) {
          console.log('Error fetching menu data:', error.message);
        }
      }
   
       useEffect(() => {
           fetchMenu();
       }, []);

       

    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="title-text">{strings.setting}</h1>    
            </div>
            <hr/>
            <div className="setting-container">
                <div className="setting-card" >
                    <h4>Daily Meal Count</h4>
                    {showmealCount ?<div>
                        <input type="number" className="setting-card-input-count"/>
                        <button onClick={handleDailyMealCount}>Submit</button>
                    </div>: 
                    <div>
                        <h2>{count}</h2>
                        <button onClick={()=>{setShowMealCount(true)}}>Edit</button>
                    </div>
                    }
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <div>
                    <h2>Lunch</h2>
                    {riceMenuLunch.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {vegeMenuLunch.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {meatMenuLunch.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {stewMenuLunch.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {specialMenuLunch.map((item,id)=>(
                        <ul>
                            {item.category.map((data,id)=>(
                                <li>{data.type}</li>
                            ))}
                            
                        </ul>
                    ))}
                    <hr/>
                </div>

                <div>
                    <h2>Dinner</h2>
                    {riceMenuDinner.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {vegeMenuDinner.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {meatMenuDinner.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {stewMenuDinner.map((item,id)=>(
                        <ul>
                            <li>{item.type}</li>
                        </ul>
                    ))}
                    <hr/>
                    {specialMenuDinner.map((item,id)=>(
                         <ul>
                         {item.category.map((data,id)=>(
                             <li>{data.type}</li>
                         ))}
                         
                     </ul>
                    ))}
                    <hr/>
                </div>
            </div>
            </div>


      
    );
}

export default withTokenExpirationCheck(SettingHome);