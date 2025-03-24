import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

// Fallback component when Three.js might not be available
const TarotCardFallback = ({ 
  card, 
  onFlip, 
  initiallyFlipped = false,
  style 
}) => {
  const [isFlipped, setIsFlipped] = useState(initiallyFlipped);
  
  // Animation values
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const flipProgress = useSharedValue(initiallyFlipped ? 1 : 0);
  const floatAnimation = useSharedValue(0);
  
  // Start floating animation
  useEffect(() => {
    floatAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1, // Infinite repetitions
      true // Reverse
    );
  }, []);
  
  // Handle pan gesture for rotation
  const onPanGestureEvent = ({ nativeEvent }) => {
    const { translationX, translationY } = nativeEvent;
    rotateY.value = withSpring(translationX / 20);
    rotateX.value = withSpring(-translationY / 20);
  };
  
  // Handle pan gesture end
  const onPanGestureEnd = () => {
    rotateY.value = withSpring(0);
    rotateX.value = withSpring(0);
  };
  
  // Handle flip
  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    flipProgress.value = withTiming(newFlipped ? 1 : 0, { duration: 800 });
    
    if (onFlip) {
      onFlip(newFlipped);
    }
  };
  
  // Animated styles
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateYValue = `${rotateY.value}deg`;
    const rotateXValue = `${rotateX.value}deg`;
    const flipRotate = `${flipProgress.value * 180}deg`;
    const translateY = floatAnimation.value * 5;
    
    return {
      transform: [
        { perspective: 1000 },
        { translateY },
        { rotateY: flipRotate },
        { rotateX: rotateXValue },
        { rotateY: rotateYValue },
      ],
      opacity: flipProgress.value > 0.5 ? 0 : 1,
      position: 'absolute',
      backfaceVisibility: 'hidden',
    };
  });
  
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateYValue = `${rotateY.value}deg`;
    const rotateXValue = `${rotateX.value}deg`;
    const flipRotate = `${180 - (flipProgress.value * 180)}deg`;
    const translateY = floatAnimation.value * 5;
    
    return {
      transform: [
        { perspective: 1000 },
        { translateY },
        { rotateY: flipRotate },
        { rotateX: rotateXValue },
        { rotateY: rotateYValue },
      ],
      opacity: flipProgress.value > 0.5 ? 1 : 0,
      position: 'absolute',
      backfaceVisibility: 'hidden',
    };
  });
  
  return (
    <View style={[styles.container, style]}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onEnded={onPanGestureEnd}
      >
        <Animated.View style={styles.cardContainer}>
          <TouchableOpacity activeOpacity={1} onPress={handleFlip}>
            {/* Front of card */}
            <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
              {card && card.image ? (
                <View style={styles.cardContent}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <View style={styles.imageContainer}>
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
            
            {/* Back of card */}
            <Animated.View style={[styles.card, styles.cardBackFace, backAnimatedStyle]}>
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
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
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
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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

export default TarotCardFallback;
