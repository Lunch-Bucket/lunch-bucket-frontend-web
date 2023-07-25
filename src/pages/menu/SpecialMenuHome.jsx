import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import {FaTrashAlt} from "react-icons/fa";
import strings from '../../common/strings/strings'
import {getFoodItem } from "../../services/menuService";

import CryptoJS, {AES} from 'crypto-js';
import {baseUrl} from '../../controllers/baseUrl'

export default function SpecialMenuHome() {

      const originalValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdm9keWFwaXVtYW50aGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMTIyMzM0NCIsImNvZGUiOiI2NGIxMTdhM2YwNzY5YjlkMTJlYzVmNzAiLCJleHBpcmUiOjE2ODk2MDMzMzJ9.dZzQ3yMxAqhZRvhahczXsh54uvxY8wIQ7s3FrLDtm64';
      const encryptedValue = AES.encrypt(originalValue, 'secret-token').toString();

      localStorage.setItem('auth', encryptedValue);
 
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);

     let selectedFoodItems = []


     async function fetchFood() {
      try {
        const foodDetail = await getFoodItem([]);
        setfoodItem(foodDetail);
        console.log('user data in menu page', foodDetail);
      } catch (error) {
        console.log('Error fetching menu data:', error.message);
      }
    }
 
     useEffect(() => {
         fetchFood();
     }, []);
   
     function FoodItemChecked(value){
      selectedFoodItems.push(value)
      console.log('checked food items: ', selectedFoodItems)
  }


    function handleDeleteFood(){
      
    }
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.specialMenu}</h1>  
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{}} disabled={selectedFoodItems.length === 0}>Apply Lunch Meal</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{}} disabled={selectedFoodItems.length === 0}>Apply Dinner Meal</button>
                <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} disabled={selectedFoodItems.length === 0} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button>
              </div>
            </div>
            <hr/>


              {showDeleteItemModal &&  <div class="modal-content delete-confirm">
                  <h4>Are you sure, you want to delete the selected items ?</h4>
                  <div>
                    <button class="delete-confirm-btn" onClick={()=>{setShowDeleteItemModal(false)}}>Cancel</button>
                    <button class="delete-confirm-btn" onClick={handleDeleteFood}>Confirm</button>
                  </div>
              </div>}
          
            <div className="menu-detail-content">
                <div className="menu-detail-list">
                <div className="menu-detail-list-title">Vegetables</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category == 'vege' && <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked(item.food_id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              < div className="menu-detail-list-item-name">{item.type}</div>
                            </li>}
                            </>))}
                        </ul>
                </div>
    
            </div>

        </div>
    );
}