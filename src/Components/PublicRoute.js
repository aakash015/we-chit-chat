import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { Loader } from 'rsuite';
import { ProfileContext } from '../Context/ProfileContext';

const PublicRoute = ({children,path,isLoading}) => {

  const {profile} = useContext(ProfileContext);
  
 if(isLoading && !profile )
 {
   return  (
    <div className="container">
            
     <Loader center vertical size="lg"  content="loading" speed="fast" />
   
   </div>

   )  
 } 

  if(profile && !isLoading)
  {
    return <Redirect to="/" /> 
  }
 
  return (
    <Route path={path}>
      {children}
    </Route>
  )
}

export default PublicRoute
