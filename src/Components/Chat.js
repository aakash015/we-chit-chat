import React from 'react'
import BottomMain from './ChatWindow/bottom/BottomMain'
import MessageMain from './ChatWindow/messages/MessageMain'
import TopMain from './ChatWindow/top/TopMain'
import "../Styles/chatWindow.css"
// import {useLocation} from 'react-router-dom'

const Chat = () => {
  
  // console.log("chat component called here ")
  // const location = useLocation() ;

  
  return (
    <div className="h-100">
      <div  className="chat-top text-white">
        <TopMain/>
      </div>

      <div className="chat-middle text-white">
        <MessageMain />
      </div>

      <div className="chat-bottom text-white">
        <BottomMain />
      </div>
    </div>
  )
}

export default Chat
