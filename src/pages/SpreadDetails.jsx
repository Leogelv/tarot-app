import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SpreadVisualizer from '../components/effects/SpreadVisualizer';

// Моковые данные раскладов
const mockSpreads = [
  {
    id: 1,
    name: 'Расклад на три карты',
    description: 'Классический расклад: прошлое, настоящее и будущее. Простой способ получить быстрое понимание ситуации.',
    cards_count: 3,
    difficulty: 'easy',
    image_url: 'https://i.ibb.co/DpKmR8b/three-card-spread.jpg',
    positions: [
      { name: 'Прошлое', description: 'События и влияния из прошлого, которые оказывают воздействие на текущую ситуацию.' },
      { name: 'Настоящее', description: 'Текущее положение дел и энергии, действующие в настоящий момент.' },
      { name: 'Будущее', description: 'Возможные исходы или направления, в которых ситуация может развиваться.' }
    ],
    instructions: [
      'Успокойте ум и сосредоточьтесь на своем вопросе.',
      'Тасуйте колоду, думая о ситуации, которую хотите прояснить.',
      'Выберите три карты и разместите их слева направо.',
      'Интерпретируйте карты в соответствии с их позициями: прошлое, настоящее и будущее.',
      'Обратите внимание на связи между картами и общую историю, которую они рассказывают.'
    ]
  },
  {
    id: 2,
    name: 'Кельтский крест',
    description: 'Один из самых популярных и информативных раскладов, дающий детальный анализ ситуации с разных сторон.',
    cards_count: 10,
    difficulty: 'advanced',
    image_url: 'https://i.ibb.co/RCKRwZJ/celtic-cross.jpg',
    positions: [
      { name: 'Ситуация', description: 'Центральная тема или проблема, с которой вы сталкиваетесь.' },
      { name: 'Влияние', description: 'Факторы, которые пересекают или влияют на ситуацию напрямую.' },
      { name: 'Основание', description: 'Прошлые события или условия, которые создали текущую ситуацию.' },
      { name: 'Недавнее прошлое', description: 'События, которые только что произошли и имеют влияние.' },
      { name: 'Возможное будущее', description: 'Потенциальный исход, если текущий путь сохранится.' },
      { name: 'Ближайшее будущее', description: 'События, которые вскоре произойдут.' },
      { name: 'Вы', description: 'Ваше отношение к ситуации или как вы себя воспринимаете.' },
      { name: 'Внешнее влияние', description: 'Как другие видят ситуацию или влияют на нее.' },
      { name: 'Надежды/Страхи', description: 'Ваши скрытые эмоции, амбиции или страхи.' },
      { name: 'Итог', description: 'Окончательный результат или возможное разрешение ситуации.' }
    ],
    instructions: [
      'Успокойте ум и сосредоточьтесь на своем вопросе.',
      'Тасуйте колоду, держа вопрос в уме.',
      'Выберите десять карт и разместите их в форме кельтского креста.',
      'Начните с центра (карты 1 и 2), затем продолжите с основанием креста (карты 3-6).',
      'Завершите расклад, разместив четыре карты справа в виде столбца (карты 7-10).',
      'Читайте карты в порядке их размещения, обращая внимание на взаимосвязи между ними.'
    ]
  },
  {
    id: 3,
    name: 'Расклад на любовь',
    description: 'Расклад для анализа любовных отношений и романтических перспектив с партнером.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/8sZgfSZ/love-spread.jpg',
    positions: [
      { name: 'Вы', description: 'Ваша энергия и отношение к отношениям.' },
      { name: 'Партнер', description: 'Энергия и отношение вашего партнера.' },
      { name: 'Ваша динамика', description: 'Как вы взаимодействуете вместе и влияете друг на друга.' },
      { name: 'Вызовы', description: 'Препятствия, с которыми вы сталкиваетесь в отношениях.' },
      { name: 'Результат', description: 'Потенциальный исход или направление развития отношений.' }
    ],
    instructions: [
      'Сосредоточьтесь на своих отношениях или на конкретном вопросе о них.',
      'Тасуйте колоду, думая о своем партнере и ваших отношениях.',
      'Выберите пять карт и разместите их в порядке: две сверху (вы и партнер), одну между ними (динамика), и две снизу (вызовы и результат).',
      'Интерпретируйте каждую карту относительно её позиции и обратите внимание на общую картину отношений.'
    ]
  },
  {
    id: 4,
    name: 'Расклад на решение',
    description: 'Помогает принять решение, рассматривая альтернативные пути и потенциальные результаты каждого варианта.',
    cards_count: 4,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/wKGfzbW/decision-spread.jpg',
    positions: [
      { name: 'Текущая ситуация', description: 'Обзор обстоятельств и энергий, окружающих ваше решение.' },
      { name: 'Вариант А', description: 'Потенциальный результат, если вы выберете первый вариант.' },
      { name: 'Вариант Б', description: 'Потенциальный результат, если вы выберете второй вариант.' },
      { name: 'Совет', description: 'Дополнительная мудрость, которая поможет вам принять решение.' }
    ],
    instructions: [
      'Ясно сформулируйте решение, которое вам нужно принять, и два возможных варианта.',
      'Тасуйте колоду, сосредоточившись на вашей ситуации и возможных путях.',
      'Выберите четыре карты и разместите первую сверху, две следующие под ней горизонтально, и четвертую внизу.',
      'Интерпретируйте карты, обращая особое внимание на сравнение потенциальных результатов двух вариантов и общего совета.'
    ]
  },
  {
    id: 5,
    name: 'Расклад на месяц',
    description: 'Прогноз на предстоящий месяц с рекомендациями для каждой недели.',
    cards_count: 5,
    difficulty: 'medium',
    image_url: 'https://i.ibb.co/Qj8JGbm/month-ahead.jpg',
    positions: [
      { name: 'Общая энергия', description: 'Основная тема и энергия месяца в целом.' },
      { name: 'Неделя 1', description: 'События и уроки первой недели месяца.' },
      { name: 'Неделя 2', description: 'События и уроки второй недели месяца.' },
      { name: 'Неделя 3', description: 'События и уроки третьей недели месяца.' },
      { name: 'Неделя 4', description: 'События и уроки четвертой недели месяца.' }
    ],
    instructions: [
      'Сосредоточьтесь на предстоящем месяце и вопросах, которые интересуют вас в этот период.',
      'Тасуйте колоду, думая о месяце в целом.',
      'Выберите пять карт и разместите первую в центре, а остальные четыре вокруг неё по кругу по часовой стрелке.',
      'Интерпретируйте центральную карту как общую тему месяца, а остальные — как указания на каждую неделю.'
    ]
  }
];

const SpreadDetails = () => {
  const { spreadId } = useParams();
  const navigate = useNavigate();
  const [spread, setSpread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStartButton, setShowStartButton] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const detailsRef = useRef(null);
  
  useEffect(() => {
    // Имитация загрузки данных расклада
    const fetchSpreadDetails = async () => {
      try {
        setLoading(true);
        
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Найти расклад по ID из моковых данных
        const foundSpread = mockSpreads.find(s => s.id === parseInt(spreadId));
        
        if (foundSpread) {
          setSpread(foundSpread);
          // Показываем кнопку старта после небольшой задержки для эффекта
          setTimeout(() => setShowStartButton(true), 1200);
        } else {
          setError('Расклад не найден');
        }
      } catch (err) {
        console.error('Error fetching spread details:', err);
        setError('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpreadDetails();
  }, [spreadId]);
  
  const handleStartReading = () => {
    // Запускаем анимацию и прокручиваем к информации о раскладе
    setStartAnimation(true);
    
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };
  
  return (
    <PageContainer className="page-container">
      <BlobBackground>
        <Blob className="blob-1" />
        <Blob className="blob-2" />
        <Blob className="blob-3" />
      </BlobBackground>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загружаем информацию о раскладе...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>
          <span className="material-symbols-rounded">error</span>
          {error}
          <BackButton 
            onClick={() => navigate('/spreads')}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Вернуться к раскладам
          </BackButton>
        </ErrorMessage>
      )}
      
      {!loading && !error && spread && (
        <ContentContainer>
          <SpreadHeader>
            <BackLink 
              onClick={() => navigate('/spreads')}
              as={motion.div}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-rounded">arrow_back</span>
              Все расклады
            </BackLink>
            
            <DifficultyBadge $difficulty={spread.difficulty}>
              {spread.difficulty === 'easy' && 'Легкий расклад'}
              {spread.difficulty === 'medium' && 'Средний расклад'}
              {spread.difficulty === 'advanced' && 'Продвинутый расклад'}
            </DifficultyBadge>
          </SpreadHeader>
          
          <HeroSection>
            <SpreadHeroContent
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SpreadTitle>{spread.name}</SpreadTitle>
              <SpreadSubtitle>{spread.description}</SpreadSubtitle>
              
              <SpreadInfo>
                <InfoItem>
                  <span className="material-symbols-rounded">style</span>
                  {spread.cards_count} карт
                </InfoItem>
                <InfoItem>
                  <span className="material-symbols-rounded">
                    {spread.difficulty === 'easy' ? 'signal_cellular_1_bar' : 
                     spread.difficulty === 'medium' ? 'signal_cellular_2_bar' : 
                     'signal_cellular_4_bar'}
                  </span>
                  {spread.difficulty === 'easy' ? 'Простой' : 
                   spread.difficulty === 'medium' ? 'Средний' : 
                   'Сложный'}
                </InfoItem>
              </SpreadInfo>
              
              <AnimatePresence>
                {showStartButton && (
                  <StartButton
                    as={motion.button}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(138, 43, 226, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartReading}
                  >
                    <span className="material-symbols-rounded">auto_awesome</span>
                    Начать расклад
                  </StartButton>
                )}
              </AnimatePresence>
            </SpreadHeroContent>
            
            <SpreadVisualizerContainer
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.7 }
              }}
            >
              <SpreadVisualizer 
                spreadName={spread.name}
                difficulty={spread.difficulty}
                cards_count={spread.cards_count}
              />
            </SpreadVisualizerContainer>
          </HeroSection>
          
          <SpreadDetailsSection 
            ref={detailsRef}
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: startAnimation ? 1 : 0,
              y: startAnimation ? 0 : 50,
              transition: { duration: 0.8 }
            }}
          >
            <SectionTitle>Как выполнить расклад</SectionTitle>
            
            <DetailBlocks>
              <DetailBlock className="glass-card">
                <DetailBlockTitle>
                  <span className="material-symbols-rounded">help</span>
                  Ваш вопрос
                </DetailBlockTitle>
                <DetailBlockContent>
                  <p>Прежде чем начать расклад, сформулируйте ваш вопрос. Он должен быть конкретным, но открытым. Например, вместо "Найду ли я работу?" лучше спросить "Какие энергии влияют на мой поиск работы?"</p>
                  
                  <QuestionInput
                    placeholder="Введите ваш вопрос здесь..."
                    rows={2}
                  />
                </DetailBlockContent>
              </DetailBlock>
              
              <DetailBlock className="glass-card">
                <DetailBlockTitle>
                  <span className="material-symbols-rounded">view_carousel</span>
                  Позиции карт
                </DetailBlockTitle>
                <DetailBlockContent>
                  <p>Расклад "{spread.name}" состоит из {spread.cards_count} карт, расположенных особым образом:</p>
                  
                  <PositionsList>
                    {spread.positions.map((position, index) => (
                      <PositionItem 
                        key={index}
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: startAnimation ? 1 : 0,
                          y: startAnimation ? 0 : 20,
                          transition: { delay: 0.2 + index * 0.1, duration: 0.5 }
                        }}
                      >
                        <PositionNumber>{index + 1}</PositionNumber>
                        <PositionDetails>
                          <PositionName>{position.name}</PositionName>
                          <PositionDescription>{position.description}</PositionDescription>
                        </PositionDetails>
                      </PositionItem>
                    ))}
                  </PositionsList>
                </DetailBlockContent>
              </DetailBlock>
              
              <DetailBlock className="glass-card">
                <DetailBlockTitle>
                  <span className="material-symbols-rounded">format_list_numbered</span>
                  Инструкция
                </DetailBlockTitle>
                <DetailBlockContent>
                  <InstructionSteps>
                    {spread.instructions.map((instruction, index) => (
                      <InstructionStep 
                        key={index}
                        as={motion.div}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: startAnimation ? 1 : 0,
                          x: startAnimation ? 0 : -20,
                          transition: { delay: 0.3 + index * 0.1, duration: 0.5 }
                        }}
                      >
                        <StepNumber>{index + 1}</StepNumber>
                        <StepText>{instruction}</StepText>
                      </InstructionStep>
                    ))}
                  </InstructionSteps>
                </DetailBlockContent>
              </DetailBlock>
            </DetailBlocks>
            
            <ActionButtons>
              <SecondaryButton
                as={motion.button}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Функция недоступна в демо версии")}
              >
                <span className="material-symbols-rounded">favorite</span>
                Добавить в избранное
              </SecondaryButton>
              
              <PrimaryButton
                as={motion.button}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 10px 25px rgba(138, 43, 226, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Функция недоступна в демо версии")}
              >
                <span className="material-symbols-rounded">draw</span>
                Начать чтение
              </PrimaryButton>
            </ActionButtons>
          </SpreadDetailsSection>
        </ContentContainer>
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SpreadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BackLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
  
  &:hover {
    color: var(--primary);
  }
`;

const DifficultyBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  
  ${props => props.$difficulty === 'easy' && `
    background-color: rgba(72, 187, 120, 0.1);
    color: #48bb78;
    border: 1px solid rgba(72, 187, 120, 0.2);
  `}
  
  ${props => props.$difficulty === 'medium' && `
    background-color: rgba(237, 137, 54, 0.1);
    color: #ed8936;
    border: 1px solid rgba(237, 137, 54, 0.2);
  `}
  
  ${props => props.$difficulty === 'advanced' && `
    background-color: rgba(226, 62, 87, 0.1);
    color: #e23e57;
    border: 1px solid rgba(226, 62, 87, 0.2);
  `}
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

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  background: var(--error-bg);
  padding: 2rem;
  border-radius: var(--radius);
  color: var(--error);
  margin: 3rem auto;
  max-width: 500px;
  
  .material-symbols-rounded {
    font-size: 3rem;
  }
`;

const BackButton = styled.button`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
  }
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SpreadTitle = styled.h1`
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SpreadSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SpreadInfo = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
  
  .material-symbols-rounded {
    color: var(--primary);
    font-size: 1.2rem;
  }
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(138, 43, 226, 0.25);
  align-self: flex-start;
  margin-top: 1rem;
  
  .material-symbols-rounded {
    font-size: 1.3rem;
  }
`;

const SpreadVisualizerContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const SpreadDetailsSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text);
  font-family: var(--font-heading);
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetailBlocks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const DetailBlock = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const DetailBlockTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  
  .material-symbols-rounded {
    font-size: 1.4rem;
  }
`;

const DetailBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--text);
  }
`;

const QuestionInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 1rem;
  resize: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
  }
`;

const PositionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const PositionItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const PositionNumber = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
`;

const PositionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const PositionName = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 600;
`;

const PositionDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const InstructionSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InstructionStep = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 1rem;
  color: var(--text);
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.25);
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
    border-color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

export default SpreadDetails; 