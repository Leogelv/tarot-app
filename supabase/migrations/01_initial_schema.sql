-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Cards table
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  number TEXT NOT NULL,
  arcana TEXT NOT NULL,
  suit TEXT,
  image TEXT NOT NULL,
  fortune_telling JSONB DEFAULT '[]'::jsonb,
  keywords JSONB DEFAULT '[]'::jsonb,
  meanings JSONB DEFAULT '{}'::jsonb,
  modern_interpretation TEXT,
  affirmation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spreads table
CREATE TABLE spreads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  layout JSONB NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Readings table
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  spread_id UUID REFERENCES spreads(id) ON DELETE SET NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cards JSONB NOT NULL,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Daily cards table
CREATE TABLE daily_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  reflection TEXT,
  UNIQUE(user_id, date)
);

-- Journal entries table
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reading_id UUID REFERENCES readings(id) ON DELETE SET NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  mood TEXT,
  tags JSONB DEFAULT '[]'::jsonb
);

-- Affirmations table
CREATE TABLE affirmations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  payment_provider TEXT,
  payment_id TEXT,
  UNIQUE(user_id, subscription_type, payment_id)
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE spreads ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Cards are public
CREATE POLICY "Cards are viewable by everyone" ON cards
  FOR SELECT USING (true);

-- Basic spreads are public
CREATE POLICY "Basic spreads are viewable by everyone" ON spreads
  FOR SELECT USING (is_premium = false);

-- Premium spreads require authentication
CREATE POLICY "Premium spreads require auth" ON spreads
  FOR SELECT USING (is_premium = false OR auth.role() = 'authenticated');

-- Users can only view their own readings
CREATE POLICY "Users can view own readings" ON readings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own readings
CREATE POLICY "Users can insert own readings" ON readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own readings
CREATE POLICY "Users can update own readings" ON readings
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own readings
CREATE POLICY "Users can delete own readings" ON readings
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for daily_cards
CREATE POLICY "Users can view own daily cards" ON daily_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily cards" ON daily_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily cards" ON daily_cards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily cards" ON daily_cards
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for journal_entries
CREATE POLICY "Users can view own journal entries" ON journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Basic affirmations are public
CREATE POLICY "Basic affirmations are viewable by everyone" ON affirmations
  FOR SELECT USING (is_premium = false);

-- Premium affirmations require authentication
CREATE POLICY "Premium affirmations require auth" ON affirmations
  FOR SELECT USING (is_premium = false OR auth.role() = 'authenticated');

-- Users can only view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);
