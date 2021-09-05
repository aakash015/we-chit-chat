import React from 'react'
import Sidebar from '../Components/Sidebar'
import { RoomsContextProvider } from '../Context/RoomsContext'

const Home = () => {
  return (
   
    <RoomsContextProvider>
    <div className="container-fluid h-100">
       <div className="row">
         <div className="col col-xs-12 col-md-4">
               <Sidebar />
         </div>
       </div>
      
    </div>
    </RoomsContextProvider>
  )
}

export default Home
