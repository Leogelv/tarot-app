import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styled from 'styled-components';

// Компонент 3D-карты с анимацией
const Card3D = ({ imageUrl, onAnimationComplete }) => {
  const cardRef = useRef();
  const { viewport } = useThree();
  
  // Состояния для анимации
  const [phase, setPhase] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0.05);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState([0, 0, 0]);
  
  // Текстура карты
  const texture = new THREE.TextureLoader().load(imageUrl);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  
  // Создаем эффекты на основе времени
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (!cardRef.current) return;
    
    // Фаза 0: Карта появляется в центре и начинает вращаться
    if (phase === 0) {
      cardRef.current.rotation.y = t * rotationSpeed;
      cardRef.current.position.y = Math.sin(t * 2) * 0.1;
      
      if (t > 1.5) {
        setPhase(1);
        setRotationSpeed(0.2);
      }
    } 
    // Фаза 1: Карта ускоряется и начинает светиться
    else if (phase === 1) {
      cardRef.current.rotation.y = t * rotationSpeed;
      cardRef.current.position.y = Math.sin(t * 3) * 0.2;
      
      // Увеличиваем свечение карты
      if (cardRef.current.material) {
        cardRef.current.material.emissiveIntensity = 0.2 + Math.sin(t * 5) * 0.2;
      }
      
      if (t > 3) {
        setPhase(2);
        setRotationSpeed(0.8);
      }
    } 
    // Фаза 2: Карта быстро вращается и летит к экрану
    else if (phase === 2) {
      cardRef.current.rotation.y = t * rotationSpeed;
      cardRef.current.position.z = -3 + t * 1.5;
      
      // Постепенно увеличиваем карту
      setScale(1 + (t * 0.3));
      
      if (t > 5) {
        setPhase(3);
      }
    } 
    // Фаза 3: Финальная анимация и переход к следующему компоненту
    else if (phase === 3) {
      cardRef.current.rotation.y = t * 0.1;
      cardRef.current.position.z = 5;
      
      if (t > 6) {
        // Сигнализируем о завершении анимации
        onAnimationComplete();
      }
    }
  });
  
  return (
    <mesh ref={cardRef} scale={[scale * 2, scale * 3, 0.01]} position={position}>
      <planeGeometry />
      <meshStandardMaterial 
        map={texture} 
        emissive="#ffffff"
        emissiveIntensity={0.2}
        metalness={0.5}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Эффекты частиц и энергии вокруг карты
const CardEffects = () => {
  const particlesRef = useRef();
  const particlesCount = 150;
  const particlePositions = new Float32Array(particlesCount * 3);
  
  // Инициализация частиц
  useEffect(() => {
    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
    }
    
    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );
    }
  }, []);
  
  // Анимация частиц
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        
        // Движение частиц вокруг карты
        positions.array[ix] += Math.sin(t + i * 0.1) * 0.01;
        positions.array[iy] += Math.cos(t + i * 0.1) * 0.01;
        positions.array[iz] += (Math.sin(t * 0.5 + i) * 0.01);
        
        // Ограничиваем движение, чтобы частицы не улетали слишком далеко
        if (Math.abs(positions.array[ix]) > 10) positions.array[ix] *= -0.9;
        if (Math.abs(positions.array[iy]) > 10) positions.array[iy] *= -0.9;
        if (Math.abs(positions.array[iz]) > 10) positions.array[iz] *= -0.9;
      }
      
      positions.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.05} 
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Компонент сцены
const CardTransitionScene = ({ imageUrl, onAnimationComplete }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <CardEffects />
      <Card3D imageUrl={imageUrl} onAnimationComplete={onAnimationComplete} />
    </>
  );
};

// Основной компонент перехода
const CardTransition = ({ imageUrl, onTransitionComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleAnimationComplete = () => {
    setIsVisible(false);
    
    // Даем немного времени для анимации исчезновения
    setTimeout(() => {
      onTransitionComplete();
    }, 500);
  };
  
  return (
    <TransitionContainer 
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas>
        <CardTransitionScene 
          imageUrl={imageUrl}
          onAnimationComplete={handleAnimationComplete}
        />
      </Canvas>
    </TransitionContainer>
  );
};

const TransitionContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CardTransition; 