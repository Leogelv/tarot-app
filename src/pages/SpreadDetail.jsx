import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSpreadById, getCards, saveReading } from '../services/supabase/supabaseClient';

const SpreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isSubscribed } = useSelector(state => state.auth);
  
  const [spread, setSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [readingStarted, setReadingStarted] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingReading, setSavingReading] = useState(false);
  
  useEffect(() => {
    const fetchSpreadAndCards = async () => {
      try {
        setLoading(true);
        // Fetch spread details
        const { data: spreadData, error: spreadError } = await getSpreadById(id);
        
        if (spreadError) {
          throw new Error(spreadError.message);
        }
        
        // Все расклады доступны в демо-режиме без ограничений
        
        // If no data from API, use demo spread
        const currentSpread = spreadData || {
          id,
          name: id === '1' ? 'Past, Present, Future' : id === '2' ? 'Celtic Cross' : 'Relationship Spread',
          description: 'A simple spread to gain insight into your situation.',
          instructions: 'Focus on your question while shuffling the cards. When ready, click on the positions to reveal each card.',
          positions: id === '1' 
            ? [
                { id: 1, name: 'Past', description: 'Influences from the past that affect the situation' },
                { id: 2, name: 'Present', description: 'Current situation and challenges' },
                { id: 3, name: 'Future', description: 'Potential outcome or direction' }
              ] 
            : id === '2'
            ? [
                { id: 1, name: 'The Present', description: 'Current situation' },
                { id: 2, name: 'The Challenge', description: 'Primary obstacle or challenge' },
                { id: 3, name: 'The Past', description: 'Recent past events affecting situation' },
                { id: 4, name: 'The Future', description: 'Coming influence or events' },
                { id: 5, name: 'Above', description: 'Your conscious goals or ideals' },
                { id: 6, name: 'Below', description: 'Your unconscious feelings or drives' },
                { id: 7, name: 'Advice', description: 'Recommended approach' },
                { id: 8, name: 'External Influences', description: 'Others affecting the situation' },
                { id: 9, name: 'Hopes and Fears', description: 'What you desire or worry about' },
                { id: 10, name: 'Outcome', description: 'Final outcome if current course continued' }
              ]
            : [
                { id: 1, name: 'You', description: 'Your role and perspective' },
                { id: 2, name: 'Partner', description: 'Their role and perspective' },
                { id: 3, name: 'Connection', description: 'The bond between you' },
                { id: 4, name: 'Challenge', description: 'Main obstacle to overcome' },
                { id: 5, name: 'Outcome', description: 'Potential direction' }
              ],
          cards_count: id === '1' ? 3 : id === '2' ? 10 : 5,
          image_url: id === '1' ? 'https://i.imgur.com/vKIaAXv.png' : id === '2' ? 'https://i.imgur.com/8PqKUxx.png' : 'https://i.imgur.com/KJTfEa7.png',
          is_premium: false,
        };
        
        setSpread(currentSpread);
        
        // Fetch cards for the deck
        const { data: cardsData, error: cardsError } = await getCards();
        
        if (cardsError) {
          throw new Error(cardsError.message);
        }
        
        if (cardsData) {
          setCards(cardsData);
        } else {
          // Demo cards if no data from API
          const demoCards = Array(78).fill().map((_, index) => ({
            id: index + 1,
            name: `Card ${index + 1}`,
            image_url: `https://via.placeholder.com/150x250?text=Card+${index + 1}`,
            type: index < 22 ? 'major' : 'minor',
            number: index < 22 ? index : (index % 14) + 1,
            suit: index < 22 ? null : ['cups', 'wands', 'swords', 'pentacles'][Math.floor((index - 22) / 14)],
            upright_meaning: 'Card meaning for upright position',
            reversed_meaning: 'Card meaning for reversed position',
          }));
          setCards(demoCards);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load spread details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpreadAndCards();
  }, [id, isSubscribed]);
  
  const startReading = () => {
    if (!isAuthenticated) {
      setError('Please log in to start a reading');
      return;
    }
    
    // Shuffle cards and select cards for the reading
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, spread.cards_count || spread.positions.length);
    
    // Add random orientation
    const selectedWithOrientation = selected.map(card => ({
      ...card,
      orientation: Math.random() > 0.7 ? 'reversed' : 'upright' // 30% chance of reversed
    }));
    
    setSelectedCards(selectedWithOrientation);
    setReadingStarted(true);
  };
  
  const revealCard = (position) => {
    if (drawnCards.includes(position)) return;
    
    setDrawnCards(prev => [...prev, position]);
    
    // If all cards are drawn, reading is complete
    if (drawnCards.length + 1 >= spread.cards_count) {
      setReadingComplete(true);
    }
  };
  
  const saveReadingToAccount = async () => {
    if (!isAuthenticated || !user) {
      setError('Please log in to save readings');
      return;
    }
    
    try {
      setSavingReading(true);
      
      // Format cards for saving (position mapping)
      const formattedCards = selectedCards.map((card, index) => ({
        card_id: card.id,
        position: spread.positions[index].id,
        orientation: card.orientation
      }));
      
      const { data, error } = await saveReading(
        user.id,
        spread.id,
        formattedCards,
        notes
      );
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Navigate to reading result page
      if (data && data.length > 0) {
        navigate(`/reading/${data[0].id}`);
      }
    } catch (err) {
      console.error('Error saving reading:', err);
      setError('Failed to save your reading. Please try again.');
    } finally {
      setSavingReading(false);
    }
  };
  
  if (loading) {
    return (
      <Container>
        <div className="loading-spinner"></div>
        <p>Loading spread details...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink to="/spreads">Back to Spreads</BackLink>
      </Container>
    );
  }
  
  if (!spread) {
    return (
      <Container>
        <ErrorMessage>Spread not found</ErrorMessage>
        <BackLink to="/spreads">Back to Spreads</BackLink>
      </Container>
    );
  }

  return (
    <Container>
      <SpreadHeader>
        <BackLink to="/spreads">← Back to Spreads</BackLink>
        <SpreadTitle>{spread.name}</SpreadTitle>
        <SpreadDescription>{spread.description}</SpreadDescription>
      </SpreadHeader>
      
      {!readingStarted ? (
        <IntroSection>
          <SpreadImage src={spread.image_url || `https://via.placeholder.com/600x300?text=${spread.name}`} alt={spread.name} />
          <InstructionsContainer>
            <InstructionTitle>How to Use This Spread</InstructionTitle>
            <InstructionText>{spread.instructions || 'Focus on your question while shuffling the cards. When ready, click on the positions to reveal each card.'}</InstructionText>
            <StartButton onClick={startReading}>
              Start Reading
            </StartButton>
          </InstructionsContainer>
        </IntroSection>
      ) : (
        <>
          <ReadingContainer>
            <PositionsContainer count={spread.positions.length}>
              {spread.positions.map((position, index) => (
                <Position 
                  key={position.id} 
                  onClick={() => revealCard(position.id)}
                  revealed={drawnCards.includes(position.id)}
                >
                  {drawnCards.includes(position.id) ? (
                    <CardContainer orientation={selectedCards[index]?.orientation}>
                      <CardImage 
                        src={selectedCards[index]?.image_url || `https://via.placeholder.com/150x250?text=${selectedCards[index]?.name}`} 
                        alt={selectedCards[index]?.name} 
                      />
                    </CardContainer>
                  ) : (
                    <>
                      <CardBack>
                        <CardNumber>{index + 1}</CardNumber>
                      </CardBack>
                      <PositionName>{position.name}</PositionName>
                    </>
                  )}
                </Position>
              ))}
            </PositionsContainer>
            
            <ReadingInfo>
              {drawnCards.length > 0 ? (
                spread.positions
                  .filter(position => drawnCards.includes(position.id))
                  .map((position, index) => {
                    const cardIndex = spread.positions.findIndex(p => p.id === position.id);
                    const card = selectedCards[cardIndex];
                    return (
                      <CardInfo key={position.id}>
                        <CardInfoHeader>
                          <CardPositionName>{position.name}</CardPositionName>
                          <CardName>{card?.name}</CardName>
                          <CardOrientation>
                            {card?.orientation === 'reversed' ? 'Reversed' : 'Upright'}
                          </CardOrientation>
                        </CardInfoHeader>
                        <PositionDescription>{position.description}</PositionDescription>
                        <CardMeaning>
                          {card?.orientation === 'upright' 
                            ? card?.upright_meaning || 'No meaning available.' 
                            : card?.reversed_meaning || 'No meaning available.'}
                        </CardMeaning>
                      </CardInfo>
                    );
                  })
              ) : (
                <CardInfo>
                  <CardInfoHeader>
                    <CardPositionName>Click on a position to reveal a card</CardPositionName>
                  </CardInfoHeader>
                </CardInfo>
              )}
              
              {readingComplete && (
                <CompletionSection>
                  <CompletionHeading>Reading Complete</CompletionHeading>
                  <NotesLabel>Your Notes:</NotesLabel>
                  <NotesInput 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your thoughts about this reading..."
                    rows={4}
                  />
                  <SaveButton 
                    onClick={saveReadingToAccount}
                    disabled={savingReading}
                  >
                    {savingReading ? 'Saving...' : 'Save Reading'}
                  </SaveButton>
                </CompletionSection>
              )}
            </ReadingInfo>
          </ReadingContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SpreadHeader = styled.header`
  margin-bottom: 40px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const SpreadTitle = styled.h1`
  font-size: 2.5rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const SpreadDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const IntroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    justify-self: center;
  }
`;

const InstructionsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const InstructionTitle = styled.h3`
  font-size: 1.5rem;
  color: #3a2a6c;
  margin-bottom: 15px;
`;

const InstructionText = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const StartButton = styled.button`
  background-color: #8e44ad;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #6c3483;
    transform: translateY(-2px);
  }
`;

const ReadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PositionsContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => 
    props.count <= 3 ? 'repeat(3, 1fr)' : 
    props.count <= 6 ? 'repeat(3, 1fr)' : 
    'repeat(4, 1fr)'
  };
  gap: 20px;
  align-items: center;
  justify-items: center;
  padding: 20px;
  background-color: #f8f4fb;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const Position = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: ${props => props.revealed ? 'none' : 'translateY(-5px)'};
  }
`;

const CardContainer = styled.div`
  transform: ${props => props.orientation === 'reversed' ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.5s ease;
  width: 100px;
  height: 150px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CardBack = styled.div`
  background-color: #6c3483;
  background-image: linear-gradient(135deg, #8e44ad 25%, #6c3483 25%, #6c3483 50%, #8e44ad 50%, #8e44ad 75%, #6c3483 75%, #6c3483 100%);
  background-size: 40px 40px;
  width: 100px;
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

const CardNumber = styled.span`
  background-color: rgba(255, 255, 255, 0.9);
  color: #6c3483;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const PositionName = styled.span`
  font-size: 0.9rem;
  color: #3a2a6c;
  text-align: center;
`;

const ReadingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const CardInfoHeader = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
`;

const CardPositionName = styled.div`
  font-size: 1.2rem;
  color: #3a2a6c;
  font-weight: 600;
  margin-bottom: 5px;
`;

const CardName = styled.div`
  font-size: 1.4rem;
  color: #8e44ad;
`;

const CardOrientation = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const PositionDescription = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
  font-style: italic;
`;

const CardMeaning = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
`;

const CompletionSection = styled.div`
  background-color: #f0f9ff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const CompletionHeading = styled.h3`
  font-size: 1.3rem;
  color: #3a2a6c;
  margin-bottom: 15px;
`;

const NotesLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const NotesInput = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SaveButton = styled.button`
  background-color: #8e44ad;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #6c3483;
  }
  
  &:disabled {
    background-color: #d3a1e1;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

export default SpreadDetail; 