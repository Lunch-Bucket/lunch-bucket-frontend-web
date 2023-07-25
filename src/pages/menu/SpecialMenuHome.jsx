import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import {FaTrashAlt} from "react-icons/fa";
import strings from '../../common/strings/strings'
import { getSpecialMenu } from "../../services/menuService";

export default function SpecialMenuHome() {
 
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [specialFoodItem, setSpecialFoodItem] = useState([]);

     let selectedFoodItems = []


     async function fetchSpecialFood() {
      try {
        const foodDetail = await getSpecialMenu([]);
        setSpecialFoodItem(foodDetail);
        console.log('special food detail', foodDetail);
      } catch (error) {
        console.log('Error fetching menu data:', error.message);
      }
    }
 
     useEffect(() => {
         fetchSpecialFood();
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
          
            <div className="special-menu-detail-content">

                <div className="special-menu-card">
                    <label class="checkbox-container">
                        <input type="checkbox" className="item-checkbox"  onClick={()=>{FoodItemChecked()}}/>
                        <span className="item-checkbox-checkmark"></span>
                    </label>   
                    <div >
                        <h5 style={{textAlign:'center'}}>Fried Rice</h5> 
                        <ul>
                            <li className="menu-detail-list-item">vegetable fried rice</li>
                            <li className="menu-detail-list-item">vegetable fried rice</li>
                        </ul>
                    </div>
                </div>
           
            </div>
       

        </div>
    );
}