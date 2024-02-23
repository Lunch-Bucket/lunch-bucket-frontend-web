import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../CommonStyles.css';
import './WinnerStyles.css';
import strings from '../../common/strings/strings'

// Sample Images
import profileImg from '../../resources/images/sample/winnerProfileImg.jpeg';
import giftImg from '../../resources/images/sample/giftPizza.jpg';


export default function WinnerHome()
{
    const[showWinner, setShowWinner] = useState(true);
    const[winnerForm, setWinnerForm] = useState(false);
    const[winnerDetail, seteWinnerDetail] = useState([
        {
            name: 'Charith Asalanka',
            profileImgUrl: profileImg,
            orderCount: 13,
            totalAmount: 'Rs.'+ 5600,
            giftName: 'Pizza Large Cresent',
            giftImgUrl: giftImg,

        }
    ]);

    function handleSubmit()
    {

    }
    
    return(
        <>
         <div className="winner-container">
                {/* Header Bar - Promotion */}
                <div className="header-title-bar">
                    <h1 className="header-title-bar-text">
                        {strings.winner}
                    </h1>
                </div>

                <div className="winner-detail-content">
                    {!showWinner && 
                    
                            <div className="add-winner-input-box" onClick={(e)=>{setWinnerForm(true)}}>
                                <p  className="add-winner-input-box-text">You haven't selected the winner today.</p>
                                <h3  className="add-winner-input-box-text add">Add Today's Winner</h3>
                            </div>

                    }
                    { showWinner &&
                        <>
                        { winnerDetail.map((data,id)=>(
                            <div className="show-winner-detail-content">
                                <div className="winner-detail-content-area">
                                    {/* <img src={data.profileImgUrl} alt="winner image" className="winner-detail-content-img-profile" /> */}
                                    <h4 >{data.name}</h4>
                                    <p>Order Count: {data.orderCount}</p>
                                    <p>Order Amount: {data.totalAmount}</p>
                                    <br/>
                                    <img src={data.giftImgUrl} alt="" className="winner-detail-content-img-gift" />
                                    <h5>{data.giftName}</h5>
                                </div>
                            </div>
                        ))}
                        </>
                    }
                    { winnerForm &&
                        <div className="add-form">
                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">User ID</h4>
                                <input className="add-form-item-input" type="text" />
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Number of Meals</h4>
                                <input className="add-form-item-input" type="text" />
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Prize</h4>
                                <input className="add-form-item-input" type="text" />
                            </div>

                            <div className="add-form-item">
                                <h4 className="add-form-item-label-text">Cover Image</h4>
                                <input className="addform-item-input-img" type="file" />
                            </div>

                            <div className="add-form-item-btn">
                                <button className="add-form-item-btn-submit cancel" onClick={(e)=>{setWinnerForm(false)}}>Cancel</button>
                                <button className="add-form-item-btn-submit" onClick={handleSubmit}>Submit</button>
                            </div>

                            <div style={{height:'5rem'}}></div>
                           
                        </div>
                    }
               
                </div>
        </div>
        </>
    );
}