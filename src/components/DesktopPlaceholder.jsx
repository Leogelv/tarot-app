import React from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

const DesktopPlaceholder = () => {
  const appUrl = window.location.origin;

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Content>
        <Title>Таро Инсайт</Title>
        <Subtitle>
          Это приложение оптимизировано для мобильных устройств
        </Subtitle>
        <QRContainer>
          <QRCodeSVG 
            value={appUrl}
            size={200}
            level="H"
            includeMargin={true}
            bgColor="#12121f"
            fgColor="#ffffff"
          />
        </QRContainer>
        <Instructions>
          Отсканируйте QR-код чтобы открыть приложение на вашем телефоне
        </Instructions>
      </Content>
    </Container>
  );
};

const Container = styled(motion.div)`
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

const QRContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Instructions = styled.p`
  font-size: 1rem;
  opacity: 0.6;
`;

export default DesktopPlaceholder; 