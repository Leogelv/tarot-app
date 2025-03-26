import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/">
          <LogoIcon className="material-symbols-rounded">auto_awesome</LogoIcon>
          <LogoText>Tarot App</LogoText>
        </Logo>
        
        <NavLinks>
          <StyledNavLink to="/" end>Главная</StyledNavLink>
          <StyledNavLink to="/cards">Карты</StyledNavLink>
          <StyledNavLink to="/spreads">Расклады</StyledNavLink>
          <StyledNavLink to="/daily-card">Карта дня</StyledNavLink>
          <StyledNavLink to="/about">О приложении</StyledNavLink>
        </NavLinks>
        
        <NavActions>
          <ActionButton to="/search">
            <span className="material-symbols-rounded">search</span>
          </ActionButton>
          <ActionButton to="/profile">
            <span className="material-symbols-rounded">person</span>
          </ActionButton>
        </NavActions>
      </NavbarContent>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;
  height: 72px;
  background: rgba(15, 15, 26, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
  font-size: 1.5rem;
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
  margin-right: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoText = styled.span`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--text);
  }
  
  &.active {
    color: var(--primary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 1px;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(NavLink)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  
  &:hover, &.active {
    color: var(--text);
    background: rgba(255, 255, 255, 0.1);
  }
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

export default Navbar; 