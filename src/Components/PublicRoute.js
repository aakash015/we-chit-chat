import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { Loader } from 'rsuite';
import { ProfileContext } from '../Context/ProfileContext';

const PublicRoute = ({children,path,isLoading}) => {

  const {profile} = useContext(ProfileContext);
  
  console.log("public route called");

 if(isLoading && !profile )
 {
   console.log("loader returned")
   return  (
    <div className="container">
            
     <Loader center vertical size="lg"  content="loading" speed="fast" />
   
   </div>

   )

 } 

  if(profile && !isLoading)
  {
    console.log("home returned")
    return <Redirect to="/" /> 
  }
 
  return (
    <Route exact path={path}>
      {children}
    </Route>
  )
}

export default PublicRoute
