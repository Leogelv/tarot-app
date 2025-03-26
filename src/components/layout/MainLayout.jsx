import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import MobileHeader from './MobileHeader';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from '../effects/PageTransition';
import DesktopPlaceholder from '../DesktopPlaceholder';
import StarryBackground from '../StarryBackground';

// Main layout component that wraps all pages
const MainLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, status } = useSelector(state => state.auth);
  
  // Определяем, показывать ли десктопную заглушку
  const showDesktopPlaceholder = !isMobile && !window.location.pathname.includes('/admin');
  
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
  
  // Если находимся в профиле, но не авторизованы - редирект на логин
  if (location.pathname === '/profile' && !isAuthenticated && status !== 'loading') {
    return <Navigate to="/login" />;
  }
  
  // Если авторизованы и на странице логина или регистрации - редирект в профиль
  if (
    isAuthenticated && 
    (location.pathname === '/login' || location.pathname === '/register')
  ) {
    return <Navigate to="/profile" />;
  }
  
  return (
    <LayoutContainer className="layout-container">
      <StarryBackground />
      {showDesktopPlaceholder && <DesktopPlaceholder />}
      
      {isMobile ? <MobileHeader /> : <Navbar />}
      
      <MainContent className="main-content" $isMobile={isMobile}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </MainContent>
      
      {isMobile ? <MobileNavbar /> : <Footer />}
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