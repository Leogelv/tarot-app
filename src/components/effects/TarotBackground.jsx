import React from 'react';
import styled from 'styled-components';

// Fallback component that doesn't use complex Three.js features
const TarotBackground = () => {
  return (
    <BackgroundContainer>
      <GradientOverlay />
      <StarField />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: var(--background);
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, 
    rgba(155, 89, 217, 0.15) 0%, 
    rgba(43, 36, 79, 0.1) 50%, 
    rgba(18, 18, 31, 0.05) 100%);
  animation: pulse 10s infinite alternate ease-in-out;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, white, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, white, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 50px 160px, white, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, white, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 130px 80px, white, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 160px 120px, white, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.2;
  animation: twinkle 10s infinite alternate ease-in-out;
`;

export default TarotBackground; 