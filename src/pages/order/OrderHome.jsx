import React, {useState, useEffect} from "react";
import "../feedback/FeedbackStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import { BsFillChatFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SearchBar from "../../components/SearchBar";
import { getOrderData } from "../../services/orderService";

export default function OrderHome()
{
    const [orderExpanded, setOrderExpanded] = useState(false);
    const [currItem, setCurrItem] = useState('')

    // const [order, setOrder] = useState([
    //     {
    //         orderID: '0001',
    //         userID: '#0001',
    //         basicInfo:
    //             {
    //                 deliveryAddress: '02/100 Ward Place, Colombo 07',
    //                 userID: '00201',
    //             },
    //         menuInfo:
    //         ([
    //             {id: '1', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'430'},
    //             {id: '2', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '3', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '4', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '5', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //         ]),
    //         price: '1200',
    //         note: 'Special Notes: Hi, I would like to have the 2 meals packed seperately.',
    //         address: 'Temple Rd, Malwana, Gampaha',
    //     },
    //     {
    //         orderID: '0002',
    //         userID: '#0001',
    //         basicInfo:
    //             {
    //                 deliveryAddress: '02/100 Ward Place, Colombo 07',
    //                 userID: '00201',
    //             },
    //         menuInfo:
    //         ([
    //             {id: '1', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'430'},
    //             {id: '2', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '3', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '4', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //             {id: '5', name: 'Menu 1', vege1: "Pumpkin",vege2: 'Polos', vege3: 'Cashew', stew:'Fish stew', meat: 'Egg', orderCount:'4', mealPrice:'400'},
    //         ]),
    //         price: '1200',
    //         note: 'Special Notes: Hi, I would like to have the 2 meals packed seperately.',
    //         address: 'Temple Rd, Malwana, Gampaha',
    //     },
    // ])

    function orderExpand(value){
        setOrderExpanded(!orderExpanded);
        setCurrItem(value);
    }

    const [orderList, setOrderList] = useState([]);

    async function fetchOrderData() {
        try {
            const orderData  = await getOrderData([]);
            setOrderList(orderData);
            console.log('user data in user page', orderList);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, []);
  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              <SearchBar/>
            </div>
            <hr/>
            <div className="action-bar">
                <div style={{display:'flex'}}>
                    <button className="action-bar-btn" onClick={(e)=>{}}>Due</button>
                    <div style={{marginLeft:'2rem'}}>{strings.completedOrder}</div>
                </div>
                <button className="action-bar-btn" onClick={(e)=>{}}>Dispatched</button>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">
                        <thead>
                        </thead>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id} >
                                <td className="order-page-data-row">
                                    <label class="checkbox-container">
                                        <input type="checkbox" className="order-item-checkbox"/>
                                        <span className="order-item-checkbox-checkmark"></span>
                                    </label>   
                                </td>
                                <td className="order-page-data-row" key={id}>{data.order_id}</td>
                                <td className="order-page-data-row" key={id}>{data.customer_id}</td>
                                <td className="order-page-data-row">
                                    <button className="order-page-view-btn" onClick={()=>orderExpand(data.order_id)}>View</button>
                                </td>
                                <td className="order-page-data-row-address">{data.address}</td>
                                <td className="order-page-data-row">{data.packet_amount}</td>
                            </tr>
                           {(orderExpanded && (currItem == data.order_id)) &&<tr>
                            <div className="order-modal" onClick={()=>{setOrderExpanded(!orderExpanded)}}>
                            <div className="modal-header">
                            <button className="order-page-modal-header-chat-btn">
                                <BsFillChatFill size={20}/>
                                <h5 style={{paddingLeft:'0.5rem'}}>Chat</h5>
                            </button>
                        </div>
                        <div className="modal-detail-content">
                            <dl>
                                <React.Fragment>
                                    <dt>Order ID: {data.order_id} </dt>
                                </React.Fragment>
                                <React.Fragment>
                                    <dt>User ID: {data.customer_id} </dt>
                                </React.Fragment>
                                <React.Fragment>
                                    {/* <dt>Delivery Address: {data.basicInfo.deliveryAddress} </dt> */}
                                </React.Fragment>
                                <React.Fragment>
                                    <dt>Special Notes: {data.comment}</dt>
                                </React.Fragment>
                            </dl>
                            
                        </div>

                        <div >
                    
                            <div className="modal-menu-content">
                                <div className="modal-detail-content-nav">
                                    <IoIosArrowBack/>1 of 3<IoIosArrowForward/>
                                </div>
                            {orderList.map((item, id) => ( 
                            <div className="modal-menu-content-card">
                                
                                    <div className="modal-menu-content-card-column-element">
                                        <th>Meal</th><th>Item</th><th>Quantity</th><th>Price(Rs.)</th>
                                    </div>
                                    <div className="modal-menu-content-card-column-element">
                                        <h4 >{item.order_id}</h4>
                                        <ul >
                                            <li>{item.vege1}</li>
                                            <li>{item.vege2}</li>
                                            {/* <li>{item.vege3}</li> */}
                                            <li>{item.stew}</li>
                                            <li>{item.meat}</li>
                                        </ul>
                                        <h5 style={{marginRight:'8vw'}}>{item.order_status}</h5>
                                        <h5 style={{marginRight:'6vw'}}>{item.packet_price}</h5>
                                    </div>
                              
                            </div>
                            ))}
                            </div>
                  
                        </div>
                    </div>
                            </tr>}
                            </>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="order-total-sales-content">
                    <h4 className="sales-content-label">Total Sales</h4>
                    <h4 className="sales-content-amount">Rs. 4100</h4>
                </div>
        </div>
    );
}