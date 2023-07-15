import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import {FaTrashAlt} from "react-icons/fa";
import strings from '../../common/strings/strings'
import {getFoodItem } from "../../services/menuService";

export default function MenuHome() {
 
     const [showAddItemModal, setShowAddItemModal] = useState(false);
     const [foodItem, setfoodItem] = useState([]);

     async function fetchFood() {
      try {
          const foodDetail  = await getFoodItem([]);
          setfoodItem(foodDetail);
          console.log('user data in menu page', foodItem);

      } catch (error) {
          console.log("Error fetching menu data:", error.message);
      }
  }
 
     useEffect(() => {
         fetchFood();
     }, []);
   


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
                <form>
                  <label className="add-menu-item-form-label">Item Category</label>
                  <select type="text" id="add-menu-item-form-input" style={{width:'10rem'}} >
                    <option>Vege</option>
                    <option>Stew</option>
                    <option>Meat</option>
                  </select>
                  <br/>
                    <label className="add-menu-item-form-label">Item Type</label>
                    <input type="text" id="add-menu-item-form-input"/><br/>
                    <label className="add-menu-item-form-label">Description Nutrition</label>
                    <input type="text" id="add-menu-item-form-input"/><br/>
                    <label className="add-menu-item-form-label">Description Goods</label>
                    <input type="text" id="add-menu-item-form-input"/><br/>
                    <label className="add-menu-item-form-label">Item Price</label>
                    <input type="number" id="add-menu-item-form-input"/>
                </form>
                  <button className="header-item-add-button" style={{float:'right'}} onClick={()=>{setShowAddItemModal(false)}}>Add Food Item</button>
              </div>} 
          
            <div className="menu-detail-content">
                <div className="menu-detail-list">
                <div className="menu-detail-list-title">Vegetables</div> 
                        <ul>
                          {foodItem.map((item,id)=>( 
                            <>
                            {item.category == 'vege' && <li className="menu-detail-list-item">
                              <label class="checkbox-container">
                                  <input type="checkbox" className="item-checkbox"/>
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
                                  <input type="checkbox" className="item-checkbox"/>
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
                                  <input type="checkbox" className="item-checkbox"/>
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