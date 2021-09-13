import React, { useRef, useState } from 'react'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks'
import firebase from 'firebase/app'
import { auth, database } from '../../misc/firebase'


const model = Schema.Model({
  name:Schema.Types.StringType().isRequired('Chat Name is Required'),
  description : Schema.Types.StringType().isRequired("Required")
})

const INITIAL_FORM = {
  name  :'',
  description :''
}
const CreateRoomBtnModal = () => {

  const {isOpen,open,close} = useModalState(); //our custom hook 
  const [formValue,setFormValue] = useState(INITIAL_FORM);
  const [isLoading,setIsLoading] = useState(false);
  
  const formRef = useRef()
  const onFormChange = (value)=>{
      setFormValue(value)
  }

  const onSubmit = async () =>{
      
        if(!formRef.current.check())
        {
           return;
        }
        else{
          setIsLoading(true);

          const newRoomData = {
            ...formValue,
            createdAt : firebase.database.ServerValue.TIMESTAMP,
            admins : {
              [auth.currentUser.uid] : true
            }
          }

          try {
             await database.ref('rooms').push(newRoomData);

             setIsLoading(false);

             setFormValue(INITIAL_FORM);
              
              close()

              Alert.success("chat room created successfully ");

          } catch (error) {
            setIsLoading(false);
            Alert.error(error.message,4000)
          }
        }
  }
  return (
    <div className = "mt-2">
    <Button block color="green" onClick = {open}>
      <Icon icon="creative" />Create new chat room    
    </Button>

    <Modal show={isOpen} onHide = {close}>
 
    <Modal.Header>
      <Modal.Title>New Chat Room</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <Form fluid onChange = {onFormChange} ref={formRef}  model={model}>
        <FormGroup>
          <ControlLabel>Room Name</ControlLabel>
          <FormControl name="name" placeholder="Enter chat room name..." />
        </FormGroup>


        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textArea" rows={5} name="description" placeholder="Enter room description..." />
      
        </FormGroup>

      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>Create new chat room</Button>;
    </Modal.Footer>
    </Modal>

    </div>
  )
}

export default CreateRoomBtnModal
