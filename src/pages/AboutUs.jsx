import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <PageContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <PageHeader>
        <PageTitle>О приложении</PageTitle>
        <PageDescription>
          Узнайте больше о нашем приложении для Таро и его возможностях
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        <SectionCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          <SectionTitle>Наша миссия</SectionTitle>
          <SectionContent>
            Мы создали это приложение, чтобы сделать искусство Таро доступным для всех, 
            независимо от уровня опыта. Наша цель — предоставить инструмент 
            для самопознания, размышлений и духовного роста через символику Таро.
          </SectionContent>
        </SectionCard>
        
        <SectionCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
        >
          <SectionTitle>Особенности</SectionTitle>
          <FeaturesList>
            <FeatureItem>
              <FeatureIcon className="material-symbols-rounded">auto_awesome</FeatureIcon>
              <FeatureText>
                <FeatureName>Библиотека карт</FeatureName>
                <FeatureDescription>Полная коллекция карт Таро с подробными описаниями.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon className="material-symbols-rounded">nights_stay</FeatureIcon>
              <FeatureText>
                <FeatureName>Карта дня</FeatureName>
                <FeatureDescription>Ежедневная карта с интерпретацией для вдохновения.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon className="material-symbols-rounded">dashboard</FeatureIcon>
              <FeatureText>
                <FeatureName>Различные расклады</FeatureName>
                <FeatureDescription>От простых до сложных раскладов для разных ситуаций.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon className="material-symbols-rounded">insights</FeatureIcon>
              <FeatureText>
                <FeatureName>Личный журнал</FeatureName>
                <FeatureDescription>Сохраняйте ваши толкования и размышления.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
          </FeaturesList>
        </SectionCard>
        
        <SectionCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card"
        >
          <SectionTitle>Версия приложения</SectionTitle>
          <SectionContent>
            <p>Текущая версия: <strong>1.0.0</strong></p>
            <p>Это демонстрационная версия приложения Таро. Функциональность может быть ограничена.</p>
          </SectionContent>
        </SectionCard>
      </ContentContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  position: relative;
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
    bottom: 20%;
    right: 15%;
    width: 250px;
    height: 250px;
    background: var(--secondary);
    animation: blob-float 18s ease-in-out infinite alternate;
  }
  
  &.blob-3 {
    top: 50%;
    left: 40%;
    width: 200px;
    height: 200px;
    background: var(--tertiary);
    animation: blob-float 20s ease-in-out infinite alternate;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--text);
  font-family: var(--font-heading);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionCard = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text);
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeatureIcon = styled.span`
  font-size: 2rem;
  color: var(--primary);
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FeatureName = styled.h3`
  font-size: 1.2rem;
  color: var(--text);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

export default AboutUs; 