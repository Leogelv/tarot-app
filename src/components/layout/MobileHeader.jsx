import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MobileHeader = () => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoText>Таро Инсайт</LogoText>
      </Logo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(9, 11, 26, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  &::after {
    display: none;
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

export default MobileHeader; 