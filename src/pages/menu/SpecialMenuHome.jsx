import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import "../../components/PopupStyles.css";
import strings from '../../common/strings/strings'
import { getSpecialMenu, setSpecialMealLunch, addSpecialFoodItem } from "../../services/menuService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import Popup from "../../components/Popup";
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import LoadingIndicator from "../../components/LoadingIndicator";

function SpecialMenuHome() {
 
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [specialFoodItem, setSpecialFoodItem] = useState([]);
     let selectedFoodItems = []
     const [formData, setFormData] = useState({
      type: '',
      category: '',
      items: [],
      price:0,
      url:null,
      vegetarian:''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(true);
  
    const openPopup = (type, message) => {
      setPopupType(type);
      setPopupMessage(message);
      setShowPopup(true);
    };
  

     async function fetchSpecialFood() {
      try {
        const foodDetail = await getSpecialMenu([]);
        setSpecialFoodItem(foodDetail);
        setLoading(false);
        console.log('special food detail', foodDetail);
      } catch (error) {
        console.log('Error fetching menu data:', error.message);
      }
    }
 
     useEffect(() => {
         fetchSpecialFood();
     }, []);
   
  
  const toggleFoodItem = (item_id) => {
    selectedFoodItems.push(item_id)
    console.log('checked special food items: ', selectedFoodItems)
};

const [errors, setErrors] = useState({});


// set special meal function
const handleSetSpecialMealLunch = async () => {
    try {
      const payload = {
        special: selectedFoodItems 
    };
        const response = await setSpecialMealLunch(payload);
        console.log('Response from setSpecialMeal:', response);
        openPopup('success', 'You have successfully added the selected special foods to Lunch Meal');
    } catch (error) {
        console.log('Error:', error);
        openPopup('error', 'Error Occured! Please retry.')
    }
};

const handleSetSpecialMealDinner = async () => {
  try {
    const payload = {
      special: selectedFoodItems
  };
      const response = await setSpecialMealLunch(payload);
      console.log('Response from setSpecialMeal:', response);
  } catch (error) {
      console.log('Error:', error);
  }
};


// Add Special Food Function
const handleAddSpecialFood = async (event) => {
  event.preventDefault();
  
  try {
    if (formData.imageFile) {
      const imageUrl = await uploadImage(formData.imageFile);
      setFormData((prevData) => ({
        ...prevData,
        url:imageUrl, 
      }));
    }
      const response = await addSpecialFoodItem(formData); 
      console.log('Response from addSpecialFoodItem:', response);
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


    function handleDeleteFood(){
      
    }
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.specialMenu}</h1>  
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={handleSetSpecialMealLunch}>Apply Lunch Meal</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={handleSetSpecialMealDinner}>Apply Dinner Meal</button>
                <button className="header-item-add-button" onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button>
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content" style={{width:'auto'}}>
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddSpecialFood}>
                <div className="add-menu-item-field"> 
                      <label className="add-menu-item-form-label">Category</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      />
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
                      <label className="add-menu-item-form-label">Sub Items</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="items"
                        value={formData.items}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="add-menu-item-field"> 
                      <label className="add-menu-item-form-label">Price (Rs.)</label>
                      <input
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
                    
                      <br />
                      <button className="header-item-add-button" type="submit" style={{ float: 'right' }}>
                        Add Item
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
              {loading ? <LoadingIndicator/> :
            <div className="special-menu-detail-content">

              {specialFoodItem?.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                     <h3 className="special-menu-card-item-text" style={{textAlign:'center'}}>{item.category}</h3> 
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px'}}>{item.type} <br/> Rs. {item.price}</h4>
                      <ul style={{listStyle:'none', textAlign:'left', fontSize:'13px'}}>
                          <li className="special-menu-card-item-text">{item.items}</li>
                      </ul>
                  </div>
                </div>
              ))}  
           
            </div>}
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}

        </div>
    );
}
export default withTokenExpirationCheck(SpecialMenuHome);