import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavbar = () => {
  return (
    <NavbarContainer>
      <NavItems>
        <NavItem to="/">
          <span className="material-symbols-rounded">home</span>
          <span>Главная</span>
        </NavItem>
        <NavItem to="/cards">
          <span className="material-symbols-rounded">style</span>
          <span>Карты</span>
        </NavItem>
        <NavItem to="/daily-card">
          <span className="material-symbols-rounded">auto_awesome</span>
          <span>Карта дня</span>
        </NavItem>
        <NavItem to="/spreads">
          <span className="material-symbols-rounded">dashboard</span>
          <span>Расклады</span>
        </NavItem>
        <NavItem to="/profile">
          <span className="material-symbols-rounded">person</span>
          <span>Профиль</span>
        </NavItem>
      </NavItems>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background: rgba(9, 11, 26, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid var(--border);
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.7rem;
  padding: 5px;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  position: relative;
  
  &.active {
    color: var(--primary);
  }
  
  &::after {
    display: none;
  }
  
  .material-symbols-rounded {
    font-size: 1.5rem;
    margin-bottom: 3px;
  }
  
  &:hover {
    color: var(--primary);
  }
`;

export default MobileNavbar; 