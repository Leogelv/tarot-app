import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MobileNavbar = () => {
  const navItems = [
    { path: '/', icon: 'home', label: 'Главная', exact: true },
    { path: '/cards', icon: 'category', label: 'Карты' },
    { path: '/daily-card', icon: 'today', label: 'Карта дня' },
    { path: '/spreads', icon: 'dashboard', label: 'Расклады' },
    { path: '/profile', icon: 'person', label: 'Профиль' }
  ];

  return (
    <NavbarContainer>
      <NavContent>
        {navItems.map((item) => (
          <NavItem 
            key={item.path} 
            to={item.path}
            end={item.exact}
          >
            <NavIcon className="material-symbols-rounded">{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        ))}
      </NavContent>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 26, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  padding: 8px 0;
  z-index: 100;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 8px 0;
  width: 20%;
  transition: color 0.2s ease;
  
  &.active {
    color: var(--primary);
  }
`;

const NavIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 4px;
`;

const NavLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
`;

export default MobileNavbar; 