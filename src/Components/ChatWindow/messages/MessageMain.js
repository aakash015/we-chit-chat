import React,{useState,useEffect} from 'react'
import {useParams} from "react-router"
import {  database, storage } from '../../../misc/firebase'
import { groupBy, transformToArrWithId } from '../../../misc/helper'
import '../../../Styles/MessageMain.css'
import MessageItem from './MessageItem'
import {Alert} from 'rsuite'
import { isElement } from 'react-dom/test-utils'
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

  
  const handleDelete = async(msgId,file)=>{
     
    console.log('msgId')
    if(!window.confirm('Are you sure?'))
     return;

     const updates = {};

     const isLast = messages[messages.length-1].id === msgId;
     
     updates[`/messages/${msgId}`] = null;

     if(isLast && messages.length>1)
     {
       updates[`/rooms/${chatId}/lastMessage`] = {
         ...messages[messages.length-2],
         msgId : messages[messages.length-2].id
       }
     }
     

     if(isLast && messages.length===1){
      updates[`/rooms/${chatId}/lastMessage`]=null
     }

     try {
       await database.ref().update(updates)

       Alert.info('Message has been deleted',2000)
       
      

     } catch (error) {
       
      return Alert.error(error.message,2000)
     }

     if(file){
        
      try {
        const fileRef = storage.refFromURL(file.url)
        await fileRef.delete()
      } catch (error) {
        Alert.error(error.message,2000)
      }

    }
  }

  const renderMessages = ()=>{

  
    const groups = groupBy(messages,(item)=>new Date(item.createdAt).toDateString())
    // messages.map(msg=>/>)
    
    const items = []
    Object.keys(groups).forEach((date)=>{
      
      items.push(<li key={date} className="text-center mb-1 padded">{date}</li>)
    
      const msgs = groups[date].map(msg => <MessageItem key={msg.id} message = {msg} handleDelete={handleDelete}></MessageItem>)
   
      items.push(...msgs)
    })

    return items;
  }

  return (
    <ul className="msg-list" id="auto-scroll">
    {isChatEmpty && <li>No messages yet</li>}
    {canShowMessages && 
      renderMessages()
    }</ul>
  )
}

export default MessageMain
