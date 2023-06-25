import React from "react";
import "./User.css";
import strings from '../../common/strings/strings';
import SearchBar from "../../components/SearchBar";

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
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.user}</h1> 
              <SearchBar/>
            </div>
            <hr/>
            <div className="action-bar">
                <div style={{display:'inline-flex', justifyContent:'flex-start', alignItems:'center'}}>
                    <h4>Sort By</h4>
                    <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Frequency</button>
                    <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Meal Count </button>
                    <button className="action-bar-btn user-action-bar-item" onClick={(e)=>{}}>Sales</button>
                </div>
            </div>
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