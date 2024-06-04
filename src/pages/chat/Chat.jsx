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
  const[startCollectionId,setStartCollectionId] = useState('0');
  const [hasMore, setHasMore] = useState(true); 

  const [navOnline,setNavOnline] = useState(true)


  async function fetchChats(startCollectionId) {
    try {
      const chatList = await getChatData(startCollectionId);
      if (startCollectionId === '0') {
        setChat(chatList.data.chats);
      } else {
        setChat(prevChats => [...prevChats, ...chatList.data.chats]);
      }
      setHasMore(chatList.data.chats.length > 0);
      console.log('chat data in the component', chatList);
    } catch (error) {
      console.log('Error fetching chat data:', error.message);
    }
  }

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
      // fetchChats();
    } catch (error) {
        console.log('Error:', error);
    }
  };

  // Add Admin Reply Function
  const handleAddReply = async (event) => {
    event.preventDefault();
    
    if (adminReply.message.trim() === '') {
      console.log('Empty message. Cannot proceed.');
      return;
    }
  

    try {
      const response = await addAdminReply(adminReply);
      console.log('Response from admin reply :', response);
      fetchChats(startCollectionId);
      console.log("reply", adminReply)
          // Clear the reply input
          setAdminReply((prevData) => ({
            ...prevData,
            message: '',
            reply: '',
          }));

    } catch (error) {
        console.log('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setAdminReply(() => ({
      chat_id: currChat,
      message : value,
    }));
  };
  

  const chatContentRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleChange(event);
    }
  };

  useEffect(() => {
    if(navigator.onLine){
        setNavOnline(true);
    }else{
        setNavOnline(false);
    }
}, [navigator.onLine]);


useEffect(() => {
  if (navOnline) fetchChats(startCollectionId);
}, [navOnline, startCollectionId]);

  useEffect(() => {
    if(navOnline)
      scrollToBottom();
  }, [chat.messages,showSingleChat]);


  const handleNextPage = () => {
    if (chat.length > 0) {
      setStartCollectionId(chat[chat.length - 1].id);
      setChat([])
      fetchChats(startCollectionId);
    }
  };


    return (
      <div className="full-container">
           {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
        </div>

        <button className= "chat-pagination-next-btn"
        onClick={handleNextPage} disabled={!hasMore}>Next </button>
        <div className="chat-main-container">
            {chat.map((singleChat, index) => (
              <>
                <div className="chat-main-container-chat-item" onClick={()=>showSingleChatFunc(singleChat.id)}>{singleChat.code} 
                   {singleChat.view_admin_state === true && <LiveButton/>}
                </div>
                {(showSingleChat && (singleChat.id === currChat)) &&
                <div className="single-chat-container">
                   <div style={{display:'flex', justifyContent:'space-between'}}>
                      <h4 style={{marginLeft:'1rem'}}>{singleChat.code} | {singleChat.contact}</h4>
                      <button className="chat-popup-close-btn" onClick={()=>setShowSingleChat(false)}>close</button>
                    </div> 
                    <div className="chat-scroll-content" ref={chatContentRef}>
                      {singleChat.messages.map((msg,index)=>(
                        <div className={msg.sender === 'user' ? 'chatUser' : 'chatAdmin'}>{msg.message}</div>       
                      ))}
                    </div>
                    <form className="chat-reply-content" onSubmit={handleAddReply}>
                        <input type="text" className="chat-reply-input" 
                        name="reply" 
                        value={adminReply.reply} 
                        onChange={handleChange} 
                        onKeyPress={handleKeyPress}/>
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