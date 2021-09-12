import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitials } from '../../misc/helper'

const ProfileAvatar = ({name,...avatarProps}) => {
  console.log("Initially the name is ");
  console.log(name)
  return (
    <Avatar   className="avatar-size" circle {...avatarProps} >
      {getNameInitials(name)}
    </Avatar>
  )
}

export default ProfileAvatar
