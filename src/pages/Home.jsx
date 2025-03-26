import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import StarryBackground from '../components/StarryBackground';
import useMobileDetect from '../hooks/useMobileDetect';
import DesktopPlaceholder from '../components/DesktopPlaceholder';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMobileDetect();
  
  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingText>Загрузка...</LoadingText>
      </LoadingContainer>
    );
  }
  
  if (!isMobile) {
    return <DesktopPlaceholder />;
  }
  
  // Функции для анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const features = [
    {
      icon: 'auto_awesome',
      title: 'Библиотека карт',
      description: 'Изучайте значения и символизм всех 78 карт Таро, с подробными описаниями и интерпретациями.'
    },
    {
      icon: 'nights_stay',
      title: 'Карта дня',
      description: 'Получайте ежедневное руководство с персональным посланием и возможностью записи своих размышлений.'
    },
    {
      icon: 'widgets',
      title: 'Различные расклады',
      description: 'От простых до сложных раскладов - выбирайте подходящий для любой жизненной ситуации.'
    },
    {
      icon: 'psychology_alt',
      title: 'Журнал раскладов',
      description: 'Сохраняйте историю гаданий и отслеживайте, как меняются предсказания с течением времени.'
    }
  ];
  
  return (
    <Container>
      <StarryBackground />
      
      <Logo>TarotApp</Logo>
      
      <MenuContainer>
        <MenuItem to="/daily-card">
          <MenuIcon className="material-symbols-rounded">brightness_7</MenuIcon>
          <MenuText>Карта дня</MenuText>
        </MenuItem>
        
        <MenuItem to="/spreads">
          <MenuIcon className="material-symbols-rounded">grid_view</MenuIcon>
          <MenuText>Расклады</MenuText>
        </MenuItem>
        
        <MenuItem to="/card-library">
          <MenuIcon className="material-symbols-rounded">auto_stories</MenuIcon>
          <MenuText>Колода</MenuText>
        </MenuItem>
        
        <MenuItem to="/about">
          <MenuIcon className="material-symbols-rounded">info</MenuIcon>
          <MenuText>О таро</MenuText>
        </MenuItem>
      </MenuContainer>
      
      <PageContainer>
        {/* Hero секция */}
        <HeroSection 
          as={motion.section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroContent>
            <HeroTextContainer>
              <HeroSubtitle
                as={motion.p}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ваш путь к самопознанию
              </HeroSubtitle>
              
              <HeroTitle
                as={motion.h1}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span>Таро</span> Инсайт
              </HeroTitle>
              
              <HeroDescription
                as={motion.p}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Откройте мудрость карт Таро и получите глубокое понимание своей жизни с нашим удобным приложением для карт Таро
              </HeroDescription>
              
              <HeroButtons
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <PrimaryButton as={Link} to="/daily-card">
                  <span className="material-symbols-rounded">today</span>
                  Карта дня
                </PrimaryButton>
                
                <SecondaryButton as={Link} to="/spreads">
                  <span className="material-symbols-rounded">grid_view</span>
                  Расклады
                </SecondaryButton>
              </HeroButtons>
              
              <OSBadge
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smartphone
                </span>
                Оптимизировано для мобильных устройств
              </OSBadge>
            </HeroTextContainer>
            
            <HeroImageContainer
              as={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
            >
              <HeroImage src="https://i.ibb.co/TDfjvZd/file-75.png" alt="Таро карты" />
              <HeroGlow />
            </HeroImageContainer>
          </HeroContent>
        </HeroSection>
        
        {/* Features секция */}
        <FeaturesSection
          as={motion.section}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={containerVariants}
        >
          <SectionTitle
            as={motion.h2}
            variants={itemVariants}
          >
            Исследуйте возможности
          </SectionTitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                as={motion.div}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <FeatureIcon className="material-symbols-rounded">
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesSection>
        
        {/* CTA секция */}
        <CTASection>
          <CTAContent
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CTATitle>Готовы начать свое путешествие?</CTATitle>
            <CTADescription>
              Зарегистрируйтесь сейчас и получите доступ ко всем функциям Таро Инсайт
            </CTADescription>
            
            <CTAButton as={Link} to="/register">
              <span className="material-symbols-rounded">person_add</span>
              Создать аккаунт
            </CTAButton>
            
            <CTASecondary>
              Уже есть аккаунт? <CTALink as={Link} to="/login">Войти</CTALink>
            </CTASecondary>
          </CTAContent>
        </CTASection>
      </PageContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: white;
`;

const Logo = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 0;
  font-family: 'Cinzel', serif;
  background: linear-gradient(45deg, #f5b833, #e46f4a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(245, 184, 51, 0.3);
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: auto;
  margin-bottom: 40px;
`;

const MenuItem = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  transition: transform 0.2s, background 0.2s;
  
  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

const MenuIcon = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
  color: #f5b833;
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #12121f, #2d2b42);
`;

const LoadingText = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
`;

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    min-height: 70vh;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.1;
  font-family: var(--font-heading);
  
  span {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 540px;
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(155, 89, 217, 0.4);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
    border-color: var(--primary);
    transform: translateY(-3px);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const OSBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 1.5rem;
  
  .material-symbols-rounded {
    color: var(--primary);
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    margin: 1.5rem auto 0;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  max-height: 90%;
  object-fit: contain;
  border-radius: var(--radius);
  z-index: 1;
`;

const HeroGlow = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle at center,
    rgba(155, 89, 182, 0.3) 0%,
    rgba(155, 89, 182, 0.1) 40%,
    transparent 70%
  );
  filter: blur(40px);
  border-radius: 50%;
  z-index: 0;
`;

const FeaturesSection = styled.section`
  padding: 5rem 1rem;
  background: var(--surface-alt);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  font-family: var(--font-heading);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const FeatureCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.span`
  font-size: 2.5rem;
  color: var(--primary);
  font-variation-settings: 'FILL' 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
`;

const CTASection = styled.section`
  padding: 5rem 1rem;
  background: var(--background);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 3rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  color: var(--text);
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const CTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(155, 89, 217, 0.4);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const CTASecondary = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 1rem;
`;

const CTALink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Home; 