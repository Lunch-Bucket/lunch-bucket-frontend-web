import React,{ useState, useEffect } from "react";
import './ChatStyles.css';
import '../../common/styles/CommonStyles.css';
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import {getChatData} from '../../services/chatService'

function Chat() {

  const [chat, setChat] = useState([]);
  const [currUser, setCurrUser] = useState('');
  const [showSingleChat, setShowSingleChat] = useState(false);



  async function fetchChats() {
    try {
      const chatList = await getChatData([]);
      setChat(chatList.data.chats);
      console.log('chat data', chat);
    } catch (error) {
      console.log('Error fetching menu data:', error.message);
    }
  }
  useEffect(() => {
    fetchChats();
  }, []);

  function showSingleChatFunc(customerID)
  {
    setShowSingleChat(true);
    setCurrUser(customerID);
  }

    return (
      <div className="container">
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
        </div>


        <div className="chat-main-container">
      
            {chat.map((chat, id) => (
              <>
                <div className="chat-main-container-chat-item" onClick={()=>showSingleChatFunc(chat.id)}>Customer ID: {chat.id}</div>
                <br/>
                {(showSingleChat && (chat.id === currUser)) &&
                <div className="single-chat-container">
                    <button onClick={setShowSingleChat(false)}>close</button>
                    <p>{chat.customer_id}</p>
                </div>
                }
              </>
            ))}
      </div>

      

{/*         
        {chatType == 'singleChat' &&  
        <div className="chat-main-container">
          <div className="chat-main-sub-container">
            {chat.map((chat, id)=>( <>
              {currUser === (chat.userID) &&
              <div className="single-chat-card">
                      {chat.regarding}
                </div>
              }
              </>))}
          </div>  
          <div className="chat-reply-content">
              <input type="text" className="chat-reply-input" />
              <button className="action-bar-btn chat-reply-send-btn">Send Reply</button>
          </div> 
        </div>} */}

        </div>
    )
}

export default withTokenExpirationCheck(Chat);