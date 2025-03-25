import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <NavbarContainer>
      <NavContent>
        <LogoContainer>
          <LogoLink to="/" onClick={closeMenu} end>
            <Logo 
              src="https://i.ibb.co/TDfjvZd/file-75.png" 
              alt="Таро Инсайт Лого"
            />
          </LogoLink>
        </LogoContainer>
        
        <MobileMenuButton onClick={toggleMenu}>
          <MenuIcon open={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </MobileMenuButton>
        
        <NavItems open={isMenuOpen}>
          <NavItem>
            <StyledNavLink 
              to="/" 
              onClick={closeMenu}
              end
            >
              Главная
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <StyledNavLink 
              to="/cards" 
              onClick={closeMenu}
            >
              Карты
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <StyledNavLink 
              to="/daily-card" 
              onClick={closeMenu}
            >
              Карта дня
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <StyledNavLink 
              to="/spreads" 
              onClick={closeMenu}
            >
              Расклады
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <StyledNavLink 
              to="/about" 
              onClick={closeMenu}
            >
              О нас
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <NavLinkButton 
              to="/login" 
              onClick={closeMenu}
            >
              Войти
            </NavLinkButton>
          </NavItem>
          
          <NavItem>
            <NavLinkButtonPrimary 
              to="/register" 
              onClick={closeMenu}
            >
              Регистрация
            </NavLinkButtonPrimary>
          </NavItem>
        </NavItems>
      </NavContent>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  background: rgba(9, 11, 26, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &::after {
    display: none;
  }
`;

const Logo = styled.img`
  height: 45px;
  object-fit: contain;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 30px;
  height: 24px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--text);
    border-radius: 3px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      top: ${props => (props.open ? '11px' : '0')};
      transform: ${props => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    
    &:nth-child(2) {
      top: 11px;
      opacity: ${props => (props.open ? '0' : '1')};
    }
    
    &:nth-child(3) {
      top: ${props => (props.open ? '11px' : '22px')};
      transform: ${props => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(9, 11, 26, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem;
    gap: 1rem;
    border-radius: 0 0 var(--radius) var(--radius);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transform: ${props => (props.open ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
    opacity: ${props => (props.open ? '1' : '0')};
    pointer-events: ${props => (props.open ? 'all' : 'none')};
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const NavItem = styled.li`
  margin: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  
  &.active {
    color: var(--primary);
    
    &::after {
      width: 60%;
      opacity: 1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }
  
  &:hover {
    color: var(--primary);
    
    &::after {
      width: 60%;
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }
`;

const NavLinkButton = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--text-secondary);
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  &::after {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    text-align: center;
  }
`;

const NavLinkButtonPrimary = styled(NavLink)`
  display: block;
  padding: 0.5rem 1.5rem;
  color: white !important;
  text-decoration: none;
  font-weight: 500;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  box-shadow: 0 4px 15px rgba(155, 89, 217, 0.3);
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    box-shadow: 0 7px 20px rgba(155, 89, 217, 0.5);
  }
  
  &::after {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    text-align: center;
  }
`;

export default Navbar; 