import React from "react";
import { useState } from "react";
import "./FeedbackStyles.css";
import TopBar from "../../component/TopBar";
import TabBar from "../../component/TabBar";
import SideBar from '../../component/Sidebar'

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
        <div className="fullContainer">
            <div className="sideBar">
                <SideBar/>
            </div>
            <div className="leftContainer">
                <TopBar
                    title ="Feedback"
                    action="Search Bar"
                />
                {/* This tabBar is not used in Feedback screen - just for testing */}
                {/* <TabBar/> */}
                <div className="detailContainer">
                    <table className="detailTable">
                        {feedback.map((data, id) => (<tr className="dataRow">
                            <td>{data.user}</td>
                            <td>{data.description}</td>
                            <td>{data.rating}</td>
                            <td>{data.menu}</td>
                            <td>{data.date}</td>
                        </tr>))}
                    </table>
                </div>
            </div>
        </div>
    );
}