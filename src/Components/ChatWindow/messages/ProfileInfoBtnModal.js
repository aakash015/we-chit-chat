import React from 'react'
import { Button, Modal } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks'
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({profile,children,...btnProps}) => {

  const {open,close,isOpen} = useModalState();
  const {name,avatar,createdAt} = profile;

  const shortName =  name.split(' ')[0]
  return (
    <>
       <Button 
        onClick={open} 
        {...btnProps}
        >
           {shortName}
       </Button>
       <Modal show = {isOpen} onHide = {close}>
          
          <Modal.Header>

            <Modal.Title>
              {shortName} Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
              
          <ProfileAvatar //our component 
         src = {avatar} 
         name = {name}
         style = {{width:'150px', height:'150px'}}
       />

     <h4 className="mt-2">{name}</h4>
     <p className="text-black-50">Member Since {new Date(createdAt).toLocaleDateString()}</p>
          </Modal.Body>
          <Modal.Footer>
            {children}
            <Button block onClick={close} color="red" >
               Close
            </Button>
          </Modal.Footer>
          
       </Modal>
    </>
  )
}

export default ProfileInfoBtnModal
