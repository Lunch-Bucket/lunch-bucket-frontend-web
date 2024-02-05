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
import LoadingIndicator from "../../components/LoadingIndicator";
 

function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);
     const [showPopup, setShowPopup] = useState(false);
     const [popupType, setPopupType] = useState('');
     const [popupMessage, setPopupMessage] = useState('');
     const [loading, setLoading] = useState(true);
     const [applyMealLoading, setApplyMealLoading] = useState(false);
     const [selectedForDelete, setSelectedForDelete] = useState([]);
     const [navOnline,setNavOnline] = useState(true)
     const [showProgress, setShowProgress] = useState(false);
     const [progress, setProgress] = useState(0);
   
     const openPopup = (type, message) => {
       setPopupType(type);
       setPopupMessage(message);
       setShowPopup(true);
     };
   

     const [formData, setFormData] = useState({
      type: '',
      category: 'vege',
      nutrition: '',
      goods: '',
      price: 20,
      url: null,
      vegetarian: true,
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
        setLoading(false);
      } catch (error) {
        console.log('Error fetching menu data:', error.message);
      }
    }

    useEffect(() => {
      if(navigator.onLine){
          setNavOnline(true);
      }else{
          setNavOnline(false);
      }
  }, [navigator.onLine]);

 
     useEffect(() => {
      if(navOnline)
         fetchFood();
     }, []);



function FoodItemChecked (category, id, item_id_for_delete ) {
  const categoryItems = [...selectedFoodItems[category]]; 

  const selectedIndex = categoryItems.indexOf(id);
  if (selectedIndex !== -1) {
    categoryItems.splice(selectedIndex, 1);
  } else {
    categoryItems.push(id);
    // setSelectedForDelete(item_id_for_delete);
  }
  selectedFoodItems[category] = categoryItems;
  console.log('checked food items: ', selectedFoodItems);
  // console.log('checked food items for delete: ', selectedForDelete);
};


  // set meal function
    const handleSetMealLunch = async () => {
      const buttonElement = document.getElementById('header-item-add-button');
      if((selectedFoodItems['vege'].length + selectedFoodItems['meat'].length + selectedFoodItems['stew'].length) >= 4){
        setApplyMealLoading(true);
        try {
          const payload = {
            "meat": selectedFoodItems.meat.map(item => {
              const quantity = selectedFoodItems.meat.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            }),
            "stew": selectedFoodItems.stew.map(item => {
              const quantity = selectedFoodItems.stew.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            }),
            "vege": selectedFoodItems.vege.map(item => {
              const quantity = selectedFoodItems.vege.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            })
          };
          

        const response = await setMealLunch(payload);
        console.log('Response from set Meal Lunch:', response);
        setApplyMealLoading(false);
        openPopup('success', 'You have successfully added to Lunch Meal');
        fetchFood();
        buttonElement.blur();
  
        } catch (error) {
            console.log('Error:', error);
            openPopup('error', 'Error Occured! Please retry.')
            buttonElement.blur();
        }
      }else{
        alert('Please select atleat four food items to proceed!');
        buttonElement.blur();
      }
    };

    const handleSetMealDinner = async () => {
      const buttonElement = document.getElementById('header-item-add-button');
      if((selectedFoodItems['vege'].length + selectedFoodItems['meat'].length + selectedFoodItems['stew'].length) >= 4){
        setApplyMealLoading(true);
        try {
          const payload = {
            "meat": selectedFoodItems.meat.map(item => {
              const quantity = selectedFoodItems.meat.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            }),
            "stew": selectedFoodItems.stew.map(item => {
              const quantity = selectedFoodItems.stew.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            }),
            "vege": selectedFoodItems.vege.map(item => {
              const quantity = selectedFoodItems.vege.filter(i => i === item).length;
              return { "number": quantity, "id": item };
            })
          };      

        const response = await setMealDinner(payload);
        console.log('Response from set Meal Dinner:', response);
        setApplyMealLoading(false);
        openPopup('success', 'You have successfully added to Dinner Meal');
        fetchFood();
        buttonElement.blur();
  
        } catch (error) {
            console.log('Error:', error);
            openPopup('error', 'Error Occured! Please retry.')
            buttonElement.blur();
        }
      }else{
        alert('Please select atleat four food items to proceed!');
        buttonElement.blur();
      }
    };



    // Add Food Item Function
    const handleAddFood = async (event) => {
      const buttonElement = document.getElementById('header-item-add-button');
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
          setShowProgress(false);
          fetchFood();
          buttonElement.blur();

      } catch (error) {
          console.log('Error:', error);
          buttonElement.blur();
      }
    };

    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          setShowProgress(true);
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
        uploadTask.on('state_changed', (snapshot) => {
          const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 50;
          setProgress(newProgress);
          setProgress(newProgress+50);
          console.log(`Upload is ${progress}% done`);
        });
    
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    };
    

    const handleChange = (event) => {
      const { name, value , type} = event.target;

      const parseValue = (value, type) => {
        if (type === 'number') {
          return parseFloat(value);
        } 
          return value;
      };


      setFormData((prevData) => ({
        ...prevData,
        [name]: parseValue(value, type),
      }));
    };
  

    const handleDeleteFood = async () => {
      console.log("selected for delete", selectedForDelete)
      setShowDeleteItemModal(false)
  
      try {
          const response = await deleteFoodItem(selectedForDelete);
          console.log('Response from delete item:', response);
          fetchFood();
      } catch (error) {
          console.log('Error:', error);
      }
  };
  


    return (
        <div className="full-container">
           {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.menu}</h1>  
              <div>
                <button id="header-item-add-button"  onClick={handleSetMealLunch}>Apply Lunch Meal</button>
                <button id="header-item-add-button"  onClick={handleSetMealDinner}>Apply Dinner Meal</button>
                <button id="header-item-add-button" style={{border: '2px solid var(--cancel-color)', backgroundColor:'transparent'}}  onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                {/* <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button> */}
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
                        defaultValue="vege"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="vege">Vege</option>
                        <option value="stew">Stew</option>
                        <option value="meat">Meat</option>
                      </select>
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Item Name</label>
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
                        <label className="add-menu-item-form-label">Vege or Non-vege</label>
                        <select
                          id="add-menu-item-form-input"
                          name="vegetarian"
                          style={{ width: '10rem' }}
                          defaultValue={true}
                          value={formData.vegetarian}
                          onChange={handleChange}
                        >
                          <option value={true}>Vege Item</option>
                          <option value={false}>Non-Vege Item</option>
                        </select>
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Nutritions</label>
                      <input
                        type="text"
                        placeholder="Ex: Protein, Energy"
                        id="add-menu-item-form-input"
                        name="nutrition"
                        value={formData.nutrition}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-menu-item-field">
                      <label className="add-menu-item-form-label">Ingredients</label>
                      <input
                        type="textarea"
                        placeholder="Ex: Onion, Chopped Chicken, Cheese"
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
                    {showProgress &&<div>
                    <progress value={progress} max={100}></progress>
                      <div>{Math.round(progress)}% done</div>
                    </div>}

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
              {applyMealLoading ? <LoadingIndicator showText="Applying to the Meal"/> :
              <div>
              {loading ? <LoadingIndicator showText="Loading"/> :
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
                                  onClick={()=>{FoodItemChecked('vege', item.id, item.food_id)}}/>
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
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked('meat', item.id, item.food_id)}}/>
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
                                  <input type="checkbox" className="item-checkbox" onClick={()=>{FoodItemChecked('stew', item.id, item.food_id)}}/>
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
    
            </div>}
            
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
            </div>}
        </div>
    );
}

export default withTokenExpirationCheck(MenuHome);