import React from "react";
import "@fontsource/poppins";
import {FaStar} from "react-icons/fa";
import "./FeedbackStyles.css";

const data = [
    {
        user: '001',
        description: 'The food was good. ',
        rating: '4.0',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good.',
        rating: '4.5',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good.',
        rating: '4.5',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good.',
        rating: '4.5',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good.',
        rating: '4.5',
        menu: 'abcd',
        date: '12/02/2023'
    },
];

export default function Feedback() {
    return (

        <div className="full-container">
            <div className="detail-container">
                <table className="detail-table">
                <h1 className="title">Feedbacks</h1>
                    <thead>
                
                    </thead>
                    <tbody>
                    {data && data.map((data, index) => (
                        <tr className="data-row" key={index}>
                            <td className="user">{data.user}</td>
                            <td className="description">{data.description}</td>
                            <td className="rating">< FaStar className="starIcon"/>{data.rating}</td>
                            <td>
                                <button className="menu">View Order</button>
                            </td>
                            <td className="date">{data.date}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}