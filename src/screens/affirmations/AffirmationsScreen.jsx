import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setAffirmations } from '../../store/slices/tarotSlice';
import { getAffirmations } from '../../services/supabase/supabaseClient';
import Button from '../../components/common/Button';
import AudioReactiveComponent from '../../components/animations/AudioReactiveComponent';

const AffirmationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'daily', 'cards'
  const [selectedAffirmation, setSelectedAffirmation] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const dispatch = useDispatch();
  const affirmations = useSelector(state => state.tarot.affirmations);
  const isSubscribed = useSelector(state => state.auth.isSubscribed);
  
  // Sample affirmations data for demo
  const sampleAffirmations = [
    {
      id: '1',
      text: "I embrace freedom and welcome its energy into my life.",
      category: "card",
      card_id: '0',
      card_name: "The Fool",
      is_premium: false
    },
    {
      id: '2',
      text: "I have the power to create my reality.",
      category: "card",
      card_id: '1',
      card_name: "The Magician",
      is_premium: false
    },
    {
      id: '3',
      text: "I trust my intuition and inner knowing.",
      category: "card",
      card_id: '2',
      card_name: "The High Priestess",
      is_premium: false
    },
    {
      id: '4',
      text: "I nurture my creative potential and embrace abundance.",
      category: "card",
      card_id: '3',
      card_name: "The Empress",
      is_premium: false
    },
    {
      id: '5',
      text: "I create structure and stability in my life.",
      category: "card",
      card_id: '4',
      card_name: "The Emperor",
      is_premium: false
    },
    {
      id: '6',
      text: "Today, I open myself to new possibilities and trust the journey.",
      category: "daily",
      is_premium: false
    },
    {
      id: '7',
      text: "I am worthy of love, success, and all good things.",
      category: "daily",
      is_premium: false
    },
    {
      id: '8',
      text: "I release what no longer serves me and welcome positive change.",
      category: "daily",
      is_premium: false
    },
    {
      id: '9',
      text: "My intuition guides me to make wise decisions.",
      category: "daily",
      is_premium: false
    },
    {
      id: '10',
      text: "I am connected to the universal wisdom that flows through all things.",
      category: "daily",
      is_premium: true
    }
  ];
  
  useEffect(() => {
    fetchAffirmations();
  }, []);
  
  const fetchAffirmations = async () => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, we would fetch from Supabase
      // const { data, error } = await getAffirmations(isSubscribed);
      
      // if (error) {
      //   throw error;
      // }
      
      // For demo purposes, use sample data
      dispatch(setAffirmations(sampleAffirmations));
      setTimeout(() => setLoading(false), 500); // Simulate loading
    } catch (err) {
      console.error('Error fetching affirmations:', err);
      setError('Failed to load affirmations. Please try again.');
      setLoading(false);
    }
  };
  
  const handleAffirmationSelect = (affirmation) => {
    if (affirmation.is_premium && !isSubscribed) {
      // Show upgrade prompt
      navigation.navigate('UpgradePrompt', { returnTo: 'Affirmations' });
    } else {
      setSelectedAffirmation(affirmation);
    }
  };
  
  const getFilteredAffirmations = () => {
    if (filter === 'all') {
      return affirmations;
    } else if (filter === 'daily') {
      return affirmations.filter(affirmation => affirmation.category === 'daily');
    } else if (filter === 'cards') {
      return affirmations.filter(affirmation => affirmation.category === 'card');
    }
    return affirmations;
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const renderAffirmationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.affirmationItem,
        selectedAffirmation?.id === item.id && styles.selectedAffirmationItem,
        item.is_premium && !isSubscribed && styles.premiumAffirmationItem
      ]}
      onPress={() => handleAffirmationSelect(item)}
      disabled={item.is_premium && !isSubscribed}
    >
      <Text style={[
        styles.affirmationText,
        selectedAffirmation?.id === item.id && styles.selectedAffirmationText,
        item.is_premium && !isSubscribed && styles.premiumAffirmationText
      ]}>
        {item.text}
      </Text>
      
      {item.card_name && (
        <Text style={styles.cardName}>
          {item.card_name}
        </Text>
      )}
      
      {item.is_premium && !isSubscribed && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Affirmations</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'daily' && styles.filterButtonActive]}
          onPress={() => setFilter('daily')}
        >
          <Text style={[styles.filterText, filter === 'daily' && styles.filterTextActive]}>Daily</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'cards' && styles.filterButtonActive]}
          onPress={() => setFilter('cards')}
        >
          <Text style={[styles.filterText, filter === 'cards' && styles.filterTextActive]}>Card-Based</Text>
        </TouchableOpacity>
      </View>
      
      {selectedAffirmation && (
        <View style={styles.selectedContainer}>
          {audioEnabled ? (
            <AudioReactiveComponent 
              audioFile="../../assets/audio/effects/gentle_chime.mp3"
              sensitivity={1.5}
              autoPlay={true}
              loop={true}
              visualizerType="pulse"
              style={styles.audioContainer}
            >
              <Text style={styles.selectedAffirmationLarge}>
                {selectedAffirmation.text}
              </Text>
            </AudioReactiveComponent>
          ) : (
            <Text style={styles.selectedAffirmationLarge}>
              {selectedAffirmation.text}
            </Text>
          )}
          
          <View style={styles.selectedActions}>
            <Button 
              title={audioEnabled ? "Disable Audio" : "Enable Audio"} 
              onPress={toggleAudio} 
              type="outline"
              size="small"
              style={styles.audioButton}
            />
            <Button 
              title="Add to Journal" 
              onPress={() => navigation.navigate('Journal', {
                screen: 'JournalEntry',
                params: {
                  affirmationId: selectedAffirmation.id
                }
              })} 
              type="secondary"
              size="small"
              style={styles.journalButton}
            />
          </View>
        </View>
      )}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading affirmations...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Try Again" onPress={fetchAffirmations} type="secondary" />
        </View>
      ) : (
        <FlatList
          data={getFilteredAffirmations()}
          renderItem={renderAffirmationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.affirmationsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No affirmations found</Text>
            </View>
          }
        />
      )}
      
      {!isSubscribed && (
        <View style={styles.upgradeContainer}>
          <Text style={styles.upgradeText}>Unlock all premium affirmations</Text>
          <Button 
            title="Upgrade to Premium" 
            onPress={() => navigation.navigate('UpgradePrompt', { returnTo: 'Affirmations' })}
            type="primary"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginTop: 40,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F0E6D2',
  },
  filterButtonActive: {
    backgroundColor: '#9B59B6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B59B6',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  selectedContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#9B59B6',
    alignItems: 'center',
  },
  audioContainer: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  selectedAffirmationLarge: {
    fontSize: 20,
    fontWeight: '500',
    color: '#9B59B6',
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  selectedActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  audioButton: {
    marginRight: 10,
  },
  journalButton: {
    marginLeft: 10,
  },
  affirmationsList: {
    paddingBottom: 100,
  },
  affirmationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  selectedAffirmationItem: {
    borderColor: '#9B59B6',
    backgroundColor: 'rgba(155, 89, 182, 0.05)',
  },
  premiumAffirmationItem: {
    opacity: 0.7,
  },
  affirmationText: {
    fontSize: 16,
    color: '#4A4A4A',
    fontStyle: 'italic',
    marginBottom: 5,
    lineHeight: 22,
  },
  selectedAffirmationText: {
    color: '#9B59B6',
    fontWeight: '500',
  },
  premiumAffirmationText: {
    color: '#8E8E93',
  },
  cardName: {
    fontSize: 14,
    color: '#8E44AD',
    fontWeight: '500',
  },
  premiumBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F0E6D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 12,
    color: '#9B59B6',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#9B59B6',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  upgradeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0D4C0',
    alignItems: 'center',
  },
  upgradeText: {
    fontSize: 16,
    color: '#9B59B6',
    marginBottom: 10,
  },
});

export default AffirmationsScreen;
