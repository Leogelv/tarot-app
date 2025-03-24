import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCards } from '../services/supabase/supabaseClient';

const CardLibrary = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const { data, error } = await getCards();
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setCards(data);
        }
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, []);

  // Filter cards based on selected filter and search term
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'major' && card.type === 'major') || 
      (filter === 'cups' && card.suit === 'cups') || 
      (filter === 'wands' && card.suit === 'wands') || 
      (filter === 'swords' && card.suit === 'swords') || 
      (filter === 'pentacles' && card.suit === 'pentacles');
    
    return matchesSearch && matchesFilter;
  });

  // For demo purposes, we'll create some placeholder cards if no data from API
  const demoCards = loading && cards.length === 0 ? [
    { id: 1, name: 'The Fool', type: 'major', image_url: 'https://i.imgur.com/8YUdmdF.jpg' },
    { id: 2, name: 'The Magician', type: 'major', image_url: 'https://i.imgur.com/iCl7yJm.jpg' },
    { id: 3, name: 'The High Priestess', type: 'major', image_url: 'https://i.imgur.com/MPliyKm.jpg' },
    { id: 10, name: 'Wheel of Fortune', type: 'major', image_url: 'https://i.imgur.com/E3l6jv2.jpg' },
    { id: 11, name: 'Justice', type: 'major', image_url: 'https://i.imgur.com/vPyHGtZ.jpg' },
    { id: 12, name: 'The Hanged Man', type: 'major', image_url: 'https://i.imgur.com/js3Qiyj.jpg' },
  ] : [];

  const displayCards = cards.length > 0 ? filteredCards : demoCards;

  return (
    <LibraryContainer>
      <LibraryHeader>
        <HeaderTitle>Tarot Card Library</HeaderTitle>
        <HeaderSubtitle>Explore the wisdom of the 78 tarot cards</HeaderSubtitle>
      </LibraryHeader>
      
      <FiltersContainer>
        <SearchInput 
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterButtons>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Cards
          </FilterButton>
          <FilterButton 
            active={filter === 'major'} 
            onClick={() => setFilter('major')}
          >
            Major Arcana
          </FilterButton>
          <FilterButton 
            active={filter === 'cups'} 
            onClick={() => setFilter('cups')}
          >
            Cups
          </FilterButton>
          <FilterButton 
            active={filter === 'wands'} 
            onClick={() => setFilter('wands')}
          >
            Wands
          </FilterButton>
          <FilterButton 
            active={filter === 'swords'} 
            onClick={() => setFilter('swords')}
          >
            Swords
          </FilterButton>
          <FilterButton 
            active={filter === 'pentacles'} 
            onClick={() => setFilter('pentacles')}
          >
            Pentacles
          </FilterButton>
        </FilterButtons>
      </FiltersContainer>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Loading tarot cards...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {!loading && displayCards.length === 0 && (
        <NoResultsMessage>
          No cards found matching your search criteria. Try adjusting your filters.
        </NoResultsMessage>
      )}
      
      <CardsGrid>
        {displayCards.map(card => (
          <CardItem key={card.id} to={`/cards/${card.id}`}>
            <CardImage src={card.image_url || `https://via.placeholder.com/200x350?text=${card.name}`} alt={card.name} />
            <CardName>{card.name}</CardName>
          </CardItem>
        ))}
      </CardsGrid>
    </LibraryContainer>
  );
};

const LibraryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LibraryHeader = styled.header`
  text-align: center;
  margin-bottom: 40px;
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

const FiltersContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#8e44ad' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#8e44ad' : '#e0e0e0'};
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#6c3483' : '#f5f5f5'};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 25px;
`;

const CardItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const CardName = styled.h3`
  font-size: 1rem;
  text-align: center;
  color: #3a2a6c;
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

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

export default CardLibrary; 