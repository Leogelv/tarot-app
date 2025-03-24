import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSpreads } from '../services/supabase/supabaseClient';

const Spreads = () => {
  const { isSubscribed } = useSelector(state => state.auth);
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSpreads = async () => {
      try {
        setLoading(true);
        
        // В демо режиме получаем все расклады, включая премиум
        const { data, error } = await getSpreads(true); // Запрашиваем все расклады (includePremium = true)
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setSpreads(data);
        } else {
          // Demo spreads if no data from API
          setSpreads([
            {
              id: 1,
              name: 'Past, Present, Future',
              description: 'A simple 3-card spread to gain insight into your situation through time.',
              cards_count: 3,
              image_url: 'https://i.imgur.com/vKIaAXv.png',
              is_premium: false,
            },
            {
              id: 2,
              name: 'Celtic Cross',
              description: 'A comprehensive 10-card spread that gives a detailed overview of your situation.',
              cards_count: 10,
              image_url: 'https://i.imgur.com/8PqKUxx.png',
              is_premium: false,
            },
            {
              id: 3,
              name: 'Relationship Spread',
              description: 'Gain insight into the dynamics and potential of a relationship.',
              cards_count: 5,
              image_url: 'https://i.imgur.com/KJTfEa7.png',
              is_premium: false,
            },
            {
              id: 4,
              name: 'Career Path',
              description: 'Explore your professional journey and potential opportunities.',
              cards_count: 4,
              image_url: 'https://i.imgur.com/a7ufoCk.png',
              is_premium: true,
            },
            {
              id: 5,
              name: 'Mind, Body, Spirit',
              description: 'Look at the aspects of your holistic well-being.',
              cards_count: 3,
              image_url: 'https://i.imgur.com/fLeofR2.png',
              is_premium: false,
            },
            {
              id: 6,
              name: 'Decision Spread',
              description: 'Helpful when facing a choice between two paths.',
              cards_count: 6,
              image_url: 'https://i.imgur.com/K3LI6k6.png',
              is_premium: true,
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching spreads:', err);
        setError('Failed to load spreads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpreads();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Таро Расклады</Title>
        <Subtitle>Откройте для себя различные способы гадания</Subtitle>
      </Header>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка раскладов...</p>
        </LoadingContainer>
      )}
      
      {!loading && (
        <>
          <SpreadCategoryTitle>Базовые расклады</SpreadCategoryTitle>
          <SpreadsGrid>
            {spreads
              .filter(spread => !spread.is_premium)
              .map(spread => (
                <SpreadCard key={spread.id} to={`/spreads/${spread.id}`}>
                  <SpreadImage src={spread.image_url || `https://via.placeholder.com/300x200?text=${spread.name}`} alt={spread.name} />
                  <SpreadContent>
                    <SpreadName>{spread.name}</SpreadName>
                    <CardCount>{spread.cards_count} карт</CardCount>
                    <SpreadDescription>{spread.description}</SpreadDescription>
                    <SpreadButton>Попробовать</SpreadButton>
                  </SpreadContent>
                </SpreadCard>
              ))}
          </SpreadsGrid>
          
          <SpreadCategoryTitle>Продвинутые расклады</SpreadCategoryTitle>
          <SpreadsGrid>
            {spreads
              .filter(spread => spread.is_premium)
              .map(spread => (
                <SpreadCard key={spread.id} to={`/spreads/${spread.id}`}>
                  <PremiumBadge>Премиум</PremiumBadge>
                  <SpreadImage 
                    src={spread.image_url || `https://via.placeholder.com/300x200?text=${spread.name}`} 
                    alt={spread.name}
                  />
                  <SpreadContent>
                    <SpreadName>{spread.name}</SpreadName>
                    <CardCount>{spread.cards_count} карт</CardCount>
                    <SpreadDescription>{spread.description}</SpreadDescription>
                    <SpreadButton>
                      Попробовать
                    </SpreadButton>
                  </SpreadContent>
                </SpreadCard>
              ))}
          </SpreadsGrid>
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

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const SpreadCategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #3a2a6c;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const SpreadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadCard = styled(Link)`
  position: relative;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ffc107;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const SpreadImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const SpreadContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SpreadName = styled.h3`
  font-size: 1.4rem;
  color: #3a2a6c;
  margin-bottom: 5px;
`;

const CardCount = styled.div`
  font-size: 0.9rem;
  color: #8e44ad;
  margin-bottom: 10px;
`;

const SpreadDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  flex: 1;
`;

const SpreadButton = styled.button`
  background-color: ${props => props.disabled ? '#e0e0e0' : '#8e44ad'};
  color: ${props => props.disabled ? '#666' : 'white'};
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;
  margin-bottom: 10px;
  
  &:hover {
    background-color: ${props => props.disabled ? '#e0e0e0' : '#6c3483'};
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

export default Spreads;