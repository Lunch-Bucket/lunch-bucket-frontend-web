import React,{ useState, useEffect, useRef } from "react";
import './ChatStyles.css';
import '../../common/styles/CommonStyles.css';
import strings from '../../common/strings/strings';
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import {getChatData, addAdminReply, setAdminViewStatus} from '../../services/chatService';
import LiveButton from "../../components/LiveButton";

function Chat() {

  const [chat, setChat] = useState([]);
  const [currChat, setCurrChat] = useState('');
  const [showSingleChat, setShowSingleChat] = useState(false);
  const [adminReply, setAdminReply] = useState({
    chat_id: '',
    message: '',
  });
  const [adminViewState, setAdminViewState] = useState(false);
 


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
    handleAdminViewStatus(chatID);
    setShowSingleChat(true);
    setCurrChat(chatID);
  }

  const handleAdminViewStatus = async (chat_id) => {

    try {
      const response = await setAdminViewStatus(chat_id);
      console.log('Response from admin status:', response);
      fetchChats();
    } catch (error) {
        console.log('Error:', error);
    }
  };

  // Add Admin Reply Function
  const handleAddReply = async (event) => {
    event.preventDefault();

    try {
      const response = await addAdminReply(adminReply);
      console.log('Response from admin reply :', response);
      fetchChats();
      console.log("reply", adminReply)
          // Clear the reply input
    setAdminReply((prevData) => ({
      ...prevData,
      reply: '', // Clear the message field
    }));


    } catch (error) {
        console.log('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setAdminReply((prevData) => ({
      ...prevData,
      chat_id: currChat,
      message : value,
    }));
  };
  

  const chatContentRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [chat.messages, showSingleChat]);


    return (
      <div className="container">
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
        </div>


        <div className="chat-main-container">
            {chat.map((singleChat, index) => (
              <>
                <div className="chat-main-container-chat-item" onClick={()=>showSingleChatFunc(singleChat.id)}>Chat ID: {singleChat.id}
                   {singleChat.view_admin_state === true && <LiveButton/>}
                </div>
                {(showSingleChat && (singleChat.id === currChat)) &&
                <div className="single-chat-container">
                   <div style={{display:'flex', justifyContent:'space-between'}}>
                      <h4 style={{marginLeft:'1rem', color:'grey', borderBottom:'1px solid grey'}}>Customer: {singleChat.customer_id}</h4>
                      <button className="chat-popup-close-btn" onClick={()=>setShowSingleChat(false)}>close</button>
                    </div> 
                    <div className="chat-scroll-content" ref={chatContentRef}>
                      {singleChat.messages.map((msg,index)=>(
                        <div className={msg.sender === 'user' ? 'chatUser' : 'chatAdmin'}>{msg.message}</div>       
                      ))}
                    </div>
                    <form className="chat-reply-content" onSubmit={handleAddReply}>
                        <input type="text" className="chat-reply-input" 
                        name="reply" value={adminReply.reply} 
                        onChange={handleChange} />
                        <button className="action-bar-btn chat-reply-send-btn" type="submit">Send Reply</button>
                    </form> 
                </div>
                }
              </>
            ))}
      </div>

        </div>
    )
}

export default withTokenExpirationCheck(Chat);