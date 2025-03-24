import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getDailyCard, saveDailyCardReflection } from '../services/supabase/supabaseClient';

const DailyCard = () => {
  const { user } = useSelector(state => state.auth);
  const [card, setCard] = useState(null);
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingReflection, setSavingReflection] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);
  
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
            // For demo purposes, use a placeholder card
            setCard({
              id: Math.floor(Math.random() * 22) + 1, // Random major arcana card 1-22
              name: 'The Empress',
              type: 'major',
              element: 'Venus',
              number: '3',
              upright_meaning: 'Femininity, nurturing, abundance, creativity, mother figure',
              description: 'The Empress is associated with fertility, creativity, and the abundance of nature. She represents the nurturing and protective qualities that allow for growth.',
              image_url: 'https://i.imgur.com/qiXu7Bh.jpg',
            });
          }
        } else {
          // Demo card for non-logged in users
          setCard({
            id: Math.floor(Math.random() * 22) + 1,
            name: 'The Empress',
            type: 'major',
            element: 'Venus',
            number: '3',
            upright_meaning: 'Femininity, nurturing, abundance, creativity, mother figure',
            description: 'The Empress is associated with fertility, creativity, and the abundance of nature. She represents the nurturing and protective qualities that allow for growth.',
            image_url: 'https://i.imgur.com/qiXu7Bh.jpg',
          });
        }
      } catch (err) {
        console.error('Error fetching daily card:', err);
        setError('Unable to retrieve your daily card. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDailyCard();
  }, [user, today]);
  
  const handleSaveReflection = async () => {
    if (!user) {
      setError('You must be logged in to save reflections');
      return;
    }
    
    try {
      setSavingReflection(true);
      
      const { error } = await saveDailyCardReflection(card.id, reflection);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setReflectionSaved(true);
      setTimeout(() => setReflectionSaved(false), 3000);
    } catch (err) {
      console.error('Error saving reflection:', err);
      setError('Failed to save your reflection. Please try again.');
    } finally {
      setSavingReflection(false);
    }
  };
  
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <Container>
        <div className="loading-spinner"></div>
        <p>Shuffling the deck for your daily card...</p>
      </Container>
    );
  }

  return (
    <Container>
      <DailyCardHeader>
        <HeaderDate>{formatDate(today)}</HeaderDate>
        <HeaderTitle>Your Daily Tarot Card</HeaderTitle>
        <HeaderSubtitle>Insight and guidance for your day ahead</HeaderSubtitle>
      </DailyCardHeader>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {reflectionSaved && (
        <SuccessMessage>Your reflection has been saved!</SuccessMessage>
      )}
      
      <CardSection>
        <CardImageContainer>
          <CardImage src={card?.image_url || `https://via.placeholder.com/300x500?text=${card?.name || 'Loading...'}`} alt={card?.name} />
        </CardImageContainer>
        
        <CardContent>
          <CardName>{card?.name}</CardName>
          <CardType>
            {card?.type === 'major' 
              ? `Major Arcana - ${card.number ? `Card ${card.number}` : ''}` 
              : `${card?.suit ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1) : ''} - ${card?.number || ''}`}
          </CardType>
          
          <CardDescription>
            <SectionTitle>Card Description</SectionTitle>
            <p>{card?.description || 'No description available.'}</p>
          </CardDescription>
          
          <CardMeaning>
            <SectionTitle>Today's Meaning</SectionTitle>
            <p>{card?.upright_meaning || 'No meaning available.'}</p>
          </CardMeaning>
          
          <ReflectionSection>
            <SectionTitle>Your Reflection</SectionTitle>
            <ReflectionText 
              value={reflection} 
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your thoughts about today's card and how it relates to your day..."
              rows={5}
            />
            <ReflectionActions>
              <SaveButton 
                onClick={handleSaveReflection} 
                disabled={savingReflection}
              >
                {savingReflection ? 'Saving...' : 'Save Reflection'}
              </SaveButton>
              <ViewCardLink to={`/cards/${card?.id}`}>View Full Card Details</ViewCardLink>
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
  font-size: 2.5rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const CardName = styled.h2`
  font-size: 2rem;
  color: #3a2a6c;
  margin-bottom: 5px;
`;

const CardType = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
`;

const CardDescription = styled.div``;

const CardMeaning = styled.div``;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #3a2a6c;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary);
  }
`;

const ReflectionSection = styled.div``;

const ReflectionText = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const ReflectionActions = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: #d3a1e1;
    cursor: not-allowed;
  }
`;

const ViewCardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f9f4fc;
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

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

export default DailyCard; 