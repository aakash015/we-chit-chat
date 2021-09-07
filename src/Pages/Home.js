import React from 'react'
import { Switch, useLocation} from 'react-router'
import { Route } from 'react-router'
import Chat from '../Components/Chat'
import Sidebar from '../Components/Sidebar'
import { RoomsContextProvider } from '../Context/RoomsContext'
import "../Styles/ChatMediaQuery.css"
const Home = () => {

  const path = useLocation().pathname;
  
 
  return (
   
    <RoomsContextProvider>
    <div className="container-fluid h-100">
       <div className="row h-100" >
         <div className= {`col col-12 col-lg-4 h-100 ${ (path!=='/')?'custom-render':''}`}>
               <Sidebar />
         </div>

      

         <Switch>
           {/* {console.log("this switch component called")} */}
       
         <Route  path="/chats/:chatId">
    
         <div className="col col-12 col-lg-8 h-100">   
           <Chat />
         </div>  
         </Route>

         <Route>
           {console.log("hey i am a default route")}
           {window.innerWidth>992 &&
            <div className="col col-12 col-lg-8 h-100">
                 <h3 className="text-center text-white">Please Select Chat</h3>
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
