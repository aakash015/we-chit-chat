import React, { useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks'
import { storage } from '../../../misc/firebase';


const MAX_FILE_SIZE = 1000*1024*5;

const AttachmentBtnModal = ({afterUpload}) => {

  const {chatId} = useParams()
  const {open,isOpen,close} = useModalState()

  const [fileList,setFileList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const onChange = (fileArr)=>{

     const filtered = fileArr.filter(el=>el.blobFile.size<=MAX_FILE_SIZE).slice(0,5);

     setFileList(filtered)

    console.log(fileArr);

  }

  const onUpload = async ()=>{

    try {
      
     const uploadPromises =  fileList.map(f =>{

     return storage.ref(`/chat/${chatId}`).child(Date.now()+f.name).put(f.blobFile)
     })

     const uploadSnapshots = await Promise.all(uploadPromises)
     
     console.log('file snaps')
     console.log(uploadSnapshots);

     const shapePromises =  uploadSnapshots.map(async (snap)=>{
        
       return {
         contentType : snap.metadata.contentType,
         name  :snap.metadata.name,
         url: await snap.ref.getDownloadURL()
       }
     })

    const files = await Promise.all(shapePromises)

    await afterUpload(files)

    setIsLoading(false);
    close()
    
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message)
    }
  }
  return (
    <>
      <InputGroup.Button onClick={open}>
      <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>

       <Modal.Header>
         <Modal.Title>Upload Files</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         
       <Uploader
          autoUpload={false}
          action=""
         fileList = {fileList}
          onChange={onChange}
          multiple
          listType="picture-text"
          className="mb-1"
          disabled={isLoading}
        />

       </Modal.Body>
       <Modal.Footer>
         <Button block color="green" disabled={isLoading} onClick={onUpload}>Send to chat</Button>
         <div className="text-right mt-2">
           <small className="text-danger">* only files less than 5mb are allowed</small>
         </div>
       </Modal.Footer>

      </Modal>
    </>
  )
}

export default AttachmentBtnModal
