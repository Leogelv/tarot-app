import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Варианты анимации для контейнера страницы
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

// Настройки анимации
const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

const PageTransition = ({ children }) => {
  return (
    <PageAnimationWrapper
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </PageAnimationWrapper>
  );
};

const PageAnimationWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding-top: 70px;
  padding-bottom: 80px;
  
  @media (min-width: 768px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default PageTransition; 