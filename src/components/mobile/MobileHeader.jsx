import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const MobileHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Определение названия текущей страницы
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Tarot Insights';
    if (path === '/cards') return 'Библиотека карт';
    if (path === '/daily-card') return 'Карта дня';
    if (path === '/spreads') return 'Расклады';
    if (path === '/profile') return 'Профиль';
    if (path.includes('/spreads/')) return 'Расклад';
    if (path.includes('/cards/')) return 'Информация о карте';
    
    return 'Tarot Insights';
  };
  
  // Эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer scrolled={isScrolled}>
      <HeaderContent>
        <Logo>
          <MoonIcon>🌙</MoonIcon>
          <LogoText>{getPageTitle()}</LogoText>
        </Logo>
      </HeaderContent>
      <GlowEffect />
    </HeaderContainer>
  );
};

// Анимация свечения
const glowAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: background-color 0.3s ease;
  background-color: ${props => props.scrolled ? 'rgba(58, 42, 108, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: white;
  margin: 0;
  position: relative;
`;

const MoonIcon = styled.span`
  font-size: 1.5rem;
  position: relative;
  z-index: 2;
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 50px;
  background: radial-gradient(ellipse at center, rgba(174, 102, 174, 0.5) 0%, rgba(174, 102, 174, 0) 70%);
  border-radius: 50%;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
`;

export default MobileHeader; 