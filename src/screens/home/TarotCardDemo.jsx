import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const TarotCardDemo = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Sample card data
  const sampleCard = {
    name: "The Fool",
    number: "0",
    arcana: "Major Arcana",
    meanings: {
      light: [
        "Freeing yourself from limitation",
        "Expressing joy and youthful vigor",
        "Being open-minded",
        "Taking a leap of faith"
      ]
    },
    modern_interpretation: "This card represents new beginnings, taking a leap of faith, and embracing freedom.",
    affirmation: "I embrace new beginnings with joy and openness."
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handleFlip} activeOpacity={0.9}>
      <View style={[styles.card, isFlipped && styles.flippedCard]}>
        {isFlipped ? (
          <View style={styles.cardBack}>
            <Text style={styles.cardTitle}>{sampleCard.name}</Text>
            <Text style={styles.cardNumber}>{sampleCard.arcana} • {sampleCard.number}</Text>
            <Text style={styles.cardMeaning}>{sampleCard.modern_interpretation}</Text>
            <Text style={styles.cardAffirmation}>✨ {sampleCard.affirmation} ✨</Text>
          </View>
        ) : (
          <View style={styles.cardFront}>
            <Text style={styles.tapHint}>Tap to reveal</Text>
            <Image 
              source={{ uri: 'https://i.imgur.com/CbkRmjw.png' }}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: 200,
    height: 340,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  flippedCard: {
    backgroundColor: '#F5E9FF',
  },
  cardFront: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 240,
  },
  tapHint: {
    fontSize: 14,
    color: '#9B59B6',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardNumber: {
    fontSize: 12,
    color: '#8E44AD',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardMeaning: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  cardAffirmation: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9B59B6',
    textAlign: 'center',
    paddingHorizontal: 10,
  }
});

export default TarotCardDemo;
