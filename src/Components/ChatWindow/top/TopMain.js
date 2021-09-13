import React,{memo} from 'react'
import {ButtonToolbar, Icon} from 'rsuite'
import {Link} from 'react-router-dom'
import { useCurrentRoom } from '../../../Context/CurrentRoomContext'
import { useMediaQuery } from '../../../misc/custom-hooks'
import RoomInfoBtnModal from './RoomInfoBtnModal'
import EditRoomBtnDrawer from './EditRoomBtnDrawer'

const TopMain = () => {

  const isMobile = useMediaQuery(`(max-width:992px)`)
  

  const name = useCurrentRoom(v => v.name) //we can't pass objects values should be primitive
  
  //useCurrentRoom is out customHook defined inside currentRoomContext
  //export const useCurrentRoom = (selector)=> useContextSelector(CurrentRoomContext, selector);

  //useContextSelector is npm package basically what it does is it 
  //take the selector from us like in this case v=>v.name so here if the name changes then
  //only the component will rerender if we simply use useContext then anything from the data
  //changes that result in this component rerender

  return (
    <div>
      <div className = "d-flex justify-content-between align-items-center">
      
      <h4 className="text-disappear d-flex align-items-center">

      <Icon 
      componentClass={Link} 
      to="/" 
      icon="arrow-circle-left" 
      size="2x" 
      className ={isMobile?'d-inline-block p-0 mr-2 text-blue link-unstyled':'d-none'} 
      />

      <span className="text-white">{name}</span>
      </h4>

      <ButtonToolbar className="">
        <EditRoomBtnDrawer />
        </ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
    
  )
}

export default memo(TopMain)
