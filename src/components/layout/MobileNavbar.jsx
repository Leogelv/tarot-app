import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MobileNavbar = () => {
  return (
    <NavbarContainer>
      <NavItem to="/" end>
        <NavIcon className="material-symbols-outlined">home</NavIcon>
        <NavText>Home</NavText>
      </NavItem>
      
      <NavItem to="/cards">
        <NavIcon className="material-symbols-outlined">style</NavIcon>
        <NavText>Cards</NavText>
      </NavItem>
      
      <NavItem to="/spreads">
        <NavIcon className="material-symbols-outlined">dashboard</NavIcon>
        <NavText>Spreads</NavText>
      </NavItem>
      
      <NavItem to="/daily">
        <NavIcon className="material-symbols-outlined">today</NavIcon>
        <NavText>Daily</NavText>
      </NavItem>
      
      <NavItem to="/profile">
        <NavIcon className="material-symbols-outlined">person</NavIcon>
        <NavText>Profile</NavText>
      </NavItem>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(18, 18, 31, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(155, 89, 217, 0.2);
  z-index: 100;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  padding: 0.5rem;
  
  &.active {
    color: var(--primary);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NavIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const NavText = styled.span`
  font-size: 0.7rem;
  font-family: var(--font-body);
`;

export default MobileNavbar; 