import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import SearchBar from "../../components/SearchBar";
import { getOrderData } from "../../services/orderService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";

function OrderHome_Dinner()
{
    const [orderList, setOrderList] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [selectAll, setSelectAll] = useState(false); 
    const [orderStatus, setOrderStatus] = useState("pending")

    async function fetchOrderData() {
        try {
            const orderData  = await getOrderData('Dinner');
            setOrderList(orderData);
            console.log('user data in user page', orderList);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, []);

    const OrderItemChecked = (orderId) => {
        if (checkedOrders.includes(orderId)) {
          setCheckedOrders(checkedOrders.filter((id) => id !== orderId)); // Deselect
        } else {
          setCheckedOrders([...checkedOrders, orderId]); // Select
        }
      };

    function handleOrderStatus(){
        console.log('These orders will be added to Returned Order List: ', checkedOrders)
    }

     // Function to handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedOrders([]); // Deselect all
    } else {
      // Select all by extracting order IDs from the order list
      const allOrderIds = orderList.map((order) => order.order_id);
      setCheckedOrders(allOrderIds);
    }

    setSelectAll(!selectAll); // Toggle the select all state
  };

  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              {/* <SearchBar/> */}
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#84B35A'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#7E0A0A', color:'white'}} onClick={()=>{setOrderStatus('rejected')}}>Rejected Orders</button>
              </div>
            </div>
            <hr/>

             {/* Pending Order List */}
             {orderStatus === 'pending' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
     
                </div>
                <div>
                    <button style={{marginRight:'0.3rem', backgroundColor:'transparent'}}  onClick={handleSelectAll}>
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                    <button className="action-bar-btn-confirm"  onClick={handleOrderStatus}>Confirm</button>
                    <button className="action-bar-btn-cancel"  onClick={handleOrderStatus}>Reject</button>
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td>
                                <label class="checkbox-container" key={data.order_id}>
                                        <input type="checkbox" className="item-checkbox" 
                                        value={data.order_id} 
                                        checked={checkedOrders.includes(data.order_id)}
                                        onChange={()=>{OrderItemChecked(data.order_id)}}/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </label>  
                                </td>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type == 'vegi'? '#ECFFC8':'#fcfadc'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                <ul style={{listStyle:'square'}}>
                                    {data.items.map((food, index) => (
                                        <li key={index}>{food}</li>
                                    ))}
                                </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                </div>
                </>}

                
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
                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type == 'vegi'? '#ECFFC8':'#fcfadc'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                <ul style={{listStyle:'square'}}>
                                    {data.items.map((food, index) => (
                                        <li key={index}>{food}</li>
                                    ))}
                                </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                </div>
                </>}

                
             {/* Rejected Order List */}
             {orderStatus === 'rejected' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
    
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: '#E53B3B'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                </td>
                            </tr>

                            <tr>  
                                <td style={{fontSize:'14px'}}>
                                <ul style={{listStyle:'square'}}>
                                    {data.items.map((food, index) => (
                                        <li key={index}>{food}</li>
                                    ))}
                                </ul>
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                </div>
                </>}

        </div>
    );
}

export default withTokenExpirationCheck(OrderHome_Dinner);