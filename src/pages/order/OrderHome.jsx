import React, {useState} from "react";
import "../feedback/FeedbackStyles.css";
import "./OrderStyles.css";
import { BsFillChatFill } from "react-icons/bs";


export default function OrderHome()
{
    const [showModal, setShowModal] = useState(false);

    const [order, setOrder] = useState([
        {
            orderID: '0001',
            userID: '#0001',
            basicInfo:
                {
                    deliveryAddress: '02/100 Ward Place, Colombo 07',
                    userID: '00201',
                },
            menuInfo:
            ([
                {id: '1', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4'},
                {id: '2', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4'},
                {id: '3', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4'},
                {id: '4', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4'},
                {id: '5', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4'},
            ]),
            price: '1200',
            note: 'Special Notes: Hi, I would like to have the 2 meals packed seperately.',
        },
    ])
  
 
    return(
        <div className="full-container">
                <div className="detail-container">
                    <table className="detail-table">
                        <thead>

                        </thead>
                        <tbody>
                        {order.map((data, id) => (
                            <tr className="data-row" key={id}>
                                <td><input type="checkbox"/> </td>
                                <td key={id}>{data.orderID}</td>
                                <td style={{maxLines:'1', overflow:'clip'}}>{data.price}</td>
                                <td><button onClick={()=>{setShowModal(!showModal)}}>View</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                   { showModal && (
                        <div className="order-modal" onClick={()=>{setShowModal(!showModal)}}>
                        <div className="modal-header">
                            <button className="modal-header-chat"><BsFillChatFill size={30}/> Go to Chat</button>
                        </div>
                        {order.map((data, id) => ( 
                        <div className="modal-detail-content">
                            <dl>
                                <React.Fragment>
                                    <dt>Order ID: {data.orderID} </dt>
                                </React.Fragment>
                                <React.Fragment>
                                    <dt>User ID: {data.userID} </dt>
                                </React.Fragment>
                                <React.Fragment>
                                    <dt>Delivery Address: {data.basicInfo.deliveryAddress} </dt>
                                </React.Fragment>
                                <React.Fragment>
                                    <dt>Special Notes: {data.note}</dt>
                                </React.Fragment>
                            </dl>
                        </div>
                        ))}
                        <div >
                        {order.map((data, id) => (
                            <div className="modal-menu-content">
                            {data.menuInfo.map((item, id) => ( 
                            <div className="modal-menu-content-card">
                                <table>
                                    <tr>
                                        <th>Meal</th><th>Item</th><th>Quantity</th><th>Price(Rs.)</th>
                                    </tr>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>
                                            <ul>
                                                <li>{item.vege1}</li>
                                                <li>{item.vege2}</li>
                                                <li>{item.vege3}</li>
                                                <li>{item.stew}</li>
                                                <li>{item.meat}</li>
                                            </ul>
                                        </td>
                                        <td>{item.orderCount}</td>
                                    </tr>
                                </table>
                            </div>
                            ))}
                            </div>
                         ))}
                        </div>
                    </div>
                    )}
                </div>
        </div>
    );
}