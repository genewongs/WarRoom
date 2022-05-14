import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../firebase-config.js';

const useAuth = () => auth.currentUser !== null;

function ProtectedRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
