import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { logoutUser } from '../../store/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
            <Logo>✨ Таро Инсайт</Logo>
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
            <NavLink 
              to="/" 
              onClick={closeMenu}
              $isActive={location.pathname === '/'}
              as={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Главная
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink 
              to="/cards" 
              onClick={closeMenu}
              $isActive={location.pathname === '/cards'}
              as={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Карты
            </NavLink>
          </NavItem>
          
          {isAuthenticated && (
            <NavItem>
              <NavLink 
                to="/daily-card" 
                onClick={closeMenu}
                $isActive={location.pathname === '/daily-card'}
                as={motion.div}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Карта дня
              </NavLink>
            </NavItem>
          )}
          
          <NavItem>
            <NavLink 
              to="/spreads" 
              onClick={closeMenu}
              $isActive={location.pathname === '/spreads'}
              as={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Расклады
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink 
              to="/about" 
              onClick={closeMenu}
              $isActive={location.pathname === '/about'}
              as={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              О нас
            </NavLink>
          </NavItem>
          
          {!isAuthenticated ? (
            <>
              <NavItem>
                <NavLinkButton 
                  to="/login" 
                  onClick={closeMenu}
                  as={motion.div}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Войти
                </NavLinkButton>
              </NavItem>
              <NavItem>
                <NavLinkButtonPrimary 
                  to="/register" 
                  onClick={closeMenu}
                  as={motion.div}
                  whileHover={{ y: -2, boxShadow: '0 7px 20px rgba(155, 89, 217, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Регистрация
                </NavLinkButtonPrimary>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink 
                  to="/profile" 
                  onClick={closeMenu}
                  $isActive={location.pathname === '/profile'}
                  as={motion.div}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Профиль
                </NavLink>
              </NavItem>
              
              {!isPremium && (
                <NavItem>
                  <NavLinkButtonPrimary 
                    to="/upgrade" 
                    onClick={closeMenu}
                    as={motion.div}
                    whileHover={{ y: -2, boxShadow: '0 7px 20px rgba(155, 89, 217, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Премиум
                  </NavLinkButtonPrimary>
                </NavItem>
              )}
              
              <NavItem>
                <LogoutButton 
                  onClick={handleLogout}
                  as={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Выйти
                </LogoutButton>
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
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
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

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
    background: var(--primary);
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
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    padding: 1rem;
    display: ${props => props.open ? 'flex' : 'none'};
    z-index: 100;
    align-items: flex-start;
    border-radius: 0 0 var(--radius) var(--radius);
    border: 1px solid var(--border);
    border-top: none;
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
  color: ${props => props.$isActive ? 'var(--primary)' : 'var(--text)'};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isActive ? '80%' : '0'};
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
    border-radius: var(--radius-full);
  }
  
  &:hover {
    color: var(--primary);
    
    &::after {
      width: 80%;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem;
    width: 100%;
  }
`;

const NavLinkButton = styled(Link)`
  display: inline-block;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary);
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
  background: transparent;
  
  &:hover {
    background: rgba(155, 89, 217, 0.1);
  }
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

const NavLinkButtonPrimary = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(155, 89, 217, 0.3);
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
    border-color: #ff6b6b;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export default Navbar; 