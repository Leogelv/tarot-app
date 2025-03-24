import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei/native';
import { PanGestureHandler, RotationGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedGestureHandler, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Card model component
const CardModel = ({ 
  cardImage, 
  backImage, 
  isFlipped, 
  rotateX, 
  rotateY, 
  onFlipComplete 
}) => {
  const meshRef = useRef();
  const targetRotationY = useSharedValue(isFlipped ? Math.PI : 0);
  const currentRotationY = useSharedValue(isFlipped ? Math.PI : 0);
  const [flipping, setFlipping] = useState(false);
  
  // Load textures
  const frontTexture = useLoader(TextureLoader, cardImage);
  const backTexture = useLoader(TextureLoader, backImage);
  
  // Handle flip animation
  useEffect(() => {
    if (isFlipped !== (currentRotationY.value > Math.PI / 2)) {
      setFlipping(true);
      targetRotationY.value = isFlipped ? Math.PI : 0;
    }
  }, [isFlipped]);
  
  // Animation frame update
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Apply rotation from gesture
      meshRef.current.rotation.x = rotateX.value;
      
      // Handle flip animation
      if (flipping) {
        const step = delta * 3; // Adjust speed as needed
        const target = targetRotationY.value;
        const current = currentRotationY.value;
        
        if (Math.abs(current - target) < 0.01) {
          currentRotationY.value = target;
          setFlipping(false);
          if (onFlipComplete) {
            onFlipComplete();
          }
        } else {
          currentRotationY.value += (target - current) * step;
        }
      }
      
      // Apply Y rotation (combination of gesture and flip)
      meshRef.current.rotation.y = rotateY.value + currentRotationY.value;
      
      // Add subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[1.5, 2.25, 0.05]}>
      <boxGeometry args={[1, 1, 0.05]} />
      <meshStandardMaterial map={frontTexture} attachArray="material" />
      <meshStandardMaterial map={frontTexture} attachArray="material" />
      <meshStandardMaterial map={backTexture} attachArray="material" />
      <meshStandardMaterial map={backTexture} attachArray="material" />
      <meshStandardMaterial map={frontTexture} attachArray="material" />
      <meshStandardMaterial map={backTexture} attachArray="material" />
    </mesh>
  );
};

// Main 3D Tarot Card component
const TarotCard3D = ({ 
  card, 
  onFlip, 
  initiallyFlipped = false,
  style 
}) => {
  const [isFlipped, setIsFlipped] = useState(initiallyFlipped);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  
  // Front and back image paths
  const cardImagePath = card?.image 
    ? require('../assets/images/tarot/m00.jpg') // This would be dynamic in a real app
    : require('../assets/images/tarot/back.jpg');
  const backImagePath = require('../assets/images/tarot/back.jpg');
  
  // Handle pan gesture for rotation
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = rotateY.value;
      ctx.startY = rotateX.value;
    },
    onActive: (event, ctx) => {
      rotateY.value = ctx.startX + event.translationX / 100;
      rotateX.value = ctx.startY - event.translationY / 100;
    },
    onEnd: () => {
      rotateY.value = withSpring(0);
      rotateX.value = withSpring(0);
    },
  });
  
  // Handle tap for flipping
  const handleTap = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) {
      onFlip(!isFlipped);
    }
  };
  
  // Handle flip completion
  const handleFlipComplete = () => {
    // Additional actions after flip animation completes
  };
  
  return (
    <View style={[styles.container, style]}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={styles.canvas}>
          <Canvas style={styles.canvas} onTouchEnd={handleTap}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <CardModel 
              cardImage={cardImagePath}
              backImage={backImagePath}
              isFlipped={isFlipped}
              rotateX={rotateX}
              rotateY={rotateY}
              onFlipComplete={handleFlipComplete}
            />
          </Canvas>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: width * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default TarotCard3D;
