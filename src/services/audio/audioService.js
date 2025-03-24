import { Audio } from 'expo-av';

// Sound effect types
export const SOUND_TYPES = {
  CARD_FLIP: 'card_flip',
  CARD_DRAW: 'card_draw',
  CARD_SHUFFLE: 'card_shuffle',
  BUTTON_PRESS: 'button_press',
  NOTIFICATION: 'notification',
  TRANSITION: 'transition',
  MAGICAL_CHIME: 'magical_chime',
  GENTLE_CHIME: 'gentle_chime',
  AMBIENT: 'ambient',
};

// Sound file mapping
const SOUND_FILES = {
  [SOUND_TYPES.CARD_FLIP]: require('../../assets/audio/effects/card_flip.mp3'),
  [SOUND_TYPES.CARD_DRAW]: require('../../assets/audio/effects/card_draw.mp3'),
  [SOUND_TYPES.CARD_SHUFFLE]: require('../../assets/audio/effects/card_shuffle.mp3'),
  [SOUND_TYPES.BUTTON_PRESS]: require('../../assets/audio/effects/button_press.mp3'),
  [SOUND_TYPES.NOTIFICATION]: require('../../assets/audio/effects/notification.mp3'),
  [SOUND_TYPES.TRANSITION]: require('../../assets/audio/effects/transition.mp3'),
  [SOUND_TYPES.MAGICAL_CHIME]: require('../../assets/audio/effects/magical_chime.mp3'),
  [SOUND_TYPES.GENTLE_CHIME]: require('../../assets/audio/effects/gentle_chime.mp3'),
  [SOUND_TYPES.AMBIENT]: require('../../assets/audio/effects/ambient_mystical.mp3'),
};

// Sound instances cache
const soundInstances = {};

// Initialize audio system
export const initAudioSystem = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    
    console.log('Audio system initialized');
    return true;
  } catch (error) {
    console.error('Failed to initialize audio system:', error);
    return false;
  }
};

// Preload sounds for faster playback
export const preloadSounds = async (soundTypes = Object.values(SOUND_TYPES)) => {
  try {
    const loadPromises = soundTypes.map(async (type) => {
      if (SOUND_FILES[type]) {
        const { sound } = await Audio.Sound.createAsync(SOUND_FILES[type], { volume: 1 });
        soundInstances[type] = sound;
      }
    });
    
    await Promise.all(loadPromises);
    console.log('Sounds preloaded');
    return true;
  } catch (error) {
    console.error('Failed to preload sounds:', error);
    return false;
  }
};

// Play a sound effect
export const playSound = async (type, options = {}) => {
  try {
    const { volume = 1, loop = false, autoUnload = true } = options;
    
    // Check if sound is already loaded
    if (soundInstances[type]) {
      // Reset sound to beginning if it's already playing
      await soundInstances[type].stopAsync();
      await soundInstances[type].setPositionAsync(0);
      await soundInstances[type].setVolumeAsync(volume);
      await soundInstances[type].setIsLoopingAsync(loop);
      await soundInstances[type].playAsync();
    } else {
      // Load and play sound
      const { sound } = await Audio.Sound.createAsync(
        SOUND_FILES[type],
        { volume, isLooping: loop, shouldPlay: true }
      );
      
      // Store instance if not auto-unloading
      if (!autoUnload) {
        soundInstances[type] = sound;
      }
      
      // Set up unloading when finished if autoUnload is true
      if (autoUnload) {
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to play sound ${type}:`, error);
    return false;
  }
};

// Stop a sound effect
export const stopSound = async (type) => {
  try {
    if (soundInstances[type]) {
      await soundInstances[type].stopAsync();
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to stop sound ${type}:`, error);
    return false;
  }
};

// Unload a sound to free memory
export const unloadSound = async (type) => {
  try {
    if (soundInstances[type]) {
      await soundInstances[type].unloadAsync();
      delete soundInstances[type];
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to unload sound ${type}:`, error);
    return false;
  }
};

// Unload all sounds
export const unloadAllSounds = async () => {
  try {
    const unloadPromises = Object.values(soundInstances).map(sound => sound.unloadAsync());
    await Promise.all(unloadPromises);
    
    // Clear instances
    Object.keys(soundInstances).forEach(key => {
      delete soundInstances[key];
    });
    
    return true;
  } catch (error) {
    console.error('Failed to unload all sounds:', error);
    return false;
  }
};

// Get audio playback status
export const getAudioStatus = async (type) => {
  try {
    if (soundInstances[type]) {
      return await soundInstances[type].getStatusAsync();
    }
    return null;
  } catch (error) {
    console.error(`Failed to get audio status for ${type}:`, error);
    return null;
  }
};

// Set volume for a specific sound
export const setVolume = async (type, volume) => {
  try {
    if (soundInstances[type]) {
      await soundInstances[type].setVolumeAsync(volume);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to set volume for ${type}:`, error);
    return false;
  }
};

// Play ambient background music
export const playBackgroundMusic = async (volume = 0.3) => {
  try {
    await playSound(SOUND_TYPES.AMBIENT, { volume, loop: true, autoUnload: false });
    return true;
  } catch (error) {
    console.error('Failed to play background music:', error);
    return false;
  }
};

// Stop background music
export const stopBackgroundMusic = async () => {
  try {
    await stopSound(SOUND_TYPES.AMBIENT);
    return true;
  } catch (error) {
    console.error('Failed to stop background music:', error);
    return false;
  }
};
