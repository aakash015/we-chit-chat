import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { Loader } from 'rsuite';
import { ProfileContext } from '../Context/ProfileContext';

const PrivateRoute = ({children,path,isLoading}) => {

  const {profile} = useContext(ProfileContext);
console.log("private route called")

   if(isLoading && !profile)
   {
     
       return (
          <div className="container">
            
              <Loader className="loader" center vertical size="md" content="loading" speed="slow" />
            
          </div>
       )
   }

  if(!profile && !isLoading)
  { 
   
    return <Redirect to="/signin" /> 
  }
 
  return (
    <Route  path={path}>
      {console.log("path "+path)}
      {children}
    </Route>
  )
}

export default PrivateRoute
