import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import { getPendingOrderData, getConfirmedOrderData } from "../../services/orderService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";

function OrderHome()
{
    const [confirmedOrderList, setConfirmedOrderList] = useState([]);
    const [pendingOrderList, setPendingOrderList] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState("pending")
    const [selectAll, setSelectAll] = useState(false); 
    let totalSales = 0;

    async function fetchOrderData() {
        try {
            const confirmedOrderData  = await getConfirmedOrderData('Lunch');
            const pendingOrderData  = await getPendingOrderData('Lunch'); 
            setConfirmedOrderList(confirmedOrderData);
            setPendingOrderList(pendingOrderData);
            console.log('confirmed order data in order', confirmedOrderList);
            console.log('pending order data in order', pendingOrderList);
            totalSales = confirmedOrderList.reduce((total, order) => total + order.order_price, 0);

        } catch (error) {
            console.log("Error fetching order data:", error.message);
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
        console.log('These orders will be added to the Returned Order List: ', checkedOrders)
        alert('Marked as Returned!')
        setCheckedOrders([]);
    }

    // Function to handle select all
  const handleSelectAll = (orderStatus) => {
    if (selectAll) {
      setCheckedOrders([]); 
    } else {
      const allOrderIds = orderStatus.map((order) => order.order_id);
      setCheckedOrders(allOrderIds);
    }

    setSelectAll(!selectAll);
  };


  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#84B35A'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
                {/* <button className="header-item-add-button" style={{backgroundColor:'#7E0A0A', color:'white'}} onClick={()=>{setOrderStatus('rejected')}}>Rejected Orders</button> */}
              </div>
              {/* <SearchBar/> */}
            </div>
            <hr/>

            {/* Pending Order List */}
            {orderStatus === 'pending' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{pendingOrderList.length}</div>
                </div>
                <div>
                    <button style={{marginRight:'0.3rem', backgroundColor:'transparent'}}  onClick={()=>handleSelectAll('pendingOrderList')}>
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                    <button className="action-bar-btn-confirm"  onClick={handleOrderStatus}>Confirm</button>
                    {/* <button className="action-bar-btn-cancel"  onClick={handleOrderStatus}>Reject</button> */}
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {pendingOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td>
                                    <label class="checkbox-container" key={data.order_id}>
                                        <input type="checkbox" className="item-checkbox" 
                                        value={data.order_id} 
                                        checked={checkedOrders.includes(data.order_id)}
                                        onClick={()=>{OrderItemChecked(data.order_id)}}/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </label>   
                                </td>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type === 'vegi'? '#ECFFC8':'#fcfadc'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
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
                </>    
            }

            {/* Confirmed Order List */}
            {orderStatus === 'confirmed' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{confirmedOrderList.length}</div>
     
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
                        {confirmedOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type === 'vegi'? '#ECFFC8':'#fcfadc'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
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
                </>    
            }

            {/* Rejected Order List */}
            {orderStatus === 'rejected' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{confirmedOrderList.length}</div>
     
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
                        {confirmedOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: '#E53B3B'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: (data.threat) === true? 'red': '#004d00'}}>Customer Code: {data.customer_code}</span> 
                                    {/* <br/> Address: University of Moratuwa */}
                                    <br/> Special Notes: {data.comment}
                                    <br/> Packet Count: {data.packet_amount} | Rs.  {data.price}
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
                </>    
            }
        </div>
    );
}

export default withTokenExpirationCheck(OrderHome);