import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';

const AudioReactiveComponent = ({
  children,
  style,
  audioFile,
  sensitivity = 1,
  autoPlay = false,
  loop = true,
  visualizerType = 'pulse', // 'pulse', 'wave', 'particles', 'glow'
  onAudioLoad,
  onAudioError
}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState(null);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Load audio when component mounts
  useEffect(() => {
    loadAudio();
    
    return () => {
      // Unload audio when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioFile]);
  
  // Start playing if autoPlay is true
  useEffect(() => {
    if (autoPlay && sound) {
      playAudio();
    }
  }, [sound, autoPlay]);
  
  // Load audio file
  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false, isLooping: loop },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      
      if (onAudioLoad) {
        onAudioLoad(newSound);
      }
    } catch (error) {
      console.error('Failed to load audio:', error);
      
      if (onAudioError) {
        onAudioError(error);
      }
    }
  };
  
  // Play audio
  const playAudio = async () => {
    if (sound) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };
  
  // Pause audio
  const pauseAudio = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error('Failed to pause audio:', error);
      }
    }
  };
  
  // Toggle audio playback
  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  // Monitor playback status
  const onPlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      // Simulate audio data for visualization
      // In a real app, you would use audio analysis libraries
      const volume = Math.random() * sensitivity;
      const frequency = Math.random() * sensitivity;
      
      setAudioData({ volume, frequency });
      
      // Trigger animations based on audio data
      animateVisualizer({ volume, frequency });
    }
    
    setIsPlaying(status.isPlaying);
  };
  
  // Animate visualizer based on audio data
  const animateVisualizer = (data) => {
    const { volume, frequency } = data;
    
    switch (visualizerType) {
      case 'pulse':
        animatePulse(volume);
        break;
      case 'wave':
        animateWave(frequency);
        break;
      case 'glow':
        animateGlow(volume);
        break;
      default:
        animatePulse(volume);
    }
  };
  
  // Pulse animation
  const animatePulse = (intensity) => {
    Animated.timing(pulseAnim, {
      toValue: 1 + (intensity * 0.2),
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start(() => {
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease)
      }).start();
    });
  };
  
  // Wave animation
  const animateWave = (intensity) => {
    Animated.timing(waveAnim, {
      toValue: intensity,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin)
    }).start(() => {
      Animated.timing(waveAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.sin)
      }).start();
    });
  };
  
  // Glow animation
  const animateGlow = (intensity) => {
    Animated.timing(glowAnim, {
      toValue: intensity,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease)
    }).start(() => {
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.ease)
      }).start();
    });
  };
  
  // Get animation style based on visualizer type
  const getAnimationStyle = () => {
    switch (visualizerType) {
      case 'pulse':
        return {
          transform: [{ scale: pulseAnim }]
        };
      case 'wave':
        return {
          transform: [
            { translateY: waveAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10 * sensitivity]
              })
            }
          ]
        };
      case 'glow':
        return {
          shadowOpacity: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 0.8]
          }),
          shadowRadius: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 20]
          })
        };
      default:
        return {
          transform: [{ scale: pulseAnim }]
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
      onTouchEnd={toggleAudio}
    >
      {children}
      
      {visualizerType === 'particles' && audioData && (
        <View style={styles.particlesContainer}>
          {/* Render particles based on audio data */}
          {Array.from({ length: Math.floor(audioData.volume * 10) }).map((_, index) => (
            <View 
              key={index}
              style={[
                styles.particle,
                {
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: 2 + (audioData.volume * 3),
                  height: 2 + (audioData.volume * 3),
                  opacity: 0.3 + (audioData.volume * 0.5)
                }
              ]}
            />
          ))}
        </View>
      )}
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
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#9B59B6',
    borderRadius: 50,
  },
});

export default AudioReactiveComponent;
