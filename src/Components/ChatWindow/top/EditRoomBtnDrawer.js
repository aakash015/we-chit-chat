import React, { memo } from 'react'
import { useParams } from 'react-router'
import { Alert, Button, Drawer, Tooltip, Whisper } from 'rsuite'
import { useCurrentRoom } from '../../../Context/CurrentRoomContext'
import { useModalState } from '../../../misc/custom-hooks'
import { database } from '../../../misc/firebase'
import EditableInput from '../../dashboard/EditableInput'






const EditRoomBtnDrawer = () => {

  const {chatId} = useParams();
  const updateData = (key,value)=>{
    
    database.ref(`rooms/${chatId}/${key}`).set(value).then(()=>{
      Alert.success('successfully updated',4000);
    }).catch((err)=>{
        Alert.error(err.message,'3000')
    })
   }
   const onNameSave = (newName)=>{
    
      updateData('name',newName)
   }
   
   const onDescriptionSave = (newDesc)=>{
   
      updateData('description',newDesc)
   }

  const {open,isOpen,close} = useModalState()
  const name = useCurrentRoom( v => v.name)
  const description = useCurrentRoom( v => v.description)
  const Admin = useCurrentRoom(v => v.isAdmin);

   const attr = {};
   if(!Admin)
   
   attr['disabled'] = 'disabled';
 
  return (
    <div>
      {/* <Button> */}
      <Whisper placement="left" trigger="hover" speaker={<Tooltip>
           You're admin and has right to change name and description of this group
      </Tooltip>}>

      <Button {...attr}  size="sm" color="red" onClick={open}>{!Admin?'Not Admin':'Admin'}</Button>
       </Whisper>
      {/* </Button> */}

      <Drawer show={isOpen} onHide = {close} placement="right">
        
        <Drawer.Header>

          <Drawer.Title className="text-white">
            Edit Room
          </Drawer.Title>

        </Drawer.Header>
        <Drawer.Body>

          <EditableInput 
          initialValue={name} 
          onSave={onNameSave} 
          label={<h6 className="mb-2">Name</h6>}
          emptyMsg = "name can't be empty"
          />
          
          <EditableInput 
           componentClass = "textarea"
           rows = {5}
           emptymsg = "Description can't be empty" 
           label={<h6 className="mb-2">Description</h6>}
           initialValue = {description}
           onSave = {onDescriptionSave}
           wrapperClassName="mt-3"
           
           />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close} color="red">
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnDrawer)
