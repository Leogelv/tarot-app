-- Script to insert tarot card data from the combined JSON file
-- This script should be run after the schema is created

-- Function to insert cards from JSON data
CREATE OR REPLACE FUNCTION insert_cards_from_json()
RETURNS void AS $$
DECLARE
    card_data json;
    card_record record;
BEGIN
    -- Read the JSON file with card data
    -- Note: In Supabase, you would upload the JSON file and then use it here
    -- For this demo, we'll use a placeholder and you'll need to upload the actual data
    FOR card_record IN 
        SELECT * FROM json_array_elements(
            (SELECT content::json->'cards' FROM storage.objects 
             WHERE name = 'combined_tarot_data.json' LIMIT 1)
        )
    LOOP
        card_data := card_record.value;
        
        INSERT INTO cards (
            name,
            number,
            arcana,
            suit,
            image,
            fortune_telling,
            keywords,
            meanings,
            modern_interpretation,
            affirmation
        ) VALUES (
            card_data->>'name',
            card_data->>'number',
            card_data->>'arcana',
            card_data->>'suit',
            card_data->>'image',
            COALESCE((card_data->'fortune_telling')::jsonb, '[]'::jsonb),
            COALESCE((card_data->'keywords')::jsonb, '[]'::jsonb),
            COALESCE((card_data->'meanings')::jsonb, '{}'::jsonb),
            card_data->>'modern_interpretation',
            card_data->>'affirmation'
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Instructions for importing the data:
-- 1. Upload the combined_tarot_data.json file to Supabase storage
-- 2. Run the insert_cards_from_json() function

-- Alternative direct insert method for demo purposes
-- This inserts a few sample cards directly

-- Insert Major Arcana cards (sample)
INSERT INTO cards (name, number, arcana, suit, image, fortune_telling, keywords, meanings, modern_interpretation, affirmation) VALUES
(
  'The Fool',
  '0',
  'Major Arcana',
  NULL,
  'm00.jpg',
  '["Watch for new projects and new beginnings", "Prepare to take something on faith", "Something new comes your way; go for it"]',
  '["freedom", "faith", "inexperience", "innocence"]',
  '{
    "light": ["Freeing yourself from limitation", "Expressing joy and youthful vigor", "Being open-minded", "Taking a leap of faith"],
    "shadow": ["Being gullible and naive", "Taking unnecessary risks", "Failing to be serious when required"]
  }',
  'This card represents freeing yourself from limitation, expressing joy, and being open-minded.',
  'I embrace freedom and welcome its energy into my life.'
),
(
  'The Magician',
  '1',
  'Major Arcana',
  NULL,
  'm01.jpg',
  '["A powerful man may play a role in your day", "Your current situation must be seen as one element of a much larger plan"]',
  '["capability", "empowerment", "activity"]',
  '{
    "light": ["Taking appropriate action", "Receiving guidance from a higher power", "Becoming a channel of divine will"],
    "shadow": ["Inflating your own ego", "Abusing talents", "Manipulating or deceiving others"]
  }',
  'This card represents taking appropriate action, receiving guidance, and becoming a channel of divine will.',
  'I embrace capability and welcome its energy into my life.'
),
(
  'The High Priestess',
  '2',
  'Major Arcana',
  NULL,
  'm02.jpg',
  '["A mysterious woman arrives", "A sexual secret may surface", "Someone knows more than he or she will reveal"]',
  '["intuition", "reflection", "purity", "initiation"]',
  '{
    "light": ["Listening to your feelings and intuitions", "Exploring unconventional spirituality", "Keeping secrets"],
    "shadow": ["Being aloof", "Obsessing on secrets and conspiracies", "Rejecting guidance from spirit or intuition"]
  }',
  'This card represents listening to your intuition, exploring spirituality, and keeping secrets.',
  'I embrace intuition and welcome its energy into my life.'
);

-- Insert Minor Arcana cards (sample)
INSERT INTO cards (name, number, arcana, suit, image, fortune_telling, keywords, meanings, modern_interpretation, affirmation) VALUES
(
  'Ace of Cups',
  '1',
  'Minor Arcana',
  'Cups',
  'c01.jpg',
  '["Romance is in the cards", "A new relationship or marriage is just around the corner", "Prayers are answered"]',
  '["intuition", "spirituality", "affection", "motivation"]',
  '{
    "light": ["Trusting your feelings", "Opening yourself to spirit", "Accepting and returning affection", "Getting in touch with what motivates you"],
    "shadow": ["Hiding your feelings", "Spurning an opportunity to love", "Numbing yourself to spiritual yearnings", "Rejecting the counsel of your heart"]
  }',
  'This card represents trusting your feelings, opening yourself to spirit, and accepting affection.',
  'I embrace intuition and welcome its energy into my life.'
),
(
  'Two of Pentacles',
  '2',
  'Minor Arcana',
  'Pentacles',
  'p02.jpg',
  '["It''s time to balance the budget", "Avoid the temptation to spend critical funds on frivolous goods"]',
  '["balance", "flexibility", "management", "decision"]',
  '{
    "light": ["Maintaining your balance", "Juggling resources to meet demands", "Making the best of a bad situation", "Weighing options"],
    "shadow": ["Robbing Peter to pay Paul", "Failing to honor your obligations", "Playing favorites", "Taking on too much at once"]
  }',
  'This card represents maintaining your balance, juggling resources, and making the best of a situation.',
  'I embrace balance and welcome its energy into my life.'
);

-- Insert sample affirmations
INSERT INTO affirmations (card_id, content, is_premium) VALUES
((SELECT id FROM cards WHERE name = 'The Fool' LIMIT 1), 'I embrace new beginnings with an open heart and mind.', false),
((SELECT id FROM cards WHERE name = 'The Fool' LIMIT 1), 'I trust in the universe to guide my journey.', false),
((SELECT id FROM cards WHERE name = 'The Magician' LIMIT 1), 'I have all the tools I need to manifest my desires.', false),
((SELECT id FROM cards WHERE name = 'The Magician' LIMIT 1), 'I am a powerful creator of my own reality.', true),
((SELECT id FROM cards WHERE name = 'The High Priestess' LIMIT 1), 'I trust my intuition and inner wisdom.', false),
((SELECT id FROM cards WHERE name = 'The High Priestess' LIMIT 1), 'I honor the mysteries of life and the unknown.', true),
((SELECT id FROM cards WHERE name = 'Ace of Cups' LIMIT 1), 'I am open to receiving and giving love freely.', false),
((SELECT id FROM cards WHERE name = 'Ace of Cups' LIMIT 1), 'My heart is a vessel for compassion and emotional abundance.', true),
((SELECT id FROM cards WHERE name = 'Two of Pentacles' LIMIT 1), 'I maintain balance in all areas of my life with grace.', false),
((SELECT id FROM cards WHERE name = 'Two of Pentacles' LIMIT 1), 'I adapt to change with flexibility and resilience.', true);
