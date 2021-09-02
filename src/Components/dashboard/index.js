import React, { useContext } from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import {ProfileContext} from '../../Context/ProfileContext'
const  DashBoard = ({onSignOut}) => {

  console.log("index drawer")
  const {profile} = useContext(ProfileContext)
  return (
    <>
     <Drawer.Header>
       <Drawer.Title style={{color:'white'}}>
        DashBoard
       </Drawer.Title>
     </Drawer.Header>

     <Drawer.Body>
     <h3>Hey! {profile.name}</h3>
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
