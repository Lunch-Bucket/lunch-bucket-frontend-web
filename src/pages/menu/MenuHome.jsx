import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import {FaTrashAlt} from "react-icons/fa";
import strings from '../../common/strings/strings'
import {getFoodItem } from "../../services/menuService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

export default function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
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

    const validationSchema = Yup.object().shape({
      itemCategory: Yup.string().required('Item Category is required'),
      itemType: Yup.string().required('Item Type is required'),
      itemPrice: Yup.number().required('Item Price is required'),
    });
    
    const handleAddFood = async (values, { resetForm }) => {
      try {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdm9keWFwaXVtYW50aGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMTIyMzM0NCIsImNvZGUiOiI2NGIxMTdhM2YwNzY5YjlkMTJlYzVmNzAiLCJleHBpcmUiOjE2ODk2MDMzMzJ9.dZzQ3yMxAqhZRvhahczXsh54uvxY8wIQ7s3FrLDtm64'; 
        await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addFood', values, {
          headers: {
            'token': authToken
          }
        });
        await fetchFood();

        console.log('value:', values);
        alert("Successfully Added New Food Item")
        resetForm();
        
      } catch (error) {
        console.log('Error:', error);
      }
      setShowAddItemModal(false);
    };
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.menu}</h1>  
              <div >
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C', marginRight:'1rem'}} onClick={()=>{}}>Apply Today's Meal</button>
                <button className="header-item-add-button" onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content">
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <Formik 
                  initialValues={{ itemCategory: '', itemType: '', descriptionNutrition: '', descriptionGoods: '', itemPrice: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleAddFood}
                >
                  <Form>
                    <label className="add-menu-item-form-label">Item Category</label>
                    <Field as="select" id="add-menu-item-form-input" name="itemCategory" style={{ width: '10rem' }}>
                      <option value="vege">Vege</option>
                      <option value="stew">Stew</option>
                      <option value="meat">Meat</option>
                    </Field>
                    <ErrorMessage name="itemCategory" component="div" className="error-message" />
                    <br />
                    <label className="add-menu-item-form-label">Item Type</label>
                    <Field type="text" id="add-menu-item-form-input" name="itemType" />
                    <ErrorMessage name="itemType" component="div" className="error-message" /><br />
                    <label className="add-menu-item-form-label">Description Nutrition</label>
                    <Field type="text" id="add-menu-item-form-input" name="descriptionNutrition" /><br />
                    <label className="add-menu-item-form-label">Description Goods</label>
                    <Field type="text" id="add-menu-item-form-input" name="descriptionGoods" /><br />
                    <label className="add-menu-item-form-label">Item Price</label>
                    <Field type="number" id="add-menu-item-form-input" name="itemPrice" />
                    <ErrorMessage name="itemPrice" component="div" className="error-message" />
                    <br />
                    <button className="header-item-add-button" type="submit" style={{float:'right'}}>Add Food Item</button>
                  </Form>
                </Formik>

                 
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
                              <FaTrashAlt size={15} style={{color:'#ECDD70'}}/>
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
                              <FaTrashAlt size={15} style={{color:'#ECDD70'}}/>
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
                              <FaTrashAlt size={15} style={{color:'#ECDD70'}}/>
                            </li>}
                            </>))}
                        </ul>
                </div>

    
            </div>

        </div>
    );
}