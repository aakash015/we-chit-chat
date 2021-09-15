import React, { useContext } from 'react'
import BottomMain from './ChatWindow/bottom/BottomMain'
import MessageMain from './ChatWindow/messages/MessageMain'
import TopMain from './ChatWindow/top/TopMain'
import "../Styles/chatWindow.css"
import { useParams } from 'react-router'
import { RoomsContext } from '../Context/RoomsContext'
import { Loader } from 'rsuite'
import { CurrentRoomProvider } from '../Context/CurrentRoomContext'
import { transformToArr } from '../misc/helper'
import { auth } from '../misc/firebase'


const Chat = () => {
  
 //useRooms  basically is useContext;

   const {chatId} = useParams();
   
  const rooms = useContext(RoomsContext);
 
  //useContext krne mein problem ye h ki ab jaise rooms mein kuchh bhi change hoga 
  //chahe wo iss component se  related ho na ho tab bhi ye component re-render hoga 
  //jaise topMain mein sirf name display kra rhe h to maanlo wahan useContext krte na 
  //to agar room ka description bhi change hota to bhi wo poora rerender hota
  //isliye wo naya package install kiya h useContextSelector
  //aur agar memo ka use nhi krenge to wo kaam nhi krega isliye memo ka bhi use kiya h 
  //yahan pe useContext ka use h to jab bhi kuchh change hoga room context mein ye wala re-render
  //hoga par top message aur bottom render nhi honge kyunki wo memoized h 

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

   const admins = transformToArr(currentRoom.admins)
  const isAdmin = admins.includes(auth.currentUser.uid)

  const currentRoomData = {
   name,
   description,
   admins,
   isAdmin
  }
  return (
   <CurrentRoomProvider data={currentRoomData}> 
    <div className="h-100 scrollbar">
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
