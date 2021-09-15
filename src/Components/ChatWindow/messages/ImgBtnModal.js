import React from 'react'
import { Modal } from 'rsuite';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import { useModalState } from '../../../misc/custom-hooks'

const ImgBtnModal = ({src,fileName}) => {

  const {isOpen,close,open} = useModalState();

  return (
    <>
      <input type="image" src={src} alt="file" onClick={open} className="mw-100 mh-100 w-auto"/>

      <Modal show={isOpen} onHide={close}>
         <Modal.Header>
         <Modal.Title>{fileName}</Modal.Title>
         </Modal.Header>   
         <Modal.Body>
            <div>
              <img  src={src} height="100%" width="100%" alt="file"/>
            </div>
         </Modal.Body>
        
      </Modal> 
    </>
  )
}

export default ImgBtnModal
