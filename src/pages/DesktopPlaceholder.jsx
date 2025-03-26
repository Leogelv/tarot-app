import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import StarryBackground from '../components/StarryBackground';

const DesktopPlaceholder = () => {
  return (
    <Container>
      <StarryBackground />
      <Content>
        <Logo
          as={motion.img}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src="https://i.ibb.co/Qj8JGbm/month-ahead.jpg"
          alt="Tarot App Logo"
        />
        <Title
          as={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tarot App
        </Title>
        <Description
          as={motion.p}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Это мобильное приложение для Таро, созданное для использования на смартфонах.
          Пожалуйста, откройте его на мобильном устройстве для лучшего опыта.
        </Description>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  z-index: 1;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #9c27b0, #3f51b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

export default DesktopPlaceholder; 