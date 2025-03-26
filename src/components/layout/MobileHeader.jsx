import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const MobileHeader = () => {
  const location = useLocation();
  
  // Определяем заголовок страницы на основе URL
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Главная';
    if (path === '/cards') return 'Библиотека карт';
    if (path === '/daily-card') return 'Карта дня';
    if (path === '/spreads') return 'Расклады';
    if (path.includes('/spreads/')) return 'Детали расклада';
    if (path === '/profile') return 'Профиль';
    if (path === '/search') return 'Поиск';
    if (path === '/about') return 'О приложении';
    if (path === '/login') return 'Вход';
    if (path === '/register') return 'Регистрация';
    
    return 'Таро App';
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoIcon className="material-symbols-rounded">auto_awesome</LogoIcon>
        <span>Tarot App</span>
      </Logo>
      
      <PageTitle>{getPageTitle()}</PageTitle>
      
      <ActionButtons>
        <ActionButton to="/search">
          <span className="material-symbols-rounded">search</span>
        </ActionButton>
      </ActionButtons>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(15, 15, 26, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
`;

const LogoIcon = styled.span`
  margin-right: 6px;
  font-size: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PageTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  text-align: center;
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled(Link)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.1);
  }
  
  .material-symbols-rounded {
    font-size: 1.3rem;
  }
`;

export default MobileHeader;