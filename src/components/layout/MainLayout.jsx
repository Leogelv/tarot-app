import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MobileHeader from './MobileHeader';
import MobileNavbar from './MobileNavbar';
import StarryBackground from '../StarryBackground';
import DesktopPlaceholder from '../DesktopPlaceholder';

// Components
import Navbar from './Navbar';
import Footer from './Footer';
import TarotBackground from '../effects/TarotBackground';
import PageTransition from '../effects/PageTransition';

// Main layout component that wraps all pages
const MainLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Initial check
    checkDeviceType();
    
    // Listen for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Add body class for mobile styling
    if (isMobile) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, [isMobile]);
  
  // Для десктопа показываем плейсхолдер
  if (!isMobile) {
    return (
      <LayoutContainer>
        <StarryBackground />
        <DesktopPlaceholder />
      </LayoutContainer>
    );
  }
  
  // Для мобильных устройств показываем полный интерфейс
  return (
    <LayoutContainer className="layout-container">
      <StarryBackground />
      
      <MobileHeader />
      
      <MainContent className="main-content" $isMobile={true}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </MainContent>
      
      <MobileNavbar />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background-color: var(--background);
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.$isMobile ? '20px 0 80px' : '100px 0 60px'};
  width: 100%;
  max-width: 100vw;
  position: relative;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
`;

export default MainLayout; 