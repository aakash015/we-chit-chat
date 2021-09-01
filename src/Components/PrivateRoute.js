import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { Loader } from 'rsuite';
import { ProfileContext } from '../Context/ProfileContext';

const PrivateRoute = ({children,path,isLoading}) => {

  const {profile} = useContext(ProfileContext);


   if(isLoading && !profile)
   {
       return (
          <div className="container">
            
              <Loader  center vertical size="md" content="loading" speed="slow" />
            
          </div>
       )
   }
  else
  if(!profile && !isLoading)
  {
    return <Redirect to="/signin" /> 
  }
 
  return (
    <Route path={path}>
      {children}
    </Route>
  )
}

export default PrivateRoute
