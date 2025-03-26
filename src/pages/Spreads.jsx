import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSpreads } from '../services/supabase/supabaseClient';
import SpreadVisualizer from '../components/effects/SpreadVisualizer';

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
        {filteredSpreads.map((spread, index) => (
          <SpreadCard 
            key={spread.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1, duration: 0.5 }
            }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(138, 43, 226, 0.3)",
              transition: { duration: 0.3 }
            }}
            className="neo-card"
            onClick={() => navigate(`/spreads/${spread.id}`)}
          >
            {spread.is_premium && (
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
            
            <SpreadImageContainer>
              <SpreadVisualizer 
                spreadName={spread.name}
                difficulty={spread.difficulty}
                cards_count={spread.cards_count}
              />
            </SpreadImageContainer>
            
            <SpreadContent>
              <SpreadName>{spread.name}</SpreadName>
              <CardCount>{spread.cards_count} карт</CardCount>
              
              <SpreadDescription>{spread.description}</SpreadDescription>
              
              <SpreadButton 
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Начать расклад
              </SpreadButton>
            </SpreadContent>
          </SpreadCard>
        ))}
      </SpreadsGrid>
    </SpreadsContainer>
  );
};

const SpreadsContainer = styled.div`
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
    bottom: 20%;
    right: 15%;
    width: 250px;
    height: 250px;
    background: var(--secondary);
    animation: blob-float 18s ease-in-out infinite alternate;
  }
  
  &.blob-3 {
    top: 50%;
    left: 40%;
    width: 200px;
    height: 200px;
    background: var(--tertiary);
    animation: blob-float 20s ease-in-out infinite alternate;
  }
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--text);
  font-family: var(--font-heading);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${props => props.$active ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  
  &:hover {
    background: ${props => props.$active ? 'var(--primary)' : 'var(--card-bg-hover)'};
    border-color: ${props => props.$active ? 'var(--primary)' : 'var(--primary)'};
    color: ${props => props.$active ? 'white' : 'var(--primary)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  background: var(--error-bg);
  color: var(--error);
  padding: 1rem;
  text-align: center;
  border-radius: var(--radius);
  margin-bottom: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  
  p {
    color: var(--text-secondary);
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem 0;
`;

const SpreadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
  }
`;

const SpreadCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  background: var(--card-bg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  background: linear-gradient(135deg, #ffc107, #ff6b6b);
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(255, 193, 7, 0.3);
`;

const SpreadImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: var(--radius) var(--radius) 0 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, var(--card-bg), transparent);
    pointer-events: none;
  }
`;

const SpreadContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;

const SpreadName = styled.h3`
  font-size: 1.3rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const CardCount = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`;

const SpreadDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  flex: 1;
`;

const SpreadButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem 1.2rem;
  background: var(--gradient-primary);
  border: none;
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.2);
  }
`;

export default Spreads;