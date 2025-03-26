import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceOS, setDeviceOS] = useState('');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Определение операционной системы
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      if (/iPhone|iPad|iPod/.test(userAgent)) {
        setDeviceOS('iOS');
      } else if (/Android/.test(userAgent)) {
        setDeviceOS('Android');
      } else if (/Mac/.test(userAgent)) {
        setDeviceOS('macOS');
      } else if (/Win/.test(userAgent)) {
        setDeviceOS('Windows');
      } else {
        setDeviceOS('Unknown');
      }
    };
    
    checkIfMobile();
    detectOS();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const getOSIcon = (os) => {
    switch (os) {
      case 'Android':
        return 'phone_android';
      case 'iOS':
        return 'phone_iphone';
      case 'Windows':
        return 'laptop_windows';
      case 'macOS':
        return 'laptop_mac';
      default:
        return 'devices';
    }
  };

  return (
    <HomeContainer className="page-container dark-theme">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <HeroSection>
        <HeroContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <HeroTitle className="gradient-text">Откройте тайны Таро</HeroTitle>
          <HeroSubtitle>
            Исследуйте древнюю мудрость карт Таро с помощью нашего современного и интуитивного приложения
          </HeroSubtitle>
          
          {isMobile && (
            <OSBadge
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="material-symbols-rounded">
                {getOSIcon(deviceOS)}
              </span>
              <span>Оптимизировано для {deviceOS}</span>
            </OSBadge>
          )}
          
          <HeroButtonsContainer>
            {isMobile && (
              <HeroButton 
                className="primary-button"
                as={motion.div}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(155, 89, 217, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">Войти</Link>
              </HeroButton>
            )}
            <HeroButton 
              className={isMobile ? "secondary-button" : "primary-button"}
              as={motion.div}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(155, 89, 217, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/cards">Библиотека карт</Link>
            </HeroButton>
            <HeroButtonSecondary 
              className="secondary-button"
              as={motion.div}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/daily-card">Карта дня</Link>
            </HeroButtonSecondary>
          </HeroButtonsContainer>
        </HeroContent>
        
        <HeroImageContainer
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={isMobile ? "float-animation" : ""}
        >
          <HeroImage 
            src="https://i.ibb.co/TDfjvZdV/file-75.png" 
            alt="Карты Таро" 
            className={isMobile ? "glow-animation" : ""}
          />
        </HeroImageContainer>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Почему стоит выбрать Таро Инсайт?
        </SectionTitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
              className="neo-card"
            >
              <FeatureIconContainer>
                <FeatureIcon>{feature.icon}</FeatureIcon>
              </FeatureIconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>
                {feature.description}
              </FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTAContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CTATitle>Начните свой путь в Таро сегодня</CTATitle>
          <CTADescription>
            Создайте аккаунт, чтобы сохранять свои расклады и получать ежедневные карты
          </CTADescription>
          <CTAButton 
            as={motion.div}
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(155, 89, 217, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register">Регистрация</Link>
          </CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

// Массив с данными для фич
const features = [
  {
    icon: 'auto_awesome',
    title: 'Полная библиотека карт',
    description: 'Доступ к подробным толкованиям всех 78 карт Таро с красивыми иллюстрациями'
  },
  {
    icon: 'nights_stay',
    title: 'Ежедневные карты',
    description: 'Получайте персональную карту дня с рекомендациями для вашего дня'
  },
  {
    icon: 'playing_cards',
    title: 'Различные расклады',
    description: 'Выбирайте из различных раскладов Таро для разных вопросов и ситуаций'
  },
  {
    icon: 'edit_note',
    title: 'Личные размышления',
    description: 'Сохраняйте свои мысли и инсайты с каждым раскладом для будущего анализа'
  },
  {
    icon: 'person',
    title: 'Профили пользователей',
    description: 'Отслеживайте историю своих раскладов и наблюдайте за закономерностями'
  },
  {
    icon: 'magic_button',
    title: 'Премиум функции',
    description: 'Разблокируйте продвинутые расклады и детальные интерпретации с подпиской'
  }
];

// Styled Components
const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  background-color: var(--background) !important;
  color: var(--text) !important;
`;

const BlobBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.07;
  
  &.blob-1 {
    top: 10%;
    left: 15%;
    width: 300px;
    height: 300px;
    background: var(--primary);
    animation: blob-float 15s ease-in-out infinite alternate;
  }
  
  &.blob-2 {
    bottom: 30%;
    right: 15%;
    width: 250px;
    height: 250px;
    background: var(--secondary);
    animation: blob-float 15s ease-in-out infinite alternate;
    animation-delay: -2s;
  }
  
  &.blob-3 {
    top: 60%;
    left: 40%;
    width: 200px;
    height: 200px;
    background: var(--tertiary);
    animation: blob-float 15s ease-in-out infinite alternate;
    animation-delay: -4s;
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 5rem 0;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 3rem 0;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
  text-shadow: 0 2px 10px rgba(155, 89, 217, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const HeroButtonsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const HeroButton = styled.div`
  a {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 5px 15px rgba(155, 89, 217, 0.3);
    font-family: var(--font-heading);
  }
  
  @media (max-width: 768px) {
    a {
      padding: 0.9rem 1.7rem;
      font-size: 1rem;
    }
  }
`;

const HeroButtonSecondary = styled.div`
  a {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    background: var(--card-bg);
    color: var(--text);
    border: 1px solid var(--border);
    font-family: var(--font-heading);
  }
  
  &:hover a {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    a {
      padding: 0.9rem 1.7rem;
      font-size: 1rem;
    }
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: var(--radius);
  
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4rem;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  padding: 2.5rem;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FeatureIconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.span.attrs({ className: 'material-symbols-rounded' })`
  font-size: 2.5rem;
  color: var(--primary);
  font-variation-settings: 'FILL' 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  color: var(--text);
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
`;

const CTASection = styled.section`
  padding: 4rem 0 6rem;
  
  @media (max-width: 768px) {
    padding: 3rem 0 5rem;
  }
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 3.5rem;
  border-radius: var(--radius);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.3rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  text-shadow: 0 2px 10px rgba(155, 89, 217, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled.div`
  display: inline-block;
  
  a {
    display: inline-block;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 5px 15px rgba(155, 89, 217, 0.3);
    font-family: var(--font-heading);
  }
  
  @media (max-width: 768px) {
    a {
      padding: 0.9rem 2.5rem;
      font-size: 1rem;
    }
  }
`;

const OSBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .material-symbols-rounded {
    font-size: 18px;
    color: var(--primary);
    font-variation-settings: 'FILL' 1;
  }
`;

export default Home; 