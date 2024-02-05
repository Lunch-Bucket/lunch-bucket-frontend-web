import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./SettingStyles.css";
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import { getLunchMenu, getDinnerMenu } from "../../services/menuService";
import { updateMealCount, getMealCount } from "../../services/settingservice";
import Popup from "../../components/Popup";


function SettingHome() {

    const [showmealCount, setShowMealCount] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)
    const [mealTime, setMealTime] = useState('lunch');
    const [mealType, setMealType] = useState('normal');
    const [mealCount, setMealCount] = useState('');
    const [packetCountGet, setPacketCountGet] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const openPopup = (type, message) => {
        setPopupType(type);
        setPopupMessage(message);
        setShowPopup(true);
      };

      const [formData, setFormData] = useState({
        meal_type: '',
        order_type: '',
        id: '',
      });
    

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

    const [navOnline,setNavOnline] = useState(true)


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

    //   const fetchPacketCount = async () => {
    //     try {
    //         const packetCountDetail = await getMealCount(meal_type, order_type, id);
    //         setPacketCountGet(packetCountDetail)
    //     } catch (error) {
    //         console.log('Error fetching packet count data:', error.message);
    //       }
    //     }
        const data = packetCountGet.data || {}; 

        useEffect(() => {
            if(navigator.onLine){
                setNavOnline(true);
            }else{
                setNavOnline(false);
            }
        }, [navigator.onLine]);

   
       useEffect(() => {
        if(navOnline){
            fetchMenu();
        }
       }, []);

    //    useEffect(() => {
    //     if(navOnline){
    //         fetchPacketCount();
    //     }
    //     }, []);



        function handleSettingsCard(value){
            switch(value){
                case 0:{
                    setShowMenu(false);
                    setShowMealCount(false);
                    setShowDashboard(false);
                    break;
                }
                case 1:{
                    setShowMenu(false);
                    setShowMealCount(true);
                    setShowDashboard(false);
                    break;
                }
                case 2:{
                    setShowMealCount(false);
                    setShowDashboard(false);
                    setShowMenu(true);
                    break;
                }
                case 3:{
                    setShowMealCount(false);
                    setShowMenu(false);
                    setShowDashboard(true);
                    break;
                }
            }

        }
        const handleDailyMealCount = async () => {
            try {
              const count = parseInt(mealCount, 10);
        
              if (isNaN(count) || count < 0) {
                console.error('Invalid meal count');
                return;
              }
              const response = await updateMealCount(mealTime, mealType, count);
              console.log('Meal count updated successfully', response);
              openPopup('success', 'You have successfully updated the Packet Limit ');
            //   fetchPacketCount();
              setShowMealCount(false);
            } catch (error) {
              console.error('Error updating meal count:', error);
            }
          };

    
       

    return (<>
        <div className="full-container">
        {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="title-text">{strings.setting}</h1>    
            </div>
            <hr/>
            <div className="setting-container">
                <div className="setting-card" onClick={() => handleSettingsCard(1)}>
                    <div style={{textAlign:'center'}}>
                        <h4>Edit Meal Count</h4><br />
                        {/* <h5>Lunch: {data.packet_limit_lunch} </h5> 
                        <h5>Dinner: {data.packet_limit_dinner}</h5> */}
                        </div>
                    </div>

                <div className="setting-card"  onClick={()=>{handleSettingsCard(2)}} >
                    <h4>Today's Menu</h4>
                </div>
                <div className="setting-card"  onClick={()=>{handleSettingsCard(3)}} >
                    <h4>Notifications</h4>
                </div>
            </div>
            
            {showmealCount &&
                <div className="setting-card-edit-count">
                    <select style={{padding:'0.6rem', fontSize:'17px'}}
                     value={mealType}
                     onChange={(e) => setMealTime(e.target.value)}
                     defaultValue='lunch'>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select><br/>
                    <select style={{padding:'0.6rem', fontSize:'17px'}}
                     value={mealType}
                     onChange={(e) => setMealType(e.target.value)}
                     defaultValue='normal'>
                        <option value="normal">Choice</option>
                        <option value="special">Special</option>
                        <option value="simplesuper">Simple & Super</option>
                    </select><br/>
                    <input type="number" className="setting-card-input-count"
                    value={mealCount}
                    onChange={(e) => setMealCount(e.target.value)}/><br/>
                    <button onClick={handleDailyMealCount}>Submit</button>
                </div>
            }

            {showMenu &&
            <div style={{display:'flex', justifyContent:'space-around', margin:'3rem'}}>
                <div>
                    <h3>Lunch - Choice</h3>
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
                    <h3>Lunch - Special</h3>
                    {specialMenuLunch.map((item,id)=>(
                        <ul>
                            {item.category.map((data,id)=>(
                                <li>{data.type}</li>
                            ))}
                            
                        </ul>
                    ))}
                </div>

                <div>
                    <h3>Dinner - Choice</h3>
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
                    <h3>Dinner - Special</h3>
                    {specialMenuDinner.map((item,id)=>(
                         <ul>
                         {item.category.map((data,index)=>(
                             <li>{data.type}</li>
                         ))}
                         
                     </ul>
                    ))}
                </div>
            </div>
            }
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
            </div>
            </>

      
    );
}

export default withTokenExpirationCheck(SettingHome);