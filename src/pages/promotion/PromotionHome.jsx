import React, {useState,useEffect} from "react";
import './PromotionStyles.css';
import '../CommonStyles.css'
import {AiFillEdit} from "react-icons/ai";
import {FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample Images for promotion card
import promo1 from '../../resources/images/sample/promotion1.jpg'
import promo2 from '../../resources/images/sample/promotion2.jpg'
import promo3 from '../../resources/images/sample/promotion3.jpg'

import strings from '../../common/strings/strings'


export default function PromotionHome() {
    const [promoDetail, setPromoDetail] = useState("0");
    const [promotion, setPromotion] = useState([
        {
            id: '0',
            name: 'Valentine Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo1
        },
        {
            id: '1',
            name: 'Daily Deals',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo2
        },
        {
            id: '2',
            name: 'Best Ever Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo3
        },
        {
            id: '3',
            name: 'Valentine Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo1
        },
        {
            id: '4',
            name: 'Daily Deals',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo2
        },
        {
            id: '5',
            name: 'Best Ever Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: promo3
        },
        
    ]);


    return (
        <>
           <div className="full-container">
                <div className="title-search-content">
                    <h1 className="menu-title-text">{strings.promotion}</h1> 
                    <Link to="/addPromotion">
                        <button className="header-add-button">{strings.addPromotion}</button>
                    </Link>
                </div>
                <hr/>
          
                {/* Promotion Card Content */}
                <div className="promotion-card-display">
                    {promotion.map((item, id) => (
                        <img key={id} className="promotion-card"
                            src={item.imgUrl}
                             onClick={() => {
                                 setPromoDetail(item.id)
                             }}
                        />))}
                </div>

                <div className="promotion-detail">
                {/* Promo detail content according to the promo card */}

                {promotion.map((item, index) => (
                    <>
                    {item.id === promoDetail &&
                    <div  key={index}>
                        <div className="promotion-content-display-title">
                                <h4 style={{textDecoration:'underline'}}>Promotion #{item.id}</h4>
                                <div style={{display:"flex"}}>
                                    <AiFillEdit size={20} className="promotion-content-display-title-icon"/>
                                    <FaTrashAlt size={20} className="promotion-content-display-title-icon"/>
                                    <button className="promotion-content-display-title-icon apply-btn">APPLY</button>
                                </div>
                        </div>
                        <div>
                            <div className="promotion-content-display-description">
                                <h4 className="promotion-content-display-description-text">Name:</h4>
                                <h5 >{item.name}</h5> 
                            </div>
                            <div className="promotion-content-display-description">
                                <h4 className="promotion-content-display-description-text">Item Valid Period:</h4>
                                <h5>{item.validFrom}  to {item.validTo}</h5> 
                            </div>
                            <div className="promotion-content-display-description">
                                <h4 className="promotion-content-display-description-text"> Description:</h4>
                                <h5 >{item.description}</h5> 
                            </div>

                        </div>
                    </div>}
                    </>
                ))}
                </div>
            </div>
        </>
    );
}