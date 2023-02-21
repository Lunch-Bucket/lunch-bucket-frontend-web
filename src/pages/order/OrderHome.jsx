import React, {useState} from "react";
import "../feedback/FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";

export default function OrderHome()
{
    const [order, setOrder] = useState([
        {
            orderID: '0001',
            meal: [
                "Pumpkin",
                "Brinjal",
                "Potato",
                "Fish Stew",
                "Meat Curry Style"
              ],
            note: 'Add more spices',
            orderCount: '4',
            userID: '00201',
            address: '02/100 Ward Place, Colombo 07'
        },
        {
            orderID: '0002',
            meal: [
                "Pumpkin",
                "Brinjal",
                "Potato",
                "Fish Stew",
                "Meat Curry Style"
              ],
            note: 'Add more spices',
            orderCount: '8',
            userID: '00221',
            address: '02/100 Ward Place, Colombo 07'
        },
    ])
 
    return(
        <div className="full-container">

                <TopBar
                    title ="Orders"
                    action="Search Bar"
                />
                <TabBar />
                <div className="detail-container">
                    <table className="detail-table">
                        {/* <tr>
                            <th>User Id</th>
                            <th>Delivery Detail</th>
                            <th>Contact</th>
                            <th>Order Count</th>
                            <th>Order Amount</th>
                        </tr> */}
                        {order.map((data, id) => (<tr className="data-row"> 
                            <td><input type="checkbox"/> </td>
                            <td key={id}>{data.orderID}</td>
                            <td>{data.meal+" "}</td>
                            <td>{data.note}</td>
                            <td>{data.orderCount}</td>
                            <td>{data.userID}</td>
                            <td style={{maxLines:'1', overflow:'clip'}}>{data.address}</td>
                        </tr>))}
                    </table>
                </div>
        </div>
    );
}