import React from 'react'
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({children,path}) => {

  const profile = false;

  if(!profile)
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
