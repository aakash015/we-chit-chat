import React from 'react'
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../dashboard/ProfileAvatar';
const RoomItem = ({room}) => {

  const {createdAt,name,lastMessage} = room;
  return (
    <>

      <div className='d-flex justify-content-between align-items-center'>

        <h3>{name}</h3>
        <TimeAgo
          datetime={lastMessage? new Date(lastMessage.createdAt):new Date(createdAt)}
          className="font-weight-normal text-white-45"
       />
      </div>
      <div className="d-flex align-items-center text-white">
        {
          lastMessage?
          (
          <>
           <div className="d-flex align-items-center ">
             <ProfileAvatar src={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>
           </div>

           <div className="ml-2">
              <div className = "font-italic text-white">{lastMessage.author.name}</div>
              <span className="text-white">{lastMessage.text||lastMessage.file.name}</span>
           </div>
          </>
          ):( <span>No Messages Yet.....</span>)
        }
       
      </div> 
    </>

  )
}

export default RoomItem
