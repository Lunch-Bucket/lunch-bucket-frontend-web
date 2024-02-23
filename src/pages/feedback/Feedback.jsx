import React, {useState} from "react";
import {FaStar} from "react-icons/fa";
import "./FeedbackStyles.css";
import strings from '../../common/strings/strings'



export default function Feedback() {


    const [showOrderDetail, setShowOrderDetail] = useState(false)
    const [currentUser, setCurrentUser] = useState('001')
    const [feedback, setFeedback] =  useState([
        {
            user: '001',
            description: 'The food was good. ',
            rating: '4.0',
            date: '12/02/2023',
            orderInfo:
            ([
                {
                    menuID: '01',
                    menuItems:  ( ["Pumpkin",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '02',
                    menuItems:  ( ["Dhal",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '03',
                    menuItems:  ( ["Cucumber",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
            ]),
        },
        {
            user: '002',
            description: 'The food was good.',
            rating: '4.5',
            date: '12/02/2023',
            orderInfo:
            ([
                {
                    menuID: '01',
                    menuItems:  ( ["Pumpkin",'Polos','Cashew','Fish stew','Egg','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '02',
                    menuItems:  ( ["Dhal",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '03',
                    menuItems:  ( ["Cucumber",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
            ]),
        },
        {
            user: '003',
            description: 'The food was good.',
            rating: '4.5',
            date: '12/02/2023',
            orderInfo:
            ([
                {
                    menuID: '01',
                    menuItems:  ( ["Pumpkin",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '02',
                    menuItems:  ( ["Dhal",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '03',
                    menuItems:  ( ["Cucumber",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
            ]),
        },
        {
            user: '004',
            description: 'The food was good.',
            rating: '4.5',
            date: '12/02/2023',
            orderInfo:
            ([
                {
                    menuID: '01',
                    menuItems: ["Pumpkin",'Polos','Cashew','Fish stew','Egg'],
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1600
                
                },
                {
                    menuID: '01',
                    menuItems: ["Pumpkin",'Polos','Cashew','Fish stew','Egg'],
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '01',
                    menuItems: ["Pumpkin",'Polos','Cashew','Fish stew','Egg'],
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '01',
                    menuItems: ["Pumpkin",'Polos','Cashew','Fish stew','Egg'],
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1800
                
                },
            ]),
        },
        {
            user: '005',
            description: 'The food was good.',
            rating: '4.5',
            date: '12/02/2023',
            orderInfo:
            ([
                {
                    menuID: '01',
                    menuItems:  ( ["Pumpkin",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1500
                
                },
                {
                    menuID: '02',
                    menuItems:  ( ["Dhal",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
                {
                    menuID: '03',
                    menuItems:  ( ["Cucumber",'Polos','Cashew','Fish stew','Egg']),
                    orderCount: 4,
                    mealPrice: 'Rs'+ 1400
                
                },
            ]),
        },
    ]);

    function ShowOrderHandle(user){
        setCurrentUser(user);
        setShowOrderDetail(!showOrderDetail);
        console.log("Ans"+ currentUser )
    }

    return (

        <div className="feedback-container">
            <h1 className="title">{strings.feedback}</h1>
            <hr/>
            <div className="feedback-detail-content">
                <table className="detail-table">
              
                    <tbody>
                    {feedback.map((data, index) => (
                        <>
                        <tr className="data-row" key={index}>
                            <td className="user">{data.user}</td>
                            <td className="description">{data.description}</td>
                            <td className="rating">
                                <FaStar className="starIcon"/>{data.rating}</td>
                            <td>
                                <button className="menu" onClick={(e)=>ShowOrderHandle(data.user)}>View Order</button>
                            </td>
                            <td className="date">{data.date}</td>
                        </tr>

                        { showOrderDetail && currentUser === (data.user) &&
    
                            <div className="feedback-order-detail-content">
                            { data.orderInfo.map((item,id) => (
                                <div className="feedback-order-detail-content-card">
                                    <h3>{item.menuID}</h3>
                                    <ul className="feedback-order-detail-content-card-menu">
                                        {item.menuItems.map((singleItem,id)=>(
                                            <li className="feedback-order-detail-content-card-menu-item">{singleItem}</li>
                                        ))}
                                    </ul>
                                    <h4>{item.orderCount}</h4>
                                    <h4>{item.mealPrice}</h4>
                                </div>
                            ))}
                            </div>
                        }
                             
                        
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}