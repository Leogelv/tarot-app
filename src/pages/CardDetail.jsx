import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getCardById } from '../services/supabase/supabaseClient';
import CardTransition from '../components/effects/CardTransition';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orientation, setOrientation] = useState('upright');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const { data, error } = await getCardById(id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setCard(data);
        } else {
          // Для демонстрационных целей используем карту Колесница (ID 7)
          const demoCard = {
            id: 7,
            name: 'Колесница',
            type: 'major',
            suit: null,
            element: 'Вода',
            number: 'VII',
            upright_meaning: 'Победа, достижение контроля, преодоление препятствий, уверенность, решимость, напористость',
            reversed_meaning: 'Недостаток контроля, агрессия, поражение, отсутствие направления, оппозиция',
            description: 'Колесница символизирует силу воли, решимость и победу. Она указывает на преодоление препятствий через самодисциплину и сосредоточенность. Когда Колесница появляется в гадании, она предлагает вам взять под контроль ситуацию и не сдаваться перед трудностями.',
            image_url: 'https://www.trustedtarot.com/img/cards/the-chariot.png',
            keywords: ['движение вперед', 'преодоление препятствий', 'сила воли', 'решимость', 'победа']
          };
          setCard(demoCard);
        }
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to load card details. Please try again later.');
      } finally {
        setLoading(false);
        
        // Запускаем анимацию появления контента
        setTimeout(() => {
          setAnimationComplete(true);
        }, 1000);
      }
    };
    
    fetchCard();
  }, [id]);

  const toggleOrientation = () => {
    setOrientation(orientation === 'upright' ? 'reversed' : 'upright');
  };

  if (loading) {
    return (
      <Container>
        <div className="loading-spinner"></div>
        <p>Загрузка информации о карте...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink to="/cards">Вернуться к картам</BackLink>
      </Container>
    );
  }

  if (!card) {
    return (
      <Container>
        <NotFoundMessage>Карта не найдена</NotFoundMessage>
        <BackLink to="/cards">Вернуться к картам</BackLink>
      </Container>
    );
  }

  return (
    <Container>
      <CardHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackLink to="/cards">← Вернуться к картам</BackLink>
        <CardTitle>{card.name}</CardTitle>
        <CardSubtitle>
          {card.type === 'major' 
            ? `Старший Аркан - ${card.number ? `Карта ${card.number}` : ''}` 
            : `${card.suit ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1) : ''} - ${card.number || ''}`}
        </CardSubtitle>
      </CardHeader>
      
      <CardContent>
        <CardImageSection>
          <Card3DContainer $orientation={orientation}>
            <AnimatePresence>
              <motion.div
                key={orientation}
                initial={{ opacity: 0, rotateY: orientation === 'upright' ? -180 : 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Suspense fallback={<div className="loading-spinner"></div>}>
                  <CardTransition cardImageUrl={card.image_url} isActive={true} />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </Card3DContainer>
          
          <OrientationButton 
            onClick={toggleOrientation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {orientation === 'upright' ? 'Показать в перевернутом положении' : 'Показать в прямом положении'}
          </OrientationButton>
        </CardImageSection>
        
        <CardInfo>
          <AnimatePresence>
            {animationComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                <InfoSection
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionTitle>Описание</SectionTitle>
                  <SectionContent>{card.description || 'Описание недоступно.'}</SectionContent>
                </InfoSection>
                
                <InfoSection
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <SectionTitle>{orientation === 'upright' ? 'Значение в прямом положении' : 'Значение в перевернутом положении'}</SectionTitle>
                  <SectionContent>
                    {orientation === 'upright' 
                      ? card.upright_meaning || 'Значение недоступно.' 
                      : card.reversed_meaning || 'Значение недоступно.'}
                  </SectionContent>
                </InfoSection>
                
                {card.element && (
                  <InfoSection
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <SectionTitle>Стихия</SectionTitle>
                    <SectionContent>{card.element}</SectionContent>
                  </InfoSection>
                )}
                
                {card.keywords && card.keywords.length > 0 && (
                  <InfoSection
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <SectionTitle>Ключевые слова</SectionTitle>
                    <KeywordsList>
                      {card.keywords.map((keyword, index) => (
                        <Keyword 
                          key={index}
                          as={motion.div}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
                        >
                          {keyword}
                        </Keyword>
                      ))}
                    </KeywordsList>
                  </InfoSection>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardInfo>
      </CardContent>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CardHeader = styled(motion.header)`
  margin-bottom: 40px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const CardTitle = styled.h1`
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  font-family: var(--font-heading);
`;

const CardSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card3DContainer = styled.div`
  width: 300px;
  height: 450px;
  margin-bottom: 20px;
  transform-style: preserve-3d;
  transform: ${props => props.$orientation === 'reversed' ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.5s ease;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 375px;
  }
`;

const OrientationButton = styled(motion.button)`
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoSection = styled.div``;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary);
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
  font-family: var(--font-heading);
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--gradient-primary);
  }
`;

const SectionContent = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text);
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Keyword = styled.div`
  background-color: var(--card-bg);
  color: var(--primary);
  padding: 5px 15px;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  border: 1px solid var(--border);
  
  &:hover {
    background-color: var(--primary);
    color: white;
    border-color: var(--primary);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 1.2rem;
`;

const NotFoundMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-secondary);
`;

export default CardDetail; 