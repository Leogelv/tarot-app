import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sparkles } from '@react-three/drei';

// Floating symbols component
const FloatingSymbols = () => {
  const { viewport } = useThree();
  const sparklesRef = useRef();
  
  useFrame(({ clock }) => {
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Sparkles
      ref={sparklesRef}
      count={50}
      scale={[viewport.width * 1.2, viewport.height * 1.2, 10]}
      size={4}
      speed={0.3}
      color="#9b59d9"
      opacity={0.5}
    />
  );
};

// Background card component
const BackgroundCard = ({ position, rotation, scale }) => {
  const meshRef = useRef();
  const texture = useTexture('/images/cards/m00.jpg');
  
  // Card animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2 + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1.5]} />
      <meshBasicMaterial map={texture} transparent opacity={0.15} />
    </mesh>
  );
};

// Animated background that follows mouse movement
const AnimatedBackground = () => {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // React to mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (groupRef.current) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        groupRef.current.rotation.x = y * 0.1;
        groupRef.current.rotation.y = x * 0.1;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Slow continuous rotation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  // Create cards at different positions
  const cards = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 4 + Math.random() * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -5 - Math.random() * 5;
    const rotY = Math.random() * Math.PI;
    const scale = 1 + Math.random() * 0.5;
    
    cards.push(
      <BackgroundCard 
        key={i}
        position={[x, y, z]}
        rotation={[0, rotY, 0]}
        scale={scale}
      />
    );
  }

  return (
    <group ref={groupRef}>
      {cards}
      <FloatingSymbols />
      
      {/* Ambient light for the scene */}
      <ambientLight intensity={0.5} />
      
      {/* Colored point lights for mystical effect */}
      <pointLight position={[-10, 5, 10]} color="#9b59d9" intensity={2} />
      <pointLight position={[10, -5, -10]} color="#e63e6d" intensity={1.5} />
    </group>
  );
};

// Main component
const TarotBackground = () => {
  return (
    <BackgroundContainer>
      <BackgroundGradient />
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <AnimatedBackground />
      </Canvas>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    rgba(30, 30, 47, 0.5) 0%, 
    rgba(18, 18, 31, 0.7) 50%, 
    rgba(12, 12, 21, 0.9) 100%
  );
  z-index: 0;
`;

export default TarotBackground; 