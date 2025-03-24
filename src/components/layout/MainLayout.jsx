import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Основные компоненты
import Navbar from './Navbar';
import Footer from './Footer';

// Мобильные компоненты
import MobileHeader from '../mobile/MobileHeader';
import MobileNavbar from '../mobile/MobileNavbar';

// Эффекты и анимации
import TarotBackground from '../effects/TarotBackground';
import PageTransition from '../effects/PageTransition';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Определяем тип устройства при загрузке и при изменении размера окна
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Инициальная проверка
    checkDevice();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkDevice);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Добавляем специальный класс для тела при мобильном виде
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('is-mobile-view');
    } else {
      document.body.classList.remove('is-mobile-view');
    }
  }, [isMobile]);

  return (
    <LayoutContainer>
      {/* 3D фон для мобильной версии */}
      {isMobile && <TarotBackground />}
      
      {/* Мобильный заголовок */}
      {isMobile && <MobileHeader />}
      
      {/* Основная десктопная навигация */}
      {!isMobile && <Navbar />}
      
      {/* Основной контент с анимацией перехода */}
      <MainContent>
        <AnimatePresence mode="wait">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </MainContent>
      
      {/* Десктопный футер */}
      {!isMobile && <Footer />}
      
      {/* Мобильная навигация */}
      {isMobile && <MobileNavbar />}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  /* Стили для мобильного устройства */
  body.is-mobile-view & {
    background: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
  
  /* Стили для мобильного устройства */
  body.is-mobile-view & {
    padding-top: 60px;
    padding-bottom: 80px;
  }
`;

export default MainLayout; 