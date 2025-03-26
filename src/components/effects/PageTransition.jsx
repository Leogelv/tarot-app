import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // Определяем тип перехода в зависимости от маршрута
  const getTransitionType = () => {
    // Переход между карточкой расклада и его деталями
    if (location.pathname.includes('/spreads/')) {
      return 'zoomFade';
    }
    
    // Переход к деталям карты
    if (location.pathname.includes('/cards/')) {
      return 'swipeZoom';
    }
    
    // Переход к карте дня
    if (location.pathname.includes('/daily-card')) {
      return 'cardFlip';
    }
    
    // Другие страницы получают стандартный переход
    return 'fade';
  };
  
  const transitionType = getTransitionType();
  
  // Варианты анимаций для разных типов переходов
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 }
    },
    zoomFade: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30 
      }
    },
    swipeZoom: {
      initial: { opacity: 0, y: 20, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.98 },
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 40 
      }
    },
    cardFlip: {
      initial: { opacity: 0, rotateY: -15, perspective: "1000px" },
      animate: { opacity: 1, rotateY: 0, perspective: "1000px" },
      exit: { opacity: 0, rotateY: 15, perspective: "1000px" },
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 40 
      }
    }
  };
  
  // Получаем нужный вариант анимации
  const selectedVariant = variants[transitionType];
  
  // Особый случай для перехода к деталям карты
  const isCardTransition = transitionType === 'swipeZoom';
  
  return (
    <>
      {isCardTransition && <TransitionOverlay key="overlay" />}
      
      <motion.div
        key={location.pathname}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={selectedVariant.transition}
        style={{ width: '100%', position: 'relative' }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Оверлей для специальных эффектов перехода 
const TransitionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.15), transparent);
  z-index: 100;
  pointer-events: none;
  transform-origin: center;
  
  animation: pulse 0.6s ease-out forwards;
  
  @keyframes pulse {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

export default PageTransition; 