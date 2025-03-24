import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  return (
    <HeaderContainer>
      <Logo to="/">Mystic Tarot</Logo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  z-index: 100;
  background: rgba(18, 18, 31, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(155, 89, 217, 0.2);
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`;

export default MobileHeader; 