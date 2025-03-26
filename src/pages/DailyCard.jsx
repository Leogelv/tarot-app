import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import DeckOfCards from '../components/effects/DeckOfCards';

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
  const [showCardInfo, setShowCardInfo] = useState(false);
  
  useEffect(() => {
    // Имитация загрузки карты дня
    const fetchDailyCard = async () => {
      try {
        setLoading(true);
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Для демо используем моковые данные
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
  
  const handleCardSelect = () => {
    // Переход к информации о карте после выбора из колоды
    setTimeout(() => {
      setShowCardInfo(true);
    }, 500);
  };
  
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
  
  const handleStartOver = () => {
    setShowCardInfo(false);
    setTimeout(() => {
      setShowCardInfo(false);
      setIsFlipped(false);
    }, 300);
  };
  
  return (
    <PageContainer className="page-container">
      <PageHeader>
        <PageTitle>Карта дня</PageTitle>
        <PageDescription>
          Ваше ежедневное таро-руководство для размышлений и осознания
        </PageDescription>
      </PageHeader>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Подготавливаем колоду специально для вас...
          </motion.p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>
          <span className="material-symbols-rounded">error</span>
          {error}
        </ErrorMessage>
      )}
      
      {!loading && !error && card && (
        <AnimatePresence mode="wait">
          {!showCardInfo ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <DeckInstructions>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Нажмите на верхнюю карту колоды, чтобы увидеть вашу карту дня
                </motion.p>
              </DeckInstructions>
              
              <DeckOfCards 
                onSelectCard={handleCardSelect} 
                cardTexture="https://www.trustedtarot.com/img/cards/card-back.png"
              />
            </motion.div>
          ) : (
            <motion.div
              key="card-info"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <ContentContainer>
                <BackButton onClick={handleStartOver}>
                  <span className="material-symbols-rounded">arrow_back</span>
                  Вернуться к колоде
                </BackButton>
                
                <CardSection>
                  <CardContainer
                    as={motion.div}
                    initial={{ opacity: 0, y: 30, rotateY: 180 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateY: isFlipped ? 180 : 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20
                      }
                    }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="animated-float"
                  >
                    <CardInner $isFlipped={isFlipped}>
                      <CardFront>
                        <CardImage 
                          src={card.image_url} 
                          alt={card.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/500x800?text=Таро';
                          }}
                        />
                        <CardGlow />
                      </CardFront>
                      <CardBack>
                        <CardTitle>{card.name}</CardTitle>
                        <CardNumber>{card.number}</CardNumber>
                        <CardKeywords>
                          {card.keywords.map((keyword, index) => (
                            <Keyword key={index}>{keyword}</Keyword>
                          ))}
                        </CardKeywords>
                        <CardText>
                          <strong>Значение:</strong> {card.description}
                        </CardText>
                        <CardText>
                          <strong>В прямом положении:</strong> {card.meaning_upright}
                        </CardText>
                        <CardText>
                          <strong>В перевернутом положении:</strong> {card.meaning_reversed}
                        </CardText>
                      </CardBack>
                    </CardInner>
                    <FlipHint>Нажмите, чтобы {isFlipped ? 'увидеть карту' : 'прочитать значение'}</FlipHint>
                  </CardContainer>
                </CardSection>
                
                <InfoSection
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <TodayInfo className="glass-card">
                    <SectionTitle>Ваша карта на {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</SectionTitle>
                    <CardName>{card.name}</CardName>
                    <CardType>{card.type === 'major' ? 'Старший Аркан' : 'Младший Аркан'} • {card.number}</CardType>
                    <CardDescription>{card.description.substring(0, 150)}...</CardDescription>
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
              </ContentContainer>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem 8rem;
  position: relative;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  gap: 1.5rem;
  text-align: center;
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: var(--radius);
  color: #f44336;
  margin: 2rem 0;
  text-align: center;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const DeckInstructions = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: var(--radius);
    display: inline-block;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.6rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
    border-color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.1rem;
  }
`;

const CardSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  position: relative;
  perspective: 1500px;
  width: 300px;
  height: 450px;
  cursor: pointer;
  
  &.animated-float {
    animation: float 4s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 375px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  border-radius: var(--radius);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
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
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  overflow-y: auto;
  text-align: left;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(155, 89, 182, 0.3) 0%,
    rgba(142, 68, 173, 0.1) 40%,
    transparent 70%
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
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
  font-family: var(--font-heading);
`;

const CardNumber = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

const CardKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
`;

const Keyword = styled.span`
  font-size: 0.8rem;
  background: rgba(155, 89, 182, 0.1);
  color: var(--primary);
  padding: 0.3rem 0.6rem;
  border-radius: 30px;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: var(--text);
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TodayInfo = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--text);
  font-family: var(--font-heading);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .material-symbols-rounded {
    color: var(--primary);
  }
`;

const CardName = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.2rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-heading);
`;

const CardType = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const CardDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

const CardMessage = styled.div`
  background: rgba(155, 89, 182, 0.05);
  border-left: 3px solid var(--primary);
  padding: 1.2rem;
  border-radius: 0 var(--radius) var(--radius) 0;
`;

const MessageTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--primary);
  font-family: var(--font-heading);
`;

const Message = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
`;

const ReflectionSection = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ReflectionPrompt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const ReflectionInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gradient-primary);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #4CAF50;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

export default DailyCard; 