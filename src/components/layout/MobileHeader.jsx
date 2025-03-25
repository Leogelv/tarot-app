import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <LogoContainer>
          <Logo 
            src="https://i.ibb.co/TDfjvZd/file-75.png" 
            alt="Таро Инсайт Лого"
          />
        </LogoContainer>
      </LogoLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  background: rgba(9, 11, 26, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 45px;
  object-fit: contain;
`;

export default MobileHeader; 