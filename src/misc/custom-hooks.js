import { useState ,useCallback,useEffect} from "react";

export function useModalState(defaultValue = false)
{
  const [isOpen,setIsOpen] = useState(false);

  const open = useCallback(()=>setIsOpen(true),[]);

  const close = useCallback(()=>setIsOpen(false),[]);

  return {isOpen,open,close}
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')

