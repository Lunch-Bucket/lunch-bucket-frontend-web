import React from "react";
import { useState } from "react";
import "./FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";

export default function Feedback()
{
    const [feedback, setFeedback] = useState([
    {
        user: '001',
        description: 'The food was good',
        rating: '4',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good',
        rating: '4',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good',
        rating: '4',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good',
        rating: '4',
        menu: 'abcd',
        date: '12/02/2023'
    },
    {
        user: '001',
        description: 'The food was good',
        rating: '4',
        menu: 'abcd',
        date: '12/02/2023'
    },
])
    return(
            <div className="full-container">
                <TopBar
                    title ="Feedback"
                    action="Search Bar"
                />
                {/* This tabBar is not used in Feedback screen - just for testing */}
                {/* <TabBar/> */}
                <div className="detail-container">
                    <table className="detail-table">
                        {feedback.map((data, id) => (<tr className="data-row">
                            <td>{data.user}</td>
                            <td>{data.description}</td>
                            <td>{data.rating}</td>
                            <td>{data.menu}</td>
                            <td>{data.date}</td>
                        </tr>))}
                    </table>
                </div>
            </div>
    );
}