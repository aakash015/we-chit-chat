import React from 'react'
import TimeAgo from 'timeago-react'
import ProfileAvatar from '../../dashboard/ProfileAvatar'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'

const MessageItem = ({message}) => {

  const {author,createdAt,text} = message
  return (
    <li className="mb-1 p-2">
      
      <div className="d-flex align-items-center font-bolder mb-1">

        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />

        
        <ProfileInfoBtnModal profile={author} className="p-0 ml-1 text-white styleBlack" appearance="link" />
        <TimeAgo
          datetime={createdAt}
          className="font-weight-normal text-white-45 ml-2"
       />
      </div>
      <div>
        <span classname="word-break-all">{text}</span>
      </div>
    </li>
  )
}

export default MessageItem
