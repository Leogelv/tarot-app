import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Billboard, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

// Компонент абстрактной визуализации для расклада
const SpreadVizualization = ({ spreadId = 1, size = 'medium', onClick }) => {
  // Определяем стиль и цвета в зависимости от ID расклада
  const colors = useMemo(() => {
    const colorSets = [
      { primary: '#9c6aff', secondary: '#ff6a9c', tertiary: '#6affcb' },
      { primary: '#ff6a6a', secondary: '#ffc46a', tertiary: '#6a8cff' },
      { primary: '#6affff', secondary: '#ff6af3', tertiary: '#c4ff6a' },
      { primary: '#8a6aff', secondary: '#ff8a6a', tertiary: '#6affa7' },
      { primary: '#ff6aa7', secondary: '#6a7aff', tertiary: '#ffda6a' }
    ];
    
    // Используем ID расклада для выбора цветов, по модулю для избежания выхода за границы массива
    return colorSets[(spreadId - 1) % colorSets.length];
  }, [spreadId]);
  
  // Определение размеров контейнера
  const dimensions = useMemo(() => {
    const sizes = {
      small: { width: '100%', height: '150px' },
      medium: { width: '100%', height: '220px' },
      large: { width: '100%', height: '300px' }
    };
    return sizes[size] || sizes.medium;
  }, [size]);
  
  return (
    <VisualizationContainer style={dimensions} onClick={onClick}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <AbstractVisualization 
          spreadId={spreadId} 
          colors={colors} 
        />
      </Canvas>
    </VisualizationContainer>
  );
};

// Компонент для формирования абстрактной визуализации
const AbstractVisualization = ({ spreadId, colors }) => {
  const groupRef = useRef();
  
  // Генерируем частицы на основе ID расклада
  const particles = useMemo(() => {
    const count = 5 + (spreadId % 5); // от 5 до 9 частиц в зависимости от ID
    const items = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 0.5;
      
      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ],
        color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
        speed: 0.1 + Math.random() * 0.2,
        size: 0.4 + Math.random() * 0.6,
        distort: 0.3 + Math.random() * 0.3
      });
    }
    
    return items;
  }, [spreadId, colors]);

  // Создаем эффект пульсации и вращения
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z = t * 0.1;
      
      // Пульсация группы
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Центральная сфера */}
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color={colors.primary} 
          attach="material" 
          distort={0.6} 
          speed={1.5} 
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Вращающиеся частицы */}
      {particles.map((particle, i) => (
        <ParticleObject key={i} {...particle} />
      ))}
      
      {/* Энергетические нити между частицами */}
      {spreadId > 2 && (
        <EnergyLines 
          particles={particles} 
          color={colors.secondary} 
        />
      )}
      
      {/* Текст с номером расклада */}
      <Billboard position={[0, 0, 1.2]}>
        <Text
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {spreadId}
        </Text>
      </Billboard>
    </group>
  );
};

// Компонент частицы
const ParticleObject = ({ position, color, speed, size, distort }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.x = position[0] + Math.sin(t * speed) * 0.3;
      ref.current.position.y = position[1] + Math.cos(t * speed) * 0.3;
      ref.current.rotation.z = t * speed * 2;
    }
  });
  
  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <MeshDistortMaterial 
        color={color} 
        attach="material" 
        distort={distort} 
        speed={1.8} 
        transparent={true}
        opacity={0.8}
        roughness={0.3}
      />
    </Sphere>
  );
};

// Компонент энергетических связей между частицами
const EnergyLines = ({ particles, color }) => {
  const linesRef = useRef();
  
  useFrame(({ clock }) => {
    if (linesRef.current) {
      const t = clock.getElapsedTime();
      linesRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.3;
    }
  });
  
  // Создаем геометрию линий, соединяющих частицы
  const points = useMemo(() => {
    const linePoints = [];
    
    // Соединяем каждую частицу с двумя ближайшими
    for (let i = 0; i < particles.length; i++) {
      const p1 = new THREE.Vector3(...particles[i].position);
      const p2 = new THREE.Vector3(...particles[(i + 1) % particles.length].position);
      const p3 = new THREE.Vector3(...particles[(i + 2) % particles.length].position);
      
      linePoints.push(p1, p2, p1, p3);
    }
    
    return linePoints;
  }, [particles]);
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);
  
  return (
    <line ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} transparent opacity={0.6} linewidth={1} />
    </line>
  );
};

const VisualizationContainer = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  background: var(--card-bg);
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

export default SpreadVizualization; 