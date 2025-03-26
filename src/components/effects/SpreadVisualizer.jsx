import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Различные визуальные стили для разных типов раскладов
const VISUAL_STYLES = {
  'easy': {
    particleCount: 300,
    baseColor: '#8b78ff',
    secondaryColor: '#c673e6', 
    speed: 0.5,
    pattern: 'circle',
  },
  'medium': {
    particleCount: 500,
    baseColor: '#6e76e5',
    secondaryColor: '#c39bd3',
    speed: 0.7,
    pattern: 'spiral',
  },
  'advanced': {
    particleCount: 800,
    baseColor: '#8e44ad',
    secondaryColor: '#4776e6',
    speed: 0.9,
    pattern: 'vortex',
  }
};

// Компонент частицы
const Particle = ({ position, color, index, speed, pattern }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Спрингованая анимация при наведении
  const { scale } = useSpring({
    scale: hovered ? 1.5 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  // Анимация движения
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime() * speed;
    
    switch (pattern) {
      case 'circle':
        mesh.current.position.x = position[0] + Math.sin(time + index * 0.1) * 0.3;
        mesh.current.position.y = position[1] + Math.cos(time + index * 0.1) * 0.3;
        break;
        
      case 'spiral':
        mesh.current.position.x = position[0] + Math.sin(time + index * 0.05) * (0.3 + Math.sin(time * 0.2) * 0.1);
        mesh.current.position.y = position[1] + Math.cos(time + index * 0.05) * (0.3 + Math.cos(time * 0.2) * 0.1);
        mesh.current.position.z = position[2] + Math.sin(time * 0.1 + index * 0.01) * 0.1;
        break;
        
      case 'vortex':
        const radius = 0.3 + Math.sin(time * 0.1 + index * 0.01) * 0.2;
        mesh.current.position.x = position[0] + Math.sin(time * 0.5 + index * 0.01) * radius;
        mesh.current.position.y = position[1] + Math.cos(time * 0.5 + index * 0.01) * radius;
        mesh.current.position.z = position[2] + Math.sin(time * 0.2 + index * 0.02) * 0.2;
        mesh.current.rotation.x = time * 0.2 + index * 0.01;
        mesh.current.rotation.y = time * 0.1 + index * 0.01;
        break;
        
      default:
        mesh.current.position.x = position[0] + Math.sin(time + index) * 0.2;
        mesh.current.position.y = position[1] + Math.cos(time + index) * 0.2;
    }
  });
  
  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </animated.mesh>
  );
};

// Компонент карты Таро в 3D пространстве
const TarotCard = ({ position, rotation, index, color }) => {
  const mesh = useRef();
  
  // Анимация левитации
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    mesh.current.position.y += Math.sin(time * 0.5 + index * 0.3) * 0.0005;
    mesh.current.rotation.z = rotation[2] + Math.sin(time * 0.3 + index * 0.2) * 0.02;
  });
  
  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={[0.15, 0.25, 0.01]} />
      <meshStandardMaterial 
        color="#1a1a2e"
        metalness={0.5}
        roughness={0.2}
      />
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.13, 0.23]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>
    </mesh>
  );
};

// Основной компонент визуализации
const VisualizerScene = ({ spreadName, difficulty = 'medium', cards_count = 3 }) => {
  const group = useRef();
  const [particles, setParticles] = useState([]);
  const [cards, setCards] = useState([]);
  
  // Получаем настройки для текущего стиля
  const visualStyle = VISUAL_STYLES[difficulty] || VISUAL_STYLES.medium;
  
  // Генерация частиц и карт при монтировании
  useEffect(() => {
    // Создаем частицы
    const newParticles = [];
    for (let i = 0; i < visualStyle.particleCount; i++) {
      const isSpecial = Math.random() > 0.85;
      newParticles.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ],
        color: isSpecial ? visualStyle.secondaryColor : visualStyle.baseColor,
        size: isSpecial ? 0.02 + Math.random() * 0.01 : 0.01 + Math.random() * 0.01
      });
    }
    setParticles(newParticles);
    
    // Создаем карты
    const newCards = [];
    const radius = 0.5;
    const angleStep = (Math.PI * 2) / cards_count;
    
    for (let i = 0; i < cards_count; i++) {
      // Разные паттерны расположения карт для разных раскладов
      let cardPosition, cardRotation;
      
      if (cards_count <= 3) {
        // Линейное расположение для малых раскладов
        cardPosition = [(i - (cards_count - 1) / 2) * 0.2, 0, 0];
        cardRotation = [0, 0, 0];
      } else if (cards_count <= 5) {
        // Полукруг
        const angle = i * angleStep - Math.PI / 2;
        cardPosition = [Math.cos(angle) * radius * 0.6, Math.sin(angle) * radius * 0.3, 0];
        cardRotation = [0, 0, angle + Math.PI / 2];
      } else {
        // Круг или сложная форма
        const angle = i * angleStep;
        cardPosition = [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
        cardRotation = [0, 0, angle + Math.PI / 2];
      }
      
      newCards.push({
        id: i,
        position: cardPosition,
        rotation: cardRotation,
        color: i % 2 === 0 ? visualStyle.baseColor : visualStyle.secondaryColor
      });
    }
    setCards(newCards);
  }, [cards_count, difficulty, visualStyle]);
  
  // Анимация группы 
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    
    group.current.rotation.y = Math.sin(time * 0.1) * 0.2;
    group.current.rotation.x = Math.cos(time * 0.2) * 0.1;
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8b58ff" />
      
      <group ref={group}>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            position={particle.position}
            color={particle.color}
            index={particle.id}
            speed={visualStyle.speed}
            pattern={visualStyle.pattern}
          />
        ))}
        
        {cards.map((card) => (
          <TarotCard
            key={card.id}
            position={card.position}
            rotation={card.rotation}
            index={card.id}
            color={card.color}
          />
        ))}
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {spreadName}
        </Text>
      </group>
    </>
  );
};

// Главный экспортируемый компонент
const SpreadVisualizer = ({ spreadName, difficulty, cards_count }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #1f1f35 0%, #12121f 100%)',
        borderRadius: 'inherit'
      }}
    >
      <VisualizerScene 
        spreadName={spreadName}
        difficulty={difficulty}
        cards_count={cards_count}
      />
    </Canvas>
  );
};

export default SpreadVisualizer; 