import React, { useState } from 'react'
import { Alert, Icon, InputGroup } from 'rsuite'
import { ReactMic } from 'react-mic';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router';

const AudioMsgBtn = ({afterUpload}) => {

  const [isRecording,setIsRecording] = useState(false);
 const [isUploading,setIsUploading] = useState(false);

 const {chatId} = useParams()
  const onClick = ()=>{
    setIsRecording(p=>!p)
  }

  const onUpload = async(data)=>{
    setIsUploading(true)
    try {
     const snap =  await storage.ref(`/chat/${chatId}`)
                        .child(`audio_${Date.now()}.mp3`).put(data.blob)

      const file =  {
                      contentType : snap.metadata.contentType,
                      name  :snap.metadata.name,
                      url: await snap.ref.getDownloadURL()
                    }
                    
                    setIsUploading(false);
                    Alert.success('Audio sent',2000)
                    afterUpload([file])
                    
    } catch (error) {
      setIsUploading(false)
      Alert.error(error.message,4000)
    }
  }
  return (
    <>
      <InputGroup.Button onClick={onClick} disabled={isUploading} className={isRecording?'animate-blink':''}>
      <Icon icon="microphone" />
      
      <ReactMic
          record={isRecording}
          className="d-none"//sound-wave
          onStop={onUpload}
          mimeType='audio/mp3'
      />


      </InputGroup.Button> 
    </>
  )
}

export default AudioMsgBtn
