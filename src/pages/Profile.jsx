import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from '../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isSubscribed } = useSelector(state => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Демо Пользователь',
    email: 'demo@example.com',
    birth_date: '1990-01-01',
    preferences: 'Моя главная цель - разобраться в картах Таро и использовать их для самопознания и развития интуиции.',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  useEffect(() => {
    // Создаем демо-данные вместо запроса к API
    const fetchDemoData = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Демо профиль
        const demoProfile = {
          id: 'demo-profile-id',
          user_id: 'demo-user-id',
          name: 'Демо Пользователь',
          email: 'demo@example.com',
          birth_date: '1990-01-01',
          preferences: 'Моя главная цель - разобраться в картах Таро и использовать их для самопознания и развития интуиции.',
          subscription_status: 'active',
          subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 дней
        };
        
        setProfile(demoProfile);
        
        // Загружаем демо-чтения, если нужно
        if (activeTab === 'readings') {
          fetchDemoReadings();
        }
        
        setLoading(false);
      }, 800);
    };
    
    fetchDemoData();
  }, [activeTab]);
  
  const fetchDemoReadings = () => {
    // Имитация задержки загрузки данных
    setTimeout(() => {
      // Демо-чтения
      const demoReadings = [
        {
          id: 1,
          spread: {
            name: 'Прошлое, Настоящее, Будущее',
            description: 'Классический трехкарточный расклад'
          },
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 дня назад
          reading_cards: [
            { id: 101, card: { name: 'Колесница', image_url: 'https://i.imgur.com/Mu4pUz0.jpg' } },
            { id: 102, card: { name: 'Звезда', image_url: 'https://i.imgur.com/Rg8MaXL.jpg' } },
            { id: 103, card: { name: 'Солнце', image_url: 'https://i.imgur.com/qiXu7Bh.jpg' } }
          ],
          notes: 'Этот расклад показал мне, что после периода движения и борьбы (Колесница) я нахожусь в периоде исцеления и надежды (Звезда), и меня ждет период успеха и радости (Солнце).'
        },
        {
          id: 2,
          spread: {
            name: 'Кельтский Крест',
            description: 'Подробный 10-карточный расклад'
          },
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // неделю назад
          reading_cards: [
            { id: 201, card: { name: 'Маг', image_url: 'https://i.imgur.com/vEzDYXM.jpg' } },
            { id: 202, card: { name: 'Верховная Жрица', image_url: 'https://i.imgur.com/Rg8MaXL.jpg' } },
            { id: 203, card: { name: 'Императрица', image_url: 'https://i.imgur.com/qiXu7Bh.jpg' } }
          ],
          notes: 'Этот расклад был сделан для вопроса о карьере. Он показал, что у меня есть все необходимые инструменты (Маг), но нужно больше прислушиваться к интуиции (Верховная Жрица).'
        }
      ];
      
      setReadings(demoReadings);
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    // Имитация сохранения профиля
    setLoading(true);
    setUpdateSuccess(false);
    
    setTimeout(() => {
      // Обновляем локальное состояние профиля
      setProfile(prev => ({ ...prev, ...formData }));
      
      // Показываем сообщение об успехе
      setUpdateSuccess(true);
      
      // Скрываем сообщение через 3 секунды
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
      
      setLoading(false);
    }, 1000);
  };
  
  const handleDeleteReading = async (readingId) => {
    if (!window.confirm('Вы уверены, что хотите удалить это чтение?')) {
      return;
    }
    
    // Имитация удаления чтения
    setLoading(true);
    
    setTimeout(() => {
      // Обновляем список чтений локально
      setReadings(readings.filter(reading => reading.id !== readingId));
      setLoading(false);
    }, 800);
  };
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  return (
    <Container>
      <ProfileHeader>
        <ProfileTitle>Ваш Аккаунт</ProfileTitle>
        <PremiumBadge>Премиум</PremiumBadge>
      </ProfileHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </Tab>
        <Tab 
          active={activeTab === 'readings'} 
          onClick={() => setActiveTab('readings')}
        >
          История чтений
        </Tab>
        <Tab 
          active={activeTab === 'subscription'} 
          onClick={() => setActiveTab('subscription')}
        >
          Подписка
        </Tab>
      </TabsContainer>
      
      {loading && (
        <LoadingContainer>
          <div className="loading-spinner"></div>
          <p>Загрузка...</p>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {!loading && activeTab === 'profile' && (
        <ProfileSection>
          <form onSubmit={handleProfileUpdate}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                disabled 
              />
              <HelperText>Email нельзя изменить</HelperText>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="name">Имя</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Ваше имя" 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="birth_date">Дата рождения (опционально)</Label>
              <Input 
                type="date" 
                id="birth_date" 
                name="birth_date" 
                value={formData.birth_date} 
                onChange={handleInputChange} 
              />
              <HelperText>Используется для персонализированных чтений</HelperText>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="preferences">Предпочтения (опционально)</Label>
              <Textarea 
                id="preferences" 
                name="preferences" 
                value={formData.preferences} 
                onChange={handleInputChange} 
                placeholder="Ваши интересы и цели в Таро" 
                rows={4}
              />
            </FormGroup>
            
            {updateSuccess && (
              <SuccessMessage>Профиль успешно обновлен!</SuccessMessage>
            )}
            
            <ButtonGroup>
              <SaveButton type="submit" disabled={loading}>
                Сохранить изменения
              </SaveButton>
              <LogoutButton type="button" onClick={handleLogout}>
                Выйти
              </LogoutButton>
            </ButtonGroup>
          </form>
        </ProfileSection>
      )}
      
      {!loading && activeTab === 'readings' && (
        <ReadingsSection>
          {readings.length === 0 ? (
            <EmptyState>
              <EmptyStateText>У вас пока нет сохраненных чтений.</EmptyStateText>
              <StartReadingLink to="/spreads">Попробовать расклад Таро</StartReadingLink>
            </EmptyState>
          ) : (
            <ReadingsList>
              {readings.map(reading => (
                <ReadingItem key={reading.id}>
                  <ReadingHeader>
                    <ReadingTitle>
                      {reading.spread?.name || 'Безымянное чтение'}
                    </ReadingTitle>
                    <ReadingDate>
                      {formatDate(reading.created_at)}
                    </ReadingDate>
                  </ReadingHeader>
                  
                  <ReadingCardCount>
                    {reading.reading_cards?.length || 0} карт
                  </ReadingCardCount>
                  
                  <ReadingNotes>
                    {reading.notes || 'Заметки не добавлены'}
                  </ReadingNotes>
                  
                  <ReadingActions>
                    <ViewButton to={`/readings/${reading.id}`}>
                      Просмотреть
                    </ViewButton>
                    <DeleteButton 
                      onClick={() => handleDeleteReading(reading.id)}
                      disabled={loading}
                    >
                      Удалить
                    </DeleteButton>
                  </ReadingActions>
                </ReadingItem>
              ))}
            </ReadingsList>
          )}
        </ReadingsSection>
      )}
      
      {!loading && activeTab === 'subscription' && (
        <SubscriptionSection>
          <SubscriptionCard>
            <SubscriptionHeader>
              <SubscriptionTitle>
                Премиум Подписка
              </SubscriptionTitle>
              <SubscriptionStatus active={true}>
                Активна
              </SubscriptionStatus>
            </SubscriptionHeader>
            
            <PlanDetails>
              <PlanFeature>✓ Доступ ко всем премиум раскладам</PlanFeature>
              <PlanFeature>✓ Неограниченная история чтений</PlanFeature>
              <PlanFeature>✓ Подробные интерпретации карт</PlanFeature>
              <PlanFeature>✓ Приоритетная поддержка клиентов</PlanFeature>
            </PlanDetails>
            
            <SubscriptionInfo>
              Ваша подписка продлевается {formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))}
            </SubscriptionInfo>
          </SubscriptionCard>
        </SubscriptionSection>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  color: #3a2a6c;
  margin: 0;
`;

const PremiumBadge = styled.span`
  background-color: #f1c40f;
  color: #7f5900;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 15px;
  text-transform: uppercase;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: ${props => props.active ? '#8e44ad' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#8e44ad' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #8e44ad;
  }
`;

const ProfileSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ReadingsSection = styled.div`
  background-color: white;
  border-radius: a0px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SubscriptionSection = styled.div`
  padding: 20px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const HelperText = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  background-color: #8e44ad;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #6c3483;
  }
  
  &:disabled {
    background-color: #d3a1e1;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled.button`
  background-color: #f8f8f8;
  color: #555;
  border: 1px solid #ddd;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f1f1;
    border-color: #ccc;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #8e44ad;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;

const StartReadingLink = styled(Link)`
  display: inline-block;
  background-color: #8e44ad;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1.1rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #6c3483;
  }
`;

const ReadingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReadingItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const ReadingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const ReadingTitle = styled.h3`
  font-size: 1.3rem;
  color: #3a2a6c;
  margin: 0;
`;

const ReadingDate = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const ReadingCardCount = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const ReadingNotes = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
  
  /* Truncate long text */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadingActions = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ViewButton = styled(Link)`
  background-color: #8e44ad;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  flex: 1;
  text-align: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #6c3483;
  }
`;

const DeleteButton = styled.button`
  background-color: #fff;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
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

const SubscriptionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
`;

const SubscriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const SubscriptionTitle = styled.h2`
  font-size: 1.8rem;
  color: #3a2a6c;
  margin: 0;
`;

const SubscriptionStatus = styled.span`
  background-color: ${props => props.active ? '#e8f5e9' : '#f1f8e9'};
  color: ${props => props.active ? '#2e7d32' : '#558b2f'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const PlanDetails = styled.div`
  margin-bottom: 30px;
`;

const PlanFeature = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const SubscriptionInfo = styled.div`
  font-size: 1rem;
  color: #777;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export default Profile; 