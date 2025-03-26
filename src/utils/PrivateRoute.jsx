import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, status } = useSelector(state => state.auth);
  
  // Если еще загружается, показываем загрузку
  if (status === 'loading') {
    return <div className="loading-spinner" style={{ margin: '2rem auto' }} />;
  }
  
  // Если не аутентифицирован, редиректим на логин
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Если аутентифицирован, показываем запрошенный роут
  return children;
};

export default PrivateRoute; 