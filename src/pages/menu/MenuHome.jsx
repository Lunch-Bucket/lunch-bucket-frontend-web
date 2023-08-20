import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import strings from '../../common/strings/strings'
import {getFoodItem } from "../../services/menuService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import CryptoJS, {AES} from 'crypto-js';
import {baseUrl} from '../../controllers/baseUrl'

export default function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);

     let selectedFoodItems = []
     const [formData, setFormData] = useState({
      itemCategory: '',
      itemType: '',
      descriptionNutrition: '',
      descriptionGoods: '',
      itemPrice: '',
    });


     async function fetchFood() {
      try {
        const foodDetail = await getFoodItem([]);
        setfoodItem(foodDetail);
        console.log('food data in menu page', foodDetail);
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

    
    // const handleAddFood = async (values, { resetForm }) => {
    //   try {
    //     const encryptedValueString = localStorage.getItem('auth');
    //     const decryptedValue = AES.decrypt(encryptedValueString, 'secret-token').toString(CryptoJS.enc.Utf8);
    //     await axios.post(`${baseUrl}addFood`, values, {
    //       headers: {
    //         'token': decryptedValue
    //       }
    //     });
    //     await fetchFood();

    //     console.log('value:', values);
    //     alert("Successfully Added New Food Item")
    //     resetForm();
        
    //   } catch (error) {
    //     console.log('Error:', error);
    //   }
    //   setShowAddItemModal(false);
    // };

    const [errors, setErrors] = useState({});

    const handleAddFood = (event) => {
      event.preventDefault();
  
      // Perform validation
      let newErrors = {};
      for (const field in formData) {
        if (!formData[field]) {
          newErrors[field] = `${field} is required`;
        }
      }
      setErrors(newErrors);
  
      // If no errors, proceed with adding food
      if (Object.keys(newErrors).length === 0) {
        // Perform adding food logic
        console.log('Food added successfully');
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  

    function handleDeleteFood(){
      
    }
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.menu}</h1>  
              <div >
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{}} disabled={selectedFoodItems.length === 0}>Apply Lunch Meal</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{}} disabled={selectedFoodItems.length === 0}>Apply Dinner Meal</button>
                <button className="header-item-add-button" onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} disabled={selectedFoodItems.length === 0} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button>
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content">
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddFood}>
      <label className="add-menu-item-form-label">Item Category</label>
      <select
        id="add-menu-item-form-input"
        name="itemCategory"
        style={{ width: '10rem' }}
        value={formData.itemCategory}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        <option value="vege">Vege</option>
        <option value="stew">Stew</option>
        <option value="meat">Meat</option>
      </select>
      {errors.itemCategory && <div className="error-message">{errors.itemCategory}</div>}
      <br />
      <label className="add-menu-item-form-label">Item Type</label>
      <input
        type="text"
        id="add-menu-item-form-input"
        name="itemType"
        value={formData.itemType}
        onChange={handleChange}
      />
      {errors.itemType && <div className="error-message">{errors.itemType}</div>}
      <br />
      <label className="add-menu-item-form-label">Description Nutrition</label>
      <input
        type="text"
        id="add-menu-item-form-input"
        name="descriptionNutrition"
        value={formData.descriptionNutrition}
        onChange={handleChange}
      />
      {errors.descriptionNutrition && <div className="error-message">{errors.descriptionNutrition}</div>}
      <br />
      <label className="add-menu-item-form-label">Description Goods</label>
      <input
        type="text"
        id="add-menu-item-form-input"
        name="descriptionGoods"
        value={formData.descriptionGoods}
        onChange={handleChange}
      />
       {errors.descriptionGoods && <div className="error-message">{errors.descriptionGoods}</div>}
      <br />
      <label className="add-menu-item-form-label">Item Price</label>
      <input
        type="number"
        id="add-menu-item-form-input"
        name="itemPrice"
        value={formData.itemPrice}
        onChange={handleChange}
      />
      {errors.itemPrice && <div className="error-message">{errors.itemPrice}</div>}
      <br />
      <button className="header-item-add-button" type="submit" style={{ float: 'right' }}>
        Add Food Item
      </button>
    </form>
              </div>} 

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

                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">Meat</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category == 'meat' && <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked(item.food_id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              <div className="menu-detail-list-item-name">{item.type}</div>
                            </li>}
                            </>))}
                        </ul>
                </div>

                <div className="menu-detail-list">
                <div className="menu-detail-list-title">Stew</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category == 'stew' && <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked(item.food_id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              <div className="menu-detail-list-item-name">{item.type}</div>
                            </li>}
                            </>))}
                        </ul>
                </div>

    
            </div>

        </div>
    );
}