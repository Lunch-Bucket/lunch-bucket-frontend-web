import React, { useState, useEffect } from "react";
import "../../common/styles/CommonStyles.css";
import "./MenuStyles.css";
import "../../components/PopupStyles.css";
import strings from '../../common/strings/strings'
import { getSpecialMenu, setSpecialMealLunch, setSpecialMealDinner, addSpecialFoodItem, deleteFoodItem } from "../../services/menuService";
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
      price:100,
      url:null,
      vegetarian: true,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [applyMealLoading, setApplyMealLoading] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState([]);

    const [friedRiceItemList, setFriedRiceItemList] = useState([]);
    const [biriyaniItemList, setBiriyaniItemList] = useState([]);
    const [kottuItemList, setKottuItemList] = useState([]);
    const [noodleItemList, setNoodleItemList] = useState([]);
    const [pastaItemList, setPastaItemList] = useState([]);
    const [saladItemList, setSaladItemList] = useState([]);
    const [veganItemList, setVeganItemList] = useState([]);
    const [simpleItemList, setSimpleItemList] = useState([]);

    const categoryList = (['Simple and Super','Fried Rice','Noodles','Pasta','Biriyani','Kottu','Vegetarian'])
    
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const [navOnline,setNavOnline] = useState(true)
    

    let friedRiceCategory = []
    let pastaCategory = []
    let BiriyaniCategory = []
    let KottuCategory = []
    let NoodleCategory = []
    let saladCategory = []
    let veganCategory = []
    let simpleCategory = []
  
    const openPopup = (type, message) => {
      setPopupType(type);
      setPopupMessage(message);
      setShowPopup(true);
    };
  

     async function fetchSpecialFood() {
      try {
        const foodDetail = await getSpecialMenu([]);
        setSpecialFoodItem(foodDetail);
        simpleCategory = foodDetail.filter(food => food.category.toLowerCase() === 'simple and super');
        friedRiceCategory = foodDetail.filter(food => food.category.toLowerCase() === 'fried rice');
        BiriyaniCategory = foodDetail.filter(food => food.category.toLowerCase() === 'biriyani');
        KottuCategory = foodDetail.filter(food => food.category.toLowerCase() === 'kottu');
        pastaCategory = foodDetail.filter(food => food.category.toLowerCase() === 'pasta');
        NoodleCategory = foodDetail.filter(food => food.category.toLowerCase() === 'noodles');
        saladCategory = foodDetail.filter(food => food.category.toLowerCase() === 'salads');
        veganCategory = foodDetail.filter(food => food.vegetarian === true);

        setSimpleItemList(simpleCategory)
        setFriedRiceItemList(friedRiceCategory)
        setBiriyaniItemList(BiriyaniCategory)
        setKottuItemList(KottuCategory)
        setNoodleItemList(NoodleCategory)
        setPastaItemList(pastaCategory)
        setSaladItemList(saladCategory)
        setVeganItemList(veganCategory)
   
        setLoading(false);
        console.log('special food detail', foodDetail);
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
         fetchSpecialFood();
     }, []);


  
     const toggleFoodItem = (item_id , item_id_for_delete) => {
      const selectedIndex = selectedFoodItems.indexOf(item_id);  
        if (selectedIndex !== -1) {
          selectedFoodItems.splice(selectedIndex, 1);
        } else {
          selectedFoodItems.push(item_id);
          // setSelectedForDelete(item_id_for_delete);
        }
    console.log('checked special food items: ', selectedFoodItems)
    console.log('checked food items for delete: ', selectedForDelete);
};



// set special meal function
const handleSetSpecialMealLunch = async () => {
  if(selectedFoodItems.length > 0){
    setApplyMealLoading(true);
    try {
      const payload = {
        special: selectedFoodItems 
    };
        const response = await setSpecialMealLunch(payload);
        // console.log('Response from setSpecialMeal:', response);
        setApplyMealLoading(false);
        openPopup('success', 'You have successfully added the selected special foods to Lunch Meal');
    } catch (error) {
        console.log('Error:', error);
        openPopup('error', 'Error Occured! Please retry.')
    }
  }else{
    alert('Please select atleat one food item to proceed!');
  }
};

const handleSetSpecialMealDinner = async () => {
  if(selectedFoodItems.length > 0){
    setApplyMealLoading(true);
    try {
      const payload = {
        special: selectedFoodItems 
    };
        const response = await setSpecialMealDinner(payload);
        setApplyMealLoading(false);
        openPopup('success', 'You have successfully added the selected special foods to Lunch Meal');
    } catch (error) {
        console.log('Error:', error);
        openPopup('error', 'Error Occured! Please retry.')
    }
  }else{
    alert('Please select atleat one food item to proceed!');
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
      setShowProgress(false);
      setShowAddItemModal(false);
      fetchSpecialFood();

  } catch (error) {
      console.log('Error:', error);
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
  const { name, value, type } = event.target;
  const parseValue = (value, type) => {
    if (type === 'number') {
      return parseFloat(value);
    }
    if (name === 'items') {
      return value.split(',').map(item => item.trim());
    }
    if (value === 'false') {
      return false;
    }
    if (value === 'true') {
      return true;
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
      fetchSpecialFood();
  } catch (error) {
      console.log('Error:', error);
  }
};



    return (
        <div className="full-container">
           {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h1 className="menu-title-text">{strings.specialMenu}</h1>  
              <div>
                <button className="header-item-add-button"  onClick={handleSetSpecialMealLunch}>Apply Lunch Meal</button>
                <button className="header-item-add-button"  onClick={handleSetSpecialMealDinner}>Apply Dinner Meal</button>
                <button className="header-item-add-button" style={{border: '2px solid var(--cancel-color)', backgroundColor:'transparent'}}  onClick={()=>{setShowAddItemModal(true)}}>Add Item</button>
                {/* <button className="header-item-add-button" style={{backgroundColor: 'rgb(185, 2, 2)', color: 'white'}} onClick={()=>{setShowDeleteItemModal(true)}} >Delete Item</button> */}
              </div>
            </div>
            <hr/>

            {showAddItemModal &&  <div class="modal-content" style={{width:'auto'}}>
                <span class="close" onClick={()=>{setShowAddItemModal(false)}}>Close</span><br/>
                <form onSubmit={handleAddSpecialFood}>
                <div className="add-menu-item-field"> 
                <label className="add-menu-item-form-label">Item Category</label>
                 <select
                    id="add-menu-item-form-input"
                    name="category"
                    defaultValue="Simple and Super"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categoryList.map((item,id)=>(
                      <option key={id} value={item}>{item}</option>
                    ))}
                    {/* <option value="Noodles">Noodles</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Biriyani">Biriyani</option>
                    <option value="Salads">Salads</option> */}
                  </select>
                </div>
                  <div className="add-menu-item-field"> 
                      <label className="add-menu-item-form-label">Item Name</label>
                      <input
                        type="text"
                        placeholder="Ex: Sea Food Fried Rice"
                        id="add-menu-item-form-input"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="add-menu-item-field"> 
                      <label className="add-menu-item-form-label">Includes</label>
                      <input
                        type="text"
                        placeholder="Ex: Chilli Paste, Sause, Chopsy"
                        id="add-menu-item-form-input"
                        name="items"
                        value={formData.items.join(', ')}
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
                        Add Item
                      </button>
                  </form>
              </div>} 


              {showDeleteItemModal &&  <div class="modal-content delete-confirm">
                  <h4>Are you sure, you want to update the selected items ?</h4>
                  <div>
                    <button class="delete-confirm-btn" onClick={()=>{setShowDeleteItemModal(false)}}>Cancel</button>
                    <button class="delete-confirm-btn" onClick={handleDeleteFood}>Confirm</button>
                  </div>
              </div>}
              {applyMealLoading ? <LoadingIndicator showText="Applying to the Special Meal"/> :
              <div>
              {loading ? <LoadingIndicator showText="Loading Special Foods"/> :
              
            <div className="special-menu-detail-content">
                <h3>Simple and Super</h3>
              <div className="special-menu-detail-content-sub-category">
              {simpleItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>

              <h3>Fried Rice</h3>
              <div className="special-menu-detail-content-sub-category">
              {friedRiceItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>
              <h3>Biriyani</h3>
              <div className="special-menu-detail-content-sub-category">
              {biriyaniItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>
              <h3>Kottu</h3>
              <div className="special-menu-detail-content-sub-category">
              {kottuItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>
              <h3>Noodles</h3>
              <div className="special-menu-detail-content-sub-category">
              {noodleItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>

              <h3>Pasta</h3>
              <div className="special-menu-detail-content-sub-category">
              {pastaItemList?.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <div></div>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>

              <h3>Pure Vegan</h3>
              <div className="special-menu-detail-content-sub-category">
              {veganItemList.map((item,id)=>(
                <div className="special-menu-card" key={id}>
                  <label class="checkbox-container">
                      <input type="checkbox" className="item-checkbox"  
                       checked={item.selected}
                       onChange={() => toggleFoodItem(item.id, item.item_id)}/>
                      <span className="item-checkbox-checkmark"></span>
                  </label>   
                  <div>
                      <center> 
                        <div className="food-item-img-container" style={{height:'8rem', width:'8rem'}}>
                          <img src={item.url} alt="food item" className="food-item-img"/>
                        </div>
                      </center>
                      <h4 className="special-menu-card-item-text" style={{fontSize:'15px', textAlign:'center'}}>{item.type} <br/> <span style={{fontSize:'17px', color:'#591212'}}> Rs. {item.price} </span></h4>
                      <ul style={{listStyle:'square', fontSize:'13px'}}>
                         {item.items.map((sub_item,id)=>( <li className="special-menu-card-item-text">{sub_item}</li>))}
                      </ul>
                  </div>
                </div>
              ))}  
              </div>

           
            </div>}
            
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
            </div>}

        </div>
    );
}
export default withTokenExpirationCheck(SpecialMenuHome);