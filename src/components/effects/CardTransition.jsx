import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Компонент 3D карты
const Card3D = ({ textureUrl, isHovered }) => {
  const meshRef = useRef();
  const texture = useTexture(textureUrl);
  
  // Анимация карты
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      if (isHovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.sin(time * 0.5) * 0.2,
          0.1
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          Math.sin(time) * 0.1,
          0.1
        );
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.sin(time * 0.3) * 0.1,
          0.05
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          Math.sin(time * 0.5) * 0.05,
          0.05
        );
      }
    }
  });

  // Материал с эффектом свечения
  const cardMaterial = (
    <meshPhysicalMaterial 
      map={texture}
      roughness={0.2}
      metalness={0.1}
      clearcoat={0.8}
      clearcoatRoughness={0.2}
      side={THREE.DoubleSide}
      emissive={new THREE.Color(0x6a00ff)}
      emissiveIntensity={isHovered ? 0.3 : 0.1}
      envMapIntensity={1.2}
    />
  );

  return (
    <mesh 
      ref={meshRef}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[0.7, 1.05, 32, 32]} />
      {cardMaterial}
    </mesh>
  );
};

// Главный компонент анимации перехода
const CardTransition = ({ cardImageUrl, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <CardCanvas
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $isActive={isActive}
    >
      <Canvas shadows camera={{ position: [0, 0, 2], fov: 45 }}>
        <color attach="background" args={['#0a0a14']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[3, 3, 3]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <spotLight position={[-3, -3, -3]} angle={0.15} penumbra={1} intensity={0.4} color="#9c6dec" />
        
        <PresentationControls
          global
          config={{ mass: 1, tension: 400, friction: 26 }}
          snap={{ mass: 2, tension: 400 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Card3D 
            textureUrl={cardImageUrl || 'https://www.trustedtarot.com/img/cards/card-back.png'} 
            isHovered={isHovered}
          />
        </PresentationControls>
        
        <Environment preset="night" />
      </Canvas>
    </CardCanvas>
  );
};

// Стили
const CardCanvas = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  touch-action: none;
  background: transparent;
  transform-style: preserve-3d;
  box-shadow: ${props => props.$isActive 
    ? '0 20px 40px rgba(106, 0, 255, 0.3), 0 0 20px rgba(106, 0, 255, 0.2)' 
    : '0 10px 30px rgba(0, 0, 0, 0.15)'};
  transition: box-shadow 0.3s ease;
  
  canvas {
    touch-action: none;
  }
`;

export default CardTransition; 