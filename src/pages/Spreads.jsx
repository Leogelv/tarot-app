import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSpreads } from '../services/supabase/supabaseClient';

// Моковые данные раскладов
const mockSpreads = [
  {
    id: 1,
    name: 'Расклад на три карты',
    description: 'Классический расклад: прошлое, настоящее и будущее. Простой способ получить быстрое понимание ситуации.',
    cards_count: 3,
    difficulty: 'easy',
    image_url: 'https://i.ibb.co/mG0SrM8/three-card-spread.jpg'
  },
  {
    id: 2,
    name: 'Кельтский крест',
    description: 'Один из самых популярных и информативных раскладов, дающий детальный анализ ситуации с разных сторон.',
    cards_count: 10,
    difficulty: 'advanced',
    image_url: 'https://i.ibb.co/9vHzp9S/celtic-cross.jpg'
  },
  {
    id: 3,
    name: 'Расклад на любовь',
    description: 'Расклад для анализа любовных отношений и романтических перспектив с партнером.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/wWn6JXc/love-spread.jpg'
  },
  {
    id: 4,
    name: 'Расклад на решение',
    description: 'Помогает принять решение, рассматривая альтернативные пути и потенциальные результаты каждого варианта.',
    cards_count: 4,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/9G0SBFY/decision-spread.jpg'
  },
  {
    id: 5,
    name: 'Расклад на месяц',
    description: 'Прогноз на предстоящий месяц с рекомендациями для каждой недели.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/njvvqpr/month-ahead.jpg'
  }
];

const Spreads = () => {
  const { isSubscribed } = useSelector(state => state.auth);
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState('all');
  
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
  
  // Визуализация макета расклада с мини-картами
  const renderSpreadLayout = (spread) => {
    if (!spread || !spread.layout) return null;
    
    const { layout } = spread;
    
    return (
      <SpreadLayoutPreview>
        {layout.positions.map((pos, index) => (
          <MiniCard 
            key={index}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            $delay={index * 0.05}
          >
            <MiniCardInner>
              {index + 1}
            </MiniCardInner>
            {spread.position_preview && spread.position_preview[index] && (
              <MiniCardTooltip>
                {spread.position_preview[index]}
              </MiniCardTooltip>
            )}
          </MiniCard>
        ))}
      </SpreadLayoutPreview>
    );
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
              transition: { duration: 0.3 }
            }}
            className="neo-card"
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
            
            <SpreadName>{spread.name}</SpreadName>
            <CardCount>{spread.cards_count} карт</CardCount>
            
            <SpreadLayoutContainer>
              {renderSpreadLayout(spread)}
            </SpreadLayoutContainer>
            
            <SpreadDescription>{spread.description}</SpreadDescription>
            
            <SpreadButton 
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              to={`/spreads/${spread.id}`}
            >
              Начать расклад
            </SpreadButton>
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
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, var(--accent) 0%, #ff9800 100%);
  color: #1a1e3a;
  padding: 5px 15px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 3px 10px rgba(255, 193, 7, 0.3);
`;

const SpreadLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin: 20px 0;
  background: rgba(18, 21, 48, 0.3);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const SpreadLayoutPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MiniCard = styled.div`
  position: absolute;
  width: 28px;
  height: 42px;
  transform: translate(-50%, -50%);
  background: var(--primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: ${props => props.$delay || 0}s;
  opacity: 0;
  
  &:hover {
    z-index: 3;
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 5px 15px rgba(155, 89, 217, 0.4);
  }
  
  &:hover > div:last-child {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MiniCardInner = styled.div`
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
`;

const MiniCardTooltip = styled.div`
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--glass-bg);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 4;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--glass-bg) transparent transparent transparent;
  }
`;

const SpreadName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 5px;
`;

const CardCount = styled.div`
  font-size: 0.9rem;
  color: var(--primary);
  margin-bottom: 10px;
  font-weight: 500;
`;

const SpreadDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
`;

const SpreadButton = styled(Link)`
  background: var(--gradient-primary);
  color: white;
  padding: 12px 25px;
  border-radius: var(--radius-full);
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  margin-top: auto;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(155, 89, 217, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(155, 89, 217, 0.5);
  }
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