import React from 'react'
import DashBoardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal'
const Sidebar = () => {
  return (
    <div className = "h-100 pt-2">

       <div>
         <DashBoardToggle />  
         <CreateRoomBtnModal></CreateRoomBtnModal>
       </div>  
       
       bottom 
    </div>
  )
}

export default Sidebar
