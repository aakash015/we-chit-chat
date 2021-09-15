import React, { memo } from 'react'
import {useParams} from "react-router"
import { Alert, Button } from 'rsuite'
import TimeAgo from 'timeago-react'
import { useCurrentRoom } from '../../../Context/CurrentRoomContext'
import {auth} from '../../../misc/firebase'
import ProfileAvatar from '../../dashboard/ProfileAvatar'
import PresenceDot from '../../PresenceDot'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'
import { database } from '../../../misc/firebase'
import IconBtnControl from './IconBtnControl'
import { transformToArr } from '../../../misc/helper'
import ImgBtnModal from './ImgBtnModal'

const MessageItem = ({message,handleDelete}) => {

  const {author,createdAt,text,file,likedBy,likeCount} = message
  const {chatId} = useParams()

  const isAdmin = useCurrentRoom(v => v.isAdmin)
  const admins = useCurrentRoom(v=>v.admins)

  const isMsgAuthorAdmin = admins.includes(author.uid)
  const isAuthor = auth.currentUser.uid ===author.uid
  const canGrantAdmin = isAdmin && !isAuthor
  const isLiked = likedBy && Object.keys(likedBy).includes(auth.currentUser.uid) 
  

 const renderFileMessage =(file)=>{


  if(file.contentType.includes('image')){
    return <div>
      <ImgBtnModal src={file.url} fileName={file.name} />
    </div>
  }

  if(file.contentType.includes('audio')){
    return <audio controls>
      <source src={file.url} type="audio/mp3"/>
      Your browser doesn't support audio
    </audio>
  }

  return <a href={file.url} target="_blank">Download {file.name}</a>
 }

async function handleAdmin(){
  const snap = await database.ref(`/rooms/${chatId}/admins/${author.uid}`).once('value')
  
  // const path = `/rooms/${chatId}/admins`;
  console.log(snap.val());
  
  if(!snap.val())
  {
    console.log("hey there");
    database.ref(`/rooms/${chatId}/admins/${author.uid}`).set(true);
    Alert.success(`Marked as admin`)
  }
  else
  {
    const curr  = snap.val();
  
   if(curr===true) 
   {
     Alert.success('Removed as Admin');  
     database.ref(`/rooms/${chatId}/admins/${author.uid}`).remove();
   }
   
  }
  
}


const handleLike = async (msgId)=>{
      
  console.log("i am called ")

  const {uid} = auth.currentUser;

  console.log('msgId is ',msgId)
   const likeCountRef = database.ref(`/messages/${msgId}/likeCount`);
  
   
   const likeuserRef = database.ref(`/messages/${msgId}/likedBy/${uid}`);
   const likedByUids =  database.ref(`/messages/${msgId}/likedBy`);
   const curdata = await likeCountRef.once('value'); 
    const likedData= await likedByUids.once('value');
    
   
   if(curdata.exists()){
        const prev = curdata.val();
       
      
        const likedUsers = transformToArr(likedData.val())

        console.log("!!!!!!");
        console.log(likedUsers);

       if(likedUsers.includes(uid)===false)
       { 
        likeCountRef.set(prev+1);
        
         likeuserRef.push(uid);
         Alert.info('Liked',2000);
       }
       else
       {
        likeCountRef.set(prev-1);
        likedByUids.child(uid).remove();
        Alert.info('Like Removed',2000);
       }
   }

   
 }

 
 
  return (
    <li className="mb-1 p-2 hoverStyle">
      
      <div className="d-flex align-items-center font-bolder mb-1">

        <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />

        
        <ProfileInfoBtnModal 
        profile={author} 
        className="p-0 ml-1 text-white" 
        appearance="link" 
        >
         {
           canGrantAdmin && 
           <Button block onClick={handleAdmin} color="blue">
             {isMsgAuthorAdmin?'Remove Admin':'Make Admin'}
           </Button>
         } 
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-weight-normal text-white-45 ml-2"
       />
  
       <IconBtnControl 
        className = {isLiked?'styledLiked':'styledRaw'}
       
        iconName = "heart"
        tooltip = "like this message"
        onClick = {()=> handleLike(message.id)}
        badgecontent = {likeCount}
       />

     {
      isAuthor&& 
      <IconBtnControl 
        className="styledCross"
        iconName = "close"
        tooltip = "delete this message"
        onClick = {()=> handleDelete(message.id,file)}
       /> 
     }

      </div>
      <div>
        {text&& <span className="word-break-all">{text}</span>}
        {file&&renderFileMessage(file)}
      </div>
    </li>
  )
}

export default memo(MessageItem)
