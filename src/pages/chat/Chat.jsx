import React,{ useState } from "react";
import './ChatStyles.css';
import '../../common/styles/CommonStyles.css';

import strings from '../../common/strings/strings'

export default function Chat() {
  const[chat, setChat] = useState([
    {
      userID:'User'+'#001',
      regarding:'Menu',
      timestamp: '5:12 PM, 21-02-2023',
      latestMessage: 'Can you please remove fish oil',
      read: false,
    },
    {
      userID:'User'+'#002',
      regarding:'Order',
      timestamp: '5:12 PM, 21-02-2023',
      latestMessage: 'Can you please remove fish oil',
      read: false,
    },
    {
      userID:'User'+'#003',
      regarding:'Other',
      timestamp: '5:12 PM, 21-02-2023',
      latestMessage: 'Can you please remove fish oil',
      read: true,
    },
  ]);

  const[singleChat, setSingleChat] = useState(false)

    return (
      <div className="container">
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
        </div>

        <div className="detail-table-container">
            <table className="detail-table">
                {chat.map((data, id) => (
                    <tr className="table-row" key={id}>
                        <td className="chat-page-data-row-data">{data.userID}</td>
                        <td className="chat-page-data-row-data">{data.regarding}</td>
                        <td className="chat-page-data-row-data latestMessage">{data.latestMessage}</td>
                        <td className="chat-page-data-row-data timestamp">{data.timestamp}</td>
                    </tr>))}
            </table>
          </div>
        </div>
    )
}
