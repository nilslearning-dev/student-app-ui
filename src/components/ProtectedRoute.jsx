import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const reduxAuth = useSelector((state) => state.auth.isAuthenticated);
  const localAuth =
    typeof window !== 'undefined' && window.localStorage.getItem('isAuthenticated') === 'true';
  const isAuthenticated = reduxAuth || localAuth;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
