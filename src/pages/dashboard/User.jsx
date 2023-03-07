import React from "react";
import { useState } from "react";
import "./User.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";

export default function User()
{
    const [user, setUser] = useState([
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '001',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
])
    return(
        <div className="full-container">

                <TopBar
                    title ="Users"
                    action="Search Bar"
                />
                <TabBar action="1"/>
                <div className="detail-container">
                    <table className="detail-table">
                        { /*<tr>
                            <th>User Id</th>
                            <th>Delivery Detail</th>
                            <th>Contact</th>
                            <th>Order Count</th>
                            <th>Order Amount</th>
    </tr>*/}
                        {user.map((data, id) => (<tr className="data-row">
                            <td className="uid">{data.userID}</td>
                            <td className="delivery">{data.deliveryAddress}</td>
                            <td className="contact">{data.contact}</td>
                            <td className="order">{data.orderCount}</td>
                            <td className="total">{data.orderAmount}</td>
                        </tr>))}
                    </table>
                </div>
            </div>
    );
}