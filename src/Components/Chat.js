import React, { useContext } from 'react'
import BottomMain from './ChatWindow/bottom/BottomMain'
import MessageMain from './ChatWindow/messages/MessageMain'
import TopMain from './ChatWindow/top/TopMain'
import "../Styles/chatWindow.css"
import { useParams } from 'react-router'
import { RoomsContext } from '../Context/RoomsContext'
import { Loader } from 'rsuite'
import { CurrentRoomProvider } from '../Context/CurrentRoomContext'


const Chat = () => {
  
 //useRooms  basically is useContext;

   const {chatId} = useParams();
   
  const rooms = useContext(RoomsContext);
 

  if(!rooms)
  {
    return <Loader center vertical size= "md" content="loading" speed="fast" />
  }
  
  const currentRoom = rooms.find(room => room.id===chatId);

  if(!currentRoom)
  {
    return <h6 className="text-center text-white">ChatRoom not found</h6>
  }

  const {name,description} = currentRoom;

  const currentRoomData = {
   name,
   description
  }
  return (
   <CurrentRoomProvider data={currentRoomData}> 
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
    </CurrentRoomProvider>
  )
}

export default Chat
