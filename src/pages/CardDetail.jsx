import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCardById } from '../services/supabase/supabaseClient';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orientation, setOrientation] = useState('upright');
  
  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const { data, error } = await getCardById(id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setCard(data);
        } else {
          // For demo purposes, create a placeholder card if no data
          const demoCard = {
            id,
            name: id === '1' ? 'The Fool' : id === '2' ? 'The Magician' : 'The High Priestess',
            type: 'major',
            suit: null,
            element: id === '1' ? 'Air' : id === '2' ? 'Mercury' : 'Moon',
            number: id,
            upright_meaning: 'New beginnings, innocence, spontaneity, free spirit, taking risks',
            reversed_meaning: 'Recklessness, carelessness, risk-taking, inconsideration, negligence',
            description: 'The Fool represents new beginnings, faith in the future, inexperience, belief in the universe, innocence, and potential.',
            image_url: id === '1' 
              ? 'https://i.imgur.com/8YUdmdF.jpg' 
              : id === '2' 
                ? 'https://i.imgur.com/iCl7yJm.jpg' 
                : 'https://i.imgur.com/MPliyKm.jpg',
            keywords: ['new beginnings', 'adventure', 'potential', 'opportunity']
          };
          setCard(demoCard);
        }
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to load card details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCard();
  }, [id]);

  const toggleOrientation = () => {
    setOrientation(orientation === 'upright' ? 'reversed' : 'upright');
  };

  if (loading) {
    return (
      <Container>
        <div className="loading-spinner"></div>
        <p>Loading card details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink to="/cards">Back to Cards</BackLink>
      </Container>
    );
  }

  if (!card) {
    return (
      <Container>
        <NotFoundMessage>Card not found</NotFoundMessage>
        <BackLink to="/cards">Back to Cards</BackLink>
      </Container>
    );
  }

  return (
    <Container>
      <CardHeader>
        <BackLink to="/cards">← Back to Cards</BackLink>
        <CardTitle>{card.name}</CardTitle>
        <CardSubtitle>
          {card.type === 'major' 
            ? `Major Arcana - ${card.number ? `Card ${card.number}` : ''}` 
            : `${card.suit ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1) : ''} - ${card.number || ''}`}
        </CardSubtitle>
      </CardHeader>
      
      <CardContent>
        <CardImageSection>
          <CardImageContainer $orientation={orientation}>
            <CardImage src={card.image_url || `https://via.placeholder.com/300x500?text=${card.name}`} alt={card.name} />
          </CardImageContainer>
          <OrientationButton onClick={toggleOrientation}>
            {orientation === 'upright' ? 'View Reversed' : 'View Upright'}
          </OrientationButton>
        </CardImageSection>
        
        <CardInfo>
          <InfoSection>
            <SectionTitle>Description</SectionTitle>
            <SectionContent>{card.description || 'No description available.'}</SectionContent>
          </InfoSection>
          
          <InfoSection>
            <SectionTitle>{orientation === 'upright' ? 'Upright Meaning' : 'Reversed Meaning'}</SectionTitle>
            <SectionContent>
              {orientation === 'upright' 
                ? card.upright_meaning || 'No upright meaning available.' 
                : card.reversed_meaning || 'No reversed meaning available.'}
            </SectionContent>
          </InfoSection>
          
          {card.element && (
            <InfoSection>
              <SectionTitle>Element</SectionTitle>
              <SectionContent>{card.element}</SectionContent>
            </InfoSection>
          )}
          
          {card.keywords && card.keywords.length > 0 && (
            <InfoSection>
              <SectionTitle>Keywords</SectionTitle>
              <KeywordsList>
                {card.keywords.map((keyword, index) => (
                  <Keyword key={index}>{keyword}</Keyword>
                ))}
              </KeywordsList>
            </InfoSection>
          )}
        </CardInfo>
      </CardContent>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CardHeader = styled.header`
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

const CardTitle = styled.h1`
  font-size: 2.5rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const CardSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImageContainer = styled.div`
  margin-bottom: 20px;
  transform: ${props => props.$orientation === 'reversed' ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.5s ease;
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const OrientationButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoSection = styled.div``;

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

const SectionContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Keyword = styled.span`
  background-color: #f3e5f5;
  color: #8e44ad;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.3rem;
`;

export default CardDetail; 