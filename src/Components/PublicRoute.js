import React from 'react'
import { Redirect, Route } from 'react-router';

const PublicRoute = ({children,path}) => {

  const profile = false;

  if(profile)
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
