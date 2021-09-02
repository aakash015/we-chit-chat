import React, { useCallback } from 'react'
import { Alert, Button,Drawer,Icon } from 'rsuite'
import DashBoard from '.';
import {useModalState } from '../../misc/custom-hooks' 
import {auth} from '../../misc/firebase'
import '../../Styles/Drawer.css'
const DashboardToggle = () => {

  console.log("DashBoardToggle")
  const {isOpen,open,close} = useModalState(); //custom hooks 
 
  // const isMobile = useMediaQuery(`(max-width:992px)`) 
  
   const onSignOut = useCallback(()=> {

      auth.signOut();

      Alert.success('Signed Out',4000)

      close();
   },[close])

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon = "dashboard" /> Dashboard   
      </Button> 

      <Drawer className="drawer" full={window.innerWidth<=992?true:false} show={isOpen} onHide = {close} placement="left">
        <DashBoard onSignOut={onSignOut}>

        </DashBoard>
      </Drawer>
    </>
  )
}

export default DashboardToggle
