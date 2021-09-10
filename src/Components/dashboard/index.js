import React, { useContext } from 'react'
import { Button, Divider, Drawer, Icon,Alert } from 'rsuite'
import {ProfileContext} from '../../Context/ProfileContext'
import { database } from '../../misc/firebase'
import { getUserUpdates } from '../../misc/helper'
import AvatarUploadBtn from './AvatarUploadBtn'
import EditableInput from './EditableInput'
import ProviderBlock from './ProviderBlock'
const  DashBoard = ({onSignOut}) => {

console.log("rendered index")
  const {profile} = useContext(ProfileContext)
 
  const onSave =  async (newData)=>{
   

    try{
        //  await userNameRef.set(newData);

         const updates = await getUserUpdates(profile.uid,'name',newData,database);

         await database.ref().update(updates);

         Alert.success("Updated Successfully",4000);

    }catch(err){
         Alert.error(err.message,4000);
    }
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
     <ProviderBlock />
     <Divider />
     <EditableInput 
       name = "nickname"
       initialValue = {profile.name}
       onSave = {onSave}
       label = {<h6 className="mb-2">NickName</h6>}
     />
     <AvatarUploadBtn />
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
