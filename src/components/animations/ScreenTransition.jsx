import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const ScreenTransition = ({ 
  children, 
  style, 
  transitionType = 'fade', // 'fade', 'slide', 'zoom', 'flip', 'magic'
  duration = 500,
  isVisible = true,
  onTransitionComplete
}) => {
  // Animation values
  const opacityAnim = useRef(new Animated.Value(isVisible ? 0 : 1)).current;
  const translateAnim = useRef(new Animated.Value(isVisible ? 100 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(isVisible ? 0.8 : 1)).current;
  const rotateAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current;
  const magicAnim = useRef(new Animated.Value(isVisible ? 0 : 1)).current;
  
  const { width, height } = Dimensions.get('window');
  
  // Run transition when visibility changes
  useEffect(() => {
    if (isVisible) {
      startEntryAnimation();
    } else {
      startExitAnimation();
    }
  }, [isVisible]);
  
  // Entry animation
  const startEntryAnimation = () => {
    // Reset animation values
    opacityAnim.setValue(0);
    translateAnim.setValue(100);
    scaleAnim.setValue(0.8);
    rotateAnim.setValue(1);
    magicAnim.setValue(0);
    
    // Create animation based on type
    let animation;
    
    switch (transitionType) {
      case 'fade':
        animation = Animated.timing(opacityAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        });
        break;
        
      case 'slide':
        animation = Animated.timing(translateAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        });
        break;
        
      case 'zoom':
        animation = Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5))
          })
        ]);
        break;
        
      case 'flip':
        animation = Animated.timing(rotateAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        });
        break;
        
      case 'magic':
        animation = Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
          }),
          Animated.timing(magicAnim, {
            toValue: 1,
            duration: duration * 1.5,
            useNativeDriver: true,
            easing: Easing.out(Easing.elastic(1))
          })
        ]);
        break;
        
      default:
        animation = Animated.timing(opacityAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        });
    }
    
    // Start animation
    animation.start(({ finished }) => {
      if (finished && onTransitionComplete) {
        onTransitionComplete(true);
      }
    });
  };
  
  // Exit animation
  const startExitAnimation = () => {
    // Create animation based on type
    let animation;
    
    switch (transitionType) {
      case 'fade':
        animation = Animated.timing(opacityAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease)
        });
        break;
        
      case 'slide':
        animation = Animated.timing(translateAnim, {
          toValue: -100,
          duration,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic)
        });
        break;
        
      case 'zoom':
        animation = Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease)
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic)
          })
        ]);
        break;
        
      case 'flip':
        animation = Animated.timing(rotateAnim, {
          toValue: -1,
          duration,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic)
        });
        break;
        
      case 'magic':
        animation = Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease)
          }),
          Animated.timing(magicAnim, {
            toValue: 0,
            duration: duration * 1.5,
            useNativeDriver: true,
            easing: Easing.in(Easing.elastic(1))
          })
        ]);
        break;
        
      default:
        animation = Animated.timing(opacityAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease)
        });
    }
    
    // Start animation
    animation.start(({ finished }) => {
      if (finished && onTransitionComplete) {
        onTransitionComplete(false);
      }
    });
  };
  
  // Get animation style based on transition type
  const getAnimationStyle = () => {
    switch (transitionType) {
      case 'fade':
        return {
          opacity: opacityAnim
        };
        
      case 'slide':
        return {
          opacity: translateAnim.interpolate({
            inputRange: [-100, 0, 100],
            outputRange: [0, 1, 0]
          }),
          transform: [
            { translateX: translateAnim.interpolate({
                inputRange: [-100, 0, 100],
                outputRange: [-width * 0.3, 0, width * 0.3]
              })
            }
          ]
        };
        
      case 'zoom':
        return {
          opacity: opacityAnim,
          transform: [
            { scale: scaleAnim }
          ]
        };
        
      case 'flip':
        return {
          opacity: rotateAnim.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            { perspective: 1000 },
            { rotateY: rotateAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: ['-180deg', '0deg', '180deg']
              })
            }
          ]
        };
        
      case 'magic':
        return {
          opacity: opacityAnim,
          transform: [
            { scale: magicAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 1.1, 1]
              })
            },
            { rotate: magicAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['-20deg', '10deg', '0deg']
              })
            }
          ]
        };
        
      default:
        return {
          opacity: opacityAnim
        };
    }
  };
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        getAnimationStyle(),
        style
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenTransition;
