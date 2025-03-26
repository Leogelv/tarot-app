import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const MobileNavbar = () => {
  // Навигационные элементы
  const navItems = [
    { path: '/', icon: 'home', label: 'Главная', exact: true },
    { path: '/cards', icon: 'style', label: 'Карты' },
    { path: '/daily-card', icon: 'today', label: 'Карта дня' },
    { path: '/spreads', icon: 'dashboard', label: 'Расклады' },
    { path: '/profile', icon: 'person', label: 'Профиль' }
  ];
  
  // Анимация для иконок
  const iconAnimate = (isActive) => {
    return {
      y: isActive ? -5 : 0,
      scale: isActive ? 1.2 : 1,
      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 15,
        repeat: isActive ? Infinity : 0,
        repeatType: "reverse",
        repeatDelay: 2
      }
    };
  };

  return (
    <NavbarContainer>
      {navItems.map((item, index) => (
        <NavItem 
          key={index}
          to={item.path}
          end={item.exact}
          className={({isActive}) => isActive ? 'active' : ''}
        >
          {({isActive}) => (
            <>
              <IconWrapper
                animate={iconAnimate(isActive)}
                initial={false}
              >
                <span className="material-symbols-rounded">{item.icon}</span>
              </IconWrapper>
              <NavLabel isActive={isActive}>{item.label}</NavLabel>
            </>
          )}
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
  background: rgba(9, 11, 26, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 0;
  z-index: 1000;
  height: 65px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.8rem;
  transition: all 0.2s ease;
  width: 20%;
  height: 100%;
  
  &.active {
    color: var(--primary);
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  
  .material-symbols-rounded {
    font-size: 24px;
    font-variation-settings: 'FILL' 1;
  }
`;

const NavLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${props => props.isActive ? 'var(--primary)' : 'var(--text-secondary)'};
  transition: color 0.2s ease;
`;

export default MobileNavbar; 