import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';
import {Switch} from "react-router-dom";
import Navbar from './navbar';

const ProtectedRoute = ({children}) => {
    
  const cookie=Cookies.get('role');
  

  if(cookie)
  {
      return(
          <>
          <Navbar />
           <Switch>
           {children}
           </Switch>
          </>
      )
  }

  else
  {
      return(
          
          <Redirect to="/login" />
      )
  }
  
  
  
}

export default ProtectedRoute;
