import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StarryBackground from './components/StarryBackground';
import styled from 'styled-components';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  return (
    <Container>
      <StarryBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div style={{color: 'white', padding: 20}}>Страница не найдена</div>} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(to bottom, #12121f, #2d2b42);
`;

export default App;
