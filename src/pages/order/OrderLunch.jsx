import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import SearchBar from "../../components/SearchBar";
import { getOrderData } from "../../services/orderService";

export default function OrderHome()
{
    const [orderList, setOrderList] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderStatus, setOrderStatus] = useState("pending")
    let totalSales = 0;

    async function fetchOrderData() {
        try {
            const orderData  = await getOrderData('Lunch');
            setOrderList(orderData);
            console.log('user data in user page', orderList);
            totalSales = orderList.reduce((total, order) => total + order.order_price, 0);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, []);


    function OrderItemChecked(value) {
        if (checkedOrders.includes(value)) {
          setCheckedOrders(checkedOrders.filter(id => id !== value));
        } else {
          setCheckedOrders([...checkedOrders, value]);
        }
      }
    
    function handleOrderStatus(){
        console.log('These orders will be added to the Returned Order List: ', checkedOrders)
        alert('Marked as Returned!')
        setCheckedOrders([]);
    }

    // function orderComponentRenderFunc(orderStatus){
    //     if (condition) {
            
    //     }
    // }

  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#84B35A'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#7E0A0A', color:'white'}} onClick={()=>{setOrderStatus('rejected')}}>Rejected Orders</button>
              </div>
              {/* <SearchBar/> */}
            </div>
            <hr/>

            {/* Pending Order List */}
            {orderStatus === 'pending' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
     
                    <div className="order-total-sales-content">
                        <div className="sales-content-label">Total Sales</div>
                        <div className="sales-content-amount">Rs. {totalSales}</div>
                    </div>
                </div>
                <div>
                    <button className="action-bar-btn" style={{color:'#7E0A0A'}}  onClick={handleOrderStatus}>Confirm Submission</button>
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td>
                                    <lable class="checkbox-container" key={data.order_id}>
                                        <input type="checkbox" className="item-checkbox" 
                                        value={data.order_id} 
                                        checked={checkedOrders.includes(data.order_id)}
                                        onChange={()=>{OrderItemChecked(data.order_id)}}/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </lable>   
                                </td>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type == 'non_vegi'? '#fcfadc':'#ECFFC8'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.items.rice}</li>
                                        <li>{data.items.vege1}</li>
                                        <li>{data.items.vege2}</li>
                                        <li>{data.items.stew}</li>
                                        <li>{data.items.meat}</li>
                                    </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                    
                </div>
                </>    
            }

            {/* Confirmed Order List */}
            {orderStatus === 'confirmed' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
     
                    <div className="order-total-sales-content">
                        <div className="sales-content-label">Total Sales</div>
                        <div className="sales-content-amount">Rs. 4100</div>
                    </div>
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type == 'non_vegi'? '#F7DDA8':'#ECFFC8'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.items.rice}</li>
                                        <li>{data.items.vege1}</li>
                                        <li>{data.items.vege2}</li>
                                        <li>{data.items.stew}</li>
                                        <li>{data.items.meat}</li>
                                    </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                    
                </div>
                </>    
            }

            {/* Rejected Order List */}
            {orderStatus === 'rejected' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
     
                    <div className="order-total-sales-content">
                        <div className="sales-content-label">Total Sales</div>
                        <div className="sales-content-amount">Rs. 4100</div>
                    </div>
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: '#E53B3B'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.items.rice}</li>
                                        <li>{data.items.vege1}</li>
                                        <li>{data.items.vege2}</li>
                                        <li>{data.items.stew}</li>
                                        <li>{data.items.meat}</li>
                                    </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                    
                </div>
                </>    
            }
        </div>
    );
}