import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TarotDeck3D from '../components/effects/TarotDeck3D';

// Моковые данные для карты дня
const mockDailyCard = {
  id: 7,
  name: 'Колесница',
  type: 'major',
  number: '7',
  image_url: 'https://www.trustedtarot.com/img/cards/the-chariot.png',
  description: 'Колесница символизирует силу воли, решимость и победу. Она указывает на преодоление препятствий через самодисциплину и сосредоточенность. Когда Колесница появляется в гадании, она предлагает вам взять под контроль ситуацию и не сдаваться перед трудностями.',
  keywords: ['движение вперед', 'преодоление препятствий', 'сила воли', 'решимость', 'победа'],
  meaning_upright: 'Когда Колесница выпадает в прямом положении, она предвещает триумф над препятствиями и движение вперед. Это знак того, что ваша решимость и сила воли приведут вас к успеху. Карта говорит о периоде действия и прогресса, когда вы способны преодолеть любые трудности.',
  meaning_reversed: 'В перевернутом положении Колесница может указывать на отсутствие направления или контроля в вашей жизни. Она предупреждает о возможных препятствиях и задержках, а также о риске агрессивности или доминирования окружающих. Это призыв к более внимательному управлению своими эмоциями и энергией.'
};

const DailyCard = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reflection, setReflection] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeck3D, setShowDeck3D] = useState(true);
  const [cardSelected, setCardSelected] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const cardRef = useRef();
  
  useEffect(() => {
    // Имитация загрузки карты дня
    const fetchDailyCard = async () => {
      try {
        setLoading(true);
        // В этой версии карта будет выбрана через 3D колоду
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCard(mockDailyCard);
      } catch (err) {
        console.error('Error fetching daily card:', err);
        setError('Не удалось загрузить карту дня. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDailyCard();
  }, []);
  
  const handleSaveReflection = async () => {
    if (!reflection.trim()) return;
    
    try {
      setSaveLoading(true);
      // Имитируем сохранение на сервере
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Для демонстрации просто показываем успешное сохранение
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving reflection:', err);
      alert('Не удалось сохранить вашу запись. Пожалуйста, попробуйте позже.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCardSelected = (selectedCard) => {
    setCardSelected(true);
    
    // Плавно исчезает 3D колода через 1.5 секунды после выбора карты
    setTimeout(() => {
      setShowDeck3D(false);
      
      // Показываем карту с эффектом появления
      setTimeout(() => {
        setShowFullCard(true);
      }, 500);
    }, 1500);
  };
  
  const handleCardClick = () => {
    if (showFullCard) {
      // Анимируем переворот карты при клике
      setIsFlipped(!isFlipped);
    }
  };
  
  return (
    <PageContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <PageHeader>
        <PageTitle>Карта дня</PageTitle>
        <PageDescription>
          Ваше ежедневное таро-руководство для размышлений и осознания
        </PageDescription>
      </PageHeader>
      
      {error && (
        <ErrorMessage>
          <span className="material-symbols-rounded">error</span>
          {error}
        </ErrorMessage>
      )}
      
      <AnimatePresence mode="wait">
        {showDeck3D && (
          <DeckContainer
            key="deck3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TarotDeck3D 
              onCardSelected={handleCardSelected} 
              cardData={card}
            />
            <DeckInstructions>
              {!cardSelected ? 'Выберите карту дня из колоды' : 'Карта выбрана!'}
            </DeckInstructions>
          </DeckContainer>
        )}
        
        {!showDeck3D && (
          <ContentContainer
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {!showFullCard ? (
                <LoadingCardContainer
                  key="loading-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="loading-spinner"></div>
                  <p>Проявляем вашу карту дня...</p>
                </LoadingCardContainer>
              ) : (
                <CardSection
                  key="card-section"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    damping: 15,
                    stiffness: 200
                  }}
                >
                  <CardRevealEffect>
                    <CardRevealLight />
                  </CardRevealEffect>
                  
                  <CardContainer
                    ref={cardRef}
                    onClick={handleCardClick}
                    className="animated-float"
                    as={motion.div}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 20px 30px rgba(138, 43, 226, 0.3)"
                    }}
                  >
                    <CardInner $isFlipped={isFlipped}>
                      <CardFront>
                        <CardImage 
                          src={card?.image_url} 
                          alt={card?.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/500x800?text=Таро';
                          }}
                        />
                        <CardGlow />
                      </CardFront>
                      <CardBack>
                        <CardTitle>{card?.name}</CardTitle>
                        <CardNumber>{card?.number}</CardNumber>
                        <CardKeywords>
                          {card?.keywords.map((keyword, index) => (
                            <Keyword key={index}>{keyword}</Keyword>
                          ))}
                        </CardKeywords>
                        <CardText>
                          <strong>Значение:</strong> {card?.description}
                        </CardText>
                        <CardText>
                          <strong>В прямом положении:</strong> {card?.meaning_upright}
                        </CardText>
                        <CardText>
                          <strong>В перевернутом положении:</strong> {card?.meaning_reversed}
                        </CardText>
                      </CardBack>
                    </CardInner>
                    <FlipHint>Нажмите, чтобы {isFlipped ? 'увидеть карту' : 'прочитать значение'}</FlipHint>
                  </CardContainer>
                </CardSection>
              )}
            </AnimatePresence>
            
            {showFullCard && (
              <InfoSection
                as={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <TodayInfo className="glass-card">
                  <SectionTitle>Ваша карта на {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</SectionTitle>
                  <CardName>{card?.name}</CardName>
                  <CardType>{card?.type === 'major' ? 'Старший Аркан' : 'Младший Аркан'} • {card?.number}</CardType>
                  <CardDescription>{card?.description.substring(0, 150)}...</CardDescription>
                  <CardMessage>
                    <MessageTitle>Послание для вас:</MessageTitle>
                    <Message>
                      Карта Колесница приглашает вас взять под контроль ситуацию и двигаться вперед с уверенностью. 
                      Сегодня благоприятный день для проявления силы воли и решимости. 
                      Не позволяйте препятствиям останавливать вас — у вас есть все необходимые качества для их преодоления.
                    </Message>
                  </CardMessage>
                </TodayInfo>
                
                <ReflectionSection className="glass-card">
                  <SectionTitle>Ваши размышления</SectionTitle>
                  <ReflectionPrompt>
                    Запишите, какие мысли и чувства вызывает у вас эта карта. Как её значение резонирует с вашей текущей ситуацией?
                  </ReflectionPrompt>
                  <ReflectionInput
                    placeholder="Запишите ваши мысли здесь..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    rows={5}
                  />
                  <SaveButton 
                    onClick={handleSaveReflection}
                    disabled={saveLoading || !reflection.trim()}
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                  >
                    {saveLoading ? (
                      <>
                        <span className="spinner"></span>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-rounded">save</span>
                        Сохранить
                      </>
                    )}
                  </SaveButton>
                  
                  {saveSuccess && (
                    <SuccessMessage>
                      <span className="material-symbols-rounded">check_circle</span>
                      Ваши размышления сохранены!
                    </SuccessMessage>
                  )}
                </ReflectionSection>
              </InfoSection>
            )}
          </ContentContainer>
        )}
      </AnimatePresence>
      
      <ShareCardButton
        as={motion.button}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showFullCard ? 1 : 0,
          y: showFullCard ? 0 : 20
        }}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ delay: 1 }}
      >
        <span className="material-symbols-rounded">share</span>
        Поделиться картой дня
      </ShareCardButton>
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

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--error-bg);
  color: var(--error);
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

const DeckContainer = styled(motion.div)`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  height: 450px;
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const DeckInstructions = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const LoadingCardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const CardSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 350px;
  }
`;

const CardRevealEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  animation: cardReveal 1.5s ease-out;
  
  @keyframes cardReveal {
    0% {
      opacity: 1;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 0;
      transform: scale(3);
    }
  }
`;

const CardRevealLight = styled.div`
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(137, 86, 255, 0.8) 0%, rgba(137, 86, 255, 0) 70%);
  border-radius: 50%;
  animation: pulse 1.5s ease-out;
  
  @keyframes pulse {
    0% {
      transform: scale(0.3);
      opacity: 0.8;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 280px;
  height: 400px;
  cursor: pointer;
  perspective: 1000px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border-radius: var(--radius);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 2;
  
  &.animated-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    width: 220px;
    height: 340px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius);
  overflow: hidden;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
`;

const FlipHint = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.8;
  pointer-events: none;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary);
  font-family: var(--font-heading);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CardNumber = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CardKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Keyword = styled.span`
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  background: rgba(138, 43, 226, 0.1);
  border-radius: var(--radius-full);
  color: var(--secondary);
`;

const CardText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 0.5rem;
  
  strong {
    color: var(--text-primary);
  }
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TodayInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: var(--text);
  font-family: var(--font-heading);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CardName = styled.h3`
  font-size: 2rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CardType = styled.div`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
`;

const CardMessage = styled.div`
  margin-top: 1rem;
  background: rgba(138, 43, 226, 0.05);
  padding: 1.5rem;
  border-radius: var(--radius);
  border-left: 3px solid var(--primary);
`;

const MessageTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 0.8rem;
  font-family: var(--font-heading);
`;

const Message = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
`;

const ReflectionSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ReflectionPrompt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
`;

const ReflectionInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 1rem;
  resize: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--success);
  font-size: 0.9rem;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const ShareCardButton = styled(motion.button)`
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

export default DailyCard; 