import React,{useState,useEffect} from 'react'
import {useParams} from "react-router"
import { database } from '../../../misc/firebase'
import { transformToArrWithId } from '../../../misc/helper'
import '../../../Styles/MessageMain.css'
import MessageItem from './MessageItem'
const MessageMain = () => {

  const {chatId} = useParams()
  const [messages,setMessages] = useState(null)

    const isChatEmpty = messages&&messages.length===0;
    const canShowMessages = messages && messages.length>0
    

  useEffect(() => {
 
    const messageRef = database.ref('/messages');


    messageRef.orderByChild('roomId').equalTo(chatId).on("value",(snapshot)=>{
       console.log("here are messages");
       console.log(snapshot.val())

       const data = transformToArrWithId(snapshot.val());

       setMessages(data)

    })

    return ()=>{
         messageRef.off('value')
    }
  }, [chatId])

  return (
    <ul className="msg-list">
    {isChatEmpty && <li>No messages yet</li>}
    {canShowMessages && messages.map(msg=><MessageItem key={msg.id} message = {msg} />)}
    </ul>
  )
}

export default MessageMain
