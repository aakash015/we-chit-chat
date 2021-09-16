import React, { useContext, useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import { ProfileContext } from '../../../Context/ProfileContext';
import firebase from 'firebase/app'
import {database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import AudioMsgBtn from './AudioMsgBtn';
const BottomMain = () => {

  const [input,setInput] = useState('');
  const [loading,setLoading] = useState(false);

   const {profile} = useContext(ProfileContext);
   const {chatId} = useParams();


   function assembleMessage(profile,chatId){

    return {
      roomId : chatId,
      author : {
        name : profile.name,
        uid : profile.uid,
        createdAt : profile.createdAt,
        ...(profile.avatar?{avatar:profile.avatar}:{})
      },
      createdAt : firebase.database.ServerValue.TIMESTAMP,
      likeCount:0
    }

   }


  
  const onInputChange = (value)=>{
      setInput(value)
  }

  const onKeyDown = (ev)=>{
      
    if(ev.keyCode ===13 )
    {
      ev.preventDefault();
      onSendClick()
    }
  }

  const onSendClick = async()=>{
       
    if(input.trim()===''){
      Alert.warning('Message can\'t be empty' );
      return;
    }

    
    const msgdata = assembleMessage(profile,chatId);
    msgdata.text = input;
    // console.log(msgdata);

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgdata;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgdata,
      msgId : messageId
    }
   
    console.log("hey i am updates")
    console.log(updates)
    setLoading(true);

    try {
      setInput('');

      
      await database.ref().update(updates);
     
      var elem = document.getElementById('auto-scroll');
      elem.scrollTop = elem.scrollHeight;


      setLoading(false);
    } catch (error) {
       
      setLoading(false);
      Alert.error(error.message)
    }
  }

  const afterUpload =  async(files)=>{
        
    setLoading(true);

    const updates = {}

    files.forEach(file => {

      const msgdata = assembleMessage(profile,chatId);
      msgdata.file = file;
      
      const messageId = database.ref(`messages`).push().key;
      updates[`/messages/${messageId}`] = msgdata;

      

       
      });
      const lastMsgId = Object.keys(updates).pop()

      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId : lastMsgId
      }

  

      
    try {
      await database.ref().update(updates);
      setLoading(false);
    } catch (error) {
       
      setLoading(false);
      Alert.error(error.message)
    }

  } 

  return (
    <div>
     <InputGroup>
     
    <AttachmentBtnModal afterUpload={afterUpload} />
    <AudioMsgBtn afterUpload={afterUpload} />
      <Input
       placeholder="Write a new message here..." 
       value={input}
       onPressEnter = {onKeyDown}
       onChange={onInputChange}

      />

      <InputGroup.Button color="blue" appearance="primary" 
      onClick={onSendClick} disabled={loading}>

        <Icon icon="send"/>
      </InputGroup.Button>
     </InputGroup>
    </div>
  )
}

export default BottomMain
