import React from 'react'
import "../Styles/ChatRoomList.css"
import DashBoardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal'
import { Divider } from 'rsuite'
import ChatRoomList from './rooms/ChatRoomList'
const Sidebar = () => {
  return (
    <div className = "h-100 pt-2">

       <div>
         <DashBoardToggle />  
         <CreateRoomBtnModal></CreateRoomBtnModal>
         <Divider><span className="divider-style">Join Conversation</span></Divider>
       </div>  
       
       <ChatRoomList />
       
    </div>
  )
}

export default Sidebar
