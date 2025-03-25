import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Моковые данные раскладов
const mockSpreads = [
  {
    id: 1,
    name: 'Расклад на три карты',
    description: 'Классический расклад: прошлое, настоящее и будущее. Простой способ получить быстрое понимание ситуации.',
    cards_count: 3,
    difficulty: 'easy',
    image_url: 'https://i.ibb.co/mG0SrM8/three-card-spread.jpg',
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
    image_url: 'https://i.ibb.co/9vHzp9S/celtic-cross.jpg',
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
    image_url: 'https://i.ibb.co/wWn6JXc/love-spread.jpg',
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
    image_url: 'https://i.ibb.co/9G0SBFY/decision-spread.jpg',
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
    image_url: 'https://i.ibb.co/njvvqpr/month-ahead.jpg',
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
    // В реальном приложении здесь был бы переход к странице с раскладом
    alert('В демо-версии функция выполнения расклада недоступна');
    // navigate(`/reading/${spreadId}`);
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
          
          <SpreadContent>
            <SpreadImageSection>
              <SpreadImage 
                src={spread.image_url} 
                alt={spread.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i.ibb.co/mG0SrM8/three-card-spread.jpg';
                }}
              />
              <CardCount>
                <span className="material-symbols-rounded">style</span>
                {spread.cards_count} карт
              </CardCount>
            </SpreadImageSection>
            
            <SpreadInfoSection>
              <SpreadName>{spread.name}</SpreadName>
              <SpreadDescription>{spread.description}</SpreadDescription>
              
              <StartReadingButton 
                onClick={handleStartReading}
                as={motion.button}
                whileHover={{ y: -3, boxShadow: '0 10px 15px rgba(155, 89, 217, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-symbols-rounded">playing_cards</span>
                Начать расклад
              </StartReadingButton>
            </SpreadInfoSection>
          </SpreadContent>
          
          <SpreadDetailsSection className="glass-card">
            <SectionTitle>Позиции карт</SectionTitle>
            <PositionsList>
              {spread.positions.map((position, index) => (
                <PositionItem 
                  key={index}
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PositionNumber>{index + 1}</PositionNumber>
                  <PositionContent>
                    <PositionName>{position.name}</PositionName>
                    <PositionDescription>{position.description}</PositionDescription>
                  </PositionContent>
                </PositionItem>
              ))}
            </PositionsList>
          </SpreadDetailsSection>
          
          <InstructionsSection className="glass-card">
            <SectionTitle>Инструкция по раскладу</SectionTitle>
            <InstructionSteps>
              {spread.instructions.map((instruction, index) => (
                <InstructionStep 
                  key={index}
                  as={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StepNumber>{index + 1}</StepNumber>
                  <StepText>{instruction}</StepText>
                </InstructionStep>
              ))}
            </InstructionSteps>
          </InstructionsSection>
          
          <ButtonContainer>
            <StartReadingButton 
              onClick={handleStartReading}
              as={motion.button}
              whileHover={{ y: -3, boxShadow: '0 10px 15px rgba(155, 89, 217, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-rounded">playing_cards</span>
              Начать расклад
            </StartReadingButton>
          </ButtonContainer>
        </ContentContainer>
      )}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1000px;
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
    bottom: 30%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 76, 76, 0.1);
  border: 1px solid rgba(255, 76, 76, 0.3);
  border-radius: var(--radius);
  color: #ff4c4c;
  margin: 2rem auto;
  max-width: 500px;
  text-align: center;
  
  .material-symbols-rounded {
    font-size: 2rem;
  }
`;

const BackButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--card-bg-hover);
    color: var(--primary);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const DifficultyBadge = styled.div`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    if (props.$difficulty === 'easy') return 'rgba(46, 213, 115, 0.1)';
    if (props.$difficulty === 'medium') return 'rgba(255, 193, 7, 0.1)';
    if (props.$difficulty === 'advanced') return 'rgba(255, 71, 87, 0.1)';
    return 'rgba(155, 89, 217, 0.1)';
  }};
  color: ${props => {
    if (props.$difficulty === 'easy') return '#2ed573';
    if (props.$difficulty === 'medium') return '#ffc107';
    if (props.$difficulty === 'advanced') return '#ff4757';
    return 'var(--primary)';
  }};
  border: 1px solid ${props => {
    if (props.$difficulty === 'easy') return 'rgba(46, 213, 115, 0.3)';
    if (props.$difficulty === 'medium') return 'rgba(255, 193, 7, 0.3)';
    if (props.$difficulty === 'advanced') return 'rgba(255, 71, 87, 0.3)';
    return 'rgba(155, 89, 217, 0.3)';
  }};
`;

const SpreadContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadImageSection = styled.div`
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
`;

const SpreadImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius);
`;

const CardCount = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  
  .material-symbols-rounded {
    font-size: 1.2rem;
  }
`;

const SpreadInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpreadName = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SpreadDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text);
  flex: 1;
`;

const StartReadingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 1rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-3px);
  }
  
  .material-symbols-rounded {
    font-size: 1.3rem;
  }
`;

const SpreadDetailsSection = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 3px;
    background: var(--primary);
    border-radius: var(--radius);
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
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const PositionNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
`;

const PositionContent = styled.div`
  flex: 1;
`;

const PositionName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-light);
`;

const PositionDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
`;

const InstructionsSection = styled.div`
  padding: 2rem;
`;

const InstructionSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InstructionStep = styled.div`
  display: flex;
  gap: 1rem;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export default SpreadDetails; 