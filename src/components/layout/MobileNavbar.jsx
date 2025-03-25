import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MobileNavbar = () => {
  const location = useLocation();
  
  return (
    <NavbarContainer>
      <NavLink 
        to="/" 
        $isActive={location.pathname === '/'}
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
      >
        <NavIcon className="material-symbols-rounded">home</NavIcon>
        <NavText>Главная</NavText>
      </NavLink>
      
      <NavLink 
        to="/cards" 
        $isActive={location.pathname === '/cards'}
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
      >
        <NavIcon className="material-symbols-rounded">style</NavIcon>
        <NavText>Карты</NavText>
      </NavLink>
      
      <NavLink 
        to="/daily-card" 
        $isActive={location.pathname === '/daily-card'}
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
      >
        <NavIcon className="material-symbols-rounded">auto_awesome</NavIcon>
        <NavText>Дневная</NavText>
      </NavLink>
      
      <NavLink 
        to="/spreads" 
        $isActive={location.pathname === '/spreads' || location.pathname.startsWith('/spreads/')}
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
      >
        <NavIcon className="material-symbols-rounded">grid_view</NavIcon>
        <NavText>Расклады</NavText>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        $isActive={location.pathname === '/profile'}
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
      >
        <NavIcon className="material-symbols-rounded">person</NavIcon>
        <NavText>Профиль</NavText>
      </NavLink>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-top: 1px solid var(--border);
  padding-bottom: env(safe-area-inset-bottom);
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-decoration: none;
  color: ${props => props.$isActive ? 'var(--primary)' : 'var(--text-secondary)'};
  height: 100%;
  position: relative;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 3px;
    border-radius: 0 0 var(--radius-full) var(--radius-full);
    background: ${props => props.$isActive ? 'var(--gradient-primary)' : 'transparent'};
    opacity: ${props => props.$isActive ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    color: var(--primary);
  }
`;

const NavIcon = styled.span`
  font-size: 24px;
  margin-bottom: 4px;
  transition: transform 0.3s ease;
`;

const NavText = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

export default MobileNavbar; 