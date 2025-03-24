import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Image, Text } from 'react-native';
import { playSound, SOUND_TYPES } from '../../services/audio/audioService';

const MascotCharacter = ({
  style,
  size = 'medium', // 'small', 'medium', 'large'
  mood = 'happy', // 'happy', 'curious', 'sleepy', 'excited', 'thoughtful'
  animation = 'idle', // 'idle', 'talk', 'bounce', 'float', 'appear', 'disappear'
  autoAnimate = true,
  withSound = true,
  onAnimationComplete,
  message = '',
  messageStyle = {}
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(animation === 'appear' ? 0 : 1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(animation === 'appear' ? 0 : 1)).current;
  const messageOpacityAnim = useRef(new Animated.Value(message ? 0 : 1)).current;
  
  // Blinking state for talk animation
  const [blinking, setBlinking] = useState(false);
  
  // Mascot images based on mood
  const mascotImages = {
    happy: require('../../assets/images/mascot/mascot_happy.png'),
    curious: require('../../assets/images/mascot/mascot_curious.png'),
    sleepy: require('../../assets/images/mascot/mascot_sleepy.png'),
    excited: require('../../assets/images/mascot/mascot_excited.png'),
    thoughtful: require('../../assets/images/mascot/mascot_thoughtful.png')
  };
  
  // Get mascot size based on size prop
  const getMascotSize = () => {
    switch (size) {
      case 'small':
        return { width: 60, height: 60 };
      case 'medium':
        return { width: 100, height: 100 };
      case 'large':
        return { width: 150, height: 150 };
      default:
        return { width: 100, height: 100 };
    }
  };
  
  // Start animation when component mounts
  useEffect(() => {
    if (autoAnimate) {
      startAnimation();
    }
    
    // Show message if provided
    if (message) {
      Animated.timing(messageOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start();
    }
  }, []);
  
  // Update animation when animation prop changes
  useEffect(() => {
    if (autoAnimate) {
      startAnimation();
    }
  }, [animation]);
  
  // Start animation based on animation type
  const startAnimation = () => {
    // Reset animations
    if (animation !== 'appear') {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
    
    // Play sound if enabled
    if (withSound) {
      switch (animation) {
        case 'appear':
          playSound(SOUND_TYPES.MAGICAL_CHIME, { volume: 0.5 });
          break;
        case 'disappear':
          playSound(SOUND_TYPES.TRANSITION, { volume: 0.5 });
          break;
        case 'talk':
          playSound(SOUND_TYPES.NOTIFICATION, { volume: 0.3 });
          break;
        case 'bounce':
          playSound(SOUND_TYPES.BUTTON_PRESS, { volume: 0.3 });
          break;
      }
    }
    
    // Start animation based on type
    switch (animation) {
      case 'idle':
        startIdleAnimation();
        break;
      case 'talk':
        startTalkAnimation();
        break;
      case 'bounce':
        startBounceAnimation();
        break;
      case 'float':
        startFloatAnimation();
        break;
      case 'appear':
        startAppearAnimation();
        break;
      case 'disappear':
        startDisappearAnimation();
        break;
      default:
        startIdleAnimation();
    }
  };
  
  // Idle animation - gentle floating and slight rotation
  const startIdleAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          })
        ]),
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
      ])
    ).start();
  };
  
  // Talk animation - blinking and slight bouncing
  const startTalkAnimation = () => {
    // Start blinking
    setBlinking(true);
    
    // Bounce animation
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(2))
      })
    ]).start(({ finished }) => {
      if (finished) {
        // Stop blinking
        setBlinking(false);
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    });
  };
  
  // Bounce animation - energetic bouncing
  const startBounceAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(2))
      })
    ]).start(({ finished }) => {
      if (finished && onAnimationComplete) {
        onAnimationComplete();
      }
    });
  };
  
  // Float animation - smooth up and down movement
  const startFloatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
  };
  
  // Appear animation - scale and fade in
  const startAppearAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5))
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      })
    ]).start(({ finished }) => {
      if (finished) {
        // Transition to idle animation
        startIdleAnimation();
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    });
  };
  
  // Disappear animation - scale and fade out
  const startDisappearAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.in(Easing.back(1.5))
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease)
      })
    ]).start(({ finished }) => {
      if (finished && onAnimationComplete) {
        onAnimationComplete();
      }
    });
  };
  
  // Get animation style
  const getAnimationStyle = () => {
    return {
      opacity: opacityAnim,
      transform: [
        { scale: scaleAnim },
        { translateY: Animated.add(
            bounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20]
            }),
            floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -10]
            })
          )
        },
        { rotate: rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-5deg', '5deg']
          })
        }
      ]
    };
  };
  
  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.mascotContainer, getAnimationStyle()]}>
        <Image
          source={mascotImages[mood] || mascotImages.happy}
          style={[styles.mascotImage, getMascotSize()]}
          resizeMode="contain"
        />
      </Animated.View>
      
      {message && (
        <Animated.View 
          style={[
            styles.messageContainer, 
            { opacity: messageOpacityAnim },
            messageStyle
          ]}
        >
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
          <View style={styles.messageArrow} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotImage: {
    width: 100,
    height: 100,
  },
  messageContainer: {
    position: 'absolute',
    top: -80,
    maxWidth: 200,
  },
  messageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  messageText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  messageArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
  },
});

export default MascotCharacter;
