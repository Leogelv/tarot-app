import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Тасуем колоду и выбираем вашу карту дня...
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
      )}
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
    animation: blob-float 15s ease-in-out infinite alternate;
    animation-delay: -2s;
  }
  
  &.blob-3 {
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: var(--tertiary);
    animation: blob-float 15s ease-in-out infinite alternate;
    animation-delay: -4s;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const PageTitle = styled.h1`
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1.5rem;
  
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
  padding: 1rem;
  background: rgba(255, 76, 76, 0.1);
  border: 1px solid rgba(255, 76, 76, 0.3);
  border-radius: var(--radius);
  color: #ff4c4c;
  margin: 2rem auto;
  max-width: 500px;
  
  .material-symbols-rounded {
    font-size: 20px;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 300px;
  height: 450px;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
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
  border: 1px solid var(--border);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
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
  object-position: center;
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(155, 89, 217, 0.2) 45%,
    rgba(109, 82, 209, 0.4) 50%,
    rgba(155, 89, 217, 0.2) 55%,
    transparent 100%
  );
  opacity: 0.5;
  mix-blend-mode: screen;
  transition: opacity 0.5s ease;
  
  ${CardContainer}:hover & {
    opacity: 0.8;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--primary);
`;

const CardNumber = styled.div`
  width: 30px;
  height: 30px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: 600;
`;

const CardKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
`;

const Keyword = styled.span`
  padding: 0.3rem 0.6rem;
  background: rgba(109, 82, 209, 0.1);
  border: 1px solid rgba(109, 82, 209, 0.2);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  color: var(--primary-light);
`;

const CardText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text);
  
  strong {
    color: var(--primary-light);
  }
`;

const FlipHint = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  opacity: 0.7;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TodayInfo = styled.div`
  padding: 1.5rem;
`;

const CardName = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CardType = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const CardMessage = styled.div`
  background: rgba(155, 89, 217, 0.05);
  border-left: 3px solid var(--primary);
  padding: 1rem;
  border-radius: 0 var(--radius) var(--radius) 0;
`;

const MessageTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
`;

const Message = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
`;

const ReflectionSection = styled.div`
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary);
    border-radius: var(--radius);
  }
`;

const ReflectionPrompt = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

const ReflectionInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  resize: vertical;
  margin-bottom: 1rem;
  min-height: 120px;
  font-family: var(--font-body);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(155, 89, 217, 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.5;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #474747;
    cursor: not-allowed;
    transform: none;
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
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
  color: #4cd964;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

export default DailyCard; 