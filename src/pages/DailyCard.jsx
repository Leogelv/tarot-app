import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getDailyCard, saveDailyReflection } from '../services/supabase/supabaseClient';

const DailyCard = () => {
  const { user } = useSelector(state => state.auth);
  const [card, setCard] = useState(null);
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingReflection, setSavingReflection] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  
  const today = new Date();
  
  useEffect(() => {
    const fetchDailyCard = async () => {
      try {
        setLoading(true);
        
        if (user) {
          const { data, error } = await getDailyCard(user.id, today);
          
          if (error) {
            throw new Error(error.message);
          }
          
          if (data) {
            setCard(data.cards);
            setReflection(data.reflection || '');
          } else {
            // Случайная карта из таро
            const randomMajorNumber = Math.floor(Math.random() * 22).toString().padStart(2, '0');
            setCard({
              id: parseInt(randomMajorNumber),
              name: getMajorArcanaTitleByNumber(randomMajorNumber),
              type: 'major',
              number: randomMajorNumber,
              upright_meaning: 'Значение карты сегодня особенно важно для вашего пути.',
              description: 'Эта карта выбрана специально для вас на сегодня. Изучите ее значение и как оно резонирует с вашей жизнью.',
              image_url: `/images/cards/m${randomMajorNumber}.jpg`,
            });
          }
        } else {
          // Демо-карта для не вошедших пользователей
          const randomMajorNumber = Math.floor(Math.random() * 22).toString().padStart(2, '0');
          setCard({
            id: parseInt(randomMajorNumber),
            name: getMajorArcanaTitleByNumber(randomMajorNumber),
            type: 'major',
            number: randomMajorNumber,
            upright_meaning: 'Значение карты сегодня особенно важно для вашего пути.',
            description: 'Эта карта выбрана специально для вас на сегодня. Изучите ее значение и как оно резонирует с вашей жизнью.',
            image_url: `/images/cards/m${randomMajorNumber}.jpg`,
          });
        }
        
        // Имитируем задержку для красивой анимации
        setTimeout(() => {
          setLoading(false);
          // Автоматический флип после загрузки
          setTimeout(() => {
            setCardFlipped(true);
          }, 500);
        }, 1500);
      } catch (err) {
        console.error('Error fetching daily card:', err);
        setError('Не удалось получить вашу карту дня. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchDailyCard();
  }, [user, today]);
  
  // Получаем название карты Старшего Аркана по номеру
  const getMajorArcanaTitleByNumber = (number) => {
    const majorArcanaTitles = {
      "00": "Шут",
      "01": "Маг",
      "02": "Верховная Жрица",
      "03": "Императрица",
      "04": "Император",
      "05": "Иерофант",
      "06": "Влюбленные",
      "07": "Колесница",
      "08": "Сила",
      "09": "Отшельник",
      "10": "Колесо Фортуны",
      "11": "Справедливость",
      "12": "Повешенный",
      "13": "Смерть",
      "14": "Умеренность",
      "15": "Дьявол",
      "16": "Башня",
      "17": "Звезда",
      "18": "Луна",
      "19": "Солнце",
      "20": "Суд",
      "21": "Мир"
    };
    
    return majorArcanaTitles[number] || `Карта ${number}`;
  };
  
  const handleSaveReflection = async () => {
    if (!user) {
      setError('Вы должны войти в систему, чтобы сохранить размышления');
      return;
    }
    
    try {
      setSavingReflection(true);
      
      const { error } = await saveDailyReflection(user.id, card.id, reflection);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setReflectionSaved(true);
      setTimeout(() => setReflectionSaved(false), 3000);
    } catch (err) {
      console.error('Error saving reflection:', err);
      setError('Не удалось сохранить ваше размышление. Пожалуйста, попробуйте еще раз.');
    } finally {
      setSavingReflection(false);
    }
  };
  
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };
  
  const handleCardClick = () => {
    if (!loading) {
      setCardFlipped(!cardFlipped);
    }
  };

  if (loading) {
    return (
      <Container>
        <DailyCardHeader>
          <HeaderDate>{formatDate(today)}</HeaderDate>
          <HeaderTitle>Ваша Карта Дня</HeaderTitle>
          <HeaderSubtitle>Мудрость и руководство на день</HeaderSubtitle>
        </DailyCardHeader>
        <LoadingContainer>
          <LoadingCard>
            <LoadingCardFront />
            <LoadingCardBack />
          </LoadingCard>
          <p>Тасуем колоду для вашей ежедневной карты...</p>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <DailyCardHeader>
        <HeaderDate>{formatDate(today)}</HeaderDate>
        <HeaderTitle>Ваша Карта Дня</HeaderTitle>
        <HeaderSubtitle>Мудрость и руководство на день</HeaderSubtitle>
      </DailyCardHeader>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {reflectionSaved && (
        <SuccessMessage>Ваше размышление сохранено!</SuccessMessage>
      )}
      
      <CardSection>
        <CardImageWrapper>
          <CardFlipContainer onClick={handleCardClick} $flipped={cardFlipped}>
            <CardFront>
              <CardPattern>
                <span>Нажмите, чтобы перевернуть</span>
              </CardPattern>
            </CardFront>
            <CardBack>
              <CardImage 
                src={card?.image_url} 
                alt={card?.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/images/cards/m00.jpg`;
                }}
              />
            </CardBack>
          </CardFlipContainer>
        </CardImageWrapper>
        
        <CardContent>
          <CardName>{card?.name}</CardName>
          <CardType>
            {card?.type === 'major' 
              ? `Старший Аркан - ${card.number ? `Аркан ${parseInt(card.number)}` : ''}` 
              : `${card?.suit ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1) : ''} - ${card?.number || ''}`}
          </CardType>
          
          <CardMeaning className="glass-card">
            <SectionTitle>Значение на Сегодня</SectionTitle>
            <p>{card?.upright_meaning || 'Нет доступного значения.'}</p>
          </CardMeaning>
          
          <CardDescription className="glass-card">
            <SectionTitle>Описание Карты</SectionTitle>
            <p>{card?.description || 'Нет доступного описания.'}</p>
          </CardDescription>
          
          <ReflectionSection className="neo-card">
            <SectionTitle>Ваше Размышление</SectionTitle>
            <ReflectionText 
              value={reflection} 
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Запишите свои мысли о сегодняшней карте и как она относится к вашему дню..."
              rows={5}
            />
            <ReflectionActions>
              <SaveButton 
                as={motion.button}
                onClick={handleSaveReflection} 
                disabled={savingReflection}
                whileTap={{ scale: 0.95 }}
              >
                {savingReflection ? 'Сохранение...' : 'Сохранить Размышление'}
              </SaveButton>
              <ViewCardLink to={`/cards/${card?.id || card?.number}`}>Полная Информация о Карте</ViewCardLink>
            </ReflectionActions>
          </ReflectionSection>
        </CardContent>
      </CardSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
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
    bottom: 10%;
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

const DailyCardHeader = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const HeaderDate = styled.p`
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 10px;
`;

const HeaderTitle = styled.h1`
  margin-bottom: 10px;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  perspective: 1000px;
`;

const CardFlipContainer = styled.div`
  width: 100%;
  max-width: 300px;
  aspect-ratio: 2/3;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${props => props.$flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  animation: float 6s ease-in-out infinite;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
`;

const CardFront = styled(CardSide)`
  background: var(--gradient-card);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardPattern = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/images/card-back-pattern.png'), linear-gradient(145deg, var(--primary-dark), var(--primary));
  background-size: 60px 60px, cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  span {
    background: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 8px 16px;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${CardFlipContainer}:hover & span {
    opacity: 1;
  }
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const CardName = styled.h2`
  margin-bottom: 5px;
`;

const CardType = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
`;

const CardMeaning = styled.div`
  padding: 1.8rem;
`;

const CardDescription = styled.div`
  padding: 1.8rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: 3px;
  }
`;

const ReflectionSection = styled.div`
  margin-top: 10px;
`;

const ReflectionText = styled.textarea`
  width: 100%;
  background: rgba(26, 30, 58, 0.3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 15px;
  color: var(--text);
  font-family: var(--font-body);
  resize: vertical;
  min-height: 120px;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const ReflectionActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const SaveButton = styled.button`
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  padding: 12px 25px;
  font-family: var(--font-heading);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(155, 89, 217, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(155, 89, 217, 0.5);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ViewCardLink = styled(Link)`
  color: var(--primary);
  font-size: 0.95rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-light);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  
  p {
    margin-top: 25px;
    color: var(--text-secondary);
  }
`;

const LoadingCard = styled.div`
  width: 240px;
  height: 360px;
  position: relative;
  perspective: 1000px;
  animation: float 3s ease-in-out infinite;
`;

const LoadingCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  background: var(--gradient-card);
  background-size: 60px 60px, cover;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s ease-in-out infinite;
`;

const LoadingCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  background: linear-gradient(145deg, var(--primary-dark), var(--primary));
  transform: rotateY(180deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  background-color: rgba(220, 53, 69, 0.1);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid rgba(220, 53, 69, 0.2);
`;

const SuccessMessage = styled.div`
  background-color: rgba(40, 167, 69, 0.1);
  color: #2ecc71;
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid rgba(40, 167, 69, 0.2);
`;

export default DailyCard; 