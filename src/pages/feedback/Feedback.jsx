import React from "react";
import "@fontsource/poppins"; 
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import "./FeedbackStyles.css";

import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";

export default function Feedback()
{
    const [feedback, setFeedback] = useState([
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
])
    return(
            <div className="full-container">
                <TopBar
                    action="Feedbacks"
                />
                <div className="detail-container">
                    <table className="detail-table">
                        {feedback.map((data, id) => (<tr className="data-row">
                            <td className="user">{data.user}</td>
                            <td className="description">{data.description}</td>
                            <td className="rating"> < FaStar className="starIcon"/>{data.rating}</td>
                            <td> <button className="menu">View Order</button></td>
                            <td className="date">{data.date}</td>

                                <div className="feedback-show-menu">
                                    <div className="feedback-show-menu-item">
                                        <table>
                                            <tr>
                                                <td>Meal</td>
                                                <td>Items</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                        </tr>))}
                    </table>
                </div>
            </div>
    );
}