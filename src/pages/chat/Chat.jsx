import React from "react";
import { useState } from "react";

export default function Chat() {
  const[chat, setChat] = useState([
    {
      userID:'User'+'#001',
      regarding:'Menu',
      timestamp: '5:12 PM, 21-02-2023',
      latestMessage: 'Can you please remove fish oil'
    },
  ]);

    return (
      <div className="full-container">
        <div className="menu-title">
          <h1 className="menu-title-text">Chat</h1>
          
        </div>
        <hr/>
        </div>
    )
}
