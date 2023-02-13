import React from "react";
import { useState } from "react";
import "../feedback/FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";
import SideBar from '../../component/Sidebar'

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
        <div className="fullContainer">
            <div className="sideBar">
                <SideBar/>
            </div>
            <div className="leftContainer">
                <TopBar
                    title ="Users"
                    action="Search Bar"
                />
                <TabBar action="1"/>
                <div className="detailContainer">
                    <table className="detailTable">
                        {/* <tr>
                            <th>User Id</th>
                            <th>Delivery Detail</th>
                            <th>Contact</th>
                            <th>Order Count</th>
                            <th>Order Amount</th>
                        </tr> */}
                        {user.map((data, id) => (<tr className="dataRow">
                            <td>{data.userID}</td>
                            <td>{data.deliveryAddress}</td>
                            <td>{data.contact}</td>
                            <td>{data.orderCount}</td>
                            <td>{data.orderAmount}</td>
                        </tr>))}
                    </table>
                </div>
            </div>
        </div>
    );
}