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
            $active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Cards
          </FilterButton>
          <FilterButton 
            $active={filter === 'major'} 
            onClick={() => setFilter('major')}
          >
            Major Arcana
          </FilterButton>
          <FilterButton 
            $active={filter === 'cups'} 
            onClick={() => setFilter('cups')}
          >
            Cups
          </FilterButton>
          <FilterButton 
            $active={filter === 'wands'} 
            onClick={() => setFilter('wands')}
          >
            Wands
          </FilterButton>
          <FilterButton 
            $active={filter === 'swords'} 
            onClick={() => setFilter('swords')}
          >
            Swords
          </FilterButton>
          <FilterButton 
            $active={filter === 'pentacles'} 
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
      
      {!loading && filteredCards.length === 0 && (
        <NoResultsMessage>
          No cards found matching your search criteria. Try adjusting your filters.
        </NoResultsMessage>
      )}
      
      <CardsGrid>
        {filteredCards.map(card => (
          <CardItem key={card.id || card.name} to={`/cards/${card.id || card.name}`}>
            <CardImageContainer className="animated-float">
              <CardImage src={card.image_url} alt={card.name} loading="lazy" />
            </CardImageContainer>
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
  padding: 2rem 1.5rem;
`;

const LibraryHeader = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const HeaderTitle = styled.h1`
  margin-bottom: 1rem;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;
`;

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--card-bg);
  color: var(--text);
  font-family: var(--font-body);
  margin-bottom: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.2);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const FilterButton = styled.button`
  background-color: ${props => props.$active ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-light)' : 'var(--background-secondary)'};
    transform: translateY(-2px);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1.5rem;
  }
`;

const CardItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  
  &:hover {
    box-shadow: var(--glow), var(--card-shadow);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  
  ${CardItem}:hover & {
    transform: scale(1.05);
  }
`;

const CardName = styled.h3`
  font-size: 1rem;
  text-align: center;
  font-family: var(--font-heading);
  font-weight: 500;
  margin-bottom: 0;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  p {
    margin-top: 1rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  text-align: center;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
  font-style: italic;
`;

export default CardLibrary; 