import React, {useState} from "react";
import './PromotionStyles.css'
import {AiFillEdit} from "react-icons/ai";
import {FaTrashAlt} from "react-icons/fa";

export default function PromotionHome() {
    const [promoDetail, setPromoDetail] = useState(0);
    const [promotion, setPromotion] = useState([
        {
            id: '0',
            name: 'Valentine Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: 'https://picsum.photos/id/237/200/300'
        },
        {
            id: '1',
            name: 'Daily Deals',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: 'https://picsum.photos/id/237/200/300'
        },
        {
            id: '2',
            name: 'Best Ever Promotion',
            validFrom: '12/02/2023',
            validTo: '12/03/1023',
            description: "The “free gift with purchase” promotion is simple: a customer spends a requisite amount and gets a gift as a thank-you. ",
            imgUrl: ' https://picsum.photos/id/237/200/300'
        },
    ]);

    return (
        <>
            <div className="full-container">
                <div className="promotion-card-display">
                    {promotion.map((item, id) => (
                        <div key={id} className="promotion-card"
                             onClick={() => {
                                 setPromoDetail(item.id)
                             }}
                        >    {item.id}
                        </div>))}
                </div>
                {promotion.map((item, index) => (
                    <div className="promotion-content-display" key={index}>
                        <div className="promotion-content-display-title">
                            <React.Fragment>
                                {item.id}
                                <AiFillEdit size={20}/>
                                <FaTrashAlt size={20}/>
                            </React.Fragment>
                        </div>
                        <div className="promotion-content-display-description">
                            <div>
                                <div><h3>Name</h3>{item.name}</div>
                            </div>
                            <div>
                                <div><h3>Valid Period</h3>{item.validFrom} to {item.validTo}</div>
                            </div>
                            <div>
                                <div><h3>Description</h3> {item.description} </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}