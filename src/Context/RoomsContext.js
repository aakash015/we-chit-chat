import React,{ createContext, useState,useEffect } from "react";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helper";


export const RoomsContext = createContext();



export const  RoomsContextProvider = ({children})=>{
   
  const [rooms,setRooms] = useState(null);


    useEffect(()=>{
       
      const roomListRef = database.ref('rooms')

      roomListRef.on('value',snap=>{

        const data = transformToArrWithId(snap.val())
       
         setRooms(data);

      })

      return () =>{
        roomListRef.off();
      }
    },[])

  return <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
}