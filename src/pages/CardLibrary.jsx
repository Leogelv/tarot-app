import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getCards } from '../services/supabase/supabaseClient';

const CardLibrary = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <LibraryContainer>
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <LibraryHeader>
        <HeaderTitle>Таро Библиотека</HeaderTitle>
        <HeaderSubtitle>Изучите мудрость 78 карт Таро</HeaderSubtitle>
      </LibraryHeader>
      
      <SearchContainer className="glass-card">
        <SearchInput 
          type="text"
          placeholder="Поиск карт..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterToggle onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </FilterToggle>
        
        <FilterButtons $show={showFilters}>
          <FilterButton 
            $active={filter === 'all'} 
            onClick={() => setFilter('all')}
            whileTap={{ scale: 0.95 }}
          >
            Все карты
          </FilterButton>
          <FilterButton 
            $active={filter === 'major'} 
            onClick={() => setFilter('major')}
            whileTap={{ scale: 0.95 }}
          >
            Старшие Арканы
          </FilterButton>
          <FilterButton 
            $active={filter === 'cups'} 
            onClick={() => setFilter('cups')}
            whileTap={{ scale: 0.95 }}
          >
            Кубки
          </FilterButton>
          <FilterButton 
            $active={filter === 'wands'} 
            onClick={() => setFilter('wands')}
            whileTap={{ scale: 0.95 }}
          >
            Жезлы
          </FilterButton>
          <FilterButton 
            $active={filter === 'swords'} 
            onClick={() => setFilter('swords')}
            whileTap={{ scale: 0.95 }}
          >
            Мечи
          </FilterButton>
          <FilterButton 
            $active={filter === 'pentacles'} 
            onClick={() => setFilter('pentacles')}
            whileTap={{ scale: 0.95 }}
          >
            Пентакли
          </FilterButton>
        </FilterButtons>
      </SearchContainer>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка карт Таро...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {!loading && filteredCards.length === 0 && (
        <NoResultsMessage>
          Карты не найдены. Попробуйте изменить параметры поиска.
        </NoResultsMessage>
      )}
      
      <CardsGrid>
        {filteredCards.map((card, index) => (
          <CardItem 
            key={card.id || card.name} 
            to={`/cards/${card.id || card.number || index}`}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -10, 
              transition: { duration: 0.3 }
            }}
          >
            <CardImageContainer className="animated-float">
              <CardImage 
                src={card.image_url || `/images/cards/${card.type === 'major' ? 'm' : card.suit?.charAt(0)}${card.number?.padStart(2, '0')}.jpg`} 
                alt={card.name} 
                loading="lazy" 
              />
              <CardGlow />
            </CardImageContainer>
            <CardName>{card.name}</CardName>
            <CardType>
              {card.type === 'major' ? 'Старший Аркан' : card.suit}
              {card.number && ` • ${card.number}`}
            </CardType>
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

const SearchContainer = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background-color: rgba(26, 30, 58, 0.3);
  color: var(--text);
  font-family: var(--font-body);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FilterToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: var(--primary-light);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  max-height: ${props => props.$show ? '150px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s ease;
  opacity: ${props => props.$show ? '1' : '0'};
  margin-top: ${props => props.$show ? '1rem' : '0'};
`;

const FilterButton = styled(motion.button)`
  background-color: ${props => props.$active ? 'var(--primary)' : 'rgba(26, 30, 58, 0.5)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--glass-border)'};
  border-radius: var(--radius-full);
  padding: 0.7rem 1.2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  box-shadow: ${props => props.$active ? '0 5px 15px rgba(155, 89, 217, 0.25)' : 'none'};
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-light)' : 'rgba(26, 30, 58, 0.8)'};
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

const CardItem = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  transition: transform 0.3s ease;
  border-radius: var(--radius);
  padding: 1rem;
  
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

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(155, 89, 217, 0) 0%, rgba(155, 89, 217, 0.1) 50%, rgba(155, 89, 217, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${CardItem}:hover & {
    opacity: 1;
  }
`;

const CardName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 0.5rem;
  color: var(--text);
`;

const CardType = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
  margin: 0;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  p {
    color: var(--text-secondary);
  }
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

const NoResultsMessage = styled.div`
  background-color: var(--card-bg);
  color: var(--text-secondary);
  padding: 2rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid var(--border);
`;

export default CardLibrary; 