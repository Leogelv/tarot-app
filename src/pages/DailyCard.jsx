import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
            Подготавливаем вашу карту дня...
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
        <ContentContainer>
          <CardSection>
            <CardContainer
              as={motion.div}
              initial={{ opacity: 0, y: 30, rotateY: 0 }}
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
                ) : saveSuccess ? (
                  <>
                    <span className="material-symbols-rounded">check</span>
                    Сохранено!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-rounded">save</span>
                    Сохранить размышление
                  </>
                )}
              </SaveButton>
            </ReflectionSection>
          </InfoSection>
        </ContentContainer>
      )}
    </PageContainer>
  );
};

// Стили компонента
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  
  p {
    margin-top: 1rem;
    color: var(--text-secondary);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 1rem;
  border-radius: var(--radius);
  margin: 2rem auto;
  max-width: 600px;
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const CardSection = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 1024px) {
    position: sticky;
    top: 100px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1.5;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
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
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
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
    45deg,
    rgba(155, 89, 182, 0.2) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
`;

const FlipHint = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  font-size: 0.9rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: var(--primary);
  font-family: var(--font-heading);
`;

const CardNumber = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 1rem;
`;

const CardKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Keyword = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(155, 89, 182, 0.1);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
`;

const CardText = styled.p`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text);
  
  strong {
    color: var(--text-secondary);
    font-weight: 600;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TodayInfo = styled.div`
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--text);
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
    margin-left: 1rem;
  }
`;

const CardName = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.25rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
`;

const CardType = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text);
  line-height: 1.6;
`;

const CardMessage = styled.div`
  background: rgba(155, 89, 182, 0.05);
  border-left: 4px solid var(--primary);
  padding: 1rem;
  border-radius: 0 var(--radius) var(--radius) 0;
`;

const MessageTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: var(--primary);
`;

const Message = styled.p`
  color: var(--text);
  line-height: 1.6;
`;

const ReflectionSection = styled.div`
  padding: 1.5rem;
`;

const ReflectionPrompt = styled.p`
  margin-bottom: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ReflectionInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 1rem;
  color: var(--text);
  font-family: inherit;
  resize: vertical;
  
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
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default DailyCard; 