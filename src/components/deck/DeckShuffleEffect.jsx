import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, useTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

// Компонент одной карты
const TarotCard = ({ position, rotation, index, totalCards, onClick, backTexture, hoveredCard, cardId }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isHovered = hoveredCard === index;
  
  // Расчет позиции в колоде
  const positionInDeck = 1 - (index / totalCards);
  
  // Анимация карты с помощью react-spring
  const { cardPosition, cardRotation, cardScale } = useSpring({
    cardPosition: isHovered 
      ? [position[0], position[1] + 0.5, position[2] + 2] 
      : [position[0], position[1] + positionInDeck * 0.1, position[2] + positionInDeck * 0.05],
    cardRotation: isHovered 
      ? [rotation[0] - Math.PI * 0.05, rotation[1], rotation[2]] 
      : [rotation[0], rotation[1], rotation[2]],
    cardScale: isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  // Вращение карты при наведении
  useFrame(() => {
    if (isHovered && meshRef.current) {
      meshRef.current.rotation.y = meshRef.current.rotation.y + 0.01;
    }
  });
  
  return (
    <animated.mesh
      ref={meshRef}
      position={cardPosition}
      rotation={cardRotation}
      scale={cardScale}
      onClick={() => onClick(cardId)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2.5, 4, 0.05]} />
      <meshStandardMaterial 
        map={backTexture}
        roughness={0.3}
        metalness={0.2}
        color={isHovered ? "#ffffff" : "#ddd5ff"}
        emissive={isHovered ? "#9060ff" : "#000000"}
        emissiveIntensity={isHovered ? 0.3 : 0}
      />
    </animated.mesh>
  );
};

// Компонент сцены с колодой
const DeckScene = ({ onCardSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cards, setCards] = useState([]);
  const groupRef = useRef();
  
  // Загрузка текстуры оборотной стороны карты
  const backTexture = useTexture('https://i.imgur.com/zDYXgP4.jpg');
  
  // Инициализация колоды
  useEffect(() => {
    const totalCards = 21; // Количество карт в колоде
    const newCards = [];
    
    for (let i = 0; i < totalCards; i++) {
      const randomOffset = Math.random() * 0.1 - 0.05;
      newCards.push({
        id: i,
        position: [randomOffset, 0, 0],
        rotation: [0, Math.random() * 0.1 - 0.05, (Math.random() * 0.1 - 0.05)]
      });
    }
    
    setCards(newCards);
  }, []);
  
  // Анимация перемешивания колоды
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() / 3000) * 0.3;
      groupRef.current.position.y = Math.sin(Date.now() / 2000) * 0.2;
    }
  });
  
  const handleCardClick = (cardId) => {
    // Выбрать карту и передать ее ID родительскому компоненту
    onCardSelect(cardId);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
      
      <group ref={groupRef}>
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            cardId={card.id}
            position={card.position}
            rotation={card.rotation}
            index={index}
            totalCards={cards.length}
            hoveredCard={hoveredCard}
            onClick={handleCardClick}
            backTexture={backTexture}
          />
        ))}
      </group>
      
      <Text
        position={[0, -3, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Выберите карту для расклада
      </Text>
    </>
  );
};

// Основной компонент эффекта тасовки
const DeckShuffleEffect = ({ onSelectCard }) => {
  return (
    <CanvasContainer>
      <Canvas shadows gl={{ antialias: true }}>
        <fog attach="fog" args={['#110f25', 5, 15]} />
        <DeckScene onCardSelect={onSelectCard} />
      </Canvas>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: var(--card-bg);
`;

export default DeckShuffleEffect; 