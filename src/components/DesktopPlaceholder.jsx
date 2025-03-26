import React from 'react';
import styled from 'styled-components';

const DesktopPlaceholder = () => {
  return (
    <Container>
      <Content>
        <Title>Таро Инсайт</Title>
        <Subtitle>
          Это приложение оптимизировано для мобильных устройств
        </Subtitle>
        <Instructions>
          Пожалуйста, откройте это приложение на вашем телефоне для наилучшего опыта
        </Instructions>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #12121f;
  color: white;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Unbounded', sans-serif;
  background: linear-gradient(135deg, #e2b6ff 0%, #8b78ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const Instructions = styled.p`
  font-size: 1rem;
  opacity: 0.6;
`;

export default DesktopPlaceholder; 