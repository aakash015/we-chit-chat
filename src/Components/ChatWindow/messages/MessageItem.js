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

const MessageItem = ({message}) => {

  const {author,createdAt,text} = message
  const {chatId} = useParams()

  const isAdmin = useCurrentRoom(v => v.isAdmin)
  const admins = useCurrentRoom(v=>v.admins)

  const isMsgAuthorAdmin = admins.includes(author.uid)
  const isAuthor = auth.currentUser.uid ===author.uid
  const canGrantAdmin = isAdmin && !isAuthor

  
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
        isVisible
        iconName = "heart"
        tooltip = "like this message"
        onClick = {()=>{}}
        badgecontent = {5}
       />

      </div>
      <div>
        <span classname="word-break-all">{text}</span>
      </div>
    </li>
  )
}

export default memo(MessageItem)
