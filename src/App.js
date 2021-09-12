import React, { useEffect, useState } from 'react';

import 'rsuite/dist/styles/rsuite-default.css';



import {Switch } from 'react-router';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import { BrowserRouter } from 'react-router-dom';
import PublicRoute from './Components/PublicRoute';
import { ProfileContext } from './Context/ProfileContext';
import { auth, database } from './misc/firebase';
import firebase from 'firebase/app'

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};


function App() {

  const [profile,setProfile] = useState(null);
  const [isLoading,setIsloading] = useState(true);
  

   useEffect(()=>{
    let useref
    let userStatusRef; 
       auth.onAuthStateChanged(authObj => { //this is checking whether the user is 
        //authorised or not 
          console.log("king is here");
          if(authObj)
          {
            
           useref =  database.ref(`/profiles/${authObj.uid}`)
           userStatusRef = database.ref(`/status/${authObj.uid}`);
           useref.on('value',snap =>{
              const {name,createdAt,avatar} = snap.val();

             console.log("tees markan tees markhan ");
              const data = {
                name,
                createdAt,
                avatar,
                uid : authObj.uid,
                email : authObj.email
              }
  
              setProfile(data)
              setIsloading(false);
            })

          
           
          database.ref('.info/connected').on('value', (snapshot) => {
            
              if (!!snapshot.val() === false) {
                  return;
              };
          
            
              userStatusRef.onDisconnect().set(isOfflineForDatabase).then(()=>{
                 
               
                  userStatusRef.set(isOnlineForDatabase);
              });

          });

          }
          else
          {
            if(useref)
             useref.off(); //this will unsubscribe to database  because if we don't do so 
             //even if the user is logged out we will listen the changes in data etc. and 
             //we don't want that unnecessary changes 
             
             database.ref('.info/connected').off();

            if(userStatusRef)
              userStatusRef.off() 
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

     <PrivateRoute  path='/' isLoading = {isLoading}> 
    {/* private route is created by us  */}
      <Home />
    </PrivateRoute>
   
   </Switch>
   </ProfileContext.Provider>
   </BrowserRouter>
  );
}

export default App;
