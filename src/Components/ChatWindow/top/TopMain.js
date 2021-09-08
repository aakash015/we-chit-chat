import React,{memo} from 'react'
import { useCurrentRoom } from '../../../Context/CurrentRoomContext'

const TopMain = () => {

  console.log("TopMain rendered")
  const name = useCurrentRoom(v => v.name) //we can't pass objects values should be primitive
  
  //useCurrentRoom is out customHook defined inside currentRoomContext
  //export const useCurrentRoom = (selector)=> useContextSelector(CurrentRoomContext, selector);

  //useContextSelector is npm package basically what it does is it 
  //take the selector from us like in this case v=>v.name so here if the name changes then
  //only the component will rerender if we simply use useContext then anything from the data
  //changes that result in this component rerender

  return (
    <div>
      {name}
    </div>
    
  )
}

export default memo(TopMain)
