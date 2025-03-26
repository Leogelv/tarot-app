import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Моковые данные для раскладов таро
const mockSpreads = [
  {
    id: 1,
    name: 'Три карты',
    description: 'Классический расклад на прошлое, настоящее и будущее. Идеален для быстрого понимания ситуации.',
    cards_count: 3,
    difficulty: 'easy',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/three-card-spread_wkdqde.webp'
  },
  {
    id: 2,
    name: 'Кельтский крест',
    description: 'Подробный расклад для глубокого анализа ситуации. Включает 10 карт, которые раскрывают различные аспекты вопроса.',
    cards_count: 10,
    difficulty: 'hard',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/celtic-cross_qxh0ul.webp'
  },
  {
    id: 3,
    name: 'Пять элементов',
    description: 'Расклад на основе пяти стихий: огонь, вода, земля, воздух и дух. Показывает энергетический баланс в вашей жизни.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/five-elements_g9i2mr.webp'
  },
  {
    id: 4,
    name: 'Ромб',
    description: 'Расклад для получения простого и ясного ответа на конкретный вопрос с использованием четырех карт.',
    cards_count: 4,
    difficulty: 'easy',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/diamond-spread_d9soxw.webp'
  },
  {
    id: 5,
    name: 'Семь чакр',
    description: 'Расклад для анализа энергетических центров и поиска блоков в чакрах. Показывает баланс духовной энергии.',
    cards_count: 7,
    difficulty: 'medium',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/chakra-spread_qjsoxq.webp'
  },
  {
    id: 6,
    name: 'Годовой',
    description: 'Расклад из 12 карт, представляющих каждый месяц года. Идеален для долгосрочного планирования и годового прогноза.',
    cards_count: 12,
    difficulty: 'hard',
    image_url: 'https://res.cloudinary.com/dxklaorw6/image/upload/v1692536110/tarot-app/spreads/year-ahead_lweuzs.webp'
  }
];

const Spreads = () => {
  const navigate = useNavigate();
  const [spreads, setSpreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Фильтры для раскладов
  const filters = [
    { id: 'all', name: 'Все' },
    { id: 'easy', name: 'Простые' },
    { id: 'medium', name: 'Средние' },
    { id: 'hard', name: 'Сложные' }
  ];
  
  // Загрузка раскладов
  useEffect(() => {
    const fetchSpreads = async () => {
      try {
        setLoading(true);
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Для демо используем моковые данные
        setSpreads(mockSpreads);
      } catch (err) {
        console.error('Error fetching spreads:', err);
        setError('Не удалось загрузить расклады. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpreads();
  }, []);
  
  // Фильтрация раскладов
  const filteredSpreads = spreads.filter(spread => {
    return selectedFilter === 'all' || spread.difficulty === selectedFilter;
  });
  
  // Обработчик выбора расклада
  const handleSpreadSelect = (spread) => {
    setSelectedSpread(spread);
    setIsModalOpen(true);
  };
  
  // Обработчик начала расклада
  const handleStartReading = () => {
    setIsModalOpen(false);
    // В демо все расклады переходят на одну страницу с ID 1 (Три карты)
    navigate(`/readings/1`);
  };
  
  // Варианты анимации для карточек раскладов
  const spreadVariants = {
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
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <PageContainer className="page-container">
      <PageHeader>
        <PageTitle>Расклады Таро</PageTitle>
        <PageDescription>
          Выберите расклад для получения глубокого понимания вашей ситуации и руководства по принятию решений
        </PageDescription>
      </PageHeader>
      
      <FiltersSection>
        <FilterGroup>
          <FilterLabel>Сложность:</FilterLabel>
          <ToggleGroup>
            {filters.map(filter => (
              <ToggleButton
                key={filter.id}
                $active={selectedFilter === filter.id}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.name}
              </ToggleButton>
            ))}
          </ToggleGroup>
        </FilterGroup>
      </FiltersSection>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка раскладов...</p>
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
            {filteredSpreads.length === 0 ? (
              <NoResults>
                <span className="material-symbols-rounded">search_off</span>
                <p>Расклады не найдены. Попробуйте изменить параметры фильтра.</p>
              </NoResults>
            ) : (
              <p>Доступно раскладов: <strong>{filteredSpreads.length}</strong></p>
            )}
          </ResultInfo>
          
          <SpreadsGrid>
            {filteredSpreads.map((spread, index) => (
              <SpreadCard
                key={spread.id}
                as={motion.div}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={spreadVariants}
                whileHover="hover"
                onClick={() => handleSpreadSelect(spread)}
              >
                <SpreadImageContainer>
                  <SpreadImage 
                    src={spread.image_url} 
                    alt={spread.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x300?text=Таро';
                    }}
                  />
                  <SpreadOverlay>
                    <CardCount>
                      <span className="material-symbols-rounded">style</span>
                      {spread.cards_count} карт
                    </CardCount>
                    <DifficultyBadge difficulty={spread.difficulty}>
                      {spread.difficulty === 'easy' ? 'Простой' : 
                       spread.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                    </DifficultyBadge>
                  </SpreadOverlay>
                </SpreadImageContainer>
                <SpreadInfo>
                  <SpreadTitle>{spread.name}</SpreadTitle>
                  <SpreadDescription>
                    {spread.description.length > 120 ? 
                      `${spread.description.substring(0, 120)}...` : 
                      spread.description}
                  </SpreadDescription>
                  <SpreadButton>Выбрать расклад</SpreadButton>
                </SpreadInfo>
              </SpreadCard>
            ))}
          </SpreadsGrid>
        </>
      )}
      
      {/* Модальное окно с деталями расклада */}
      <AnimatePresence>
        {isModalOpen && selectedSpread && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContent
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <ModalCloseButton onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-rounded">close</span>
              </ModalCloseButton>
              
              <ModalHeader>
                <ModalTitle>{selectedSpread.name}</ModalTitle>
                <ModalBadges>
                  <CardCount>
                    <span className="material-symbols-rounded">style</span>
                    {selectedSpread.cards_count} карт
                  </CardCount>
                  <DifficultyBadge difficulty={selectedSpread.difficulty}>
                    {selectedSpread.difficulty === 'easy' ? 'Простой' : 
                     selectedSpread.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                  </DifficultyBadge>
                </ModalBadges>
              </ModalHeader>
              
              <ModalBody>
                <ModalImageContainer>
                  <ModalImage 
                    src={selectedSpread.image_url} 
                    alt={selectedSpread.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x300?text=Таро';
                    }}
                  />
                </ModalImageContainer>
                
                <ModalDescription>
                  <SectionTitle>Описание</SectionTitle>
                  <p>{selectedSpread.description}</p>
                  
                  <SectionTitle>Как интерпретировать</SectionTitle>
                  <p>Каждая карта в этом раскладе имеет особое значение и позицию. Следуйте указаниям на экране после выбора расклада, чтобы правильно интерпретировать значения.</p>
                  
                  <SectionTitle>Когда использовать</SectionTitle>
                  <p>Этот расклад подходит для {selectedSpread.difficulty === 'easy' ? 'быстрых и простых вопросов' : 
                     selectedSpread.difficulty === 'medium' ? 'более глубокого анализа ситуации' : 
                     'комплексных и многоуровневых вопросов, требующих детального рассмотрения'}.</p>
                </ModalDescription>
              </ModalBody>
              
              <ModalFooter>
                <CancelButton onClick={() => setIsModalOpen(false)}>
                  Отмена
                </CancelButton>
                <StartButton onClick={handleStartReading}>
                  <span className="material-symbols-rounded">playing_cards</span>
                  Начать расклад
                </StartButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
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

const SpreadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1rem;
  }
`;

const SpreadCard = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  cursor: pointer;
  height: 100%;
`;

const SpreadImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const SpreadImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${SpreadCard}:hover & {
    transform: scale(1.05);
  }
`;

const SpreadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  
  .material-symbols-rounded {
    font-size: 1rem;
  }
`;

const DifficultyBadge = styled.div`
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  background: ${props => 
    props.difficulty === 'easy' ? 'rgba(72, 187, 120, 0.9)' :
    props.difficulty === 'medium' ? 'rgba(246, 173, 85, 0.9)' :
    'rgba(237, 100, 166, 0.9)'
  };
  color: white;
`;

const SpreadInfo = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SpreadTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 600;
`;

const SpreadDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  flex-grow: 1;
  line-height: 1.5;
`;

const SpreadButton = styled.button`
  padding: 0.5rem 0;
  border-radius: var(--radius);
  background: rgba(155, 89, 182, 0.1);
  color: var(--primary);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(155, 89, 182, 0.2);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--bg);
  border-radius: var(--radius);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-lg);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    max-height: 80vh;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--text);
  }
  
  .material-symbols-rounded {
    font-size: 1.5rem;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const ModalBadges = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ModalImageContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius);
`;

const ModalDescription = styled.div`
  flex: 1;
  padding: 1.5rem;
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem;
  color: var(--text);
  font-weight: 600;
  
  &:first-of-type {
    margin-top: 0;
  }
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const StartButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  background: var(--gradient-primary);
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .material-symbols-rounded {
    font-size: 1.1rem;
  }
  
  &:hover {
    filter: brightness(1.1);
  }
`;

export default Spreads;