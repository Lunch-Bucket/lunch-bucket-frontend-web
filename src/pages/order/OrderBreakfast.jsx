import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import "../../common/styles/Colors.css";
import strings from "../../common/strings/strings";
import { getPendingOrderData, getConfirmedOrderData, confirmOrderData ,generateReport, generateOrdersPDF, informArrival} from "../../services/orderService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import LoadingIndicator from "../../components/LoadingIndicator";
import Popup from "../../components/Popup";

function OrderHome_Breakfast()
{
    const [confirmedOrderList, setConfirmedOrderList] = useState([]);
    const [pendingOrderList, setPendingOrderList] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState("pending")
    const [selectAll, setSelectAll] = useState(false); 

    const [pendingOrderLoading, setPendingOrderLoading] = useState(true);
    const [confirmOrderLoading, setConfirmOrderLoading] = useState(true);
    const [confirmFuncLoading, setConfirmFuncLoading] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(false);

    const [selectedPlaceFilter, setSelectedPlaceFilter] = useState('all');
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');

    const [navOnline,setNavOnline] = useState(true)

    const Time_1 = '7:30 AM';
    const Time_2 = '8:00 AM';
    const Time_3 = '8:30 AM';
    const Time_4 = '9:00 AM';
    const Time_5 = '9:30 AM';

    const place_1 = 'Your Own Location(Normal)';


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
            
            const confirmedOrderData  = await getConfirmedOrderData('Breakfast');
            const pendingOrderData  = await getPendingOrderData('Breakfast');
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
            console.log('confirmed order data in order', confirmedOrderList);
            console.log('pending order data in order', pendingOrderList);

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
    
    const setPending = () => {
        let pending = pendingOrderList
        setPendingOrderList(pending)
    }
    
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
                  fetchOrderData();
                  } catch (error) {
                      console.log('Error:', error);
                      setConfirmFuncLoading(false);
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
                setConfirmFuncLoading(false);
                console.log('rejected orders component', response);
                openPopup('error', 'Marked the orders as Rejected!');
                setCheckedOrders([]);
                fetchOrderData();
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
    setLoadingIndicator(true);
    const ordersForPDF  = await generateReport('Breakfast'); 
    setLoadingIndicator(false);
    console.log("ordersForPDF",ordersForPDF) 
  }

  const packagingPDF_ = async () => {
    setLoadingIndicator(true);
    alert("Orders Packaging pdf is generating...")
    const placeMapping = {
        "Your Own Location(Normal)": "location",
    };

    const timeMapping = {
        "7:30 AM": "73",
        "8:00 AM": "8",
        "8:30 AM": "83",
        "9:00 AM": "9",
        "9:30 AM": "93",
    };

    const modifiedPlace = placeMapping[selectedPlaceFilter] || selectedPlaceFilter;
    const modifiedTime = timeMapping[selectedTimeFilter] || selectedTimeFilter;

    const orderForPDF  = await generateOrdersPDF('Breakfast',modifiedPlace,modifiedTime);
    setLoadingIndicator(false);
    console.log("packingOrdersPDF",orderForPDF) 
    alert("Manufacturing Completed!")
  }

//   const informArrival_ = async () => {
//     setLoadingIndicator(true);
//     const arrvalNotifi  = await informArrival('Lunch',selectedPlaceFilter);
//     console.log("arrvalNotifi Lunch",arrvalNotifi) 
//     setLoadingIndicator(false);
//     alert("Arrival Notification has been sent!")
//     }
    
    const handleRedirectToLocation = (latitude, longitude) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    };
 
  
 
    return(
        <div className="full-container">
            {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div className="title-search-content">
              <div>
                <h1 className="menu-title-text">{strings.breakfastOrder}</h1> 
                <div className="report-content">
                    <button className="get-order-pdf-button generate-report" onClick={()=>{generateReport_()}}>1. Generate Report</button>
                    <button className="get-order-pdf-button"  onClick={()=>{packagingPDF_()}}>2. Packaging</button>
                </div>
              </div>
              <div className="order-button-content">
                <button className="header-item-add-button" style={{backgroundColor:'var(--button-color)'}} onClick={()=>{setOrderStatus('pending')}}>Pending Orders</button>
                <button className="header-item-add-button" style={{backgroundColor: 'var(--confirm-color)', color: 'var(--white-color)'}} onClick={()=>{setOrderStatus('confirmed')}}>Confirmed Orders</button>
              </div>
              {/* <SearchBar/> */}
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
                            <option value={Time_1}>{Time_1}</option>
                            <option value={Time_2}>{Time_2}</option>
                            <option value={Time_3}>{Time_3}</option>
                            <option value={Time_4}>{Time_4}</option>
                            <option value={Time_5}>{Time_5}</option>
                    
                        </select>
                    </div>

                    <div className="filter-by">
                        <div style={{paddingLeft:'1rem'}}>Filter By Place</div>
                        <select style={{marginLeft:'1rem'}}
                        id="placeFilter"
                        value={selectedPlaceFilter}
                        onChange={handlePlaceFilterChange}>
                              <option value='all'>ALL</option>
                              <option value='Your Own Location(Normal)'>{place_1}</option>
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
            {loadingIndicator && <LoadingIndicator/>}
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
                                        onClick={async ()=>{
                                            OrderItemChecked(data.id)
                                        }
                                            }/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </label>   
                                </td>

                            <td className="order-page-data-row-description" key={id}>
                                <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: data.threat === true? 'red':'black'}}>   
                                    Customer Code: {data.customer_code} <br/>  
                                    Order Code: {data.order_code} <br/> 
                                    Rs. {data.price} <br/>  
                                    Packet Count: {data.packet_amount} <br/>  
                                    <span style={{color:'blue', cursor:'pointer'}}
                                    onClick={() =>
                                        handleRedirectToLocation(
                                            data.user_location.latitude,
                                            data.user_location.longitude
                                        )}
                                    >{data.delivery_place}</span> 
                                    </span> 
                                <td> 
                                    { data.order_type === "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.category}</li>
                                        <li>{data.type}</li>
                                        <li style={{color:"#055F14"}}>{data.gravy}</li>
                                    </ul>
                                    }
                                </td>
                                    {!data.order_type === "special" && data.comment  && <span style={{fontWeight:'400'}}> Note: {data.comment}</span>}
                                </td>
                            </tr>
                            <hr/> 
                        </>
                        ))}
                        </tbody>
                    </table>
                    
                </div>}
                </>    
            }

            {/* Confirmed Order List */}
            {orderStatus === 'confirmed' &&<>
            <div className="action-bar">
            <div style={{display:'flex'}} className="filter-action-bar">
            <div>Total Order Count:
                <span style={{marginLeft:'0.1rem'}}>{confirmedOrderList.length}</span>
            </div>

                    <div className="filter-by">
                    <div style={{paddingLeft:'1rem'}}>Filter By Time</div>
                    <select style={{marginLeft:'1rem'}}
                       id="timeFilter"
                       value={selectedTimeFilter}
                       onChange={handleTimeFilterChange}>
                        <option value='all'>ALL</option>
                        <option value={Time_1}>{Time_1}</option>
                        <option value={Time_2}>{Time_2}</option>
                        <option value={Time_3}>{Time_3}</option>
                        <option value={Time_4}>{Time_4}</option>
                    </select>
                    </div>
                    <div className="filter-by">
                    <div style={{paddingLeft:'1rem'}}>Filter By Place</div>
                    <select style={{marginLeft:'1rem'}}
                    id="placeFilter"
                    value={selectedPlaceFilter}
                    onChange={handlePlaceFilterChange}>
                        <option value='all'>ALL</option>
                        <option value='Your Own Location(Normal)'>{place_1}</option>
                    </select>
                    </div>
                </div>
            </div>
            <hr/> 
            {loadingIndicator && <LoadingIndicator/>} 
            {confirmOrderLoading ? <LoadingIndicator/> :<div>
                    <table className="detail-table">  
                       <tbody>
                        {confirmedOrderList.map((data, id) => (<>
                            <tr className="order-page-table-row" style={{display:'flex'}} key={id}>
                            <td style={{fontSize:'14px'}}>
                              
                                    { data.order_type === "special" &&
                                    <ul style={{listStyle:'square'}}>
                                        <li>{data.category}</li>
                                        <li>{data.type}</li>
                                        <li style={{color:"#055F14"}}>{data.gravy}</li>
                                    </ul>
                                    }
                                </td>
                                <td className="order-page-data-row-description" key={id}>
                                    <span style={{float:'right', fontWeight:'700', fontSize:'14px', color: data.threat === true? 'red':'black'}}>   
                                    Customer Code: {data.customer_code} <br/>  
                                    Order Code: {data.order_code} <br/> 
                                    Rs. {data.price} <br/>  
                                    Packet Count: {data.packet_amount} <br/>  
                                    <span style={{color:'blue', cursor:'pointer'}}
                                    onClick={() =>
                                        handleRedirectToLocation(
                                            data.user_location.latitude,
                                            data.user_location.longitude
                                        )}
                                    >{data.delivery_place}</span> 
                                    </span> 
                                </td>
                                    
                            </tr>
                            <hr/>
                        </>
                        ))}
                        </tbody>
                    
                    </table>
                    
                </div>}
                </>    
            }

            {/* Rejected Order List */}
            {orderStatus === 'rejected' &&<>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{confirmedOrderList.length}</div>
     
                    <div className="order-total-sales-content">
                        {/* <div className="sales-content-label">Total Sales</div>
                        <div className="sales-content-amount">Rs. 4100</div> */}
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
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default withTokenExpirationCheck(OrderHome_Breakfast);