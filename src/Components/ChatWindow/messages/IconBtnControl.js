import React from 'react'
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite'



const ConditionalBadge = ({condition,children})=>{
    
  return condition?<Badge content={condition}>{children}</Badge>:children
}

const IconBtnControl = ({iconName,tooltip,onClick,badgecontent,className}) => {

  return (
    <div className="ml-2">
      
        
         <ConditionalBadge condition={badgecontent}>
            
         <Whisper 
           placement="top"
           delay={0}
           delayHide={0}
           delayShow={0}
           trigger="hover"
           speaker={<Tooltip>{tooltip}</Tooltip>}
          >
            <IconButton 
             
             className={className}
             onClick={onClick}
             circle
             size="xs"
             icon = {<Icon icon={iconName}/>}
            />
          </Whisper>
              
         </ConditionalBadge>
          

    </div>
  )

}

export default IconBtnControl
