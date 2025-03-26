import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mockCards } from '../data/mockData';

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    // Используем моковые данные вместо API запроса
    const card = mockCards.find(card => card.id.toString() === id);
    if (card) {
      setCardData(card);
      // Случайно определяем, будет ли карта перевернутой
      setIsReversed(Math.random() > 0.5);
      setLoading(false);
    }
  }, [id]);
  
  // Функция для сохранения заметок
  const handleNotesChange = (e) => {
    const value = e.target.value;
    setNotes(value);
  };
  
  // Функция для переключения положения карты
  const toggleCardOrientation = () => {
    setIsReversed(!isReversed);
  };
  
  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
        </LoadingSpinner>
      </Container>
    );
  }
  
  if (!cardData) {
    return (
      <Container>
        <ErrorMessage>Карта не найдена</ErrorMessage>
      </Container>
    );
  }
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Container>
      <BackButton 
        onClick={handleBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="material-symbols-rounded">arrow_back</span>
      </BackButton>
      
      <ContentWrapper>
        <CardImageSection>
          <CardImageWrapper
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CardImage 
              src={cardData.image} 
              alt={cardData.name}
              reversed={isReversed}
              as={motion.img}
            />
            
            <FlipButtonContainer>
              <FlipButton 
                onClick={toggleCardOrientation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="material-symbols-rounded">sync</span>
                {isReversed ? 'Вернуть' : 'Перевернуть'}
              </FlipButton>
            </FlipButtonContainer>
          </CardImageWrapper>
        </CardImageSection>
        
        <CardInfoSection
          as={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle>{cardData.name}</CardTitle>
            <CardArcana>{cardData.arcana}</CardArcana>
          </CardHeader>
          
          <CardCategory>
            <CategoryIcon className="material-symbols-rounded">
              {cardData.suit === 'major' ? 'auto_awesome' : 'diamond'}
            </CategoryIcon>
            {cardData.suit === 'major' ? 'Старшие арканы' : `Масть: ${cardData.suit}`}
          </CardCategory>
          
          <MeaningSection>
            <MeaningTitle>
              {isReversed ? 'Перевернутое значение:' : 'Прямое значение:'}
            </MeaningTitle>
            <MeaningText>
              {isReversed 
                ? cardData.reversedMeaning || 'Нет данных о перевернутом значении' 
                : cardData.meaning || 'Нет данных о значении'}
            </MeaningText>
          </MeaningSection>
          
          <KeywordsSection>
            <KeywordsTitle>Ключевые слова:</KeywordsTitle>
            <KeywordsList>
              {cardData.keywords && cardData.keywords.map((keyword, index) => (
                <Keyword key={index}>{keyword}</Keyword>
              ))}
            </KeywordsList>
          </KeywordsSection>
          
          <ElementSection>
            <SectionTitle>
              <span className="material-symbols-rounded">energy_program_time_used</span>
              Стихия и символика
            </SectionTitle>
            <ElementInfo>
              {cardData.element && (
                <ElementItem>
                  <ElementIcon className="material-symbols-rounded">
                    {cardData.element === 'fire' && 'local_fire_department'}
                    {cardData.element === 'water' && 'water_drop'}
                    {cardData.element === 'air' && 'air'}
                    {cardData.element === 'earth' && 'landscape'}
                    {cardData.element === 'spirit' && 'auto_awesome'}
                  </ElementIcon>
                  {cardData.element}
                </ElementItem>
              )}
              {cardData.zodiac && (
                <ElementItem>
                  <ElementIcon className="material-symbols-rounded">
                    star
                  </ElementIcon>
                  {cardData.zodiac}
                </ElementItem>
              )}
            </ElementInfo>
            <SectionDescription>
              {cardData.symbolism}
            </SectionDescription>
          </ElementSection>
          
          <NotesSection>
            <SectionTitle>
              <span className="material-symbols-rounded">edit_note</span>
              Личные заметки
            </SectionTitle>
            <NotesTextarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Запишите свои мысли и наблюдения о карте..."
            />
          </NotesSection>
        </CardInfoSection>
      </ContentWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #12121f, #2d2b42);
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(155, 89, 182, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: var(--error);
  margin: 3rem 0;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-bg);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  .material-symbols-rounded {
    color: var(--text);
    font-size: 1.2rem;
  }
  
  &:hover {
    background: var(--card-bg-hover);
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 992px) {
    max-width: 280px;
    margin: 0 auto;
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: ${props => props.reversed ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.6s ease;
`;

const FlipButtonContainer = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FlipButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .material-symbols-rounded {
    font-size: 1.1rem;
  }
  
  &:hover {
    background: var(--card-bg-hover);
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const CardInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  background: linear-gradient(45deg, #f5b833, #e46f4a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardArcana = styled.h2`
  font-size: 18px;
  color: #c9abff;
  margin: 5px 0 0 0;
  font-weight: normal;
`;

const CardCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: -0.5rem;
`;

const CategoryIcon = styled.span`
  color: var(--primary);
  font-size: 1.2rem;
  font-variation-settings: 'FILL' 1;
`;

const MeaningSection = styled.div`
  margin: 20px 0;
`;

const MeaningTitle = styled.h3`
  font-size: 20px;
  color: #c9abff;
  margin-bottom: 10px;
`;

const MeaningText = styled.p`
  line-height: 1.6;
  font-size: 16px;
`;

const KeywordsSection = styled.div`
  margin: 20px 0;
`;

const KeywordsTitle = styled.h3`
  font-size: 20px;
  color: #c9abff;
  margin-bottom: 10px;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Keyword = styled.span`
  background-color: rgba(201, 171, 255, 0.2);
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
`;

const ElementSection = styled.div`
  margin-top: 0.5rem;
`;

const ElementInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ElementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text);
`;

const ElementIcon = styled.span`
  color: var(--primary);
  font-variation-settings: 'FILL' 1;
`;

const SectionDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
  background: var(--card-bg);
  padding: 1rem;
  border-radius: var(--radius);
`;

const NotesSection = styled.div`
  margin-top: 1rem;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border-radius: var(--radius);
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text);
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .material-symbols-rounded {
    color: var(--primary);
    font-variation-settings: 'FILL' 1;
  }
`;

export default CardDetails; 