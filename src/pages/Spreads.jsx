import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SpreadVisualizer from '../components/effects/SpreadVisualizer';
import { getSpreads } from '../services/supabase/supabaseClient';

// Моковые данные раскладов
const mockSpreads = [
  {
    id: 1,
    name: 'Расклад на три карты',
    description: 'Классический расклад: прошлое, настоящее и будущее. Простой способ получить быстрое понимание ситуации.',
    cards_count: 3,
    difficulty: 'easy',
    image_url: 'https://i.ibb.co/DpKmR8b/three-card-spread.jpg'
  },
  {
    id: 2,
    name: 'Кельтский крест',
    description: 'Один из самых популярных и информативных раскладов, дающий детальный анализ ситуации с разных сторон.',
    cards_count: 10,
    difficulty: 'advanced',
    image_url: 'https://i.ibb.co/RCKRwZJ/celtic-cross.jpg'
  },
  {
    id: 3,
    name: 'Расклад на любовь',
    description: 'Расклад для анализа любовных отношений и романтических перспектив с партнером.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/8sZgfSZ/love-spread.jpg'
  },
  {
    id: 4,
    name: 'Расклад на решение',
    description: 'Помогает принять решение, рассматривая альтернативные пути и потенциальные результаты каждого варианта.',
    cards_count: 4,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/wKGfzbW/decision-spread.jpg'
  },
  {
    id: 5,
    name: 'Расклад на месяц',
    description: 'Прогноз на предстоящий месяц с рекомендациями для каждой недели.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/Qj8JGbm/month-ahead.jpg'
  }
];

const Spreads = () => {
  const { isSubscribed } = useSelector(state => state.auth);
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState('all');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const navigate = useNavigate();
  
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
          setSpreads(mockSpreads);
        }
      } catch (err) {
        console.error('Error fetching spreads:', err);
        setError('Не удалось загрузить расклады. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpreads();
  }, []);
  
  // Фильтрация раскладов в зависимости от выбранной вкладки
  const filteredSpreads = spreads.filter(spread => {
    if (filter === 'all') return true;
    return spread.difficulty === filter;
  });
  
  // Обработчик выбора расклада
  const handleSpreadSelect = (spread) => {
    setSelectedSpread(spread);
    
    // Переход к деталям расклада через 600мс для завершения анимации
    setTimeout(() => {
      navigate(`/spreads/${spread.id}`);
    }, 600);
  };

  return (
    <SpreadsContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <PageHeader>
        <PageTitle>Расклады Таро</PageTitle>
        <PageDescription>
          Выберите расклад для глубокого анализа и понимания вашей ситуации
        </PageDescription>
      </PageHeader>
      
      <FiltersContainer>
        <FilterButton 
          onClick={() => setFilter('all')} 
          $active={filter === 'all'}
          as={motion.button}
          whileTap={{ scale: 0.95 }}
        >
          Все расклады
        </FilterButton>
        <FilterButton 
          onClick={() => setFilter('easy')} 
          $active={filter === 'easy'}
          as={motion.button}
          whileTap={{ scale: 0.95 }}
        >
          Простые
        </FilterButton>
        <FilterButton 
          onClick={() => setFilter('medium')} 
          $active={filter === 'medium'}
          as={motion.button}
          whileTap={{ scale: 0.95 }}
        >
          Средние
        </FilterButton>
        <FilterButton 
          onClick={() => setFilter('advanced')} 
          $active={filter === 'advanced'}
          as={motion.button}
          whileTap={{ scale: 0.95 }}
        >
          Продвинутые
        </FilterButton>
      </FiltersContainer>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка раскладов...</p>
        </LoadingContainer>
      )}
      
      {!loading && filteredSpreads.length === 0 && (
        <NoResultsMessage>
          Расклады не найдены. Попробуйте другой фильтр.
        </NoResultsMessage>
      )}
      
      <SpreadsGrid>
        <AnimatePresence>
          {filteredSpreads.map((spread, index) => (
            <SpreadCard 
              key={spread.id}
              as={motion.div}
              layoutId={`spread-${spread.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
              }}
              exit={{ 
                opacity: 0, 
                y: 20, 
                transition: { duration: 0.3 } 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="glass-card"
            >
              <SpreadVisualizerContainer>
                <SpreadVisualizer spreadId={spread.id} />
              </SpreadVisualizerContainer>
              
              <SpreadInfo>
                <SpreadName>{spread.name}</SpreadName>
                <CardCount>
                  <span className="material-symbols-rounded">playing_cards</span>
                  {spread.cards_count} карт
                </CardCount>
                
                <SpreadDescription>{spread.description}</SpreadDescription>
                
                <SpreadButton 
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSpreadSelect(spread)}
                >
                  <span className="material-symbols-rounded">star</span>
                  Начать расклад
                </SpreadButton>
              </SpreadInfo>
              
              {spread.difficulty === 'advanced' && (
                <PremiumBadge>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "easeInOut" 
                    }}
                  >
                    Премиум
                  </motion.span>
                </PremiumBadge>
              )}
            </SpreadCard>
          ))}
        </AnimatePresence>
      </SpreadsGrid>
    </SpreadsContainer>
  );
};

const SpreadsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
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

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const PageTitle = styled.h1`
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${props => props.$active ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? 'var(--primary-light)' : 'var(--card-bg-hover)'};
    transform: translateY(-3px);
  }
`;

const SpreadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadCard = styled.div`
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SpreadVisualizerContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const SpreadInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SpreadName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const CardCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
    color: var(--primary);
  }
`;

const SpreadDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1.5rem;
  flex: 1;
`;

const SpreadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gradient-primary);
  color: white;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  color: #000;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.5);
  z-index: 2;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem 0;
  
  p {
    margin-top: 1rem;
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

export default Spreads;