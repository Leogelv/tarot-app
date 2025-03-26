import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>✨ Таро Инсайт</FooterLogo>
          <FooterTagline>Откройте свой путь с помощью древней мудрости</FooterTagline>
          <SocialLinks>
            <SocialLink href="https://t.me/taroinsight" target="_blank" rel="noopener noreferrer">
              <i className="material-symbols-rounded">send</i>
            </SocialLink>
            <SocialLink href="https://vk.com/taroinsight" target="_blank" rel="noopener noreferrer">
              <i className="material-symbols-rounded">public</i>
            </SocialLink>
            <SocialLink href="https://wa.me/taroinsight" target="_blank" rel="noopener noreferrer">
              <i className="material-symbols-rounded">chat</i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Быстрые ссылки</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/about">О нас</FooterLink>
            <FooterLink to="/cards">Карты</FooterLink>
            <FooterLink to="/spreads">Расклады</FooterLink>
            <FooterLink to="/daily-card">Карта дня</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Ресурсы</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/blog">Блог</FooterLink>
            <FooterLink to="/learn">Изучение Таро</FooterLink>
            <FooterLink to="/faq">Вопросы и ответы</FooterLink>
            <FooterLink to="/contact">Связаться с нами</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Правовая информация</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/terms">Условия использования</FooterLink>
            <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
            <FooterLink to="/cookies">Политика cookies</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {currentYear} Таро Инсайт. Все права защищены.
        </Copyright>
        <Disclaimer>
          Только для развлекательных целей. Не является заменой профессиональной консультации.
        </Disclaimer>
      </FooterBottom>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background-color: var(--background-secondary);
  color: var(--text);
  padding: 3rem 1rem 1.5rem;
  border-top: 1px solid var(--border);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterTagline = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: var(--text);
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

const FooterSectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text);
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background: var(--gradient-primary);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
  
  &::after {
    display: none;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const Disclaimer = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export default Footer; 