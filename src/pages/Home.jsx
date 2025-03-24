import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <HomeContainer className="page-container">
      <HeroSection>
        <HeroContent>
          <HeroTitle className="card-title">Discover Your Path with Tarot Insights</HeroTitle>
          <HeroSubtitle className="card-description">
            Explore the ancient wisdom of Tarot with our modern, intuitive app
          </HeroSubtitle>
          <HeroButtonsContainer>
            <HeroButton as={Link} to="/card-library" className="primary-button tap-highlight">
              Explore Card Library
            </HeroButton>
            <HeroButton as={Link} to="/daily-card" secondary className="tap-highlight">
              Get Daily Card
            </HeroButton>
          </HeroButtonsContainer>
        </HeroContent>
        <HeroImageContainer className={isMobile ? "float-animation" : ""}>
          <HeroImage 
            src={isMobile ? "https://i.imgur.com/qiXu7Bh.jpg" : "/images/hero-cards.png"} 
            alt="Tarot cards" 
            className={isMobile ? "glow-animation" : ""}
          />
        </HeroImageContainer>
      </HeroSection>

      <FeaturesSection className="card-container">
        <SectionTitle className="card-title">Why Choose Tarot Insights?</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard className="tap-highlight">
            <FeatureIcon>🔮</FeatureIcon>
            <FeatureTitle>Comprehensive Card Library</FeatureTitle>
            <FeatureDescription className="card-description">
              Access detailed interpretations for all 78 Tarot cards with beautiful imagery
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard className="tap-highlight">
            <FeatureIcon>🌙</FeatureIcon>
            <FeatureTitle>Daily Guidance</FeatureTitle>
            <FeatureDescription className="card-description">
              Receive a personalized daily card with reflections to guide your day
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard className="tap-highlight">
            <FeatureIcon>🔯</FeatureIcon>
            <FeatureTitle>Multiple Spreads</FeatureTitle>
            <FeatureDescription className="card-description">
              Choose from various Tarot spreads for different questions and situations
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard className="tap-highlight">
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>Personal Reflections</FeatureTitle>
            <FeatureDescription className="card-description">
              Save your thoughts and insights with each reading for future reference
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard className="tap-highlight">
            <FeatureIcon>👤</FeatureIcon>
            <FeatureTitle>User Profiles</FeatureTitle>
            <FeatureDescription className="card-description">
              Track your reading history and see patterns emerge over time
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard className="tap-highlight">
            <FeatureIcon>✨</FeatureIcon>
            <FeatureTitle>Premium Features</FeatureTitle>
            <FeatureDescription className="card-description">
              Unlock advanced spreads and detailed interpretations with a subscription
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTAContent>
          <CTATitle className="card-title">Begin Your Tarot Journey Today</CTATitle>
          <CTADescription className="card-description">
            Create an account to save your readings and receive daily guidance
          </CTADescription>
          <CTAButton as={Link} to="/register" className="primary-button tap-highlight">
            Sign Up for Free
          </CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 4rem 0;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 0;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const HeroButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  text-decoration: none;
  
  ${props => props.secondary ? `
    background-color: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    
    &:hover {
      background-color: var(--color-primary);
      color: white;
    }
  ` : `
    background-color: var(--color-primary);
    border: 2px solid var(--color-primary);
    color: white;
    
    &:hover {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }
  `}
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    max-width: 85%;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  color: var(--color-primary);
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const FeatureDescription = styled.p`
  color: var(--color-text);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: 10px;
  padding: 4rem 2rem;
  margin: 4rem 0;
  text-align: center;
  color: white;
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    margin: 2rem 0;
  }
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const CTAButton = styled(HeroButton)`
  background-color: white;
  color: var(--color-primary);
  border-color: white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.9);
  }
`;

export default Home; 