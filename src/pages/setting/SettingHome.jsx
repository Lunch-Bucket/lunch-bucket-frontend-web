import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./SettingStyles.css";
import strings from '../../common/strings/strings';
import { getLunchMenu, getDinnerMenu } from "../../services/menuService";
import { updateMealCount, updateLimits,updateLimitsSpecial} from "../../services/settingservice";
import Popup from "../../components/Popup";
import PredictLimitModal from "../../components/PredictLimitModal";

function SettingHome() {

    const [showmealCount, setShowMealCount] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)
    const [mealTime, setMealTime] = useState('lunch');
    const [mealType, setMealType] = useState('normal');
    const [mealCount, setMealCount] = useState('');
    const [packetCountGet, setPacketCountGet] = useState({});
    const [predictionType, setPredictionType] = useState('limits');

    const [isBetweenLunch, setIsBetweenLunch] = useState(false); //Time check
    const [isBetweenDinner, setIsBetweenDinner] = useState(false); 

    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const openPopup = (type, message) => {
        setPopupType(type);
        setPopupMessage(message);
        setShowPopup(true);
      };

    
    const [limitsLunchSpecial, setLimitsLunchSpecial] = useState({});
    const [limitsLunch, setLimitsLunch] = useState({});
    const [limitsDinnerSpecial, setLimitsDinnerSpecial] = useState({});
    const [limitsDinner, setLimitsDinner] = useState({});

    const [navOnline,setNavOnline] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (type) => {
      setPredictionType(type);
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    async function fetchMenu() {
        try {
            //Lunch
            const menuListLunch = await getLunchMenu([]);

            if (menuListLunch?.data) {
            const initialLimits = {};
            
            menuListLunch.data.rice_menu_lunch.forEach(item => initialLimits[item.type] = item.limit || 0);
            menuListLunch.data.vege_menu_lunch.forEach(item => initialLimits[item.type] = item.limit || 0);
            menuListLunch.data.meat_menu_lunch.forEach(item => initialLimits[item.type] = item.limit || 0);
            menuListLunch.data.stew_menu_lunch.forEach(item => initialLimits[item.type] = item.limit || 0);
            

            const initialLimitsLunchSpecial = menuListLunch.data.special_menu_lunch.flatMap(item => 
              item.category.map(data => ({
                type: data.type,
                id: data.id,
                limit: data.limit || 0
              }))
            );

          setLimitsLunch(initialLimits);
          setLimitsLunchSpecial(initialLimitsLunchSpecial);
          console.log("lunch limit",limitsLunch)
          console.log("lunch special limit",initialLimitsLunchSpecial)
          }
  

          //Dinner
          const menuListDinner = await getDinnerMenu([]);

          if (menuListDinner?.data) {

          const initialLimitsDinner = {};

          menuListDinner.data.rice_menu_dinner.forEach(itemDinner => initialLimitsDinner[itemDinner.type] = itemDinner.limitDinner || 0);
          menuListDinner.data.vege_menu_dinner.forEach(itemDinner => initialLimitsDinner[itemDinner.type] = itemDinner.limitDinner || 0);
          menuListDinner.data.meat_menu_dinner.forEach(itemDinner => initialLimitsDinner[itemDinner.type] = itemDinner.limitDinner || 0);
          menuListDinner.data.stew_menu_dinner.forEach(itemDinner => initialLimitsDinner[itemDinner.type] = itemDinner.limitDinner || 0);
          
          const initialLimitsDinnerSpecial = menuListDinner.data.special_menu_dinner.flatMap(item => 
            item.category.map(data => ({
              type: data.type,
              id: data.id,
              limit: data.limit || 0
            }))
          );

          setLimitsDinner(initialLimitsDinner);
          setLimitsDinnerSpecial(initialLimitsDinnerSpecial);
          console.log("lunch limit",limitsDinner)
          console.log("lunch special limit",limitsDinnerSpecial)
        }
  

        } catch (error) {
          console.log('Error fetching menu data:', error.message);
        }
      }

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

//reduced api calls by making two functions
       const handleUpdateLimitsLunch = async () => {
        try {
          const formattedLimits = {
            meal_type: 'Lunch', 
            limits: { ...limitsLunch } 
          };
      
          const response = await updateLimits(formattedLimits);
          console.log('Response from updateLimits:', response);
          alert('Limits updated successfully');
        } catch (error) {
          console.error('Error updating limits:', error);
          alert('Error updating limits');

        }
      };

      const handleUpdateLimitsDinner = async () => {
        try {
          const formattedLimits = {
            meal_type: 'Dinner', 
            limits: { ...limitsDinner } 
          };
      
          const response = await updateLimits(formattedLimits);
          console.log('Response from updateLimits:', response);
          alert('Limits updated successfully');
        } catch (error) {
          console.error('Error updating limits:', error);
          alert('Error updating limits');

        }
      };

 
      
    //Lunch
      const handleLimitChangeLunch = (key, value) => {
        const numericValue = parseInt(value, 10);
        setLimitsLunch(prevLimits => ({
          ...prevLimits,
          [key]: numericValue
        }));
      };

      //Lunch - Special
      const handleUpdateLimitsLunchSpecial = async () => {
        try {
          const formattedLimits = {
            meal_type: mealType,
            limits: limitsLunchSpecial.reduce((acc, item) => {
              acc[item.type] = item.limit;  // Use item.type instead of item.id
              return acc;
            }, {})
          };
      
          const response = await updateLimitsSpecial(formattedLimits);
          console.log('Limits updated successfully:', response);
          alert('Limits updated successfully');
        } catch (error) {
          console.error('Error updating limits:', error);
          alert('Error updating limits');
        }
      };
      
      
      const handleLimitChangeLunchSpecial = (index, value) => {
        const updatedLimits = [...limitsLunchSpecial];
        updatedLimits[index].limit = Number(value);
        setLimitsLunchSpecial(updatedLimits);
      };

      //Dinner
      const handleLimitChangeDinner = (key, value) => {
        const numericValue = parseInt(value, 10);
        setLimitsDinner(prevLimits => ({
          ...prevLimits,
          [key]: numericValue
        }));
      };
      
      //Dinner - Special
      const handleUpdateLimitsDinnerSpecial = async () => {
        try {
          const formattedLimits = {
            meal_type: mealType,
            limits: limitsDinnerSpecial.reduce((acc, item) => {
              acc[item.type] = item.limit;  // Use item.type instead of item.id
              return acc;
            }, {})
          };
      
          const response = await updateLimitsSpecial(formattedLimits);
          console.log('Limits updated successfully:', response);
          alert('Limits updated successfully');
        } catch (error) {
          console.error('Error updating limits:', error);
          alert('Error updating limits');
        }
      };
      const handleLimitChangeLDinnerSpecial = (index, value) => {
        const updatedLimits = [...limitsDinnerSpecial];
        updatedLimits[index].limit = Number(value);
        setLimitsDinnerSpecial(updatedLimits);
      };



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

          //Time checker
          useEffect(() => {
            const checkTime = () => {
              const now = new Date();
             
              //Lunch
              const startTimeLunch = new Date();
              const endTimeLunch = new Date();

              startTimeLunch.setHours(10, 0, 0, 0); // 10:00
              endTimeLunch.setHours(11, 0, 0, 0);   // 11:00

              setIsBetweenLunch(now >= startTimeLunch && now <= endTimeLunch);

              //Dinner
              const startTimeDinner = new Date();
              const endTimeDinner = new Date();

              startTimeDinner.setHours(18, 0, 0, 0); // 18:00
              endTimeDinner.setHours(19, 0, 0, 0);   // 19:00
      
              setIsBetweenDinner(now >= startTimeDinner && now <= endTimeDinner);
            };
        
            checkTime();
            const interval = setInterval(checkTime, 60000); // Check every minute
        
            return () => clearInterval(interval); // Cleanup interval on component unmount
          }, []);



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
                    <button className="get-order-pdf-button prediction"   onClick={() => openModal('limits')}>Predict Limits</button>
                    <button className="get-order-pdf-button prediction"   onClick={() => openModal('menu')}>Predict Menu</button>
                </div>
                
                {isModalOpen && <PredictLimitModal onClose={closeModal} type={predictionType} />}

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
                {isBetweenLunch ? (
                    <div>
                       <h3>Lunch - Choice</h3>
                            {Object.keys(limitsLunch).map((key, index) => (
                              <div key={index} style={{display:'flex',justifyContent:'space-between', margin:'1rem'}}>
                              <label>{key}</label>
                              <input
                                  style={{width:'3rem'}}
                                  type="number"
                                  value={limitsLunch[key]}
                                  onChange={(e) => handleLimitChangeLunch(key, e.target.value)}
                              />
                              </div>
                          ))}
                           <button onClick={handleUpdateLimitsLunch}>Update Choice Limits</button>
                    <hr/>
                        <h3>Lunch - Special</h3>
                        {limitsLunchSpecial.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                              <label>{item.type}</label>
                              <input
                                type="number"
                                value={item.limit}
                                onChange={(e) => handleLimitChangeLunchSpecial(index, e.target.value)}
                                style={{ width: '3rem' }}
                              />
                            </div>
                          ))}
                          <button onClick={handleUpdateLimitsLunchSpecial}>Update Special Limits</button>
                    </div>
                  ) : (
                    <div>
                      <p style={{maxWidth:'15rem', color:'red'}}>Update Lunch Limits in Between 10.00am - 10.30am</p>
                       <h3>Lunch - Choice</h3>
                        {Object.keys(limitsLunch).map((key, index) => (
                            <div key={index} style={{display:'flex',justifyContent:'space-between', margin:'1rem'}}>
                            <label>{key}</label>
                            </div>
                        ))}
                    <hr/>
                        <h3>Lunch - Special</h3>
                        {limitsLunchSpecial.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                              <label>{item.type}</label>
                            </div>
                        ))}
                      
                    </div>
                  )}
                   
                </div>


                <div>
                {isBetweenDinner ? (
                    <div>
                    <h3>Dinner - Choice</h3>
                    {Object.keys(limitsDinner).map((key, index) => (
                        
                        <div key={index} style={{display:'flex',justifyContent:'space-between', margin:'1rem'}}>
                        <label>{key}</label>
                        <input
                            style={{width:'3rem'}}
                            type="number"
                            value={limitsDinner[key]}
                            onChange={(e) => handleLimitChangeDinner(key, e.target.value)}
                        />
                        </div>
                    ))}
                      <button onClick={handleUpdateLimitsDinner}>Update Choice Limits</button>

                    <hr/>
                    <h3>Dinner - Special</h3>
                    {limitsDinnerSpecial.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                              <label>{item.type}</label>
                              <input
                                type="number"
                                value={item.limit}
                                onChange={(e) => handleLimitChangeLDinnerSpecial(index, e.target.value)}
                                style={{ width: '3rem' }}
                              />
                            </div>
                          ))}
                    <button onClick={handleUpdateLimitsDinnerSpecial}>Update Special Limits</button>

                </div> ) : (
                   <div>
                    <p style={{maxWidth:'15rem', color:'red'}}>Update Dinner Limits in Between 6.00pm - 6.30pm</p>
                   <h3>Dinner - Choice</h3>
                      {Object.keys(limitsDinner).map((key, index) => (
                          <div key={index} style={{display:'flex',justifyContent:'space-between', margin:'1rem'}}>
                          <label>{key}</label>
                          </div>
                ))}
                <hr/>
                    <h3>Dinner - Special</h3>
                    {limitsDinnerSpecial.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                              <label>{item.type}</label>
                            </div>
                        ))}
                </div>
              )}
            </div>
            
            </div>}

            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
            </div>
            </>

      
    );
}

export default SettingHome;