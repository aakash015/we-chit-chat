import React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';



import { Route, Switch } from 'react-router';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import { BrowserRouter } from 'react-router-dom';
import PublicRoute from './Components/PublicRoute';

function App() {
  return (
  <BrowserRouter>  
   <Switch>
     <PublicRoute  path='/signin'>
        <SignIn />
     </PublicRoute>

    <PrivateRoute path='/'> 
    {/* private route is created by us  */}
      <Home />
    </PrivateRoute>

   </Switch>
   </BrowserRouter>
  );
}

export default App;
