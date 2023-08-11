import React,{ useState } from "react";
import './ChatStyles.css';
import '../../common/styles/CommonStyles.css';
import strings from '../../common/strings/strings'

export default function Chat() {

  const [chatType, setChatType] = useState("live")
  const [currUser, setCurrUser] = useState("")
  const [chat, setChat] = useState([
    {
      userID:'User'+'#001',
      regarding:'Can you please make the dishes as Halal, as I am a muslim person',
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

  const [suggestionList, setSuggestionList] = useState([
      {
        id: 1,
        content: 'Please make the dishes more spicy'
      },
      {
        id: 1,
        content: 'Please make the dishes more sour taste'
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more spicy'
      },
      {
        id: 1,
        content: 'Please make the dishes more sour taste'
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
      {
        id: 1,
        content: 'Please make the dishes more '
      },
  ])

  function openSingleChat(value){
      setCurrUser(value);
      setChatType('singleChat');
  }

    return (
      <div className="container">
        <div className="header-title-bar">
          <h1 className="header-title-bar-text">{strings.chat}</h1>
          <div>
            <button className="action-bar-btn" onClick={()=>{setChatType('suggestion')}} >Suggestions</button>
            <button className="action-bar-btn" onClick={()=>{setChatType('live')}} style={{backgroundColor: chatType== 'live'? '#FFEF9C' :''}}>Live Chat</button>
          </div>
        </div>

        {chatType == 'live' &&  
        <div className="chat-main-container">
        {chat.map((chat, id)=>(  <div className="chat-card" style={{backgroundColor: chat.read ? '#f8eba3' : '#ECBA5D', cursor:'pointer'}} onClick={()=>openSingleChat(chat.userID)}>
            {chat.latestMessage}
        </div>))}
        </div>}

        
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
        </div>}


        {chatType == 'suggestion' &&  
        <div className="chat-main-container">
         {suggestionList.map((chat, id)=>( <div className="chat-card">
                {chat.content}
           </div>))}
        </div>}

        </div>
    )
}