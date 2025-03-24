import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../../store/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isPremium } = useSelector((state) => state.auth);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
    closeMenu();
  };
  
  return (
    <NavbarContainer>
      <NavContent>
        <LogoContainer>
          <LogoLink to="/" onClick={closeMenu}>
            <Logo>✨ Tarot Insights</Logo>
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
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/card-library" onClick={closeMenu}>Card Library</NavLink>
          </NavItem>
          
          {isAuthenticated && (
            <NavItem>
              <NavLink to="/daily-card" onClick={closeMenu}>Daily Card</NavLink>
            </NavItem>
          )}
          
          <NavItem>
            <NavLink to="/spreads" onClick={closeMenu}>Spreads</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          </NavItem>
          
          {!isAuthenticated ? (
            <>
              <NavItem>
                <NavLinkButton to="/login" onClick={closeMenu}>Log In</NavLinkButton>
              </NavItem>
              <NavItem>
                <NavLinkButtonPrimary to="/register" onClick={closeMenu}>Sign Up</NavLinkButtonPrimary>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
              </NavItem>
              
              {!isPremium && (
                <NavItem>
                  <NavLinkButtonPrimary to="/upgrade" onClick={closeMenu}>
                    Upgrade
                  </NavLinkButtonPrimary>
                </NavItem>
              )}
              
              <NavItem>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </NavItem>
            </>
          )}
        </NavItems>
      </NavContent>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  background-color: var(--color-background-card);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
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

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
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
    background: var(--color-primary);
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
    
    &:nth-child(1) {
      top: ${props => props.open ? '10px' : '0px'};
      transform: ${props => props.open ? 'rotate(135deg)' : 'rotate(0deg)'};
    }
    
    &:nth-child(2) {
      top: 10px;
      opacity: ${props => props.open ? '0' : '1'};
    }
    
    &:nth-child(3) {
      top: ${props => props.open ? '10px' : '20px'};
      transform: ${props => props.open ? 'rotate(-135deg)' : 'rotate(0deg)'};
    }
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-background-card);
    box-shadow: var(--shadow-md);
    padding: 1rem;
    display: ${props => props.open ? 'flex' : 'none'};
    z-index: 100;
    align-items: flex-start;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
    background-color: rgba(58, 42, 108, 0.05);
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem;
    width: 100%;
  }
`;

const NavLinkButton = styled(Link)`
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-rounded);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    width: 100%;
  }
`;

const NavLinkButtonPrimary = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-rounded);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
  }
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-error);
    background-color: rgba(244, 67, 54, 0.05);
  }
  
  @media (max-width: 768px) {
    text-align: left;
    padding: 0.75rem;
    width: 100%;
  }
`;

export default Navbar; 