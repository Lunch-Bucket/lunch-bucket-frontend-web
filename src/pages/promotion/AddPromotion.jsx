import React, {useState} from "react";
import '../CommonStyles.css';
import { Link } from "react-router-dom";

export default function AddPromotion()
{

    const[name, setName] = useState("");
    const[validFromDate, setValidFromDate] = useState("");
    const[validToDate, setValidToDate] = useState("");
    const[description, setDescription] = useState("");
    const[coverImage, setCoverImage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The user ID you entered was: ${name}`)
      }

    return(
            <div className="container">
                <div className="header-title-bar">
                    <h1 className="header-title-bar-text">
                        Add Promotion
                    </h1>
                </div>
                
                <div className="detail-container">
     
                    <div className="add-form">
                            <div className="promo-id-map-content">
                                <p className="promoName">Promotion#010</p> 
                                <hr/>

                            </div>
                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Name</h4>
                                <input className="add-form-item-input" type="text" />
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Valid Period</h4>
                                <div>
                                    <input className="add-form-item-input input-period" type="date" />
                                    <input className="add-form-item-input input-period" type="time" />
                                    to
                                    <input className="add-form-item-input input-period" type="date" />
                                    <input className="add-form-item-input input-period" type="time" />
                                </div>
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Description</h4>
                                <input className="add-form-item-input input-description" type="textarea" />
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Cover Image</h4>
                                <input className="add-form-item-input-img" type="file" />
                            </div>

                            <div className="add-form-item-btn">
                              <Link to="/promotion"> 
                                <button className="add-form-item-btn-submit cancel" onClick={null}>Cancel</button>
                              </Link> 
                                <button className="add-form-item-btn-submit" onClick={handleSubmit}>Submit</button>
                            </div>

                            <div style={{height:'5rem'}}></div>
                            
                        </div>
                    
                
                    </div>
            </div>
    );
}