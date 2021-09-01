import React, { useEffect, useState } from 'react';

import 'rsuite/dist/styles/rsuite-default.css';



import { Route, Switch } from 'react-router';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import { BrowserRouter } from 'react-router-dom';
import PublicRoute from './Components/PublicRoute';
import { ProfileContext } from './Context/ProfileContext';
import { auth, database } from './misc/firebase';



function App() {

  const [profile,setProfile] = useState(null);
  const [isLoading,setIsloading] = useState(true);
let useref
   useEffect(()=>{
       auth.onAuthStateChanged(authObj => {
          console.log("king is here");
          if(authObj)
          {
            
           useref =  database.ref(`/profiles/${authObj.uid}`)
          
           useref.on('value',snap =>{
              const {name,createdAt} = snap.val();

             console.log("tees markan tees markhan ");
              const data = {
                name,
                createdAt,
                uid : authObj.uid,
                email : authObj.email
              }
  
              setProfile(data)
              setIsloading(false);
            })

           
          }
          else
          {
            if(useref)
             useref.off();
             
               setProfile(null)
               setIsloading(false);
          }
       })
   },[])
   


  return (
  <BrowserRouter>
  <ProfileContext.Provider value={{profile,setProfile}}>  
   <Switch>
     <PublicRoute  path='/signin' isLoading={isLoading}>
        <SignIn />
     </PublicRoute>

    <PrivateRoute path='/' isLoading = {isLoading}> 
    {/* private route is created by us  */}
      <Home />
    </PrivateRoute>

   </Switch>
   </ProfileContext.Provider>
   </BrowserRouter>
  );
}

export default App;
