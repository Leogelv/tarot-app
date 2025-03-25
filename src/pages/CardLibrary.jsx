import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Моковые данные карт для демонстрации
const mockCards = [
  { id: 0, name: 'Шут', type: 'major', number: '0', image_url: 'https://www.trustedtarot.com/img/cards/the-fool.png' },
  { id: 1, name: 'Маг', type: 'major', number: '1', image_url: 'https://www.trustedtarot.com/img/cards/the-magician.png' },
  { id: 2, name: 'Верховная Жрица', type: 'major', number: '2', image_url: 'https://www.trustedtarot.com/img/cards/the-high-priestess.png' },
  { id: 3, name: 'Императрица', type: 'major', number: '3', image_url: 'https://www.trustedtarot.com/img/cards/the-empress.png' },
  { id: 4, name: 'Император', type: 'major', number: '4', image_url: 'https://www.trustedtarot.com/img/cards/the-emperor.png' },
  { id: 5, name: 'Иерофант', type: 'major', number: '5', image_url: 'https://www.trustedtarot.com/img/cards/the-hierophant.png' },
  { id: 6, name: 'Влюбленные', type: 'major', number: '6', image_url: 'https://www.trustedtarot.com/img/cards/the-lovers.png' },
  { id: 7, name: 'Колесница', type: 'major', number: '7', image_url: 'https://www.trustedtarot.com/img/cards/the-chariot.png' },
  { id: 8, name: 'Сила', type: 'major', number: '8', image_url: 'https://www.trustedtarot.com/img/cards/strength.png' },
  { id: 9, name: 'Отшельник', type: 'major', number: '9', image_url: 'https://www.trustedtarot.com/img/cards/the-hermit.png' },
  { id: 10, name: 'Туз Кубков', type: 'minor', suit: 'cups', number: '1', image_url: 'https://www.trustedtarot.com/img/cards/ace-of-cups.png' },
  { id: 11, name: 'Туз Пентаклей', type: 'minor', suit: 'pentacles', number: '1', image_url: 'https://www.trustedtarot.com/img/cards/ace-of-pentacles.png' },
  { id: 12, name: 'Туз Мечей', type: 'minor', suit: 'swords', number: '1', image_url: 'https://www.trustedtarot.com/img/cards/ace-of-swords.png' },
  { id: 13, name: 'Туз Жезлов', type: 'minor', suit: 'wands', number: '1', image_url: 'https://www.trustedtarot.com/img/cards/ace-of-wands.png' },
];

const CardLibrary = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Имитация загрузки с сервера
    const fetchCards = async () => {
      try {
        setLoading(true);
        // Задержка для имитации загрузки
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCards(mockCards);
      } catch (err) {
        console.error('Error fetching cards:', err);
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
    <LibraryContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <LibraryHeader>
        <HeaderTitle>Библиотека Таро</HeaderTitle>
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
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Все карты
          </FilterButton>
          <FilterButton 
            $active={filter === 'major'} 
            onClick={() => setFilter('major')}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Старшие Арканы
          </FilterButton>
          <FilterButton 
            $active={filter === 'cups'} 
            onClick={() => setFilter('cups')}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Кубки
          </FilterButton>
          <FilterButton 
            $active={filter === 'wands'} 
            onClick={() => setFilter('wands')}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Жезлы
          </FilterButton>
          <FilterButton 
            $active={filter === 'swords'} 
            onClick={() => setFilter('swords')}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Мечи
          </FilterButton>
          <FilterButton 
            $active={filter === 'pentacles'} 
            onClick={() => setFilter('pentacles')}
            as={motion.button}
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
            as={motion.div}
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
                src={card.image_url} 
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
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-secondary);
`;

const SearchContainer = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  color: var(--text);
  margin-bottom: 1rem;
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.3);
  }
`;

const FilterToggle = styled.button`
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  max-height: ${props => props.$show ? '150px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$show ? '1' : '0'};
  transition: max-height 0.3s ease, opacity 0.3s ease;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? 'var(--primary-light)' : 'var(--card-bg-hover)'};
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  
  p {
    margin-top: 1rem;
    color: var(--text-secondary);
  }
`;

const NoResultsMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  background: var(--glass-bg);
  border-radius: var(--radius);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1.5rem;
  }
`;

const CardItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  background: var(--glass-bg);
  border-radius: var(--radius);
  backdrop-filter: blur(var(--backdrop-blur));
  -webkit-backdrop-filter: blur(var(--backdrop-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    box-shadow: var(--glow), var(--glass-shadow);
  }
  
  &::after {
    display: none;
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  border-radius: var(--radius);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  border-radius: var(--radius);
  transition: transform 0.3s ease;
  
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
  background: var(--gradient-glow);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  ${CardItem}:hover & {
    opacity: 1;
  }
`;

const CardName = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.3rem;
  text-align: center;
  color: var(--text);
`;

const CardType = styled.p`
  font-size: 0.8rem;
  margin: 0;
  text-align: center;
  color: var(--text-secondary);
`;

export default CardLibrary; 