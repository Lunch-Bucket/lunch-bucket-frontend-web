import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import strings from '../../common/strings/strings'
import { getSpecialMenu, setSpecialMeal, addSpecialFoodItem } from "../../services/menuService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";

function SpecialMenuHome() {
 
     const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [specialFoodItem, setSpecialFoodItem] = useState([]);
     let selectedFoodItems = []
     const [formData, setFormData] = useState({
      type: '',
      category: '',
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      item5: '',
    });

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
   
  
  const toggleFoodItem = (item_id) => {
    selectedFoodItems.push(item_id)
    console.log('checked special food items: ', selectedFoodItems)
};

const [errors, setErrors] = useState({});

const handleAddSpecialMeal = async () => {
    try {
      const payload = {
        special: selectedFoodItems // Assuming selectedFoodItems is an array of IDs
    };
        const response = await setSpecialMeal(payload);
        console.log('Response from setSpecialMeal:', response);
    } catch (error) {
        console.log('Error:', error);
    }
};

const handleAddSpecialFood = async (event) => {
  event.preventDefault();
  
  try {
      const response = await addSpecialFoodItem(formData); 
      console.log('Response from addSpecialFoodItem:', response);
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


    function handleDeleteFood(){
      
    }
  


    return (
        <div className="full-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.specialMenu}</h1>  
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={handleAddSpecialMeal}>Apply Lunch Meal</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={handleAddSpecialMeal}>Apply Dinner Meal</button>
                <button className="header-item-add-button" onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} disabled={selectedFoodItems.length === 0} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button>
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content">
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddSpecialFood}>
                      
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
                      <label className="add-menu-item-form-label">Category</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      />
                      {errors.category && <div className="error-message">{errors.category}</div>}
                      <br />
                      <label className="add-menu-item-form-label">Item 1</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="item1"
                        value={formData.item1}
                        onChange={handleChange}
                      />
                       <br />
                      <label className="add-menu-item-form-label">Item 2</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="item2"
                        value={formData.item2}
                        onChange={handleChange}
                      />
                      <br />
                      <label className="add-menu-item-form-label">Item 3</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="item3"
                        value={formData.item3}
                        onChange={handleChange}
                      />
                      <br />
                      <label className="add-menu-item-form-label">Item 4</label>
                      <input
                        type="text"
                        id="add-menu-item-form-input"
                        name="item4"
                        value={formData.item4}
                        onChange={handleChange}
                      />
                      <br />
                      <button className="header-item-add-button" type="submit" style={{ float: 'right' }}>
                        Add Special Food Item
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
          
            <div className="special-menu-detail-content">

              {specialFoodItem?.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div >
                      <h5 style={{textAlign:'center'}}>Fried Rice</h5> 
                      <ul>
                          <li className="menu-detail-list-item">{item.type}</li>
                          <li className="menu-detail-list-item">vegetable fried rice</li>
                      </ul>
                  </div>
                </div>
              ))}  
           
            </div>
       

        </div>
    );
}
export default withTokenExpirationCheck(SpecialMenuHome);