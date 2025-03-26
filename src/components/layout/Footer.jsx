import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2023 Tarot App. Все права защищены.</Copyright>
        <FooterLinks>
          <FooterLink to="/about">О приложении</FooterLink>
          <FooterLink to="/login">Войти</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: 1.5rem;
  width: 100%;
  z-index: 10;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

export default Footer; 