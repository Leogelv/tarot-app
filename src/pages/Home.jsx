import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Logo>TarotApp</Logo>
      
      <MenuContainer>
        <MenuItem to="/daily">
          <MenuIcon className="material-symbols-rounded">brightness_7</MenuIcon>
          <MenuText>Карта дня</MenuText>
        </MenuItem>
        
        <MenuItem to="/spreads">
          <MenuIcon className="material-symbols-rounded">grid_view</MenuIcon>
          <MenuText>Расклады</MenuText>
        </MenuItem>
        
        <MenuItem to="/cards">
          <MenuIcon className="material-symbols-rounded">auto_stories</MenuIcon>
          <MenuText>Колода</MenuText>
        </MenuItem>
        
        <MenuItem to="/about">
          <MenuIcon className="material-symbols-rounded">info</MenuIcon>
          <MenuText>О таро</MenuText>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: white;
`;

const Logo = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 0;
  font-family: 'Cinzel', serif;
  background: linear-gradient(45deg, #f5b833, #e46f4a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(245, 184, 51, 0.3);
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: auto;
  margin-bottom: 40px;
`;

const MenuItem = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  transition: transform 0.2s, background 0.2s;
  
  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

const MenuIcon = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
  color: #f5b833;
`;

const MenuText = styled.span`
  font-size: 16px;
`;

export default Home; 