import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <LogoContainer>
          <LogoText>
            <TaroText>TARO</TaroText>
            <TechText>TECH</TechText>
          </LogoText>
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

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
`;

const TaroText = styled.span`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
`;

const TechText = styled.span`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 2px;
`;

export default MobileHeader; 