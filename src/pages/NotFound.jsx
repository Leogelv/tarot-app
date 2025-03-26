import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ContentWrapper>
        <ErrorCode>404</ErrorCode>
        <TarotCard>
          <CardFront />
          <CardBack />
        </TarotCard>
        <Title>Page Not Found</Title>
        <Description>
          The cards couldn't reveal the page you're looking for. It may have been moved, 
          deleted, or perhaps never existed in this realm.
        </Description>
        <HomeButton as={Link} to="/">
          Return to Homepage
        </HomeButton>
      </ContentWrapper>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  background: radial-gradient(circle, rgba(67, 67, 157, 0.05) 0%, rgba(35, 26, 81, 0.1) 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const TarotCard = styled.div`
  position: relative;
  width: 180px;
  height: 320px;
  margin: 2rem 0;
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(2deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
  
  @media (max-width: 768px) {
    width: 140px;
    height: 250px;
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: rotateY(180deg);
  
  &:after {
    content: "?";
    font-size: 5rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
  background: repeating-linear-gradient(
    45deg,
    var(--color-primary-light),
    var(--color-primary-light) 10px,
    var(--color-primary) 10px,
    var(--color-primary) 20px
  );
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HomeButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export default NotFound; 