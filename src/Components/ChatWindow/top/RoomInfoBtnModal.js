import React, { memo } from 'react'
import { Button, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../Context/CurrentRoomContext'
import { useModalState } from '../../../misc/custom-hooks'

const RoomInfoBtnModal = () => {

  const {open,isOpen,close} = useModalState()
  const description = useCurrentRoom(v=>v.description)
       
  const name = useCurrentRoom(v=>v.name)
  return (
    <>
     <Button appearance="link" className="px-0" onClick={open}>
       Room Information
     </Button>

     <Modal show={isOpen} onHide={close} >

      <Modal.Header>
        <Modal.Title>
          About {name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <h6 className="mb-1">Description</h6>
        <p className="text-dark">{description}</p>
      </Modal.Body>

      <Modal.Footer className="mt-5">
        <Button block onClick={close} color="red">
          close
        </Button>
      </Modal.Footer>
     </Modal>
    </>
  )
}

export default memo(RoomInfoBtnModal)
