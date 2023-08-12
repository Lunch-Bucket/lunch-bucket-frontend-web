import React, {useState, useEffect} from "react";
import "../../common/styles/CommonStyles.css";
import "./OrderStyles.css";
import strings from "../../common/strings/strings";
import SearchBar from "../../components/SearchBar";
import { getOrderData } from "../../services/orderService";

export default function OrderHome()
{
    const [orderList, setOrderList] = useState([]);
    const [currOrder, setCurrOrder] = useState("")
    let  checkedOrders = []
    const [searchTerm, setSearchTerm] = useState('');


    async function fetchOrderData() {
        try {
            const orderData  = await getOrderData('Lunch');
            setOrderList(orderData);
            console.log('user data in user page', orderList);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, []);


    function OrderItemChecked(value){
        checkedOrders.push(value)
        console.log('checked orders Lunch: ', checkedOrders)
    }

    function handleOrderStatus(orderStatus){
        if(orderStatus == 'noted'){
            
        }
        else{

        }
    }

  
 
    return(
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.order}</h1> 
              <SearchBar/>
            </div>
            <hr/>
            <div className="action-bar">
                <div style={{display:'inline-flex'}}>
                    <div>Total Order Count</div>
                    <div style={{marginLeft:'2rem', fontWeight:'600'}}>{orderList.length}</div>
     
                    <div className="order-total-sales-content">
                        <div className="sales-content-label">Total Sales</div>
                        <div className="sales-content-amount">Rs. 4100</div>
                    </div>
                </div>
                <div>
                    <button className="action-bar-btn" onClick={()=>handleOrderStatus('noted')}>Noted</button>
                    <button className="action-bar-btn" onClick={()=>handleOrderStatus('dispatched')}>Dispatched</button>
                </div>
            </div>
            <hr/> 
                <div>
                    <table className="detail-table">  
                        <tbody>
                        {orderList.map((data, id) => (<>
                            <tr className="order-page-table-row" key={id}>
                                <td>
                                    <label class="checkbox-container">
                                        <input type="checkbox" className="item-checkbox" value={data.order_id} onClick={()=>{OrderItemChecked(data.order_id)}}/>
                                        <span className="item-checkbox-checkmark"></span>
                                    </label>   
                                </td>

                                <td className="order-page-data-row-description" key={id} style={{backgroundColor: data.order_type == 'non_vegi'? '#fcfadc':'#ECFFC8'}}>
                                    Order ID: {data.order_id}  <span style={{float:'right', fontWeight:'700', fontSize:'14px'}}>Customer Code: {data.customer_code}</span> 
                                    <br/> Address: University of Moratuwa
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

        </div>
    );
}