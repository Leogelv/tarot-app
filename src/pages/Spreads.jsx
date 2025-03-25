import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSpreads } from '../services/supabase/supabaseClient';
import SpreadVizualization from '../components/spreadVisuals/SpreadVisualization';

// Моковые данные раскладов
const mockSpreads = [
  {
    id: 1,
    name: 'Трехкарточный расклад',
    description: 'Классический расклад для получения быстрого совета. Три карты представляют прошлое, настоящее и будущее вашей ситуации.',
    cards_count: 3,
    difficulty: 'Начальный',
    image_url: 'https://example.com/spreads/three-card.jpg',
  },
  {
    id: 2,
    name: 'Кельтский крест',
    description: 'Один из самых популярных и информативных раскладов. Даёт глубокое понимание ситуации и возможных путей её развития.',
    cards_count: 10,
    difficulty: 'Продвинутый',
    image_url: 'https://example.com/spreads/celtic-cross.jpg',
  },
  {
    id: 3,
    name: 'Семикарточная подкова',
    description: 'Расклад в форме подковы для поиска решения проблемы. Помогает найти новый взгляд на сложную ситуацию.',
    cards_count: 7,
    difficulty: 'Средний',
    image_url: 'https://example.com/spreads/horseshoe.jpg',
  },
  {
    id: 4,
    name: 'Расклад на отношения',
    description: 'Специальный расклад для анализа отношений между двумя людьми. Показывает динамику и перспективы отношений.',
    cards_count: 6,
    difficulty: 'Средний',
    image_url: 'https://example.com/spreads/relationship.jpg',
  },
  {
    id: 5,
    name: 'Пирамида',
    description: 'Иерархический расклад для анализа многоуровневых ситуаций. Каждый уровень представляет разные аспекты вопроса.',
    cards_count: 10,
    difficulty: 'Продвинутый',
    image_url: 'https://example.com/spreads/pyramid.jpg',
  }
];

const Spreads = () => {
  const { isSubscribed } = useSelector(state => state.auth);
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
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
  
  // Фильтрация раскладов по поиску и сложности
  const filteredSpreads = spreads.filter(spread => {
    const matchesSearch = spread.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         spread.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             spread.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });
  
  const handleSpreadClick = (spreadId) => {
    navigate(`/spreads/${spreadId}`);
  };
  
  return (
    <SpreadsContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <PageHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderTitle>Расклады Таро</HeaderTitle>
        <HeaderSubtitle>
          Выберите один из классических раскладов для глубокого анализа вашей ситуации
        </HeaderSubtitle>
      </PageHeader>
      
      <FiltersSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SearchContainer>
          <SearchIcon className="material-symbols-rounded">search</SearchIcon>
          <SearchInput 
            type="text"
            placeholder="Поиск раскладов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ClearButton onClick={() => setSearchTerm('')}>
              <span className="material-symbols-rounded">close</span>
            </ClearButton>
          )}
        </SearchContainer>
        
        <FilterTabs>
          <FilterTab 
            $isActive={selectedDifficulty === 'all'}
            onClick={() => setSelectedDifficulty('all')}
          >
            Все
          </FilterTab>
          <FilterTab 
            $isActive={selectedDifficulty === 'Начальный'}
            onClick={() => setSelectedDifficulty('Начальный')}
          >
            Начальный
          </FilterTab>
          <FilterTab 
            $isActive={selectedDifficulty === 'Средний'}
            onClick={() => setSelectedDifficulty('Средний')}
          >
            Средний
          </FilterTab>
          <FilterTab 
            $isActive={selectedDifficulty === 'Продвинутый'}
            onClick={() => setSelectedDifficulty('Продвинутый')}
          >
            Продвинутый
          </FilterTab>
        </FilterTabs>
      </FiltersSection>
      
      {loading ? (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка раскладов...</p>
        </LoadingContainer>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : filteredSpreads.length === 0 ? (
        <EmptyState>
          <span className="material-symbols-rounded">search_off</span>
          <h3>Раскладов не найдено</h3>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </EmptyState>
      ) : (
        <SpreadsGrid>
          {filteredSpreads.map((spread) => (
            <SpreadCard
              key={spread.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => handleSpreadClick(spread.id)}
            >
              <SpreadVisualContainer>
                <SpreadVizualization 
                  spreadId={spread.id} 
                  size="medium"
                />
              </SpreadVisualContainer>
              
              <SpreadInfo>
                <SpreadName>{spread.name}</SpreadName>
                <SpreadDetails>
                  <SpreadDetail>
                    <span className="material-symbols-rounded">style</span>
                    {spread.cards_count} карт
                  </SpreadDetail>
                  <SpreadDetail>
                    <span className="material-symbols-rounded">signal_cellular_alt</span>
                    {spread.difficulty}
                  </SpreadDetail>
                </SpreadDetails>
                <SpreadDescription>{spread.description}</SpreadDescription>
                <StartButton>
                  <span className="material-symbols-rounded">play_arrow</span>
                  Начать расклад
                </StartButton>
              </SpreadInfo>
            </SpreadCard>
          ))}
        </SpreadsGrid>
      )}
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

const PageHeader = styled(motion.header)`
  text-align: center;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
`;

const FiltersSection = styled(motion.div)`
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 1rem;
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  
  &:hover {
    color: var(--text);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterTab = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${props => props.$isActive ? 'var(--primary)' : 'var(--card-bg)'};
  color: ${props => props.$isActive ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.$isActive ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isActive ? 'var(--primary-dark)' : 'var(--card-bg-hover)'};
    border-color: ${props => props.$isActive ? 'var(--primary-dark)' : 'var(--primary)'};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1.5rem;
  
  p {
    color: var(--text-secondary);
  }
`;

const ErrorMessage = styled.div`
  padding: 1.5rem;
  background: rgba(255, 76, 76, 0.1);
  border: 1px solid rgba(255, 76, 76, 0.3);
  border-radius: var(--radius);
  color: #ff4c4c;
  text-align: center;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  color: var(--text-secondary);
  
  .material-symbols-rounded {
    font-size: e2.5rem;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    max-width: 400px;
    text-align: center;
  }
`;

const SpreadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadCard = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SpreadVisualContainer = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
`;

const SpreadInfo = styled.div`
  padding: 1.5rem;
`;

const SpreadName = styled.h3`
  font-size: 1.3rem;
  font-family: var(--font-heading);
  margin-bottom: 0.8rem;
  color: var(--text);
`;

const SpreadDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SpreadDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  .material-symbols-rounded {
    font-size: 1.1rem;
    color: var(--primary);
  }
`;

const SpreadDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: var(--primary-dark);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

export default Spreads;