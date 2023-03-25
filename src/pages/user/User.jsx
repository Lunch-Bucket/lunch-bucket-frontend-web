import React from "react";
import "./User.css";

const data = [
    {
        userID: 'User Id',
        deliveryAddress: 'Delivery Detail',
        contact: 'Contact',
        orderCount: 'Order Count',
        orderAmount: 'Order Amount'
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
    {
        userID: '001',
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
            <div className="detail-container">
                <table className="detail-table">
                   
                    <thead>
                    { /*<tr>
                            <th>User Id</th>
                            <th>Delivery Detail</th>
                            <th>Contact</th>
                            <th>Order Count</th>
                            <th>Order Amount</th>
                        </tr>*/}
                    </thead>
                    <tbody>
                    {data.map((data, id) => (
                        <tr className="data-row" key={id}>
                            <td className="uid">{data.userID}</td>
                            <td className="delivery">{data.deliveryAddress}</td>
                            <td className="contact">{data.contact}</td>
                            <td className="order">{data.orderCount}</td>
                            <td className="total">{data.orderAmount}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}