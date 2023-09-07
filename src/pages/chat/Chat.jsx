import React,{ useState, useEffect } from "react";
import './ChatStyles.css';
import '../../common/styles/CommonStyles.css';
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import {getChatData} from '../../services/chatService'

function Chat() {

  const [chat, setChat] = useState([]);
  const [currChat, setCurrChat] = useState('');
  const [showSingleChat, setShowSingleChat] = useState(false);



  async function fetchChats() {
    try {
      const chatList = await getChatData([]);
      setChat(chatList.data.chats);
      console.log('chat data in the component', chatList);
    } catch (error) {
      console.log('Error fetching chat data:', error.message);
    }
  }
  useEffect(() => {
    fetchChats();
  }, []);

  function showSingleChatFunc(chatID)
  {
    setShowSingleChat(true);
    setCurrChat(chatID);
  }

    return (
      <div className="container">
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
        </div>


        <div className="chat-main-container">
      
            {chat.map((singleChat, index) => (
              <>
                <div className="chat-main-container-chat-item" style={{backgroundColor: singleChat.view_user_state === false ? '#fff7d1':'#fcea93'}} onClick={()=>showSingleChatFunc(singleChat.id)}>Chat ID: {singleChat.id}</div>
                {(showSingleChat && (singleChat.id === currChat)) &&
                <div className="single-chat-container">
                   <div style={{display:'flex', justifyContent:'space-between'}}>
                      <h4 style={{marginLeft:'1rem', color:'grey', borderBottom:'1px solid grey'}}>{singleChat.customer_id}</h4>
                      <button className="chat-popup-close-btn" onClick={()=>setShowSingleChat(false)}>close</button>
                    </div> 
                    {singleChat.messages.map((msg,index)=>(
                       <div className={msg.sender === 'user' ? 'chatUser' : 'chatAdmin'}>{msg.message}</div>       
                    ))}
                    <div className="chat-reply-content">
                        <input type="text" className="chat-reply-input" />
                        <button className="action-bar-btn chat-reply-send-btn">Send Reply</button>
                    </div> 
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
        
        </div>} */}

        </div>
    )
}

export default withTokenExpirationCheck(Chat);