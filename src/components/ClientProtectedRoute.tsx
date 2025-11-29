import React from 'react';
import { Navigate } from 'react-router-dom';

interface ClientProtectedRouteProps {
  children: React.ReactNode;
}

const ClientProtectedRoute: React.FC<ClientProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('client_auth_token');
  const user = localStorage.getItem('client_user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ClientProtectedRoute;
