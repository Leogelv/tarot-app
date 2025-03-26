import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <PageContainer className="page-container">
      <ContentContainer>
        <ErrorCode
          as={motion.h1}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorCode>
        <ErrorMessage
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Страница не найдена
        </ErrorMessage>
        <ErrorDescription
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Карты указывают, что вы свернули не на тот путь.
        </ErrorDescription>
        <BackButton
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/">Вернуться на главную</Link>
        </BackButton>
      </ContentContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1;
`;

const ErrorMessage = styled.p`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
`;

export default NotFound; 