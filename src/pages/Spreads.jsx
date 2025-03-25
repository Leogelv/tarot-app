import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSpreads } from '../services/supabase/supabaseClient';

const Spreads = () => {
  const { isSubscribed } = useSelector(state => state.auth);
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
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
          setSpreads([
            {
              id: 1,
              name: 'Прошлое, Настоящее, Будущее',
              description: 'Простой расклад из 3 карт, дающий понимание вашей ситуации во времени.',
              cards_count: 3,
              image_url: '/images/spreads/past-present-future.jpg',
              is_premium: false,
              position_preview: ['Прошлое', 'Настоящее', 'Будущее'],
              layout: {
                type: 'line',
                positions: [
                  { x: 25, y: 50 },
                  { x: 50, y: 50 },
                  { x: 75, y: 50 }
                ]
              }
            },
            {
              id: 2,
              name: 'Кельтский Крест',
              description: 'Комплексный расклад из 10 карт, который дает подробный обзор вашей ситуации.',
              cards_count: 10,
              image_url: '/images/spreads/celtic-cross.jpg',
              is_premium: false,
              position_preview: ['Настоящее', 'Вызов', 'Прошлое', 'Будущее', 'Цель', 'Подсознание', 
                                'Совет', 'Влияние', 'Надежды/Страхи', 'Исход'],
              layout: {
                type: 'cross',
                positions: [
                  { x: 50, y: 50 }, // center
                  { x: 65, y: 50 }, // crossing
                  { x: 30, y: 50 }, // below
                  { x: 50, y: 25 }, // above
                  { x: 50, y: 75 }, // behind
                  { x: 80, y: 50 }, // ahead
                  { x: 25, y: 85 }, // bottom row
                  { x: 42, y: 85 },
                  { x: 59, y: 85 },
                  { x: 76, y: 85 }
                ]
              }
            },
            {
              id: 3,
              name: 'Отношения',
              description: 'Расклад из 5 карт, дающий представление о динамике и потенциале отношений.',
              cards_count: 5,
              image_url: '/images/spreads/relationship.jpg',
              is_premium: false,
              position_preview: ['Вы', 'Партнер', 'Связь', 'Вызов', 'Результат'],
              layout: {
                type: 'pyramid',
                positions: [
                  { x: 35, y: 70 },
                  { x: 65, y: 70 },
                  { x: 50, y: 45 },
                  { x: 35, y: 20 },
                  { x: 65, y: 20 }
                ]
              }
            },
            {
              id: 4,
              name: 'Карьерный Путь',
              description: 'Расклад из 6 карт, сосредоточенный на вопросах работы и профессиональной реализации.',
              cards_count: 6,
              image_url: '/images/spreads/career.jpg',
              is_premium: true,
              position_preview: ['Текущая позиция', 'Препятствие', 'Сильная сторона', 
                                'Действие', 'Окружение', 'Результат'],
              layout: {
                type: 'grid',
                positions: [
                  { x: 33, y: 25 },
                  { x: 67, y: 25 },
                  { x: 33, y: 50 },
                  { x: 67, y: 50 },
                  { x: 33, y: 75 },
                  { x: 67, y: 75 }
                ]
              }
            },
            {
              id: 5,
              name: 'Разум, Тело, Дух',
              description: 'Расклад из 3 карт для оценки аспектов вашего целостного благополучия.',
              cards_count: 3,
              image_url: '/images/spreads/mind-body-spirit.jpg',
              is_premium: false,
              position_preview: ['Разум', 'Тело', 'Дух'],
              layout: {
                type: 'triangle',
                positions: [
                  { x: 50, y: 15 },
                  { x: 25, y: 70 },
                  { x: 75, y: 70 }
                ]
              }
            },
            {
              id: 6,
              name: 'Решение',
              description: 'Расклад из 6 карт, помогающий выбрать между двумя путями.',
              cards_count: 6,
              image_url: '/images/spreads/decision.jpg',
              is_premium: true,
              position_preview: ['Текущая ситуация', 'Сознательные желания', 'Подсознательные влияния', 
                              'Путь А', 'Путь Б', 'Совет'],
              layout: {
                type: 'fork',
                positions: [
                  { x: 50, y: 15 },
                  { x: 35, y: 35 },
                  { x: 65, y: 35 },
                  { x: 25, y: 70 },
                  { x: 75, y: 70 },
                  { x: 50, y: 85 }
                ]
              }
            }
          ]);
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
    if (activeTab === 'all') return true;
    if (activeTab === 'basic') return !spread.is_premium;
    if (activeTab === 'premium') return spread.is_premium;
    return true;
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
    <Container>
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      <Header>
        <Title>Таро Расклады</Title>
        <Subtitle>Откройте различные способы гадания на картах Таро</Subtitle>
      </Header>
      
      <TabsContainer>
        <Tab 
          onClick={() => setActiveTab('all')} 
          $active={activeTab === 'all'}
          as={motion.button}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Все расклады
        </Tab>
        <Tab 
          onClick={() => setActiveTab('basic')} 
          $active={activeTab === 'basic'}
          as={motion.button}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Базовые
        </Tab>
        <Tab 
          onClick={() => setActiveTab('premium')} 
          $active={activeTab === 'premium'}
          as={motion.button}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Премиум
        </Tab>
      </TabsContainer>
      
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
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
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

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  background: ${props => props.$active ? 'var(--gradient-primary)' : 'rgba(26, 30, 58, 0.5)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  box-shadow: ${props => props.$active ? '0 5px 15px rgba(155, 89, 217, 0.25)' : 'none'};
  
  &:hover {
    background: ${props => props.$active ? 'var(--gradient-primary)' : 'rgba(26, 30, 58, 0.8)'};
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