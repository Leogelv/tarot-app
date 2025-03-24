import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { useRef, useState, useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const TarotCard = ({ card, onFlip, isFlipped = false, style }) => {
  const [flipped, setFlipped] = useState(isFlipped);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;

  // Set up pan responder for 3D rotation
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate rotation based on drag
        const { dx, dy } = gestureState;
        rotateY.setValue(dx / 10);
        rotateX.setValue(-dy / 10);
      },
      onPanResponderRelease: () => {
        // Reset rotation when released
        Animated.parallel([
          Animated.spring(rotateX, { toValue: 0, useNativeDriver: true }),
          Animated.spring(rotateY, { toValue: 0, useNativeDriver: true }),
        ]).start();
      },
    })
  ).current;

  // Handle card flip
  const handleFlip = () => {
    const newFlipped = !flipped;
    setFlipped(newFlipped);
    
    Animated.timing(flipAnim, {
      toValue: newFlipped ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      if (onFlip) onFlip(newFlipped);
    });
  };

  // Update flipped state if prop changes
  useEffect(() => {
    if (isFlipped !== flipped) {
      setFlipped(isFlipped);
      flipAnim.setValue(isFlipped ? 1 : 0);
    }
  }, [isFlipped]);

  // Calculate transforms for 3D effect
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  // 3D rotation transforms
  const rotateXTransform = rotateX.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
  });

  const rotateYTransform = rotateY.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      { perspective: 1000 },
      { rotateY: frontInterpolate },
      { rotateX: rotateXTransform },
      { rotateY: rotateYTransform },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      { perspective: 1000 },
      { rotateY: backInterpolate },
      { rotateX: rotateXTransform },
      { rotateY: rotateYTransform },
    ],
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, frontAnimatedStyle, styles.cardFront]}
        onTouchEnd={handleFlip}
      >
        {card && card.image ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>{card.name}</Text>
            <View style={styles.imageContainer}>
              {/* In a real app, we would use a proper image component */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Card Image</Text>
                <Text style={styles.imagePlaceholderSubtext}>{card.image}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.cardBack}>
            <Text style={styles.cardBackText}>Tarot</Text>
          </View>
        )}
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, backAnimatedStyle, styles.cardBack, styles.cardBackFace]}
        onTouchEnd={handleFlip}
      >
        {card ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{card.name}</Text>
            <Text style={styles.cardDescription}>{card.modern_interpretation}</Text>
            {card.keywords && card.keywords.length > 0 && (
              <View style={styles.keywordsContainer}>
                <Text style={styles.keywordsTitle}>Keywords:</Text>
                <Text style={styles.keywords}>{card.keywords.join(', ')}</Text>
              </View>
            )}
            {card.affirmation && (
              <View style={styles.affirmationContainer}>
                <Text style={styles.affirmationTitle}>Affirmation:</Text>
                <Text style={styles.affirmation}>{card.affirmation}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.cardBack}>
            <Text style={styles.cardBackText}>Tarot</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  cardBack: {
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8E44AD',
  },
  cardBackFace: {
    backgroundColor: '#FAF3E0',
  },
  cardBackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardContent: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0E6D2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#9B59B6',
    fontWeight: 'bold',
  },
  imagePlaceholderSubtext: {
    fontSize: 12,
    color: '#8E44AD',
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#9B59B6',
  },
  cardDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  keywordsContainer: {
    marginBottom: 15,
    width: '100%',
  },
  keywordsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#9B59B6',
  },
  keywords: {
    fontSize: 14,
    color: '#4A4A4A',
    fontStyle: 'italic',
  },
  affirmationContainer: {
    width: '100%',
    backgroundColor: '#F0E6D2',
    padding: 10,
    borderRadius: 8,
  },
  affirmationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#9B59B6',
  },
  affirmation: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4A4A4A',
  },
});

export default TarotCard;
