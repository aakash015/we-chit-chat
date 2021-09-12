/* eslint-disable react-hooks/rules-of-hooks */
import { useState ,useCallback,useEffect} from "react";
import { database } from "./firebase";

export function useModalState(defaultValue = false)
{
  const [isOpen,setIsOpen] = useState(false);

  const open = useCallback(()=>setIsOpen(true),[]);

  const close = useCallback(()=>setIsOpen(false),[]);

  return {isOpen,open,close}
}


export const useMediaQuery = query => {
  console.log("useMediaQuery called ")
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    console.log("hey i am query list");
    console.log(queryList);
    setMatches(queryList.matches);

    const listener = (evt) =>{

      console.log("hey i am event")
       console.log(evt);
      setMatches(evt.matches);
    } 

    queryList.addListener(listener);
    return () =>{
      console.log("cleanup function called")
       queryList.removeListener(listener);
    }
  }, [query]);

  return matches;
};


export const  userPresence = (uid) =>{
  

  const [presence,setPresence] = useState(null);

  console.log("userPresence custom-hooks called here");
  
  useEffect(()=>{
    console.log("userPresence useEffect run here");

    const userStatusRef = database.ref(`/status/${uid}`)

    userStatusRef.on('value',(snap)=>{
       
      // console.log("hey snap . val is this ")
      // console.log(snap.val())
      // console.log("hey there i am snap val")
      // console.log(snap.val())
      if(snap.val())
      {
         setPresence(snap.val())
      }
      

      return ()=> userStatusRef.off('value')
    })
  },[uid])

  console.log("returning presence")
  console.log(presence)
  return presence
}