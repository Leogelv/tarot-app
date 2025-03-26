import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Моковые данные для демонстрации
const mockCardDetails = {
  id: 0,
  name: 'Шут',
  type: 'major',
  number: '0',
  image_url: 'https://www.trustedtarot.com/img/cards/the-fool.png',
  description: 'Шут символизирует начало нового путешествия, спонтанность и безграничный потенциал. Эта карта говорит о новых начинаниях, когда вы стоите на пороге чего-то нового и неизведанного.',
  keywords: ['Новые начинания', 'Спонтанность', 'Невинность', 'Приключения', 'Потенциал'],
  meanings: {
    upright: 'В прямом положении Шут символизирует новые начинания, спонтанность, свободу от ограничений и веру в будущее. Это карта чистых возможностей.',
    reversed: 'В перевернутом положении Шут может указывать на безрассудство, отсутствие направления или страх перед новым.',
  },
  element: 'Воздух',
  zodiac: 'Уран',
  advice: 'Доверьтесь своей интуиции и не бойтесь сделать первый шаг. Иногда лучшие возможности появляются, когда мы готовы рискнуть и начать что-то новое.'
};

const CardDetails = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showAnimatedCard, setShowAnimatedCard] = useState(true);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setLoading(true);
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 500));
        setCard(mockCardDetails);
      } catch (err) {
        console.error('Error fetching card details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
    
    // Настройка анимированного появления карты
    setTimeout(() => {
      setShowAnimatedCard(false);
    }, 1000);
  }, [cardId]);

  useEffect(() => {
    // Анимация появления информации после загрузки карты
    if (!loading) {
      setTimeout(() => setIsRevealed(true), 800);
    }
  }, [loading]);

  return (
    <PageContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>

      <BackButton
        onClick={() => navigate('/cards')}
        as={motion.button}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="material-symbols-rounded">arrow_back</span>
        Вернуться к картам
      </BackButton>

      {loading ? (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка карты...</p>
        </LoadingContainer>
      ) : card && (
        <ContentContainer>
          <CardSection>
            <AnimatePresence>
              {showAnimatedCard ? (
                <CardImageContainer
                  key="animated-card"
                  layoutId={`card-${cardId}`}
                >
                  <CardImage 
                    src={card.image_url} 
                    alt={card.name}
                    layoutId={`card-image-${cardId}`}
                  />
                  <CardGlow layoutId={`card-glow-${cardId}`} />
                </CardImageContainer>
              ) : (
                <CardImageContainer
                  key="static-card"
                  as={motion.div}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <CardImage 
                    src={card.image_url} 
                    alt={card.name}
                    as={motion.img}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <CardGlow />
                </CardImageContainer>
              )}
            </AnimatePresence>

            <CardInfo
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardTitle 
                layoutId={showAnimatedCard ? `card-name-${cardId}` : undefined}
              >
                {card.name}
              </CardTitle>
              <CardSubtitle>
                {card.type === 'major' ? 'Старший Аркан' : card.suit} • {card.number}
              </CardSubtitle>
              
              <CardDescription>
                {card.description}
              </CardDescription>

              <KeywordsList>
                {card.keywords.map((keyword, index) => (
                  <Keyword 
                    key={index}
                    as={motion.span}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {keyword}
                  </Keyword>
                ))}
              </KeywordsList>
            </CardInfo>
          </CardSection>

          <DetailsSection
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 50 }}
            transition={{ duration: 0.5 }}
            className="glass-card"
          >
            <DetailBlock>
              <DetailTitle>
                <span className="material-symbols-rounded">light_mode</span>
                В прямом положении
              </DetailTitle>
              <DetailText>{card.meanings.upright}</DetailText>
            </DetailBlock>

            <DetailBlock>
              <DetailTitle>
                <span className="material-symbols-rounded">dark_mode</span>
                В перевернутом положении
              </DetailTitle>
              <DetailText>{card.meanings.reversed}</DetailText>
            </DetailBlock>

            <DetailBlock>
              <DetailTitle>
                <span className="material-symbols-rounded">psychology</span>
                Совет карты
              </DetailTitle>
              <DetailText>{card.advice}</DetailText>
            </DetailBlock>

            <ElementalInfo>
              {card.element && (
                <ElementBadge>
                  <span className="material-symbols-rounded">
                    {card.element === 'Воздух' ? 'air' : 
                     card.element === 'Огонь' ? 'local_fire_department' :
                     card.element === 'Вода' ? 'water_drop' : 'landscape'}
                  </span>
                  {card.element}
                </ElementBadge>
              )}
              {card.zodiac && (
                <ElementBadge>
                  <span className="material-symbols-rounded">stars</span>
                  {card.zodiac}
                </ElementBadge>
              )}
            </ElementalInfo>
          </DetailsSection>
        </ContentContainer>
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  
  p {
    color: var(--text-secondary);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CardImageContainer = styled(motion.div)`
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 1/1.5;
  background: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    max-width: 280px;
    margin: 0 auto;
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, 
    rgba(155, 89, 182, 0.3) 0%,
    rgba(155, 89, 182, 0.1) 40%,
    transparent 70%
  );
  pointer-events: none;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CardTitle = styled(motion.h1)`
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const CardSubtitle = styled.div`
  font-size: 1.1rem;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const Keyword = styled.span`
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const DetailsSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const DetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  
  .material-symbols-rounded {
    font-size: 1.3rem;
  }
`;

const DetailText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text);
`;

const ElementalInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ElementBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  .material-symbols-rounded {
    font-size: 1.1rem;
    color: var(--primary);
  }
`;

export default CardDetails; 