import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addReading } from '../../store/slices/tarotSlice';
import { saveReading } from '../../services/supabase/supabaseClient';
import TarotCard from '../../components/cards/TarotCard';
import TarotCard3D from '../../components/3d/TarotCard3D';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AudioReactiveComponent from '../../components/animations/AudioReactiveComponent';

const ReadingResultScreen = ({ route, navigation }) => {
  const { spreadId } = route.params;
  const [spread, setSpread] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [use3D, setUse3D] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const dispatch = useDispatch();
  const spreads = useSelector(state => state.tarot.spreads);
  const allCards = useSelector(state => state.tarot.cards);
  const user = useSelector(state => state.auth.user);
  
  // Sample cards data for demo
  const sampleCards = [
    {
      id: '0',
      name: "The Fool",
      number: "0",
      arcana: "Major Arcana",
      suit: null,
      image: "m00.jpg",
      keywords: ["freedom", "faith", "inexperience", "innocence"],
      modern_interpretation: "This card represents freeing yourself from limitation, expressing joy, and being open-minded.",
      affirmation: "I embrace freedom and welcome its energy into my life."
    },
    {
      id: '1',
      name: "The Magician",
      number: "1",
      arcana: "Major Arcana",
      suit: null,
      image: "m01.jpg",
      keywords: ["power", "skill", "concentration", "action"],
      modern_interpretation: "This card represents tapping into your full potential, taking action, and manifesting your desires.",
      affirmation: "I have the power to create my reality."
    },
    {
      id: '2',
      name: "The High Priestess",
      number: "2",
      arcana: "Major Arcana",
      suit: null,
      image: "m02.jpg",
      keywords: ["intuition", "unconscious", "inner voice", "wisdom"],
      modern_interpretation: "This card represents connecting with your intuition, exploring the mysteries, and trusting your inner wisdom.",
      affirmation: "I trust my intuition and inner knowing."
    },
    {
      id: '3',
      name: "The Empress",
      number: "3",
      arcana: "Major Arcana",
      suit: null,
      image: "m03.jpg",
      keywords: ["fertility", "nurturing", "abundance", "sensuality"],
      modern_interpretation: "This card represents nurturing growth, embracing abundance, and connecting with nature.",
      affirmation: "I nurture my creative potential and embrace abundance."
    },
    {
      id: '4',
      name: "The Emperor",
      number: "4",
      arcana: "Major Arcana",
      suit: null,
      image: "m04.jpg",
      keywords: ["authority", "structure", "control", "leadership"],
      modern_interpretation: "This card represents establishing order, taking charge, and providing structure and stability.",
      affirmation: "I create structure and stability in my life."
    },
    {
      id: '5',
      name: "The Hierophant",
      number: "5",
      arcana: "Major Arcana",
      suit: null,
      image: "m05.jpg",
      keywords: ["tradition", "conformity", "morality", "ethics"],
      modern_interpretation: "This card represents connecting with tradition, seeking guidance, and exploring spiritual teachings.",
      affirmation: "I honor tradition while finding my own spiritual path."
    },
    {
      id: '6',
      name: "The Lovers",
      number: "6",
      arcana: "Major Arcana",
      suit: null,
      image: "m06.jpg",
      keywords: ["love", "harmony", "choices", "alignment"],
      modern_interpretation: "This card represents making important choices, finding harmony in relationships, and aligning with your values.",
      affirmation: "I choose love and alignment with my highest self."
    },
    {
      id: '7',
      name: "The Chariot",
      number: "7",
      arcana: "Major Arcana",
      suit: null,
      image: "m07.jpg",
      keywords: ["control", "willpower", "victory", "assertion"],
      modern_interpretation: "This card represents overcoming obstacles, harnessing your willpower, and moving forward with determination.",
      affirmation: "I overcome challenges and move forward with confidence."
    },
    {
      id: '8',
      name: "Strength",
      number: "8",
      arcana: "Major Arcana",
      suit: null,
      image: "m08.jpg",
      keywords: ["courage", "patience", "compassion", "soft control"],
      modern_interpretation: "This card represents finding inner strength, practicing patience, and responding with compassion.",
      affirmation: "I have the inner strength to face any challenge with grace."
    },
    {
      id: '9',
      name: "The Hermit",
      number: "9",
      arcana: "Major Arcana",
      suit: null,
      image: "m09.jpg",
      keywords: ["introspection", "solitude", "guidance", "reflection"],
      modern_interpretation: "This card represents seeking inner wisdom, taking time for reflection, and finding your own path.",
      affirmation: "I honor my need for solitude and inner reflection."
    }
  ];
  
  useEffect(() => {
    // Find the spread from Redux store
    const foundSpread = spreads.find(s => s.id === spreadId);
    if (foundSpread) {
      setSpread(foundSpread);
      
      // Generate random cards for the reading
      const numCards = foundSpread.layout.positions.length;
      const randomCards = [];
      
      for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * sampleCards.length);
        const position = foundSpread.layout.positions[i];
        
        randomCards.push({
          ...sampleCards[randomIndex],
          position: position.name,
          positionId: position.id,
          isReversed: Math.random() > 0.7 // 30% chance of reversed card
        });
      }
      
      setCards(randomCards);
    } else {
      setError('Spread not found');
    }
    setLoading(false);
  }, [spreadId, spreads]);
  
  const handleSaveReading = async () => {
    try {
      if (user && user.id !== 'demo-user') {
        // In a real app, we would save to Supabase
        const { data, error } = await saveReading(
          user.id,
          spreadId,
          cards.map(card => ({
            card_id: card.id,
            position: card.position,
            is_reversed: card.isReversed
          })),
          notes
        );
        
        if (error) {
          throw error;
        }
        
        dispatch(addReading(data));
      }
      
      // Show success message or navigate
      navigation.navigate('Journal', {
        screen: 'JournalEntry',
        params: {
          readingId: 'new',
          spreadName: spread.name,
          cards: cards
        }
      });
    } catch (err) {
      console.error('Error saving reading:', err);
      setError('Failed to save your reading. Please try again.');
    }
  };
  
  const handleCardSelect = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };
  
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const toggle3D = () => {
    setUse3D(!use3D);
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Preparing your reading...</Text>
      </View>
    );
  }
  
  if (error || !spread) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Spread not found'}</Text>
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()} 
          type="secondary"
        />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{spread.name}</Text>
          <View style={styles.headerRight} />
        </View>
        
        <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        
        <View style={styles.spreadLayout}>
          {cards.map((card, index) => (
            <View key={card.id} style={styles.cardPosition}>
              <Text style={styles.positionName}>{card.position}</Text>
              <Image 
                source={{ uri: card.image }}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={styles.cardName}>{card.name}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Reading Interpretation</Text>
        
        {cards.map((card) => (
          <View key={card.id} style={styles.interpretationCard}>
            <View style={styles.interpretationHeader}>
              <Text style={styles.interpretationPosition}>{card.position}:</Text>
              <Text style={styles.interpretationCardName}>{card.name}</Text>
            </View>
            <Text style={styles.interpretationText}>{card.modern_interpretation}</Text>
          </View>
        ))}
        
        <View style={styles.overallContainer}>
          <Text style={styles.overallTitle}>Overall Insight</Text>
          <Text style={styles.overallText}>
            This reading suggests a journey from innocence to wisdom, culminating in triumph. 
            You began with an open heart, are now in a period of introspection, and are heading 
            toward success through determination and focus.
          </Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.journalButton}
            onPress={() => navigation.navigate('Journal')}
          >
            <Text style={styles.journalButtonText}>Record in Journal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.newReadingButton}
            onPress={() => navigation.navigate('Spreads')}
          >
            <Text style={styles.newReadingButtonText}>New Reading</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#9B59B6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E44AD',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  dateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
  spreadLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  cardPosition: {
    alignItems: 'center',
  },
  positionName: {
    fontSize: 14,
    color: '#9B59B6',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardImage: {
    width: 80,
    height: 130,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  cardName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 15,
  },
  interpretationCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  interpretationHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  interpretationPosition: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginRight: 5,
  },
  interpretationCardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  interpretationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  overallContainer: {
    backgroundColor: '#F2E6FF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  overallText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  journalButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  journalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newReadingButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9B59B6',
  },
  newReadingButtonText: {
    color: '#9B59B6',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ReadingResultScreen;
