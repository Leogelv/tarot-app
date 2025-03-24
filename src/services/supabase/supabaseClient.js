import { createClient } from '@supabase/supabase-js';

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

// Demo data for cards
const demoCards = [
  {
    id: 1,
    name: "The Fool",
    type: "major",
    number: "0",
    description: "The Fool represents new beginnings, optimism, and taking a leap of faith. It's about embarking on a journey without knowing the destination.",
    element: "Air",
    upright_meaning: "New beginnings, innocence, spontaneity, free spirit",
    reversed_meaning: "Recklessness, risk-taking, second-guessing yourself",
    keywords: "adventure, potential, opportunity, beginnings",
    image_url: "https://i.imgur.com/Mu4pUz0.jpg"
  },
  {
    id: 2,
    name: "The Magician",
    type: "major",
    number: "1",
    description: "The Magician represents manifestation, resourcefulness, and inspired action. He has all the tools and elements at his disposal to create his reality.",
    element: "Air",
    upright_meaning: "Manifestation, resourcefulness, power, inspired action",
    reversed_meaning: "Manipulation, poor planning, untapped talents",
    keywords: "creation, willpower, mastery, skill",
    image_url: "https://i.imgur.com/vEzDYXM.jpg"
  },
  {
    id: 3,
    name: "The High Priestess",
    type: "major",
    number: "2",
    description: "The High Priestess represents intuition, sacred knowledge, and the subconscious mind. She sits between the worlds of the conscious and unconscious.",
    element: "Water",
    upright_meaning: "Intuition, unconscious knowledge, divine feminine",
    reversed_meaning: "Secrets, disconnected from intuition, withdrawal",
    keywords: "mystery, wisdom, knowledge, understanding",
    image_url: "https://i.imgur.com/Rg8MaXL.jpg"
  },
  {
    id: 4,
    name: "The Empress",
    type: "major",
    number: "3",
    description: "The Empress represents fertility, femininity, beauty, nature, and abundance. She is the nurturing mother figure who brings life and growth.",
    element: "Earth",
    upright_meaning: "Femininity, beauty, nature, nurturing, abundance",
    reversed_meaning: "Creative block, dependence, emptiness",
    keywords: "nurturing, fruitfulness, motherhood, creativity",
    image_url: "https://i.imgur.com/qiXu7Bh.jpg"
  },
  {
    id: 5,
    name: "The Emperor",
    type: "major",
    number: "4",
    description: "The Emperor represents authority, structure, control and the father figure. He creates order out of chaos through leadership and regulation.",
    element: "Fire",
    upright_meaning: "Authority, structure, control, fatherhood, leadership",
    reversed_meaning: "Domination, excessive control, rigidity, stubbornness",
    keywords: "protection, power, stability, structure",
    image_url: "https://i.imgur.com/L98VULg.jpg"
  },
  {
    id: 6,
    name: "Six of Cups",
    type: "minor",
    suit: "cups",
    number: "6",
    description: "The Six of Cups represents childhood memories, nostalgia, innocence, and joy. It often appears when we're looking back at the past with fondness.",
    element: "Water",
    upright_meaning: "Nostalgia, happy memories, reunion, playfulness, gifts",
    reversed_meaning: "Living in the past, unrealistic nostalgia, forgetting lessons",
    keywords: "childhood, memories, innocence, joy",
    image_url: "https://i.imgur.com/fzPtHW3.jpg"
  },
  {
    id: 7,
    name: "Queen of Wands",
    type: "minor",
    suit: "wands",
    number: "Q",
    description: "The Queen of Wands represents courage, confidence, independence, social butterfly, and determination. She is a natural leader who inspires others.",
    element: "Fire",
    upright_meaning: "Courage, confidence, independence, social butterfly",
    reversed_meaning: "Selfishness, jealousy, insecurities, aggression",
    keywords: "determination, focus, passion, enthusiasm",
    image_url: "https://i.imgur.com/aX9T34f.jpg"
  },
  {
    id: 8,
    name: "Two of Swords",
    type: "minor",
    suit: "swords",
    number: "2",
    description: "The Two of Swords represents difficult choices, indecision, stalemate, and denial. It suggests we're avoiding a decision that needs to be made.",
    element: "Air",
    upright_meaning: "Difficult decisions, weighing options, stalemate, denial",
    reversed_meaning: "Indecision, confusion, information overload",
    keywords: "balance, choices, equilibrium, impasse",
    image_url: "https://i.imgur.com/mw6M0p2.jpg"
  },
  {
    id: 9,
    name: "Four of Pentacles",
    type: "minor",
    suit: "pentacles",
    number: "4",
    description: "The Four of Pentacles represents security, control, savings, and conservatism. It shows someone who holds tight to what they have but might be too focused on material possessions.",
    element: "Earth",
    upright_meaning: "Saving money, security, conservatism, scarcity",
    reversed_meaning: "Generosity, spending, insecurity with money",
    keywords: "stability, possession, wealth management, hoarding",
    image_url: "https://i.imgur.com/a9TVyap.jpg"
  }
];

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
  
  // Return demo cards if no data from Supabase
  if (!data || data.length === 0 || error) {
    console.log("Using demo cards data");
    
    // Filter demo cards to match the requested filters
    let filteredDemoCards = [...demoCards];
    
    if (filters.type) {
      filteredDemoCards = filteredDemoCards.filter(card => card.type === filters.type);
    }
    
    if (filters.suit) {
      filteredDemoCards = filteredDemoCards.filter(card => card.suit === filters.suit);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredDemoCards = filteredDemoCards.filter(card => 
        card.name.toLowerCase().includes(searchTerm) ||
        card.keywords.toLowerCase().includes(searchTerm) ||
        card.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return { data: filteredDemoCards, error: null };
  }
  
  return { data, error };
};

export const getCardById = async (id) => {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single();
    
  // Return a demo card if no data from Supabase
  if (!data || error) {
    console.log("Using demo card data for ID:", id);
    const demoCard = demoCards.find(card => card.id.toString() === id.toString());
    
    if (demoCard) {
      return { data: demoCard, error: null };
    } else {
      // If no matching demo card, create a fallback
      return { 
        data: {
          id: parseInt(id),
          name: `Mystery Card #${id}`,
          type: "major",
          description: "This mystical card reveals itself to the dedicated seeker. Its secrets are waiting to be discovered.",
          element: "Unknown",
          upright_meaning: "Mystery, discovery, potential, the unknown",
          reversed_meaning: "Secrets, hidden information, missed opportunities",
          keywords: "mystery, unknown, potential, discovery",
          image_url: "https://i.imgur.com/JmLvU9c.jpg"
        }, 
        error: null 
      };
    }
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
