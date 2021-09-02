import React from 'react'
import { Button,Drawer,Icon } from 'rsuite'
import DashBoard from '.';
import { useModalState } from '../../misc/custom-hooks'

const DashboardToggle = () => {

  const {isOpen,open,close} = useModalState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon = "dashboard" /> Dashboard   
      </Button> 

      <Drawer show={isOpen} onHide = {close} placement="left">
        <DashBoard></DashBoard>
      </Drawer>
    </>
  )
}

export default DashboardToggle
