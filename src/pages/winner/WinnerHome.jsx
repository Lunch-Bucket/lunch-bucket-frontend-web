import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../CommonStyles.css';
import './WinnerStyles.css';

// Sample Images
import profileImg from '../../resources/images/sample/winnerProfileImg.jpeg';
import giftImg from '../../resources/images/sample/giftPizza.jpg';


export default function WinnerHome()
{
    const[showWinner, setShowWinner] = useState(true);
    const[winnerDetail, seteWinnerDetail] = useState([
        {
            name: 'Dilini Kulawansa',
            profileImgUrl: profileImg,
            orderCount: 13,
            totalAmount: 'Rs.'+ 5600,
            giftName: 'Pizza Large Cresent',
            giftImgUrl: giftImg,

        }
    ])
    
    return(
        <>
         <div className="container">
                {/* Header Bar - Promotion */}
                <div className="header-title-bar">
                    <h1 className="header-title-bar-text">
                        Daily Winner
                    </h1>
                </div>

                <div className="winner-detail-content">
                    {showWinner && 
                        <Link to="/addWinner">
                            <div className="add-winner-input-box">
                                <p  className="add-winner-input-box-text">You haven't selected the winner today.</p>
                                <h3  className="add-winner-input-box-text add">Add Today's Winner</h3>
                            </div>
                        </Link>
                    }
                    { !showWinner &&
                        <>
                        { winnerDetail.map((data,id)=>(
                            <div className="show-winner-detail-content">
                                <div className="winner-detail-content-area">
                                    <img src={data.profileImgUrl} alt="winner image" className="winner-detail-content-img-profile" />
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
               
                </div>
        </div>
        </>
    );
}