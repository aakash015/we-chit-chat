import { useState ,useCallback,useEffect} from "react";

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
