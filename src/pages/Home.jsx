import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarryBackground from '../components/StarryBackground';

const Home = () => {
  return (
    <Container>
      <StarryBackground />
      
      <Content>
        <Logo>TarotApp</Logo>
        <Tagline>Откройте тайны Таро</Tagline>
        
        <MenuGrid>
          <MenuItem to="/daily-card">
            <MenuIcon className="material-symbols-rounded">brightness_7</MenuIcon>
            <MenuText>Карта дня</MenuText>
          </MenuItem>
          
          <MenuItem to="/spreads">
            <MenuIcon className="material-symbols-rounded">grid_view</MenuIcon>
            <MenuText>Расклады</MenuText>
          </MenuItem>
          
          <MenuItem to="/card-library">
            <MenuIcon className="material-symbols-rounded">auto_stories</MenuIcon>
            <MenuText>Колода</MenuText>
          </MenuItem>
          
          <MenuItem to="/about">
            <MenuIcon className="material-symbols-rounded">info</MenuIcon>
            <MenuText>О таро</MenuText>
          </MenuItem>
        </MenuGrid>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 1;
`;

const Logo = styled.h1`
  font-size: 48px;
  text-align: center;
  font-family: 'Cinzel', serif;
  margin: 0;
  background: linear-gradient(45deg, #f5b833, #e46f4a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(245, 184, 51, 0.3);
`;

const Tagline = styled.p`
  font-size: 20px;
  text-align: center;
  margin: 0;
  color: #c9abff;
  text-shadow: 0 0 10px rgba(201, 171, 255, 0.5);
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const MenuItem = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MenuIcon = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
  color: #f5b833;
`;

const MenuText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export default Home; 