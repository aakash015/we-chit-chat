import React, { useState } from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite'
import { auth } from '../../misc/firebase'
import firebase from 'firebase/app'
const ProviderBlock = () => {

  const [isConnected,setIsConnected] = useState({

    'google.com' : auth.currentUser.providerData.some((data)=>{return data.providerId==='google.com' }),
    'facebook.com' : auth.currentUser.providerData.some((data)=>{return data.providerId==='facebook.com' }),
  
  })

 // common function for unlinking from fb and google 
 
 const updateIsConnected =  (providerId,value)=>{
    setIsConnected(prev=>{
      return  {
        ...prev,
        [providerId]:value
      }
    })
 }

  const unlink = async (providerId)=>{
     
    try {
      if(auth.currentUser.providerData.length===1)
      {
          throw new Error(`you cannot disconnect from ${providerId} `)
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId,false)
      Alert.success(`disconnected from ${providerId}`,2000);
    } catch (error) {
       Alert.error(error.message,2000)
    }
  }

  const unlinkFacebook = ()=>{
    unlink('facebook.com')
  }
  const unlinkGoogle = ()=>{

    unlink('google.com')
  }


  const link = async (provider)=>{
     
    try {
      await auth.currentUser.linkWithPopup(provider)

      Alert.success(`Connected Successfully to ${provider.providerId}`,2000)

      updateIsConnected(provider.providerId,true)
    } catch (error) {
       Alert.error(error.message,2000)
    }
  }
  const linkFacebook = ()=>{
    link(new firebase.auth.FacebookAuthProvider())
  }
  const linkGoogle = ()=>{

    link(new firebase.auth.GoogleAuthProvider())
  }

  return (
    <div>

      {isConnected['google.com'] && 
       <Tag color="green" closable onClose={unlinkGoogle}>
       <Icon icon="google" /> connected
     </Tag>
      }
       
       {isConnected['facebook.com'] && 
           
           <Tag color="blue" closable onClose = {unlinkFacebook}>
           <Icon icon="facebook" /> connected
         </Tag>
         
       }

      
       <div className="mt-2">
        {!isConnected['google.com']&&
          
          <Button block color="green" onClick={linkGoogle}>
          <Icon icon="google" /> Link to Google
          </Button>
        } 
       
        {!isConnected['facebook.com'] && 
        
         <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
         </Button>
        } 
       
         

       </div>
    </div>
  )
}

export default ProviderBlock
