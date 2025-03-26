import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Моковые данные для карт таро
const mockTarotCards = [
  {
    id: 0,
    name: 'Шут',
    type: 'major',
    number: '0',
    image_url: 'https://www.trustedtarot.com/img/cards/the-fool.png',
    keywords: ['новые начинания', 'приключения', 'спонтанность']
  },
  {
    id: 1,
    name: 'Маг',
    type: 'major',
    number: '1',
    image_url: 'https://www.trustedtarot.com/img/cards/the-magician.png',
    keywords: ['манифестация', 'воля', 'мастерство']
  },
  {
    id: 2,
    name: 'Верховная Жрица',
    type: 'major',
    number: '2',
    image_url: 'https://www.trustedtarot.com/img/cards/the-high-priestess.png',
    keywords: ['интуиция', 'подсознание', 'мудрость']
  },
  {
    id: 3,
    name: 'Императрица',
    type: 'major',
    number: '3',
    image_url: 'https://www.trustedtarot.com/img/cards/the-empress.png',
    keywords: ['изобилие', 'творчество', 'материнство']
  },
  {
    id: 7,
    name: 'Колесница',
    type: 'major',
    number: '7',
    image_url: 'https://www.trustedtarot.com/img/cards/the-chariot.png',
    keywords: ['движение вперед', 'сила воли', 'победа']
  },
  {
    id: 11,
    name: 'Справедливость',
    type: 'major',
    number: '11',
    image_url: 'https://www.trustedtarot.com/img/cards/justice.png',
    keywords: ['равновесие', 'кармический урок', 'правда']
  },
  {
    id: 36,
    name: 'Королева Кубков',
    type: 'court',
    number: 'Придворная карта',
    suit: 'кубки',
    image_url: 'https://www.trustedtarot.com/img/cards/queen-of-cups.png',
    keywords: ['эмпатия', 'эмоциональная поддержка', 'интуиция']
  },
  {
    id: 22,
    name: 'Туз Жезлов',
    type: 'minor',
    number: '1',
    suit: 'жезлы',
    image_url: 'https://www.trustedtarot.com/img/cards/ace-of-wands.png',
    keywords: ['вдохновение', 'новые возможности', 'энергия']
  },
  {
    id: 28,
    name: 'Туз Мечей',
    type: 'minor',
    number: '1',
    suit: 'мечи',
    image_url: 'https://www.trustedtarot.com/img/cards/ace-of-swords.png',
    keywords: ['ясность', 'прорыв', 'истина']
  },
  {
    id: 54,
    name: 'Король Пентаклей',
    type: 'court',
    number: 'Придворная карта',
    suit: 'пентакли',
    image_url: 'https://www.trustedtarot.com/img/cards/king-of-pentacles.png',
    keywords: ['изобилие', 'стабильность', 'достижения']
  }
];

// Определение типов для фильтров
const types = [
  { id: 'all', name: 'Все' },
  { id: 'major', name: 'Старшие арканы' },
  { id: 'minor', name: 'Младшие арканы' },
  { id: 'court', name: 'Придворные карты' }
];

// Определение мастей для фильтров
const suits = [
  { id: 'all', name: 'Все' },
  { id: 'жезлы', name: 'Жезлы' },
  { id: 'кубки', name: 'Кубки' },
  { id: 'мечи', name: 'Мечи' },
  { id: 'пентакли', name: 'Пентакли' }
];

const CardLibrary = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSuit, setFilterSuit] = useState('all');
  
  // Загрузка карт
  useEffect(() => {
    const fetchTarotCards = async () => {
      try {
        setLoading(true);
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Для демо используем моковые данные
        setCards(mockTarotCards);
      } catch (err) {
        console.error('Error fetching tarot cards:', err);
        setError('Не удалось загрузить карты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTarotCards();
  }, []);
  
  // Фильтрация карт
  const filteredCards = cards.filter(card => {
    // Поиск по имени
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по типу карты
    const matchesType = filterType === 'all' || card.type === filterType;
    
    // Фильтр по масти
    const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;
    
    return matchesSearch && matchesType && matchesSuit;
  });
  
  // Варианты анимации для карт
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <PageContainer className="page-container">
      <PageHeader>
        <PageTitle>Библиотека карт Таро</PageTitle>
        <PageDescription>
          Изучите полную колоду таро, значения карт и их символику
        </PageDescription>
      </PageHeader>
      
      <FiltersSection>
        <SearchContainer>
          <SearchIcon className="material-symbols-rounded">search</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Поиск карт по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ClearButton onClick={() => setSearchQuery('')}>
              <span className="material-symbols-rounded">close</span>
            </ClearButton>
          )}
        </SearchContainer>
        
        <FilterGroup>
          <FilterLabel>Тип:</FilterLabel>
          <ToggleGroup>
            {types.map(type => (
              <ToggleButton
                key={type.id}
                $active={filterType === type.id}
                onClick={() => setFilterType(type.id)}
              >
                {type.name}
              </ToggleButton>
            ))}
          </ToggleGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Масть:</FilterLabel>
          <ToggleGroup>
            {suits.map(suit => (
              <ToggleButton
                key={suit.id}
                $active={filterSuit === suit.id}
                disabled={filterType === 'major'}
                onClick={() => setFilterSuit(suit.id)}
              >
                {suit.name}
              </ToggleButton>
            ))}
          </ToggleGroup>
        </FilterGroup>
      </FiltersSection>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка библиотеки карт...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>
          <span className="material-symbols-rounded">error</span>
          {error}
        </ErrorMessage>
      )}
      
      {!loading && !error && (
        <>
          <ResultInfo>
            {filteredCards.length === 0 ? (
              <NoResults>
                <span className="material-symbols-rounded">search_off</span>
                <p>Карты не найдены. Попробуйте изменить параметры поиска.</p>
              </NoResults>
            ) : (
              <p>Найдено карт: <strong>{filteredCards.length}</strong></p>
            )}
          </ResultInfo>
          
          <CardsGrid>
            {filteredCards.map((card, index) => (
              <CardLink 
                key={card.id} 
                to={`/cards/${card.id}`}
                as={motion.div}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                aria-label={`Карта ${card.name}`}
              >
                <CardImageContainer>
                  <CardImage 
                    src={card.image_url} 
                    alt={card.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x800?text=Таро';
                    }}
                  />
                </CardImageContainer>
                <CardInfo>
                  <CardTitle>{card.name}</CardTitle>
                  <CardSubtitle>
                    {card.type === 'major' 
                      ? 'Старший аркан' 
                      : card.type === 'court' 
                        ? `Придворная карта (${card.suit})` 
                        : `${card.suit} • ${card.number}`
                    }
                  </CardSubtitle>
                  <KeywordsContainer>
                    {card.keywords.slice(0, 2).map((keyword, i) => (
                      <Keyword key={i}>{keyword}</Keyword>
                    ))}
                    {card.keywords.length > 2 && <KeywordMore>+{card.keywords.length - 2}</KeywordMore>}
                  </KeywordsContainer>
                </CardInfo>
              </CardLink>
            ))}
          </CardsGrid>
        </>
      )}
    </PageContainer>
  );
};

// Стили компонента
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem 4rem;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FiltersSection = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.8rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem 0.6rem 2.5rem;
    font-size: 0.9rem;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: var(--text);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const ToggleButton = styled.button`
  background: ${props => props.$active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? 'var(--primary)' : 'rgba(155, 89, 182, 0.1)'};
    border-color: var(--primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  
  p {
    margin-top: 1rem;
    color: var(--text-secondary);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius);
  color: #ef4444;
  margin: 2rem auto;
  max-width: 600px;
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

const ResultInfo = styled.div`
  margin-bottom: 1.5rem;
  
  p {
    color: var(--text-secondary);
  }
  
  strong {
    color: var(--text);
  }
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: var(--text-secondary);
  text-align: center;
  
  .material-symbols-rounded {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.8rem;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  background: var(--card-bg);
  border: 1px solid var(--border);
  height: 100%;
  
  &:hover {
    text-decoration: none;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  padding-top: 150%;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: var(--text);
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const CardSubtitle = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
`;

const Keyword = styled.span`
  padding: 0.2rem 0.5rem;
  background: rgba(155, 89, 182, 0.1);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  
  @media (max-width: 768px) {
    padding: 0.1rem 0.4rem;
    font-size: 0.65rem;
  }
`;

const KeywordMore = styled.span`
  padding: 0.2rem 0.5rem;
  background: rgba(100, 100, 100, 0.1);
  color: var(--text-secondary);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  
  @media (max-width: 768px) {
    padding: 0.1rem 0.4rem;
    font-size: 0.65rem;
  }
`;

export default CardLibrary; 