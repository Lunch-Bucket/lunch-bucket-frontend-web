import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import strings from '../../common/strings/strings'
import {getFoodItem, addFoodItem,setMealLunch, setMealDinner, deleteFoodItem } from "../../services/menuService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import foodImg from '../../resources/images/cheesepasta.jpg';

function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);
     const [foodList, setFoodList] = useState([]);

    //  let selectedFoodItems = []
     const [formData, setFormData] = useState({
      type: '',
      category: '',
      nutrition: '',
      goods: '',
      price: '',
      url: '',
      vegetarian: '',
    });

    const selectedFoodItems = {
      meat: [],
      stew: [],
      vege: []
  };
  


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

     function FoodItemChecked(category, item_id) {
      const newItem = { number: selectedFoodItems[category].length + 1, id: item_id };
      selectedFoodItems[category].push(newItem);
  
      console.log('checked food items: ', selectedFoodItems);
  }

  // set meal function
    const handleSetMealLunch = async () => {

      try {
        const payload = {
          "meat": [...selectedFoodItems.meat],
          "stew": [...selectedFoodItems.stew],
          "vege": [...selectedFoodItems.vege]
        };

      const response = await setMealLunch(payload);
      console.log('Response from set Meal Lunch:', response);
      selectedFoodItems.meat = [];
      selectedFoodItems.stew = [];
      selectedFoodItems.vege = [];
 
      } catch (error) {
          console.log('Error:', error);
      }
    };

    const handleSetMealDinner = async () => {
      try {
        const payload = {
          "meat": [...selectedFoodItems.meat],
          "stew": [...selectedFoodItems.stew],
          "vege": [...selectedFoodItems.vege]
        };

      const response = await setMealDinner(payload);
      console.log('Response from set Meal Dinner:', response);
      selectedFoodItems.meat = [];
      selectedFoodItems.stew = [];
      selectedFoodItems.vege = [];
 
      } catch (error) {
          console.log('Error:', error);
      }
    };

    const [errors, setErrors] = useState({});

    const handleAddFood = async (event) => {
      event.preventDefault();
      
      try {
          const response = await addFoodItem(formData); 
          console.log('Response from addFoodItem:', response);
          setShowAddItemModal(false);

      } catch (error) {
          console.log('Error:', error);
      }
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  

    const handleDeleteFood = async () => {
      const selectedFoodItems = foodList.filter(foodItem => foodItem.selected);
      // if (selectedFoodItems.length === 0) {
      //     return;
      // }
  
      const selectedFoodIds = selectedFoodItems.map(foodItem => foodItem.food_id);
      setShowDeleteItemModal(false)
  
      try {
          await deleteFoodItem(selectedFoodIds);
          setFoodList(prevFoodList => {
              return prevFoodList.filter(foodItem => !foodItem.selected);
          });
      } catch (error) {
          console.log('Error:', error);
      }
  };
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.menu}</h1>  
              <div >
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}}  onClick={handleSetMealLunch}>Apply Lunch Meal</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}}  onClick={handleSetMealDinner}>Apply Dinner Meal</button>
                <button className="header-item-add-button" onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button>
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content">
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddFood}>
                      <label className="add-menu-item-form-label">Item Category</label>
                      <select
                        id="add-menu-item-form-input"
                        name="category"
                        style={{ width: '10rem' }}
                        value={formData.category}
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
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      />
                      {errors.itemType && <div className="error-message">{errors.itemType}</div>}
                      <br />
                      <label className="add-menu-item-form-label">Description Nutrition</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="nutrition"
                        value={formData.nutrition}
                        onChange={handleChange}
                      />
                      {errors.descriptionNutrition && <div className="error-message">{errors.descriptionNutrition}</div>}
                      <br />
                      <label className="add-menu-item-form-label">Description Goods</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="goods"
                        value={formData.goods}
                        onChange={handleChange}
                      />
                      {errors.descriptionGoods && <div className="error-message">{errors.descriptionGoods}</div>}
                      <br />
                      <label className="add-menu-item-form-label">Item Price</label>
                      <input
                        type="number"
                        id="add-menu-item-form-input"
                        name="price"
                        value={formData.price}
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
                            {item.category === 'vege' && <>
                            <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked('vege', item.id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              < div className="menu-detail-list-item-name">{item.type}</div>
                            </li>
                            <div style={{display:'inline-flex', alignItems:'center'}}>
                              <img src={foodImg} alt="food item" style={{height:'7rem', width:'7rem', objectFit:'contain'}} />
                              <h4 style={{paddingLeft:'0.5rem'}}>Rs. {item.price}</h4>
                            </div>
                            </>}
                            </>))}
                        </ul>
                </div>

                <div className="menu-detail-list">
                    <div className="menu-detail-list-title">Meat</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category === 'meat' && <>
                            <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked('meat', item.id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              <div className="menu-detail-list-item-name">{item.type}</div>
                            </li>
                            <div style={{display:'inline-flex', alignItems:'center'}}>
                              <img src={foodImg} alt="food item" style={{height:'7rem', width:'7rem', objectFit:'contain'}} />
                              <h4 style={{paddingLeft:'0.5rem'}}>Rs. {item.price}</h4>
                            </div>
                            </>}
                            </>))}
                        </ul>
                </div>

                <div className="menu-detail-list" style={{borderRight:'none'}}>
                <div className="menu-detail-list-title">Stew</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category == 'stew' && <>
                            <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked('stew', item.id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              <div className="menu-detail-list-item-name">{item.type}</div>
                            </li>
                            <div style={{display:'inline-flex', alignItems:'center'}}>
                              <img src={foodImg} alt="food item" style={{height:'7rem', width:'7rem', objectFit:'contain'}} />
                              <h4 style={{paddingLeft:'0.5rem'}}>Rs. {item.price}</h4>
                            </div>
                            </>}
                            </>))}
                        </ul>
                </div>

    
            </div>

        </div>
    );
}

export default withTokenExpirationCheck(MenuHome);