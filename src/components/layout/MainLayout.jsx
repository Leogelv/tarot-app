import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import MobileHeader from './MobileHeader';
import StarryBackground from '../StarryBackground';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LayoutContainer>
      <StarryBackground />
      
      {isMobile ? (
        <>
          <MobileHeader />
          <MainContent>
            {children}
          </MainContent>
          <MobileNavbar />
        </>
      ) : (
        <>
          <Navbar />
          <MainContent desktop>
            {children}
          </MainContent>
        </>
      )}
      
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: ${props => props.desktop ? '0' : '70px'};
  padding-bottom: ${props => props.desktop ? '0' : '80px'};
  width: 100%;
  
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export default MainLayout; 