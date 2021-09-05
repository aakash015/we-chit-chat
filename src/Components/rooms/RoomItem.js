import React from 'react'
import TimeAgo from 'timeago-react';
const RoomItem = ({room}) => {

  const {createdAt,name} = room;
  return (
    <>

      <div className='d-flex justify-content-between align-items-center'>

        <h3>{name}</h3>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-weight-normal text-white-45"
       />
      </div>
      <div className="text-white">
        <span>No Messages Yet.....</span>
      </div> 
    </>

  )
}

export default RoomItem
