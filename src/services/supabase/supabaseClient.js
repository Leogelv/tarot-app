// Импортируем только таротовые карты из локальных данных
import tarotCards from '../tarotData';

// Убираем инициализацию Supabase клиента
const MOCK_USER_ID = 'mock-user-123';

// Mock данные для пользователя
const mockUser = {
  id: MOCK_USER_ID,
  email: 'demo@example.com',
  name: 'Демо Пользователь',
  avatar_url: 'https://i.pravatar.cc/150?img=68',
  created_at: new Date().toISOString(),
  is_premium: false
};

// ======= Authentication Functions =======

export const signIn = async (email, password) => {
  // Имитация входа в систему
  await new Promise(resolve => setTimeout(resolve, 800));
  return { data: { user: mockUser, session: { access_token: 'mock-token' } }, error: null };
};

export const signUp = async (email, password, userData = {}) => {
  // Имитация регистрации
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { data: { user: { ...mockUser, ...userData }, session: { access_token: 'mock-token' } }, error: null };
};

export const signOut = async () => {
  // Имитация выхода
  await new Promise(resolve => setTimeout(resolve, 300));
  return { error: null };
};

export const getCurrentUser = async () => {
  // Имитация получения текущего пользователя
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: { user: mockUser }, error: null };
};

export const resetPassword = async (email) => {
  // Имитация сброса пароля
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: {}, error: null };
};

// ======= User Profile Functions =======

export const getUserProfile = async (userId) => {
  // Имитация получения профиля
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: mockUser, error: null };
};

export const updateUserProfile = async (profileData) => {
  // Имитация обновления профиля
  await new Promise(resolve => setTimeout(resolve, 700));
  return { data: { ...mockUser, ...profileData }, error: null };
};

// ======= Cards Functions =======

/**
 * Получить все карты из локальных данных
 * @returns {Promise} Промис с данными карт
 */
export const getCards = async () => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { data: tarotCards, error: null };
  } catch (error) {
    console.error('Error fetching cards:', error);
    return { data: [], error };
  }
};

/**
 * Получить карту по ID
 * @param {string} id ID карты
 * @returns {Promise} Промис с данными карты
 */
export const getCardById = async (id) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const card = tarotCards.find(card => card.id.toString() === id.toString());
    return { data: card || null, error: null };
  } catch (error) {
    console.error(`Error fetching card with id ${id}:`, error);
    return { data: null, error };
  }
};

// ======= Spreads Functions =======

// Mock data for spreads
const mockSpreads = [
  {
    id: 1,
    name: "Past, Present, Future",
    description: "A classic 3-card spread that gives insight into your journey from past influences through current situation to future possibilities.",
    card_count: 3,
    is_premium: false,
    image_url: "https://i.imgur.com/pqXvnBl.jpg",
    positions: [
      { id: 1, name: "Past", description: "Influences from the past that are affecting your current situation" },
      { id: 2, name: "Present", description: "Your current situation and immediate challenges" },
      { id: 3, name: "Future", description: "Potential outcome if you continue on this path" }
    ]
  },
  {
    id: 2,
    name: "Celtic Cross",
    description: "A comprehensive 10-card spread that provides deep insight into a specific question or situation in your life.",
    card_count: 10,
    is_premium: true,
    image_url: "https://i.imgur.com/JRfvNHR.jpg",
    positions: [
      { id: 1, name: "The Present", description: "Represents your current situation" },
      { id: 2, name: "The Challenge", description: "Shows the immediate challenge you're facing" },
      { id: 3, name: "The Past", description: "Recent events that impact the situation" },
      { id: 4, name: "The Future", description: "Events that will unfold in the near future" },
      { id: 5, name: "Above", description: "Your goal or best outcome" },
      { id: 6, name: "Below", description: "Subconscious influences, underlying feelings" },
      { id: 7, name: "Advice", description: "How you should approach the situation" },
      { id: 8, name: "External Influences", description: "People or factors in your environment" },
      { id: 9, name: "Hopes and Fears", description: "What you're hoping for or fearing" },
      { id: 10, name: "Final Outcome", description: "The ultimate resolution" }
    ]
  },
  {
    id: 3,
    name: "The Yes or No",
    description: "A simple 1-card spread that helps you get a clear answer to a yes-or-no question.",
    card_count: 1,
    is_premium: false,
    image_url: "https://i.imgur.com/G2Y3b15.jpg",
    positions: [
      { id: 1, name: "Answer", description: "This card provides a clear yes or no answer to your question" }
    ]
  },
  {
    id: 4,
    name: "Relationship Spread",
    description: "A 5-card spread that gives insight into your relationship with another person and the dynamics between you.",
    card_count: 5,
    is_premium: false,
    image_url: "https://i.imgur.com/x6iBV1M.jpg",
    positions: [
      { id: 1, name: "You", description: "Represents your role in the relationship" },
      { id: 2, name: "The Other Person", description: "Represents the other person's role" },
      { id: 3, name: "Connection", description: "What brings you together" },
      { id: 4, name: "Challenge", description: "The main challenge in the relationship" },
      { id: 5, name: "Outcome", description: "Where this relationship is heading" }
    ]
  },
  {
    id: 5,
    name: "Career Path",
    description: "A 6-card spread focused on work matters and career direction.",
    card_count: 6,
    is_premium: true,
    image_url: "https://i.imgur.com/8SlE4nU.jpg",
    positions: [
      { id: 1, name: "Current Position", description: "Your present work situation" },
      { id: 2, name: "Challenge", description: "Obstacle to overcome" },
      { id: 3, name: "Strength", description: "Your career assets and skills" },
      { id: 4, name: "Action", description: "Steps to take for advancement" },
      { id: 5, name: "Environment", description: "Workplace factors affecting you" },
      { id: 6, name: "Outcome", description: "Career direction and potential" }
    ]
  }
];

/**
 * Получить все расклады
 * @param {boolean} includePremium Включать ли премиум расклады
 * @returns {Promise} Промис с данными раскладов
 */
export const getSpreads = async (includePremium = false) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const spreads = includePremium 
      ? mockSpreads 
      : mockSpreads.filter(spread => !spread.is_premium);
    
    return { data: spreads, error: null };
  } catch (error) {
    console.error('Error fetching spreads:', error);
    return { data: [], error };
  }
};

/**
 * Получить расклад по ID
 * @param {string} id ID расклада
 * @returns {Promise} Промис с данными расклада
 */
export const getSpreadById = async (id) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const spread = mockSpreads.find(s => s.id.toString() === id.toString());
    return { data: spread || null, error: null };
  } catch (error) {
    console.error(`Error fetching spread with id ${id}:`, error);
    return { data: null, error };
  }
};

// ======= Readings Functions =======

// Mock данные для истории раскладов пользователя
const mockReadings = [
  {
    id: 'reading-1',
    user_id: MOCK_USER_ID,
    spread_id: 1, 
    question: 'Что ждет меня в ближайшем будущем?',
    cards: [
      { position_id: 1, card_id: 22 },
      { position_id: 2, card_id: 14 },
      { position_id: 3, card_id: 7 }
    ],
    notes: 'Интересный расклад, нужно посмотреть как будут развиваться события.',
    created_at: '2023-03-15T14:30:00Z'
  },
  {
    id: 'reading-2',
    user_id: MOCK_USER_ID,
    spread_id: 3,
    question: 'Стоит ли мне менять работу?',
    cards: [
      { position_id: 1, card_id: 20 }
    ],
    notes: 'Ответ положительный, но нужно быть осторожным.',
    created_at: '2023-03-10T09:15:00Z'
  }
];

/**
 * Сохранить результат расклада
 * @param {object} readingData Данные расклада
 * @returns {Promise} Промис с результатом операции
 */
export const saveReading = async (readingData) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Создаем новый расклад с уникальным ID
    const newReading = {
      id: `reading-${Date.now()}`,
      user_id: MOCK_USER_ID,
      created_at: new Date().toISOString(),
      ...readingData
    };
    
    // Добавляем в начало массива для имитации сортировки по дате
    mockReadings.unshift(newReading);
    
    return { data: newReading, error: null };
  } catch (error) {
    console.error('Error saving reading:', error);
    return { data: null, error };
  }
};

/**
 * Получить все сохраненные расклады пользователя
 * @param {string} userId ID пользователя (необязательно для мока)
 * @returns {Promise} Промис с данными сохраненных раскладов
 */
export const getUserReadings = async (userId = MOCK_USER_ID) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return { data: mockReadings, error: null };
  } catch (error) {
    console.error('Error fetching user readings:', error);
    return { data: [], error };
  }
};

/**
 * Получить расклад по ID
 * @param {string} id ID расклада
 * @returns {Promise} Промис с данными расклада
 */
export const getReadingById = async (id) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reading = mockReadings.find(r => r.id === id);
    
    if (!reading) {
      return { data: null, error: { message: 'Reading not found' } };
    }
    
    // Дополняем данные расклада информацией о спреде и картах
    const spread = mockSpreads.find(s => s.id === reading.spread_id);
    
    const readingWithDetails = {
      ...reading,
      spread,
      cards: reading.cards.map(c => {
        const card = tarotCards.find(card => card.id === c.card_id);
        const position = spread?.positions?.find(p => p.id === c.position_id);
        return {
          ...c,
          card,
          position
        };
      })
    };
    
    return { data: readingWithDetails, error: null };
  } catch (error) {
    console.error(`Error fetching reading with id ${id}:`, error);
    return { data: null, error };
  }
};

/**
 * Удалить расклад
 * @param {string} id ID расклада
 * @returns {Promise} Промис с результатом операции
 */
export const deleteReading = async (id) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockReadings.findIndex(r => r.id === id);
    
    if (index === -1) {
      return { error: { message: 'Reading not found' } };
    }
    
    mockReadings.splice(index, 1);
    
    return { data: { id }, error: null };
  } catch (error) {
    console.error(`Error deleting reading with id ${id}:`, error);
    return { data: null, error };
  }
};

// ======= Daily Card Functions =======

// Cache для дневной карты
let dailyCardCache = null;
let dailyCardDate = null;

/**
 * Получить карту дня для пользователя
 * @param {string} userId ID пользователя (необязательно для мока)
 * @returns {Promise} Промис с данными карты дня
 */
export const getDailyCard = async (userId = MOCK_USER_ID) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Проверяем кэш и обновляем его, если нужно
    const today = new Date().toDateString();
    
    if (!dailyCardCache || dailyCardDate !== today) {
      // Получаем случайную карту из колоды
      dailyCardCache = getDemoDailyCard();
      dailyCardDate = today;
    }
    
    return { data: dailyCardCache, error: null };
  } catch (error) {
    console.error('Error fetching daily card:', error);
    return { data: null, error };
  }
};

/**
 * Генерирует случайную карту дня
 * @returns {Object} Объект с данными карты дня
 */
const getDemoDailyCard = () => {
  // Получаем случайную карту
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];
  
  // Генерируем случайную направленность (прямое/перевернутое положение)
  const isReversed = Math.random() > 0.7;
  
  // Генерируем сообщение дня
  const messages = [
    "Сегодня обратите внимание на свои эмоции и интуицию.",
    "День подходит для самоанализа и внутреннего роста.",
    "Прислушайтесь к своему внутреннему голосу сегодня.",
    "Хороший день для новых начинаний и воплощения идей.",
    "Сегодня стоит быть осторожнее с принятием важных решений.",
    "День благоприятен для укрепления отношений с близкими.",
    "Сегодня возможны неожиданные открытия и озарения."
  ];
  
  const randomMessageIndex = Math.floor(Math.random() * messages.length);
  
  return {
    id: `daily-${new Date().toISOString().split('T')[0]}`,
    card_id: card.id,
    card,
    date: new Date().toISOString(),
    is_reversed: isReversed,
    message: messages[randomMessageIndex],
    reflection: null
  };
};

/**
 * Сохранить рефлексию пользователя на карту дня
 * @param {string} userId ID пользователя
 * @param {string} cardId ID карты дня
 * @param {string} reflection Текст рефлексии
 * @returns {Promise} Промис с результатом операции
 */
export const saveDailyReflection = async (userId = MOCK_USER_ID, cardId, reflection) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Обновляем данные карты дня в кэше
    if (dailyCardCache && dailyCardCache.card_id === cardId) {
      dailyCardCache.reflection = reflection;
    }
    
    return { data: { reflection }, error: null };
  } catch (error) {
    console.error('Error saving reflection:', error);
    return { data: null, error };
  }
};

// ======= Subscription Functions =======

/**
 * Проверить статус подписки пользователя
 * @param {string} userId ID пользователя
 * @returns {Promise} Промис со статусом подписки
 */
export const checkSubscription = async (userId = MOCK_USER_ID) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // В демо-версии подписка всегда активна
    return { 
      data: { 
        is_subscribed: true,
        subscription_type: 'premium',
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 дней от текущей даты
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { data: { is_subscribed: false }, error };
  }
};
