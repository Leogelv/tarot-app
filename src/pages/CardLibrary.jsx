import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import CardTransition from '../components/effects/CardTransition';

// Моковые данные карт для демонстрации
const mockCards = [
  {
    id: 0,
    name: 'Шут',
    type: 'major',
    number: '0',
    image_url: 'https://www.trustedtarot.com/img/cards/the-fool.png',
    keywords: ['Новые начинания', 'Спонтанность', 'Приключения']
  },
  {
    id: 1,
    name: 'Маг',
    type: 'major',
    number: 'I',
    image_url: 'https://www.trustedtarot.com/img/cards/the-magician.png',
    keywords: ['Мастерство', 'Воля', 'Проявление']
  },
  {
    id: 2,
    name: 'Верховная Жрица',
    type: 'major',
    number: 'II',
    image_url: 'https://www.trustedtarot.com/img/cards/the-high-priestess.png',
    keywords: ['Интуиция', 'Тайны', 'Мудрость']
  },
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
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 800));
        setCards(mockCards);
      } catch (err) {
        console.error('Error fetching cards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleCardSelect = (cardId) => {
    setSelectedCardId(cardId);
    setZooming(true);
    
    // Делаем небольшую задержку для анимации
    setTimeout(() => {
      // Для демо все карты ведут на одну страницу с ID 7 (Колесница)
      navigate(`/cards/7`);
    }, 1000);
  };

  const filteredCards = cards.filter(card => {
    const matchesFilter = filter === 'all' || card.type === filter;
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Анимация для карточек
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      }
    }),
    selected: {
      zIndex: 10,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Если выполняется зум (анимация перехода), показываем только выбранную карту
  if (zooming && selectedCardId !== null) {
    const selectedCard = cards.find(card => card.id === selectedCardId);
    
    return (
      <ZoomContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ZoomCardWrapper
          initial={{ scale: 0.5 }}
          animate={{ scale: 1.5 }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <CardTransition cardImageUrl={selectedCard.image_url} isActive={true} />
        </ZoomCardWrapper>
      </ZoomContainer>
    );
  }

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
          placeholder="Поиск карты..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <FilterButtons>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Все карты
          </FilterButton>
          <FilterButton
            active={filter === 'major'}
            onClick={() => setFilter('major')}
          >
            Старшие арканы
          </FilterButton>
          <FilterButton
            active={filter === 'minor'}
            onClick={() => setFilter('minor')}
          >
            Младшие арканы
          </FilterButton>
        </FilterButtons>
      </SearchContainer>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка библиотеки...</p>
        </LoadingContainer>
      )}
      
      {!loading && filteredCards.length === 0 && (
        <NoResultsMessage>
          <span className="material-symbols-rounded">search_off</span>
          <p>Карты не найдены. Попробуйте изменить параметры поиска.</p>
        </NoResultsMessage>
      )}
      
      <CardsGrid>
        <AnimatePresence>
          {filteredCards.map((card, index) => (
            <CardItem
              key={card.id}
              layoutId={`card-${card.id}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={selectedCardId === card.id ? "selected" : "visible"}
              exit="exit"
              onClick={() => handleCardSelect(card.id)}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <CardImageContainer>
                <Card3DContainer>
                  <CardTransition cardImageUrl={card.image_url} />
                </Card3DContainer>
                <CardGlow layoutId={`card-glow-${card.id}`} />
              </CardImageContainer>
              
              <CardInfo>
                <CardName layoutId={`card-name-${card.id}`}>{card.name}</CardName>
                <CardType>
                  {card.type === 'major' ? 'Старший Аркан' : card.type} • {card.number}
                </CardType>
              </CardInfo>
            </CardItem>
          ))}
        </AnimatePresence>
      </CardsGrid>
    </LibraryContainer>
  );
};

// Новые стили для анимации зума
const ZoomContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
`;

const ZoomCardWrapper = styled(motion.div)`
  width: 300px;
  height: 450px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 375px;
  }
`;

const Card3DContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const LibraryContainer = styled.div`
  margin: 0;
  padding: 0;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-top: 0;
    padding-top: 0;
  }
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

const LibraryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 0;
    padding-top: 0;
  }
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

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: ${props => props.active ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    border-color: var(--primary);
    color: ${props => props.active ? 'var(--white)' : 'var(--primary)'};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  
  p {
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const CardItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  position: relative;
`;

const CardImageContainer = styled.div`
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 1/1.5;
  background: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, 
    rgba(155, 89, 182, 0.1) 0%,
    rgba(155, 89, 182, 0.05) 50%,
    transparent 100%
  );
  pointer-events: none;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

const CardName = styled.h3`
  font-size: 1.1rem;
  color: var(--text);
  margin: 0;
  font-family: var(--font-heading);
`;

const CardType = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

export default CardLibrary; 