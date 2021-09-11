import React from 'react'
import { Switch, useLocation} from 'react-router'
import { Route } from 'react-router'
import Chat from '../Components/Chat'
import Sidebar from '../Components/Sidebar'
import { RoomsContextProvider } from '../Context/RoomsContext'
import { useMediaQuery } from '../misc/custom-hooks'

const Home = () => {

  console.log("hey buddy")
  const path = useLocation().pathname;
  
  const isDesktop = useMediaQuery(`(min-width:992px)`)
 

  const canRenderSidebar = path==='/'|| isDesktop;

  return (
   
    <RoomsContextProvider>
    <div className="container-fluid h-100">
       <div className="row h-100" >
         {canRenderSidebar && <div className= {`col col-12 col-lg-4 h-100 `}>
               <Sidebar />
         </div> }
         

      

         <Switch>
         {console.log("my path called ")}
         <Route exact path="/chats/:chatId">
    
         <div className="col col-12 col-lg-8 h-100">   
           <Chat />
         </div>  
         </Route>

         <Route>
          
           {isDesktop&&
           
              <div className="col col-12 col-lg-8 h-100">
                   <h3 className="text-center text-white mt-5">Please Select Chat</h3>
              </div>
         

           }
         </Route>

       </Switch>
   
       </div>
      
    </div>
    </RoomsContextProvider>
  )
}

export default Home
