import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { logoutUser } from '../store/slices/authSlice';

const Profile = () => {
  const { user, profile, isAuthenticated, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = status === 'loading';

  // Если не авторизован - перенаправляем на страницу логина
  useEffect(() => {
    if (!isAuthenticated && status !== 'loading') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, status]);

  // Обработчик выхода из аккаунта
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  // Показываем загрузку, пока проверяем авторизацию
  if (loading || !user) {
    return (
      <Container>
        <LoadingMessage>Загрузка профиля...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileHeader>
        <ProfileAvatar>
          <img 
            src={profile?.avatar_url || 'https://i.pravatar.cc/150?img=68'} 
            alt="Аватар пользователя" 
          />
        </ProfileAvatar>
        <ProfileTitle>
          <h1>{profile?.name || user?.email || 'Пользователь'}</h1>
          <span className="email">{user.email}</span>
        </ProfileTitle>
      </ProfileHeader>

      <ProfileSection>
        <SectionTitle>
          <h2>Аккаунт</h2>
          <span className="subtitle">Управление вашим аккаунтом</span>
        </SectionTitle>
        
        <ProfileCard
          as={motion.div}
          whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="card-content">
            <div className="card-icon subscription">
              <span className="material-symbols-rounded">diamond</span>
            </div>
            <div className="card-info">
              <h3>Премиум-статус</h3>
              <p>Активен до 30 апреля 2024</p>
              <StatusBadge>Активен</StatusBadge>
            </div>
          </div>
        </ProfileCard>
      </ProfileSection>

      <ProfileSection>
        <SectionTitle>
          <h2>Действия</h2>
        </SectionTitle>
        
        <ButtonsContainer>
          <ActionButton 
            onClick={() => navigate('/spreads')}
            as={motion.button}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-rounded">dashboard</span>
            Перейти к раскладам
          </ActionButton>
          
          <ActionButton 
            onClick={() => navigate('/daily-card')}
            as={motion.button}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-rounded">today</span>
            Карта дня
          </ActionButton>
          
          <LogoutButton 
            onClick={handleLogout}
            as={motion.button}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-rounded">logout</span>
            Выйти
          </LogoutButton>
        </ButtonsContainer>
      </ProfileSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2rem;
  border: 3px solid var(--primary);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ProfileTitle = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }
  
  .email {
    font-size: 1rem;
    color: var(--text-secondary);
    display: block;
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.8rem;
  
  h2 {
    font-size: 1.5rem;
    color: var(--text);
    margin-bottom: 0.3rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const ProfileCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  .card-content {
    display: flex;
    align-items: center;
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(155, 89, 217, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    
    span {
      font-size: 28px;
      color: var(--primary);
    }
    
    &.subscription {
      background: rgba(76, 175, 80, 0.1);
      
      span {
        color: #4CAF50;
      }
    }
  }
  
  .card-info {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    p {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  span {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background: rgba(155, 89, 217, 0.05);
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const LogoutButton = styled(ActionButton)`
  background: rgba(244, 67, 54, 0.05);
  border-color: #f44336;
  color: #f44336;
  
  &:hover {
    background: rgba(244, 67, 54, 0.1);
    border-color: #d32f2f;
    color: #d32f2f;
  }
`;

export default Profile; 