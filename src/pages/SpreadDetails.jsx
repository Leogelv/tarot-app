import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getSpreadById } from '../services/supabase/supabaseClient';
import { shuffleArray } from '../utils/helpers';
import tarotData from '../services/tarotData';

const SpreadDetails = () => {
  const { spreadId } = useParams();
  const { isSubscribed } = useSelector(state => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spread, setSpread] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [deckReady, setDeckReady] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [interpretation, setInterpretation] = useState('');
  
  useEffect(() => {
    const fetchSpread = async () => {
      try {
        setLoading(true);
        
        // Получаем расклад по ID
        const { data, error } = await getSpreadById(spreadId);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setSpread(data);
        } else {
          // Демо расклад если данные не получены
          const demoSpread = {
            id: parseInt(spreadId),
            name: 'Три карты',
            description: 'Расклад для понимания прошлого, настоящего и будущего.',
            cards_count: 3,
            is_premium: false,
            positions: ['Прошлое', 'Настоящее', 'Будущее'],
            layout: {
              type: 'line',
              positions: [
                { x: 25, y: 50 },
                { x: 50, y: 50 },
                { x: 75, y: 50 }
              ]
            }
          };
          setSpread(demoSpread);
        }
      } catch (err) {
        console.error('Error fetching spread:', err);
        setError('Не удалось загрузить расклад. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpread();
  }, [spreadId]);
  
  // Начать чтение
  const startReading = () => {
    if (!spread) return;
    
    setIsReading(true);
    
    // Создаем колоду
    const allCards = [...tarotData.major, ...tarotData.minor];
    const shuffledDeck = shuffleArray(allCards);
    setCards(shuffledDeck);
    
    setTimeout(() => {
      setDeckReady(true);
    }, 1000);
  };
  
  // Выбрать карту
  const selectCard = (index) => {
    if (selectedCards.length >= spread.cards_count) return;
    
    // Убираем выбранную карту из колоды и добавляем в выбранные
    const newDeck = [...cards];
    const selectedCard = newDeck.splice(index, 1)[0];
    
    // Случайно определяем, будет ли карта перевернута (20% шанс)
    const isReversed = Math.random() > 0.8;
    selectedCard.isReversed = isReversed;
    
    setCards(newDeck);
    setSelectedCards([...selectedCards, selectedCard]);
  };
  
  // Перевернуть карту и показать значение
  const revealCard = (index) => {
    if (revealedCards.includes(index)) return;
    
    const newRevealedCards = [...revealedCards, index];
    setRevealedCards(newRevealedCards);
    
    // Если все карты открыты, завершаем чтение
    if (newRevealedCards.length === spread.cards_count) {
      setTimeout(() => {
        setReadingComplete(true);
        generateInterpretation();
      }, 1000);
    }
  };
  
  // Генерация интерпретации расклада
  const generateInterpretation = () => {
    const interpretationParts = selectedCards.map((card, index) => {
      const position = spread.positions ? spread.positions[index] : `Позиция ${index + 1}`;
      const reversed = card.isReversed ? ' (в перевернутом положении)' : '';
      
      return `${position}: ${card.name}${reversed}
${card.isReversed ? card.meaning_rev : card.meaning_up}`;
    });
    
    setInterpretation(interpretationParts.join('\n\n'));
  };
  
  // Начать новый расклад
  const resetReading = () => {
    setIsReading(false);
    setCards([]);
    setSelectedCards([]);
    setRevealedCards([]);
    setDeckReady(false);
    setReadingComplete(false);
    setInterpretation('');
  };
  
  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка расклада...</p>
        </LoadingContainer>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton to="/spreads">Вернуться к раскладам</BackButton>
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
      
      {!isReading ? (
        <IntroContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpreadTitle>{spread?.name}</SpreadTitle>
            <SpreadDescription>{spread?.description}</SpreadDescription>
            
            <PositionsPreview>
              <h3>Позиции в раскладе:</h3>
              <PositionsList>
                {spread?.positions && spread.positions.map((position, index) => (
                  <PositionItem key={index}>
                    <PositionNumber>{index + 1}</PositionNumber>
                    <PositionName>{position}</PositionName>
                  </PositionItem>
                ))}
              </PositionsList>
            </PositionsPreview>
            
            <ActionButtons>
              <StartButton 
                onClick={startReading}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Начать расклад
              </StartButton>
              <BackButton 
                to="/spreads"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Вернуться к раскладам
              </BackButton>
            </ActionButtons>
          </motion.div>
        </IntroContainer>
      ) : (
        <ReadingContainer>
          {!readingComplete ? (
            <>
              {/* Колода карт для выбора */}
              {selectedCards.length < spread.cards_count && (
                <DeckSection>
                  <SectionTitle>
                    Выберите {spread.cards_count - selectedCards.length} {spread.cards_count - selectedCards.length === 1 ? 'карту' : (spread.cards_count - selectedCards.length < 5 ? 'карты' : 'карт')}
                  </SectionTitle>
                  <DeckContainer>
                    <AnimatePresence>
                      {deckReady && cards.slice(0, 15).map((card, index) => (
                        <CardInDeck
                          key={`deck-${index}`}
                          as={motion.div}
                          initial={{ opacity: 0, y: 20, rotateY: 180 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            rotateY: 180, 
                            transition: { delay: index * 0.05, duration: 0.3 } 
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -50, 
                            transition: { duration: 0.2 } 
                          }}
                          whileHover={{ 
                            y: -10, 
                            boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.2 }
                          }}
                          onClick={() => selectCard(index)}
                        >
                          <CardBack />
                        </CardInDeck>
                      ))}
                    </AnimatePresence>
                  </DeckContainer>
                </DeckSection>
              )}
              
              {/* Расклад карт */}
              {selectedCards.length > 0 && (
                <SpreadSection>
                  <SectionTitle>Ваш расклад</SectionTitle>
                  <SpreadLayout>
                    {spread?.layout.positions.map((position, index) => {
                      const card = selectedCards[index];
                      const isRevealed = revealedCards.includes(index);
                      
                      return (
                        <CardPosition
                          key={`position-${index}`}
                          style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                          }}
                        >
                          <PositionName>{spread.positions ? spread.positions[index] : `Позиция ${index + 1}`}</PositionName>
                          
                          {card ? (
                            <SpreadCard
                              onClick={() => revealCard(index)}
                              as={motion.div}
                              initial={{ rotateY: 180 }}
                              animate={{ 
                                rotateY: isRevealed ? 0 : 180,
                                transition: { duration: 0.6 }
                              }}
                              $isRevealed={isRevealed}
                              $isReversed={card.isReversed}
                            >
                              <CardInner>
                                <CardBack />
                                <CardFront>
                                  <CardImage 
                                    src={`/images/cards/${card.name_short}.jpg`} 
                                    alt={card.name}
                                    onError={(e) => {
                                      e.target.src = `https://via.placeholder.com/150x260/12121f/9b59d9?text=${card.name}`;
                                    }}
                                  />
                                  <CardTitle>{card.name}</CardTitle>
                                </CardFront>
                              </CardInner>
                            </SpreadCard>
                          ) : (
                            <EmptyPosition>
                              {index + 1}
                            </EmptyPosition>
                          )}
                        </CardPosition>
                      );
                    })}
                  </SpreadLayout>
                </SpreadSection>
              )}
              
              {/* Инструкции */}
              <Instructions>
                {selectedCards.length < spread.cards_count
                  ? 'Выберите карты из колоды выше'
                  : 'Нажмите на карты, чтобы открыть их'}
              </Instructions>
            </>
          ) : (
            <ResultsContainer
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle>Ваше чтение карт</SectionTitle>
              
              <ReadingResults>
                {selectedCards.map((card, index) => (
                  <CardResult key={`result-${index}`}>
                    <ResultPosition>
                      {spread.positions ? spread.positions[index] : `Позиция ${index + 1}`}
                    </ResultPosition>
                    <ResultCardContainer>
                      <ResultCard $isReversed={card.isReversed}>
                        <CardImage 
                          src={`/images/cards/${card.name_short}.jpg`} 
                          alt={card.name} 
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/150x260/12121f/9b59d9?text=${card.name}`;
                          }}
                        />
                      </ResultCard>
                      <ResultInfo>
                        <ResultCardName>
                          {card.name} {card.isReversed && '(Перевернута)'}
                        </ResultCardName>
                        <ResultMeaning>
                          {card.isReversed ? card.meaning_rev : card.meaning_up}
                        </ResultMeaning>
                      </ResultInfo>
                    </ResultCardContainer>
                  </CardResult>
                ))}
              </ReadingResults>
              
              <ActionButtons>
                <StartButton 
                  onClick={resetReading}
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Новый расклад
                </StartButton>
                <BackButton 
                  to="/spreads"
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Вернуться к раскладам
                </BackButton>
              </ActionButtons>
            </ResultsContainer>
          )}
        </ReadingContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 80vh;
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

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SpreadTitle = styled.h1`
  margin-bottom: 20px;
`;

const SpreadDescription = styled.p`
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const PositionsPreview = styled.div`
  margin: 20px 0 40px;
  background: var(--card-bg);
  padding: 25px;
  border-radius: var(--radius);
  max-width: 600px;
  width: 100%;
  
  h3 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

const PositionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PositionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: var(--radius);
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(155, 89, 217, 0.1);
  }
`;

const PositionNumber = styled.div`
  background: var(--primary);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const PositionName = styled.div`
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StartButton = styled.button`
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-family: var(--font-heading);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(155, 89, 217, 0.3);
`;

const BackButton = styled(Link)`
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 12px 30px;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-family: var(--font-heading);
  text-decoration: none;
  display: inline-block;
  text-align: center;
`;

const ReadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const DeckSection = styled.div`
  margin-bottom: 30px;
`;

const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  max-width: 900px;
  margin: 0 auto;
`;

const CardInDeck = styled.div`
  width: 90px;
  height: 150px;
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: linear-gradient(135deg, #1a1e3a 0%, #2a3166 100%);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(155, 89, 217, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background-image: url('/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.6;
  }
`;

const SpreadSection = styled.div`
  margin-top: 20px;
`;

const SpreadLayout = styled.div`
  position: relative;
  background: rgba(18, 21, 48, 0.3);
  border-radius: var(--radius);
  height: 400px;
  margin: 0 auto;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const CardPosition = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const EmptyPosition = styled.div`
  width: 80px;
  height: 120px;
  border: 2px dashed rgba(155, 89, 217, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background: rgba(18, 21, 48, 0.2);
`;

const SpreadCard = styled.div`
  width: 80px;
  height: 120px;
  perspective: 1000px;
  cursor: ${props => props.$isRevealed ? 'default' : 'pointer'};
  transform-style: preserve-3d;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  font-size: 0.7rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Instructions = styled.div`
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-style: italic;
`;

const ResultsContainer = styled.div`
  width: 100%;
`;

const ReadingResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

const CardResult = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ResultPosition = styled.h3`
  margin-bottom: 15px;
  color: var(--primary);
  font-size: 1.2rem;
`;

const ResultCardContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const ResultCard = styled.div`
  width: 120px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: ${props => props.$isReversed ? 'rotate(180deg)' : 'none'};
`;

const ResultInfo = styled.div`
  flex: 1;
`;

const ResultCardName = styled.h4`
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const ResultMeaning = styled.p`
  line-height: 1.6;
  color: var(--text-secondary);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  
  p {
    margin-top: 20px;
    color: var(--text-secondary);
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(220, 53, 69, 0.1);
  color: #ff6b6b;
  padding: 20px;
  border-radius: var(--radius);
  margin-bottom: 20px;
  text-align: center;
`;

export default SpreadDetails; 