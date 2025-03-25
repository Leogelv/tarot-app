import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MobileHeader = () => {
  const location = useLocation();
  
  // Определяем заголовок страницы на основе текущего пути
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Главная';
    if (path === '/cards') return 'Библиотека карт';
    if (path === '/daily-card') return 'Карта дня';
    if (path === '/spreads') return 'Расклады';
    if (path.startsWith('/spreads/')) return 'Просмотр расклада';
    if (path === '/profile') return 'Профиль';
    if (path === '/about') return 'О проекте';
    if (path === '/login') return 'Вход';
    if (path === '/register') return 'Регистрация';
    
    return 'Таро Инсайт';
  };
  
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <LogoText>
          <LogoIcon>✨</LogoIcon>
          <span>Таро Инсайт</span>
        </LogoText>
      </LogoLink>
      
      <PageTitle
        as={motion.h1}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={location.pathname}
      >
        {getPageTitle()}
      </PageTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-bottom: 5px;
`;

const LogoText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoIcon = styled.span`
  margin-right: 5px;
  font-size: 1.4rem;
`;

const PageTitle = styled.h1`
  font-size: 1.3rem;
  margin: 0;
  font-weight: 600;
  color: var(--text);
`;

export default MobileHeader; 