import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { playSound, SOUND_TYPES } from '../../services/audio/audioService';

const AnimatedCard = ({ 
  children, 
  style, 
  onPress, 
  animationType = 'pulse', 
  intensity = 1,
  autoAnimate = true,
  playSound = true,
  soundType = SOUND_TYPES.CARD_FLIP
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Start animations when component mounts
  useEffect(() => {
    if (autoAnimate) {
      startAnimation();
    }
  }, []);
  
  // Handle different animation types
  const startAnimation = () => {
    switch (animationType) {
      case 'pulse':
        startPulseAnimation();
        break;
      case 'float':
        startFloatAnimation();
        break;
      case 'glow':
        startGlowAnimation();
        break;
      case 'rotate':
        startRotateAnimation();
        break;
      case 'flip':
        startFlipAnimation();
        break;
      default:
        startPulseAnimation();
    }
    
    // Play sound effect if enabled
    if (playSound) {
      playSound(soundType, { volume: 0.7 });
    }
  };
  
  // Pulse animation
  const startPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1 + (0.05 * intensity),
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease)
      })
    ]).start(() => {
      if (autoAnimate) {
        // Restart animation with delay
        setTimeout(() => {
          startPulseAnimation();
        }, 2000);
      }
    });
  };
  
  // Float animation
  const startFloatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1 + (0.03 * intensity),
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
  };
  
  // Glow animation
  const startGlowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
  };
  
  // Rotate animation
  const startRotateAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
  };
  
  // Flip animation
  const startFlipAnimation = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };
  
  // Interpolate rotation for different animations
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: animationType === 'flip' ? ['0deg', '180deg'] : ['-5deg', '5deg']
  });
  
  // Interpolate shadow for glow effect
  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.5]
  });
  
  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 15]
  });
  
  // Combine animations based on type
  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      animationType === 'flip' ? { rotateY: rotation } : { rotate: rotation }
    ],
    shadowOpacity: animationType === 'glow' ? shadowOpacity : 0.2,
    shadowRadius: animationType === 'glow' ? shadowRadius : 5,
  };
  
  return (
    <Animated.View 
      style={[styles.container, animatedStyle, style]}
      onTouchEnd={() => {
        if (onPress) {
          onPress();
          startAnimation();
        }
      }}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default AnimatedCard;
