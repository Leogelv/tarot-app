import { createClient } from '@supabase/supabase-js';
import tarotCards from '../tarotData';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or key not found in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ======= Authentication Functions =======

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email, password, userData = {}) => {
  return await supabase.auth.signUp({ 
    email,
    password,
    options: {
      data: userData
    }
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const resetPassword = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email);
};

// ======= User Profile Functions =======

export const getUserProfile = async (userId) => {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
};

export const updateUserProfile = async (profileData) => {
  return await supabase
    .from('profiles')
    .upsert(profileData)
    .select()
    .single();
};

// ======= Cards Functions =======

// Используем данные из tarotData.js вместо демо данных
const demoCards = tarotCards.slice(0, 10);

// Для демонстрационных целей используем фейковые асинхронные функции,
// которые имитируют вызовы к Supabase API

/**
 * Получить все карты из базы данных
 * @returns {Promise} Промис с данными карт
 */
export const getCards = async () => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: [], error: null };
  } catch (error) {
    console.error('Error fetching cards:', error);
    return { data: null, error };
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
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: null, error: null };
  } catch (error) {
    console.error(`Error fetching card with id ${id}:`, error);
    return { data: null, error };
  }
};

// ======= Spreads Functions =======

// Demo data for spreads
const demoSpreads = [
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
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: [], error: null };
  } catch (error) {
    console.error('Error fetching spreads:', error);
    return { data: null, error };
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
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: null, error: null };
  } catch (error) {
    console.error(`Error fetching spread with id ${id}:`, error);
    return { data: null, error };
  }
};

// ======= Readings Functions =======

/**
 * Сохранить результат расклада
 * @param {object} readingData Данные расклада
 * @returns {Promise} Промис с результатом операции
 */
export const saveReading = async (readingData) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: { id: 'new-reading-id' }, error: null };
  } catch (error) {
    console.error('Error saving reading:', error);
    return { data: null, error };
  }
};

/**
 * Получить все сохраненные расклады пользователя
 * @param {string} userId ID пользователя
 * @returns {Promise} Промис с данными сохраненных раскладов
 */
export const getUserReadings = async (userId) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: [], error: null };
  } catch (error) {
    console.error(`Error fetching readings for user ${userId}:`, error);
    return { data: null, error };
  }
};

export const getReadingById = async (id) => {
  return await supabase
    .from('readings')
    .select(`
      *,
      spread:spread_id (
        id, name, description, image_url
      ),
      reading_cards (
        id,
        position_id,
        orientation,
        position:position_id (
          id, name, description
        ),
        card:card_id (
          id, name, image_url, upright_meaning, reversed_meaning
        )
      )
    `)
    .eq('id', id)
    .single();
};

export const deleteReading = async (id) => {
  // First delete associated cards
  const { error: cardsError } = await supabase
    .from('reading_cards')
    .delete()
    .eq('reading_id', id);
  
  if (cardsError) {
    return { error: cardsError };
  }
  
  // Then delete the reading
  return await supabase
    .from('readings')
    .delete()
    .eq('id', id);
};

// ======= Daily Card Functions =======

/**
 * Получить дневную карту пользователя
 * @param {string} userId ID пользователя
 * @returns {Promise} Промис с данными дневной карты
 */
export const getDailyCard = async (userId) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: null, error: null };
  } catch (error) {
    console.error(`Error fetching daily card for user ${userId}:`, error);
    return { data: null, error };
  }
};

// Helper function to get a demo daily card
const getDemoDailyCard = () => {
  // Pick a random card from demo cards
  const randomIndex = Math.floor(Math.random() * demoCards.length);
  const randomCard = demoCards[randomIndex];
  const randomOrientation = Math.random() > 0.7 ? 'reversed' : 'upright'; // 30% chance of reversed
  
  // Create the daily card structure
  const dailyCard = {
    id: Date.now(), // Use timestamp as ID
    date: new Date().toISOString().split('T')[0],
    orientation: randomOrientation,
    reflection: '',
    cards: randomCard // Note: API returns "cards" field with card details
  };
  
  return { data: dailyCard };
};

/**
 * Сохранить рефлексию пользователя для дневной карты
 * @param {string} userId ID пользователя
 * @param {string} cardId ID карты
 * @param {string} reflection Текст рефлексии
 * @returns {Promise} Промис с результатом операции
 */
export const saveDailyReflection = async (userId, cardId, reflection) => {
  try {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // В реальном приложении здесь был бы запрос к Supabase
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error(`Error saving reflection for user ${userId}:`, error);
    return { data: null, error };
  }
};

// ======= Subscription Functions =======

export const checkSubscription = async (userId) => {
  // Get the user's subscription status
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();
  
  if (error && error.code !== 'PGRST116') { // Not found is ok
    return { error };
  }
  
  // If data is found and current date is before end_date, user is subscribed
  if (data) {
    const currentDate = new Date();
    const endDate = new Date(data.end_date);
    
    if (currentDate < endDate) {
      return { data: { isSubscribed: true, subscription: data } };
    }
  }
  
  // Otherwise, not subscribed
  return { data: { isSubscribed: false } };
};
