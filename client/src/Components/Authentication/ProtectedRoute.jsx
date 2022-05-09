import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {auth} from '../../firebase-config.js';

const useAuth = () => {
  return auth.currentUser !== undefined;
  // console.log('protected route is being called')
  // return false;
}


function ProtectedRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoute;