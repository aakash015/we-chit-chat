import React from 'react'
import { Badge, Tooltip, Whisper } from 'rsuite';
import { userPresence } from '../misc/custom-hooks'
import '../Styles/Dot.css'
const PresenceDot = ({uid}) => {
  

  const getColor = (presence)=>{
       
   console.log("this is presence")
   console.log(presence);
   if(!presence)
   return 
    if(presence.state==='online')
    {
       return 'green'
    }
    else
    {
       return 'red' 
    }

  }

  const getText = (presence)=>{
       
    if(!presence)
    return 'unknown state'

    else
    if(presence.state === 'online')
      return 'online'
    else
      return `Last online ${new Date(presence.last_changed).toLocaleDateString()}`  

  }
  const presence = userPresence(uid);
  
  return (
    <Whisper placement="top" trigger="hover" speaker={<Tooltip>
       {getText(presence)}
    </Tooltip>}>
     <Badge className="cursor-pointer" style={{backgroundColor:getColor(presence)}}/>
       
    </Whisper>
  )
}

export default PresenceDot
