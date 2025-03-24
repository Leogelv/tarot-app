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

export const getCards = async (filters = {}) => {
  let query = supabase
    .from('cards')
    .select('*');

  // Apply filters if provided
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  
  if (filters.suit) {
    query = query.eq('suit', filters.suit);
  }
  
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  
  const { data, error } = await query;
  
  // Return tarot cards data if no data from Supabase
  if (!data || data.length === 0 || error) {
    console.log("Using tarotData cards data");
    
    // Filter tarot cards to match the requested filters
    let filteredCards = [...tarotCards];
    
    if (filters.type) {
      filteredCards = filteredCards.filter(card => card.type === filters.type);
    }
    
    if (filters.suit) {
      filteredCards = filteredCards.filter(card => card.suit === filters.suit);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCards = filteredCards.filter(card => 
        card.name.toLowerCase().includes(searchTerm) ||
        (card.keywords && card.keywords.join(' ').toLowerCase().includes(searchTerm)) ||
        (card.description && card.description.toLowerCase().includes(searchTerm))
      );
    }
    
    return { data: filteredCards, error: null };
  }
  
  return { data, error };
};

export const getCardById = async (id) => {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single();
    
  // Return a card from tarotData if no data from Supabase
  if (!data || error) {
    console.log("Using tarotData card data for ID:", id);
    
    // Преобразуем id в число если это строка
    const numId = typeof id === 'string' ? parseInt(id) : id;
    
    // Сначала попробуем найти карту по id
    const cardById = tarotCards.find(card => card.id === numId);
    
    if (cardById) {
      return { data: cardById, error: null };
    }
    
    // Если не нашли по id, ищем по имени карты Major Arcana с таким же номером
    const majorCard = tarotCards.find(card => 
      card.type === 'major' && card.number === String(numId)
    );
    
    if (majorCard) {
      return { data: majorCard, error: null };
    }
    
    // Если ничего не нашли, возвращаем первую карту с измененным id
    const fallbackCard = { ...tarotCards[0], id: numId };
    return { data: fallbackCard, error: null };
  }
  
  return { data, error };
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

export const getSpreads = async (includePremium = false) => {
  let query = supabase
    .from('spreads')
    .select('*');
  
  if (!includePremium) {
    query = query.eq('is_premium', false);
  }
  
  const { data, error } = await query;
  
  // Return demo spreads if no data from Supabase
  if (!data || data.length === 0 || error) {
    console.log("Using demo spreads data");
    
    let filteredDemoSpreads = [...demoSpreads];
    
    if (!includePremium) {
      filteredDemoSpreads = filteredDemoSpreads.filter(spread => !spread.is_premium);
    }
    
    return { data: filteredDemoSpreads, error: null };
  }
  
  return { data, error };
};

export const getSpreadById = async (id) => {
  const { data, error } = await supabase
    .from('spreads')
    .select(`
      *,
      positions (
        id, name, description
      )
    `)
    .eq('id', id)
    .single();
    
  // Return a demo spread if no data from Supabase
  if (!data || error) {
    console.log("Using demo spread data for ID:", id);
    const demoSpread = demoSpreads.find(spread => spread.id.toString() === id.toString());
    
    if (demoSpread) {
      return { data: demoSpread, error: null };
    } else {
      // If no matching demo spread, create a fallback
      return { 
        data: {
          id: parseInt(id),
          name: `Mystery Spread #${id}`,
          description: "This unique spread configuration helps illuminate hidden aspects of your question.",
          card_count: 3,
          is_premium: false,
          image_url: "https://i.imgur.com/pqXvnBl.jpg",
          positions: [
            { id: 1, name: "Past", description: "Influences from the past" },
            { id: 2, name: "Present", description: "Current situation" },
            { id: 3, name: "Future", description: "Potential outcome" }
          ]
        }, 
        error: null 
      };
    }
  }
  
  return { data, error };
};

// ======= Readings Functions =======

export const saveReading = async (userId, spreadId, cards, notes = '') => {
  // First create a reading record
  const { data: readingData, error: readingError } = await supabase
    .from('readings')
    .insert([
      {
        user_id: userId,
        spread_id: spreadId,
        notes: notes
      }
    ])
    .select();
  
  if (readingError) {
    return { error: readingError };
  }

  const readingId = readingData[0].id;
  
  // Format cards data to include reading_id
  const readingCardsData = cards.map(card => ({
    reading_id: readingId,
    card_id: card.card_id,
    position_id: card.position,
    orientation: card.orientation
  }));
  
  // Insert cards for the reading
  const { data: cardsData, error: cardsError } = await supabase
    .from('reading_cards')
    .insert(readingCardsData);
  
  if (cardsError) {
    return { error: cardsError };
  }
  
  return { data: readingData };
};

export const getUserReadings = async (userId) => {
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
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
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

export const getDailyCard = async (userId, date) => {
  // Format date to YYYY-MM-DD for consistent querying
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  // Check if there's an existing daily card for this user/date
  const { data: existingData, error: existingError } = await supabase
    .from('daily_cards')
    .select(`
      *,
      card:card_id (
        id, name, image_url, type, suit, upright_meaning, reversed_meaning
      )
    `)
    .eq('user_id', userId)
    .eq('date', formattedDate)
    .single();
  
  if (existingError && existingError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    // Return demo data if there's an error
    return getDemoDailyCard();
  }
  
  // If found, return it
  if (existingData) {
    return { data: existingData };
  }
  
  // For demo purposes, always return a nice demo card
  return getDemoDailyCard();
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

export const saveDailyCardReflection = async (dailyCardId, reflection) => {
  return await supabase
    .from('daily_cards')
    .update({ reflection })
    .eq('id', dailyCardId);
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
