import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>✨ Tarot Insights</FooterLogo>
          <FooterTagline>Discover your path through ancient wisdom</FooterTagline>
          <SocialLinks>
            <SocialLink href="https://twitter.com/tarotinsights" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com/tarotinsights" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://facebook.com/tarotinsights" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Quick Links</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/card-library">Card Library</FooterLink>
            <FooterLink to="/spreads">Spreads</FooterLink>
            <FooterLink to="/daily-card">Daily Card</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Resources</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/learn">Learn Tarot</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLinks>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {currentYear} Tarot Insights. All rights reserved.
        </Copyright>
        <Disclaimer>
          For entertainment purposes only. Not a substitute for professional advice.
        </Disclaimer>
      </FooterBottom>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background-color: var(--color-primary);
  color: white;
  padding: 3rem 1rem 1.5rem;
  margin-top: 3rem;
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
  color: white;
`;

const FooterTagline = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.2rem;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const FooterSectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: var(--color-secondary);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-secondary-light);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  opacity: 0.8;
`;

const Disclaimer = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export default Footer; 