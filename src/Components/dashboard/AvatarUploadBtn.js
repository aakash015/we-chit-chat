import React, { useState } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import AvatarEditor  from "react-avatar-editor"
import { useModalState } from '../../misc/custom-hooks'
import '../../Styles/Drawer.css' //pointer hand css of label


const AvatarUploadBtn = () => {

  const filetype = '.png,.jpg,.jpeg'
  const acceptedFileType = ['image/png','image/jpeg','image/jpg']
   const {isOpen,open,close} = useModalState();
   
   const [img,setImg] = useState(null)

    const isValidFile = (file)=>{
        return acceptedFileType.includes(file.type)
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

 
  return (
    <div className="mt-3 text-center">
       
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
             <Button block appearance="ghost">Upload</Button>
           </Modal.Footer>
         </Modal>
       </div>
    </div>
  )
}

export default AvatarUploadBtn
