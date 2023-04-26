import React from "react";
import "./User.css";

const data = [
   
    {
        userID: '002',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '003',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '004',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '005',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '006',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
    {
        userID: '007',
        deliveryAddress: '22/1, Temple Rd, Colombo 07',
        contact: '0772345674',
        orderCount: '20',
        orderAmount: '4600'
    },
];

export default function User() {

    return (
        <div className="full-container">
            <h1>Users</h1>
            <hr/>
            <div>
                <table className="detail-container">
                    {data.map((data, id) => (
                        <tr className="user-page-data-row" key={id}>
                            <td className="user-page-data-row-data">{data.userID}</td>
                            <td className="user-page-data-row-data address">{data.deliveryAddress}</td>
                            <td className="user-page-data-row-data">{data.contact}</td>
                            <td className="user-page-data-row-data">{data.orderCount}</td>
                            <td className="user-page-data-row-data">{data.orderAmount}</td>
                        </tr>))}
                </table>
            </div>
        </div>
    );
}