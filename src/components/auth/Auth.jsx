import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';

// Временная заглушка компонента Auth
const Auth = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  // В демо-версии просто перенаправляем на главную страницу
  return <Navigate to={from} replace />;
};

export default Auth; 