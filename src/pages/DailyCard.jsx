import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import DeckShuffleEffect from '../components/deck/DeckShuffleEffect';
import CardTransition from '../components/cardDetails/CardTransition';

// Мок данных для карты дня
const mockDailyCard = {
  id: 0,
  name: 'Шут',
  type: 'major',
  number: '0',
  image_url: 'https://www.trustedtarot.com/img/cards/the-fool.png',
  description: 'Шут символизирует начало нового путешествия, спонтанность и безграничный потенциал. Эта карта говорит о новых начинаниях, когда вы стоите на пороге чего-то нового и неизведанного.',
  keywords: ['Новые начинания', 'Спонтанность', 'Невинность', 'Приключения', 'Потенциал'],
  isReversed: false,
};

const DailyCard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDeckSelection, setShowDeckSelection] = useState(false);
  const [dailyCard, setDailyCard] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [reflection, setReflection] = useState('');
  
  // Эффект для симуляции загрузки данных
  useEffect(() => {
    // Показываем сначала экран загрузки
    setLoading(true);
    
    // Затем предлагаем выбрать карту из колоды
    setTimeout(() => {
      setLoading(false);
      setShowDeckSelection(true);
    }, 1000);
  }, []);
  
  // Обработчик выбора карты из колоды
  const handleCardSelect = (cardId) => {
    setShowDeckSelection(false);
    
    // Показать анимацию перехода
    setShowTransition(true);
    
    // После завершения анимации показываем карту дня
    setTimeout(() => {
      setDailyCard(mockDailyCard);
      setShowTransition(false);
    }, 500);
  };
  
  // Обработчик анимации перехода
  const handleTransitionComplete = () => {
    // После завершения перехода показать карту
    setDailyCard(mockDailyCard);
    setShowTransition(false);
  };
  
  // Обработчик нажатия на карту
  const handleCardClick = () => {
    if (!isCardFlipped) {
      setIsCardFlipped(true);
    }
  };
  
  // Обработчик сохранения рефлексии
  const handleSaveReflection = () => {
    // Здесь можно добавить логику сохранения рефлексии
    navigate(`/cards/${dailyCard.id}`);
  };
  
  // Если идет загрузка, показываем спиннер
  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <LoadingText>Подготовка карты дня...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }
  
  // Если нужно выбрать карту из колоды
  if (showDeckSelection) {
    return (
      <PageContainer>
        <DeckInstructionText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Выберите одну карту из колоды
        </DeckInstructionText>
        
        <DeckContainer>
          <DeckShuffleEffect onSelectCard={handleCardSelect} />
        </DeckContainer>
      </PageContainer>
    );
  }
  
  // Если происходит переход к карте
  if (showTransition) {
    return (
      <CardTransition 
        imageUrl={mockDailyCard.image_url} 
        onTransitionComplete={handleTransitionComplete} 
      />
    );
  }
  
  // Главный контент - показываем карту дня
  return (
    <PageContainer>
      <PageHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderTitle>Карта дня</HeaderTitle>
        <HeaderSubtitle>Ваше ежедневное руководство и точка для размышлений</HeaderSubtitle>
      </PageHeader>
      
      {dailyCard && (
        <DailyCardContainer>
          <AnimatePresence>
            <CardContainer
              key={isCardFlipped ? 'flipped' : 'notFlipped'}
              initial={{ rotateY: isCardFlipped ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
            >
              {!isCardFlipped ? (
                <CardBack onClick={handleCardClick}>
                  <CardBackPattern />
                  <CardBackText>Нажмите, чтобы открыть карту дня</CardBackText>
                </CardBack>
              ) : (
                <CardFront>
                  <CardImage src={dailyCard.image_url} alt={dailyCard.name} />
                  <CardInfo>
                    <CardTitle>{dailyCard.name}</CardTitle>
                    <CardSubtitle>
                      {dailyCard.type === 'major' ? 'Старший Аркан' : dailyCard.suit} • {dailyCard.number}
                      {dailyCard.isReversed && ' • В перевернутом положении'}
                    </CardSubtitle>
                    
                    <CardDescription>
                      {dailyCard.description}
                    </CardDescription>
                    
                    <KeywordsList>
                      {dailyCard.keywords.map((keyword, index) => (
                        <Keyword key={index}>{keyword}</Keyword>
                      ))}
                    </KeywordsList>
                  </CardInfo>
                </CardFront>
              )}
            </CardContainer>
          </AnimatePresence>
          
          {isCardFlipped && (
            <ReflectionSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ReflectionTitle>Ваши мысли о карте дня</ReflectionTitle>
              <ReflectionTextArea
                placeholder="Запишите свои мысли, чувства или интерпретацию этой карты..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
              
              <ButtonGroup>
                <DetailButton onClick={() => navigate(`/cards/${dailyCard.id}`)}>
                  <span className="material-symbols-rounded">info</span>
                  Подробнее о карте
                </DetailButton>
                
                <SaveButton onClick={handleSaveReflection}>
                  <span className="material-symbols-rounded">check_circle</span>
                  Сохранить и закрыть
                </SaveButton>
              </ButtonGroup>
            </ReflectionSection>
          )}
        </DailyCardContainer>
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 80vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const DeckInstructionText = styled(motion.h2)`
  text-align: center;
  margin-bottom: 2rem;
  font-family: var(--font-heading);
  font-size: 1.8rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DeckContainer = styled.div`
  height: 70vh;
  width: 100%;
  position: relative;
`;

const PageHeader = styled(motion.header)`
  text-align: center;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const DailyCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 1rem;
`;

const CardContainer = styled(motion.div)`
  perspective: 1000px;
  width: 100%;
  height: 500px;
  cursor: pointer;
  
  @media (max-width: 600px) {
    height: 420px;
  }
`;

const CardBack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: var(--card-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  transform-style: preserve-3d;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-primary);
    opacity: 0.1;
    z-index: 1;
  }
`;

const CardBackPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('https://i.imgur.com/zDYXgP4.jpg');
  background-size: cover;
  background-position: center;
  mix-blend-mode: overlay;
  opacity: 0.3;
`;

const CardBackText = styled.div`
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  font-family: var(--font-heading);
  color: var(--text);
  text-align: center;
  padding: 1rem;
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  max-width: 80%;
`;

const CardFront = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: var(--card-bg);
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
    height: auto;
    min-height: 550px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--radius-sm);
  
  @media (max-width: 768px) {
    max-height: 250px;
    object-fit: contain;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-family: var(--font-heading);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CardSubtitle = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const CardDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text);
  margin-top: 0.5rem;
  flex: 1;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

const Keyword = styled.span`
  padding: 0.4rem 0.8rem;
  background: var(--tag-bg);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ReflectionSection = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReflectionTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const ReflectionTextArea = styled.textarea`
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text);
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .material-symbols-rounded {
    font-size: 1.3rem;
  }
`;

const DetailButton = styled(BaseButton)`
  background: var(--card-bg-hover);
  border: 1px solid var(--border);
  color: var(--text);
  
  &:hover {
    background: var(--card-bg-active);
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const SaveButton = styled(BaseButton)`
  background: var(--primary);
  border: 1px solid var(--primary);
  color: white;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

export default DailyCard; 