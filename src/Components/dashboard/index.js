import React, { useContext } from 'react'
import { Button, Divider, Drawer, Icon } from 'rsuite'
import {ProfileContext} from '../../Context/ProfileContext'
import EditableInput from './EditableInput'
const  DashBoard = ({onSignOut}) => {


  const {profile} = useContext(ProfileContext)
 
  const onSave = (newData)=>{
     console.log(newData);
  }

  return (
    <>
     <Drawer.Header>
       <Drawer.Title style={{color:'white'}}>
        DashBoard
       </Drawer.Title>
     </Drawer.Header>

     <Drawer.Body>
     <h3>Hey! {profile.name}</h3>
     <Divider />
     <EditableInput 
       name = "nickname"
       initialValue = {profile.name}
       onSave = {onSave}
       label = {<h6 className="mb-2">NickName</h6>}
     />
     </Drawer.Body>

     <Drawer.Footer>
     <Button block color="red" onClick={onSignOut}>
       <Icon icon="sign-out"/>SignOut
     </Button>
     </Drawer.Footer>
    </>
  )
}

export default  DashBoard
