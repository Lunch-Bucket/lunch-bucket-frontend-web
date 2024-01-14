import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import SearchBar from "../../components/SearchBar";
import { getPendingOrderData, getConfirmedOrderData, confirmOrderData , generateReport} from "../../services/orderService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import LoadingIndicator from "../../components/LoadingIndicator";

function OrderHome_Dinner()
{
    const [confirmedOrderList, setConfirmedOrderList] = useState([]);
    const [pendingOrderList, setPendingOrderList] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [selectAll, setSelectAll] = useState(false); 
    const [orderStatus, setOrderStatus] = useState("pending");
    const [pendingOrderLoading, setPendingOrderLoading] = useState(true);
    const [confirmOrderLoading, setConfirmOrderLoading] = useState(true);
    const [confirmFuncLoading, setConfirmFuncLoading] = useState(false);
    let totalSales = 0;

    async function fetchOrderData() {
        try {
            const confirmedOrderData  = await getConfirmedOrderData('Dinner');
            const pendingOrderData  = await getPendingOrderData('Dinner');
            let pendingOrderData_ =  []
            for (const element of pendingOrderData) {
                console.log(element);
                element.selected = false
                pendingOrderData_.push(element)
              }
            setConfirmedOrderList(confirmedOrderData);
            setConfirmOrderLoading(false);
            setPendingOrderList(pendingOrderData_);
            setPendingOrderLoading(false);
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

    const OrderItemChecked = async (orderId) => {
        if (checkedOrders.includes(orderId)) {
          setCheckedOrders(checkedOrders.filter((id) => id !== orderId)); // Deselect
          let pendingOrderData_ =  []
            for (const element of pendingOrderList) {
                console.log(element);
                if(element.id === orderId){
                    element.selected = false
                }
                pendingOrderData_.push(element)
              }
          setPendingOrderList(pendingOrderData_);
        } else {
          setCheckedOrders([...checkedOrders, orderId]); // Select
          let pendingOrderData_ =  []
            for (const element of pendingOrderList) {
                console.log(element);
                if(element.id === orderId){
                    element.selected = true
                }
                pendingOrderData_.push(element)
              }
          setPendingOrderList(pendingOrderData_);
          console.log("select all",checkedOrders)
        }
      };
    


      const handleOrderStatus = async (orderStatus) =>{
        if (orderStatus === 'confirm'){
            setConfirmFuncLoading(true);
            if(checkedOrders.length > 0){
                try {
                    const payload = {
                      "confirmOrders": checkedOrders,
                      "rejectOrders" : [],
                    };
            
                  const response = await confirmOrderData(payload);
                  setConfirmFuncLoading(false);
                  console.log('confirm orders component', response);
                  alert('Marked as Confirmed!');
                  setCheckedOrders([]);
                  window.location.reload();
                  } catch (error) {
                      console.log('Error:', error);
                      setConfirmOrderLoading(false);
                  }
            }
            else{
                alert('Please select orders to confirm!');
            }
           
        }
        else{
            if(checkedOrders.length > 0){
                try {
                    const payload = {
                    "confirmOrders": [],
                    "rejectOrders" : checkedOrders,
                    };
            
                const response = await confirmOrderData(payload);
                console.log('rejected orders component', response);
                //   setLoading(false);
                alert('Marked as Rejected!');
                setCheckedOrders([]);
                window.location.reload();
                } catch (error) {
                    console.log('Error:', error);
                }
            }else{
                alert('Please select atleat one order to reject!');
            }

        }
  
    }

    // Function to handle select all
    const handleSelectAll = () => {
        if (selectAll) {
          setCheckedOrders([]);
          setSelectAll(false)
          let pendingOrderData_ =  []
            for (const element of pendingOrderList) {
                console.log(element);
                element.selected = false
                pendingOrderData_.push(element)
            }
        setPendingOrderList(pendingOrderData_) 
        } else {
          const allOrderIds = pendingOrderList.map((order) => order.id);
          setCheckedOrders(allOrderIds)
          setSelectAll(true)
          let pendingOrderData_ =  []
            for (const element of pendingOrderList) {
                console.log(element);
                element.selected = true
                pendingOrderData_.push(element)
            }
          setPendingOrderList(pendingOrderData_)
        }
      };
    
      useEffect(() => {
        console.log("select all ", checkedOrders);
      }, [checkedOrders]);
    
      const generateReport_ = async () => {
        alert("Please wait a while, Your report is generating")
        const pendingOrderData  = await generateReport('Dinner'); 
      }
  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              {/* <SearchBar/> */}
              <div>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF9C'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#84B35A'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
                <button className="header-item-add-button" style={{backgroundColor:'#FFEF6C'}} onClick={()=>{generateReport_()}}>Generate Report</button>
                {/* <button className="header-item-add-button" style={{backgroundColor:'#7E0A0A', color:'white'}} onClick={()=>{setOrderStatus('rejected')}}>Rejected Orders</button> */}
              </div>
            </div>
            <hr/>

             {/* Pending Order List */}
             {orderStatus === 'pending' &&<>
            <div className="action-bar">
                <div style={{display:'flex'}}>
                    <div>Total Order Count:</div>
                    <div style={{marginLeft:'0.1rem'}}>{pendingOrderList.length}</div>

                    <div style={{marginLeft:'2rem', fontWeight:'bold'}}>Filter By Time</div>
                    <select style={{marginLeft:'1rem'}}
                    defaultValue='all'>
                        <option value='all'>ALL</option>
                        <option value='slot_1'>07.00 AM</option>
                        <option value='slot_2'>08.00 PM</option>
                    </select>

                    <div style={{marginLeft:'2rem', fontWeight:'bold'}}>Filter By Place</div>
                    <select style={{marginLeft:'1rem'}}
                    defaultValue='all'>
                        <option value='all'>ALL</option>
                        <option value='front'>FRONT</option>
                        <option value='back'>BACK</option>
                    </select>
                </div>
                <div>
                    <button style={{marginRight:'0.3rem', backgroundColor:'transparent', border:'none'}}  onClick={handleSelectAll}>
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                    <button className="action-bar-btn-confirm"  onClick={()=>handleOrderStatus('confirm')}>Confirm</button>
                    <button className="action-bar-btn-cancel"  onClick={()=>handleOrderStatus('reject')}>Reject</button>
                </div>
            </div>
            <hr/> 
            {confirmFuncLoading && <LoadingIndicator/>}
            {/* Pending Order List */}
            {pendingOrderLoading ? <LoadingIndicator/> :
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {pendingOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td>
                                <label class="checkbox-container" key={data.id}>
                                        <input type="checkbox" className="item-checkbox" 
                                        value={data.id} 
                                        checked={data.selected}
                                        onChange={()=>{OrderItemChecked(data.id)}}/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </label>  
                                </td>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.threat === true? '#FBEDED':'#FFFFF5'}}>
                                    <div>
                                        <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>  Customer Code: {data.customer_code} <br/>  Order Code: {data.order_code} </span> 
                                        {data.order_type === "special" && <span style={{height:'1.2rem', width:'1.2rem',marginRight:'0.4rem', backgroundColor: '#970050', float:'right'}}></span>}
                                        <div style={{height:'1.2rem', width:'1.2rem',marginRight:'0.4rem', backgroundColor: data.order_type === 'vegi'? 'green':'', float:'right'}}></div>
                                    </div>
                                    {/* <br/> Address: University of Moratuwa */}
                                    Packet Count: {data.packet_amount} 
                                    <br/> 
                                    {!data.order_type === "special" && data.comment  && <span style={{fontWeight:'400'}}> Note: {data.comment}</span>}
                                </td>
                            </tr>

                            <tr>  
                            <td style={{fontSize:'14px'}}>
                                    { data.order_type != "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        {data.items.map((food, index) => (
                                            <li key={index}>{food}</li>
                                        ))}
                                    </ul>
                                    }
                                    { data.order_type === "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.category}</li>
                                        <li>{data.type}</li>
                                    </ul>
                                    }
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                </div>}
                </>}

                
             {/* Confirmed Order List */}
             {orderStatus === 'confirmed' &&<>
            <div className="action-bar">
            <div style={{display:'flex'}}>
                    <div>Total Confirmed Order Count:</div>
                    <div style={{marginLeft:'0.1rem'}}>{confirmedOrderList.length}</div>

                    <div style={{marginLeft:'2rem', fontWeight:'bold'}}>Filter By Time</div>
                    <select style={{marginLeft:'1rem'}}
                    defaultValue='all'>
                        <option value='all'>ALL</option>
                        <option value='slot_1'>07.00 AM</option>
                        <option value='slot_2'>08.00 PM</option>
                    </select>

                    <div style={{marginLeft:'2rem', fontWeight:'bold'}}>Filter By Place</div>
                    <select style={{marginLeft:'1rem'}}
                    defaultValue='all'>
                        <option value='all'>ALL</option>
                        <option value='front'>FRONT</option>
                        <option value='back'>BACK</option>
                    </select>
                </div>
            </div>
            <hr/> 
            {confirmOrderLoading ? <LoadingIndicator/> :
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {confirmedOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.threat === true? '#FBEDED':'#FFFFF5'}}>
                                    <div>
                                        <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>  Customer Code: {data.customer_code} <br/>  Order Code: {data.order_code} </span> 
                                        {data.order_type === "special" && <span style={{height:'1.2rem', width:'1.2rem',marginRight:'0.4rem', backgroundColor: '#970050', float:'right'}}></span>}
                                        <div style={{height:'1.2rem', width:'1.2rem',marginRight:'0.4rem', backgroundColor: data.order_type === 'vegi'? 'green':'', float:'right'}}></div>
                                    </div>
                                    {/* <br/> Address: University of Moratuwa */}
                                    Packet Count: {data.packet_amount} 
                                    <br/>
                                    {!data.order_type === "special" && data.comment  && <span style={{fontWeight:'400'}}> Note: {data.comment}</span>}
                                </td>
                            </tr>

                            <tr>  
                            <td style={{fontSize:'14px'}}>
                                    { data.order_type != "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        {data.items.map((food, index) => (
                                            <li key={index}>{food}</li>
                                        ))}
                                    </ul>
                                    }
                                    { data.order_type === "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.category}</li>
                                        <li>{data.type}</li>
                                    </ul>
                                    }
                                </td>
                            </tr>
                        </>
                        ))}
                        </tbody>
                    </table>
                </div>}
                </>}

                
             {/* Rejected Order List */}
             {orderStatus === 'rejected' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{confirmedOrderList.length}</div>
    
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