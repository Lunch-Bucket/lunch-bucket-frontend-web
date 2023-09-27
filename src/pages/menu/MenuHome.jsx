import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import "../../components/PopupStyles.css";
import strings from '../../common/strings/strings'
import {getFoodItem, addFoodItem,setMealLunch, setMealDinner, deleteFoodItem } from "../../services/menuService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import Popup from "../../components/Popup";
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
 

function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);
     const [foodList, setFoodList] = useState([]);
     const [showPopup, setShowPopup] = useState(false);
     const [popupType, setPopupType] = useState('');
     const [popupMessage, setPopupMessage] = useState('');
   
     const openPopup = (type, message) => {
       setPopupType(type);
       setPopupMessage(message);
       setShowPopup(true);
     };
   

    //  let selectedFoodItems = []
     const [formData, setFormData] = useState({
      type: '',
      category: '',
      nutrition: '',
      goods: '',
      price: '',
      url: null,
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
      openPopup('success', 'You have successfully added to Lunch Meal');
 
      } catch (error) {
          console.log('Error:', error);
          openPopup('error', 'Error Occured! Please retry.')
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


    // Add Food Item Function
    const handleAddFood = async (event) => {
      event.preventDefault();
      
      try {
        if (formData.imageFile) {
          const imageUrl = await uploadImage(formData.imageFile);
          setFormData((prevData) => ({
            ...prevData,
            url:imageUrl, 
          }));
        }
          const response = await addFoodItem(formData); 
          console.log('Response from addFoodItem:', response);
          setShowAddItemModal(false);

      } catch (error) {
          console.log('Error:', error);
      }
    };

    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          setFormData((prevData) => ({
            ...prevData,
            url:imageUrl, 
          }));
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
    

    const uploadImage = async (imageFile) => {
      try {
        // Generate a unique filename 
        const timestamp = new Date().getTime();
        const imageName = `image_${timestamp}`;
        const storageRef = ref(storage, `images/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
    
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
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

            {showAddItemModal &&  <div class="modal-content" style={{width:'auto'}}>
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddFood}>
                  <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Item Category</label>
                      <select
                        id="add-menu-item-form-input"
                        name="category"
                        style={{ width: '10rem' }}
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option defaultValue="vege">Vege</option>
                        <option value="stew">Stew</option>
                        <option value="meat">Meat</option>
                      </select>
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Item Type</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                    </div>
                      <div className="add-menu-item-field">
                        <label className="add-menu-item-form-label">Item State</label>
                        <select
                          id="add-menu-item-form-input"
                          name="vegetarian"
                          style={{ width: '10rem' }}
                          value={formData.vegetarian}
                          onChange={handleChange}
                        >
                          <option value="true">Vege Item</option>
                          <option value="false">Non-Vege Item</option>
                        </select>
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Description Nutrition</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="nutrition"
                        value={formData.nutrition}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Description Goods</label>
                      <input
                        type="textarea"
                        id="add-menu-item-form-input"
                        name="goods"
                        value={formData.goods}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-menu-item-field">  
                      <label className="add-menu-item-form-label">Item Price (Rs.)</label>
                      <input
                        style={{width:'10rem'}}
                        type="number"
                        id="add-menu-item-form-input"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="add-menu-item-field">  
                      <label className="add-menu-item-form-label">Image</label>
                      <input
                         type="file"
                         accept="image/*"
                         onChange={handleImageUpload}
                        required
                      />
                    </div>
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
                                  <input type="checkbox" className="item-checkbox" 
                                  onClick={()=>{FoodItemChecked('vege', item.id)}}/>
                                  <span className="item-checkbox-checkmark"></span>
                              </label>   
                              < div className="menu-detail-list-item-name">{item.type}</div>
                            </li>
                            <div style={{display:'inline-flex', alignItems:'center',borderBottom:'2px solid #DADADA'}}>
                              <div className="food-item-img-container">
                                <img src={item.url} alt="food item" className="food-item-img" />
                              </div>
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
                            <div style={{display:'inline-flex', alignItems:'center',borderBottom:'2px solid #DADADA'}}>
                              <div className="food-item-img-container">
                                <img src={item.url} alt="food item" className="food-item-img"/>
                              </div>
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
                            <div style={{display:'inline-flex', alignItems:'center',borderBottom:'2px solid #DADADA'}}>
                              <div className="food-item-img-container">
                                <img src={item.url} alt="food item" className="food-item-img" />
                              </div>
                              <h4 style={{paddingLeft:'0.5rem'}}>Rs. {item.price}</h4>
                            </div>
                            </>}
                            </>))}
                        </ul>
                </div>

    
            </div>
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}

        </div>
    );
}

export default withTokenExpirationCheck(MenuHome);