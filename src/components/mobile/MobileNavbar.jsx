import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavbar = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <NavPanel>
        <NavItem to="/" $isActive={location.pathname === '/'}>
          <NavIcon>🏠</NavIcon>
          <NavText>Главная</NavText>
        </NavItem>
        
        <NavItem to="/cards" $isActive={location.pathname.includes('/cards')}>
          <NavIcon>🃏</NavIcon>
          <NavText>Карты</NavText>
        </NavItem>
        
        <NavItem to="/daily-card" $isActive={location.pathname === '/daily-card'}>
          <NavIcon>✨</NavIcon>
          <NavText>Карта дня</NavText>
          <DailyIndicator />
        </NavItem>
        
        <NavItem to="/spreads" $isActive={location.pathname.includes('/spreads')}>
          <NavIcon>📚</NavIcon>
          <NavText>Расклады</NavText>
        </NavItem>
        
        <NavItem to="/profile" $isActive={location.pathname === '/profile'}>
          <NavIcon>👤</NavIcon>
          <NavText>Профиль</NavText>
        </NavItem>
      </NavPanel>
      <NavbarBlur />
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavbarBlur = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, rgba(26, 15, 54, 0.8) 20%, rgba(26, 15, 54, 0));
  pointer-events: none;
  z-index: -1;
`;

const NavPanel = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(58, 42, 108, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px 0;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.15);
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => (props.$isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
  position: relative;
  padding: 8px 12px;
  transition: all 0.2s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: ${props => (props.$isActive ? '15px' : '0')};
    height: 3px;
    background-color: ${props => (props.$isActive ? '#ae66ae' : 'transparent')};
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  &:hover, &:focus {
    color: white;
  }
`;

const NavIcon = styled.span`
  font-size: 1.6rem;
  margin-bottom: 3px;
  display: block;
  filter: drop-shadow(0 0 3px rgba(174, 102, 174, 0.3));
`;

const NavText = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

const DailyIndicator = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 8px;
  height: 8px;
  background-color: #e53935;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(229, 57, 53, 0.8);
`;

export default MobileNavbar; 