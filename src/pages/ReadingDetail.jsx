import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getReadingById, deleteReading } from '../services/supabase/supabaseClient';

const ReadingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const fetchReading = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await getReadingById(id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (!data) {
          setError('Reading not found. It may have been deleted or you may not have access to it.');
          setLoading(false);
          return;
        }
        
        // Check if user has access to this reading
        if (isAuthenticated && user && data.user_id !== user.id) {
          setError('You do not have access to view this reading.');
          setLoading(false);
          return;
        }
        
        setReading(data);
      } catch (err) {
        console.error('Error fetching reading:', err);
        setError('Failed to load reading details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReading();
  }, [id, user, isAuthenticated]);
  
  const handleDeleteReading = async () => {
    try {
      setLoading(true);
      
      const { error } = await deleteReading(id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      navigate('/profile', { state: { message: 'Reading deleted successfully.' } });
    } catch (err) {
      console.error('Error deleting reading:', err);
      setError('Failed to delete reading. Please try again.');
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <Container>
        <div className="loading-spinner"></div>
        <p>Loading reading details...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink to="/profile">Back to Profile</BackLink>
      </Container>
    );
  }
  
  if (!reading) {
    return (
      <Container>
        <ErrorMessage>Reading not found</ErrorMessage>
        <BackLink to="/profile">Back to Profile</BackLink>
      </Container>
    );
  }
  
  return (
    <Container>
      <ReadingHeader>
        <BackLink to="/profile">← Back to Profile</BackLink>
        <ReadingTitle>{reading.spread?.name || 'Tarot Reading'}</ReadingTitle>
        <ReadingDate>
          Created on {formatDate(reading.created_at)}
        </ReadingDate>
      </ReadingHeader>
      
      <ReadingContent>
        <SpreadInfo>
          <SpreadImage 
            src={reading.spread?.image_url || `https://via.placeholder.com/300x200?text=${reading.spread?.name || 'Tarot Reading'}`} 
            alt={reading.spread?.name || 'Tarot Reading'} 
          />
          <SpreadDetails>
            <SpreadName>{reading.spread?.name || 'Custom Reading'}</SpreadName>
            <SpreadDescription>
              {reading.spread?.description || 'A personalized tarot reading for insight and guidance.'}
            </SpreadDescription>
          </SpreadDetails>
        </SpreadInfo>
        
        <CardsContainer>
          {reading.reading_cards?.map((cardPosition) => {
            const card = cardPosition.card;
            return (
              <CardPositionItem key={cardPosition.position_id}>
                <PositionName>
                  {cardPosition.position?.name || `Position ${cardPosition.position_id}`}
                </PositionName>
                <PositionDescription>
                  {cardPosition.position?.description || 'Card position in the spread'}
                </PositionDescription>
                
                <CardContainer orientation={cardPosition.orientation}>
                  <CardImage 
                    src={card?.image_url || `https://via.placeholder.com/150x250?text=${card?.name || 'Card'}`} 
                    alt={card?.name || 'Tarot Card'} 
                  />
                </CardContainer>
                
                <CardDetails>
                  <CardName>{card?.name || 'Unknown Card'}</CardName>
                  <CardOrientation>
                    {cardPosition.orientation === 'reversed' ? 'Reversed' : 'Upright'}
                  </CardOrientation>
                  <CardMeaning>
                    {cardPosition.orientation === 'upright' 
                      ? card?.upright_meaning 
                      : card?.reversed_meaning}
                  </CardMeaning>
                  <ViewCardLink to={`/cards/${card?.id}`}>View full card details</ViewCardLink>
                </CardDetails>
              </CardPositionItem>
            );
          })}
        </CardsContainer>
        
        <NotesSection>
          <NotesTitle>Your Notes</NotesTitle>
          <NotesContent>
            {reading.notes || 'No notes were saved for this reading.'}
          </NotesContent>
        </NotesSection>
        
        <ActionButtons>
          <DeleteButton 
            onClick={() => setDeleteConfirm(true)}
            disabled={loading}
          >
            Delete Reading
          </DeleteButton>
        </ActionButtons>
        
        {deleteConfirm && (
          <ConfirmationModal>
            <ModalContent>
              <ModalTitle>Confirm Deletion</ModalTitle>
              <ModalText>
                Are you sure you want to delete this reading? This action cannot be undone.
              </ModalText>
              <ModalButtons>
                <CancelButton 
                  onClick={() => setDeleteConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </CancelButton>
                <ConfirmButton 
                  onClick={handleDeleteReading}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </ConfirmButton>
              </ModalButtons>
            </ModalContent>
          </ConfirmationModal>
        )}
      </ReadingContent>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ReadingHeader = styled.header`
  margin-bottom: 30px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #8e44ad;
  }
`;

const ReadingTitle = styled.h1`
  font-size: 2.5rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const ReadingDate = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ReadingContent = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const SpreadInfo = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  padding: 30px;
  background-color: #f8f4fb;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpreadImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    justify-self: center;
  }
`;

const SpreadDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SpreadName = styled.h2`
  font-size: 1.8rem;
  color: #3a2a6c;
  margin-bottom: 10px;
`;

const SpreadDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardPositionItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const PositionName = styled.h3`
  font-size: 1.3rem;
  color: #3a2a6c;
  margin-bottom: 5px;
`;

const PositionDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
`;

const CardContainer = styled.div`
  width: 120px;
  height: 180px;
  margin: 0 auto 20px;
  transform: ${props => props.orientation === 'reversed' ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.5s ease;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CardDetails = styled.div`
  text-align: center;
`;

const CardName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #8e44ad;
  margin-bottom: 5px;
`;

const CardOrientation = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const CardMeaning = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
  text-align: left;
`;

const ViewCardLink = styled(Link)`
  display: inline-block;
  color: #8e44ad;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotesSection = styled.div`
  padding: 30px;
  border-top: 1px solid #eee;
`;

const NotesTitle = styled.h3`
  font-size: 1.5rem;
  color: #3a2a6c;
  margin-bottom: 15px;
`;

const NotesContent = styled.div`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  white-space: pre-wrap;
`;

const ActionButtons = styled.div`
  padding: 20px 30px 30px;
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #fff;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ffebee;
  }
  
  &:disabled {
    color: #ffaba1;
    border-color: #ffaba1;
    cursor: not-allowed;
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #3a2a6c;
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const CancelButton = styled.button`
  background-color: #f8f8f8;
  color: #555;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f1f1;
    border-color: #ccc;
  }
`;

const ConfirmButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #c0392b;
  }
  
  &:disabled {
    background-color: #f5b8b1;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

export default ReadingDetail; 