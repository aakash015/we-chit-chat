import React, { useContext } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { Loader, Nav } from 'rsuite'
import { RoomsContext } from '../../Context/RoomsContext'
import RoomItem from './RoomItem'

const ChatRoomList = () => {

  const rooms = useContext(RoomsContext);
  const location = useLocation()
  return (
    <Nav
     appearance="subtle"
     style={{height:'77%'}}
     vertical
     className="custom-scroll"
     activeKey = {location.pathname}
    >
      {!rooms && <Loader size="md" center vertical content="Loading" speed="fast"/>}
      {
        rooms && rooms.length>0 && rooms.map(room => 
         <Nav.Item 
          componentClass={Link} 
          to={`/chats/${room.id}`} 
          key={room.id}
          eventKey = {`/chats/${room.id}`}
          >
          <RoomItem room ={room}/>
        </Nav.Item>)
      }
    
    </Nav>
  )
}

export default ChatRoomList
