import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Компонент одной карты
const Card = ({ position, rotation, scale, textureUrl, onClick, index, totalCards, isSelected }) => {
  const meshRef = useRef();
  const texture = useTexture(textureUrl);
  
  // Анимация карт в колоде
  useFrame((state) => {
    if (!isSelected) {
      // Добавляем плавное колебание с более реалистичными параметрами
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.1 + index * 0.05) * 0.02;
      meshRef.current.rotation.y = Math.cos(time * 0.15 + index * 0.05) * 0.02;
      
      // Если это верхняя карта, делаем ее немного анимированной
      if (index === totalCards - 1) {
        meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.04;
      }
    }
  });

  // Создаем материал с эффектом свечения по краям
  const cardMaterial = (
    <meshPhysicalMaterial 
      map={texture} 
      roughness={0.2}
      metalness={0.1}
      clearcoat={0.8}
      clearcoatRoughness={0.2}
      side={THREE.DoubleSide}
      color={isSelected ? "#ffffff" : "#f0f0f0"}
      emissive={isSelected ? new THREE.Color(0x6a00ff) : new THREE.Color(0x000000)}
      emissiveIntensity={isSelected ? 0.2 : 0}
      envMapIntensity={1.2}
    />
  );

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[1, 1.5, 32, 32]} />
      {cardMaterial}
    </mesh>
  );
};

// Компонент колоды карт
const CardDeck = ({ cardCount = 30, onSelectCard, cardTexture }) => {
  const deckRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Анимация всей колоды
  useFrame((state) => {
    if (deckRef.current && !selectedCard) {
      const time = state.clock.getElapsedTime();
      deckRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
      deckRef.current.rotation.x = Math.cos(time * 0.15) * 0.08;
      
      // Добавляем плавное колебание вверх-вниз
      deckRef.current.position.y = Math.sin(time * 0.3) * 0.05;
    }
  });
  
  // Обработчик выбора карты
  const handleCardClick = (index) => {
    if (selectedCard === null) {
      setSelectedCard(index);
      
      // Вызываем функцию обратного вызова после небольшой задержки для анимации
      setTimeout(() => {
        if (onSelectCard) onSelectCard();
      }, 1500);
    }
  };
  
  return (
    <group 
      ref={deckRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {Array.from({ length: cardCount }).map((_, index) => {
        // Расположение карт в колоде (смещение)
        const isTop = index === cardCount - 1;
        
        // Если карта выбрана, анимируем ее положение
        let position = [0, index * 0.005, 0];
        let rotation = [0, 0, 0];
        let scale = [1, 1, 1];
        
        // Добавляем легкую вариацию положения для более реалистичной колоды
        if (!selectedCard) {
          const variance = 0.0008; // Небольшая случайная вариация
          position = [
            (Math.random() - 0.5) * variance * index,
            index * 0.005,
            (Math.random() - 0.5) * variance * index
          ];
          rotation = [
            (Math.random() - 0.5) * 0.002 * index,
            (Math.random() - 0.5) * 0.002 * index,
            (Math.random() - 0.5) * 0.002 * index
          ];
        }
        
        // Если это выбранная карта, выдвигаем ее вперед
        if (selectedCard === index) {
          position = [0, 0.5, 1.5];
          rotation = [0, 0, 0];
          scale = [1.5, 1.5, 1.5];
        } 
        // Если какая-то карта выбрана, но не эта, скрываем остальные
        else if (selectedCard !== null) {
          position = [2 * (index % 2 === 0 ? -1 : 1), -0.5, -1];
          rotation = [0.5 * Math.random(), 0.5 * Math.random(), 0.5 * Math.random()];
          scale = [0.8, 0.8, 0.8];
        }
        
        return (
          <Card
            key={index}
            index={index}
            position={position}
            rotation={rotation}
            scale={scale}
            textureUrl={cardTexture || 'https://www.trustedtarot.com/img/cards/card-back.png'}
            onClick={() => isTop && handleCardClick(index)}
            isSelected={selectedCard === index}
            totalCards={cardCount}
          />
        );
      })}
    </group>
  );
};

// Главный компонент с обверткой Canvas
const DeckOfCards = ({ onSelectCard, cardTexture }) => {
  return (
    <DeckWrapper 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#0a0a14']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.4} color="#9c6dec" />
        <fog attach="fog" args={['#0a0a14', 3, 10]} />
        
        <PresentationControls
          global
          config={{ mass: 1, tension: 400, friction: 30 }}
          snap={{ mass: 2, tension: 400 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <CardDeck 
            cardCount={30} 
            onSelectCard={onSelectCard}
            cardTexture={cardTexture}
          />
        </PresentationControls>
        
        <Environment preset="night" />
      </Canvas>
    </DeckWrapper>
  );
};

// Стили
const DeckWrapper = styled(motion.div)`
  width: 100%;
  height: 60vh;
  background: transparent;
  touch-action: none;
  margin-bottom: 2rem;
  border-radius: var(--radius);
  overflow: hidden;
  
  canvas {
    touch-action: none;
  }
  
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

export default DeckOfCards; 