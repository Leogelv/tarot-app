import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileNavbar = () => {
  // Навигационные элементы
  const navItems = [
    { path: '/', icon: 'home', label: 'Главная', exact: true },
    { path: '/cards', icon: 'style', label: 'Карты' },
    { path: '/daily-card', icon: 'today', label: 'Карта дня' },
    { path: '/spreads', icon: 'dashboard', label: 'Расклады' },
    { path: '/profile', icon: 'person', label: 'Профиль' }
  ];
  
  return (
    <NavbarContainer>
      {navItems.map((item, index) => (
        <NavItem 
          key={index}
          to={item.path}
          end={item.exact}
          as={motion.div}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(9, 11, 26, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 0;
  z-index: 1000;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.8rem;
  transition: all 0.2s ease;
  
  span {
    font-size: 1.5rem;
    margin-bottom: 3px;
  }
  
  &.active {
    color: var(--primary);
  }
`;

const NavLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
`;

export default MobileNavbar; 