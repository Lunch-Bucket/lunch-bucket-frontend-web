import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import "../../common/styles/Colors.css";
import strings from "../../common/strings/strings";
import SearchBar from "../../components/SearchBar";
import { getPendingOrderData, getConfirmedOrderData, confirmOrderData , generateReport, generateOrdersPDF, informArrival} from "../../services/orderService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import LoadingIndicator from "../../components/LoadingIndicator";
import Popup from "../../components/Popup";

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

    const [selectedPlaceFilter, setSelectedPlaceFilter] = useState('all');
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
   
    const [navOnline,setNavOnline] = useState(true)

    const dinnerTime_1 = '7:30 PM';
    const dinnerTime_2 = '8:30 PM';

    const place_1 = 'Front gate';
    const place_2 = 'Back gate';

    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const openPopup = (type, message) => {
        setPopupType(type);
        setPopupMessage(message);
        setShowPopup(true);
      };


    async function fetchOrderData() {
        try {
            const confirmedOrderData  = await getConfirmedOrderData('Dinner');
            const pendingOrderData  = await getPendingOrderData('Dinner');
            const filteredOrders = confirmedOrderData.filter(order => order.order_status == true);

            const filteredConfirmedOrders = filterOrders(filteredOrders, selectedTimeFilter, selectedPlaceFilter);
            const filteredPendingOrders = filterOrders(pendingOrderData, selectedTimeFilter, selectedPlaceFilter);

            let pendingOrderData_ =  []
            for (const element of filteredPendingOrders) {
                console.log(element);
                element.selected = false
                pendingOrderData_.push(element)
              }
            setConfirmedOrderList(filteredConfirmedOrders);
            setConfirmOrderLoading(false);
            setPendingOrderList(pendingOrderData_);
            setPendingOrderLoading(false);
            // totalSales = confirmedOrderList.reduce((total, order) => total + order.order_price, 0);

        } catch (error) {
            console.log("Error fetching order data:", error.message);
        }
    }

    const filterOrders = (orders, timeFilter, placeFilter) => {
        return orders.filter((order) => {
          const timeCondition = timeFilter === 'all' || order.delivery_time === timeFilter;
          const placeCondition = placeFilter === 'all' || order.delivery_place === placeFilter;
    
          return timeCondition && placeCondition;
        });
      };
    
      const handleTimeFilterChange = (event) => {
        setSelectedTimeFilter(event.target.value);
      };

      const handlePlaceFilterChange = (event) => {
        setSelectedPlaceFilter(event.target.value);
      };

      useEffect(() => {
        if(navigator.onLine){
            setNavOnline(true);
        }else{
            setNavOnline(false);
        }
    }, [navigator.onLine]);

      
    useEffect(() => {
        if(navOnline)
            fetchOrderData();
    }, [selectedTimeFilter,selectedPlaceFilter]);

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
            if(checkedOrders.length > 0){
                try {
                    const payload = {
                      "confirmOrders": checkedOrders,
                      "rejectOrders" : [],
                    };
                  setConfirmFuncLoading(true);
                  const response = await confirmOrderData(payload);
                  setConfirmFuncLoading(false);
                  console.log('confirm orders component', response);
                  openPopup('success', 'Mark As Confirmed');
                  setCheckedOrders([]);
                  window.location.reload();
                  } catch (error) {
                      console.log('Error:', error);
                      setConfirmOrderLoading(false);
                  }
            }
            else{
                openPopup('error', 'Please select atleast 1 order to Confirm!');
            }
           
        }
        else{
            if(checkedOrders.length > 0){
                try {
                    const payload = {
                    "confirmOrders": [],
                    "rejectOrders" : checkedOrders,
                    };
                setConfirmFuncLoading(true);
                const response = await confirmOrderData(payload);
                console.log('rejected orders component', response);
                setConfirmFuncLoading(false);
                openPopup('error', 'Marked the orders as Rejected!');
                setCheckedOrders([]);
                window.location.reload();
                } catch (error) {
                    console.log('Error:', error);
                }
            }else{
                openPopup('error', 'Please select the order to Reject!');
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

      
  const generateOrdersPDF_ = async () => {
    alert("Your order pdf is generating...")
    const orderForPDF  = await generateOrdersPDF('Dinner',selectedPlaceFilter,selectedTimeFilter);
    console.log("orderForPDF",orderForPDF) 
  }

  const informArrival_ = async () => {
    alert("Sending Arrival Notification...")
    const arrvalNotifi  = await informArrival('Dinner',selectedPlaceFilter);
    console.log("arrvalNotifi",arrvalNotifi) 
    }
  
 
    return(
        <div className="full-container">
             {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div className="title-search-content">
                <div>
                <h1 className="menu-title-text">{strings.order}</h1>  
                <div className="report-content">
                    <button className="get-order-pdf-button inform-arrival"  onClick={()=>{informArrival_()}}>Inform Arrival</button>
                    <button className="get-order-pdf-button"  onClick={()=>{generateOrdersPDF_()}}>Get Orders PDF</button>
                    <button className="get-order-pdf-button generate-report" onClick={()=>{generateReport_()}}>Generate Report</button>
                </div>
              </div>
              <div className="order-button-content">
                <button className="header-item-add-button" style={{backgroundColor: 'var(--button-color)'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor: 'var(--confirm-color)', color: 'var(--white-color)'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
              </div>
            </div>
            <hr/>

             {/* Pending Order List */}
             {orderStatus === 'pending' &&<>
            <div className="action-bar">
                <div style={{display:'flex'}} className="filter-action-bar">
                    <div>Total Order Count:
                    <span style={{marginLeft:'0.1rem'}}>{pendingOrderList.length}</span>
                </div>

                <div className="filter-by">
                    <div style={{paddingLeft:'1rem'}}>Filter By Time</div>
                    <select style={{marginLeft:'1rem'}}
                    id="timeFilter"
                    value={selectedTimeFilter}
                    onChange={handleTimeFilterChange}>
                        <option value='all'>ALL</option>
                        <option value={dinnerTime_1}>{dinnerTime_1}</option>
                        <option value={dinnerTime_2}>{dinnerTime_2}</option>
                    </select>
                </div>
                <div className="filter-by">
                <div style={{paddingLeft:'1rem'}}>Filter By Place</div>
                    <select style={{marginLeft:'1rem'}}
                    id="placeFilter"
                    value={selectedPlaceFilter}
                    onChange={handlePlaceFilterChange}>
                        <option value='all'>ALL</option>
                        <option value={place_1}>{place_1}</option>
                        <option value={place_2}>{place_2}</option>
                    </select>
                </div>
                </div>
                <div className="action-bar-btn-content">
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

                                <td className="order-page-data-row-description" key={id}>
                                    <div>
                                        <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: data.threat === true? 'red':'black'}}>  Customer Code: {data.customer_code} <br/>  Order Code: {data.order_code} </span> 
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
            <div style={{display:'flex'}} className="filter-action-bar">
                    <div>Total Confirmed Order Count:
                    <span style={{marginLeft:'0.1rem'}}>{confirmedOrderList.length}</span></div>

                    <div style={{paddingLeft:'1rem'}}>Filter By Time</div>
                    <select style={{marginLeft:'1rem'}}
                    id="timeFilter"
                    value={selectedTimeFilter}
                    onChange={handleTimeFilterChange}>
                            <option value='all'>ALL</option>
                        <option value={dinnerTime_1}>{dinnerTime_1}</option>
                        <option value={dinnerTime_2}>{dinnerTime_2}</option>
                    </select>

                    <div style={{paddingLeft:'1rem'}}>Filter By Place</div>
                    <select style={{marginLeft:'1rem'}}
                    defaultValue='all'>
                        <option value='all'>ALL</option>
                        <option value={place_1}>{place_1}</option>
                        <option value={place_2}>{place_2}</option>
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
                                <td className="order-page-data-row-description" key={id}>
                                    <div>
                                        <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: data.threat === true? 'red':'black'}}>  Customer Code: {data.customer_code} <br/>  Order Code: {data.order_code} </span> 
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
                {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}

        </div>
    );
}

export default withTokenExpirationCheck(OrderHome_Dinner);