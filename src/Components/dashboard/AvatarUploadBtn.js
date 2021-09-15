import React, { useContext, useRef, useState } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import AvatarEditor  from "react-avatar-editor"
import { useModalState } from '../../misc/custom-hooks'
import '../../Styles/Drawer.css' //pointer hand css of label
import { ProfileContext } from '../../Context/ProfileContext'
import { database, storage } from '../../misc/firebase'
import ProfileAvatar from './ProfileAvatar'
import { getUserUpdates } from '../../misc/helper'


const AvatarUploadBtn = () => {

  const filetype = '.png,.jpg,.jpeg'
  const acceptedFileType = ['image/png','image/jpeg','image/jpg']
   const {isOpen,open,close} = useModalState();
   const {profile} = useContext(ProfileContext)
   const [img,setImg] = useState(null)
   const [isLoading,setIsLoading] = useState(false);

   const avatarEditorRef = useRef();

    const isValidFile = (file)=>{
        return acceptedFileType.includes(file.type)
    }

    const getBlob = (canvas) =>{

      return new Promise((resolve,reject)=>{

        canvas.toBlob((blob)=>{
          if(blob)
          {
            resolve(blob)
          }
          else
          {
            reject(new Error('File process error'))
          }
        })
      })
    }
   function onfileInputChange(ev){
      

    const currFiles = ev.target.files;

     if(currFiles.length===1)
     {
        const file = currFiles[0];

        if(isValidFile(file))
        {
           setImg(file)
            open()
        }
        else{
          Alert.warning("please select Images only",2000);
        }

     }
   }

  async function onUploadClick(){
      
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    
    setIsLoading(true)
    try {
      const blob = await getBlob(canvas);  //to blob was an inbuilt function that 
      //uses callbacks so to use promise based syntax we used this getBlob our own function
    
      const avatarpath = storage.ref(`/profile/${profile.uid}`).child('avatar');
      

    

      const uploadAvatarResult = await avatarpath.put(blob);
    
      console.log("!@!@!@!@")
     console.log(uploadAvatarResult);

      const downloadURL = await uploadAvatarResult.ref.getDownloadURL()
    

      const updates = await getUserUpdates(profile.uid,'avatar',downloadURL,database);

      // const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');
      // userAvatarRef.set(downloadURL);
     
      await database.ref().update(updates);
      close()
      setIsLoading(false)
      Alert.info('Avatar Uploaded',2000);

    } catch (error) {
      
      setIsLoading(false);
      Alert.error(error.message,2000)
    } 
  }
  return (
    <div className="mt-2 text-center">
       
       <ProfileAvatar //our component 
         src = {profile.avatar} 
         name = {profile.name}
         style = {{width:'150px', height:'150px'}}
       />
       <div>

         <label htmlFor="avatar-upload" id="avatar-label" className="d-block p-3">
           <h4>Select New Avatar</h4>
           <input 
           id="avatar-upload" 
           type="file" 
           className="d-none" 
           accept={filetype}
           onChange = {onfileInputChange}
           />
         </label>

         <Modal show={isOpen} onHide={close}>

           <Modal.Header>
             <Modal.Title>
               Adjust and upload new avatar
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             {img && 
               
               <AvatarEditor
               className="ml-5"
               ref = {avatarEditorRef}
               image={img}
               width={200}
               height={200}
               border={10}
               borderRadius = {100}
               rotate={0}
               />
             
             }
           </Modal.Body>
           <Modal.Footer>
             <Button 
              block 
              appearance="ghost" 
              color="green" 
              onClick = {onUploadClick}
              disabled = {isLoading}
              >
              Upload
              </Button>
           </Modal.Footer>
         </Modal>
       </div>
    </div>
  )
}

export default AvatarUploadBtn
