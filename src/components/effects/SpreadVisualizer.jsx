import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styled from 'styled-components';

// Типы визуализаторов для разных раскладов
const VISUALIZER_TYPES = {
  1: 'CRYSTAL', // Расклад на три карты
  2: 'VORTEX',  // Кельтский крест
  3: 'SPIRAL',  // Расклад на любовь
  4: 'GRID',    // Расклад на решение
  5: 'ORBIT'    // Расклад на месяц
};

// Кристаллический визуализатор
const CrystalVisualizer = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            color="#8a2be2"
            transmission={0.8}
            roughness={0.1}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} castShadow />
    </group>
  );
};

// Спиральный визуализатор
const SpiralVisualizer = () => {
  const groupRef = useRef();
  const particlesRef = useRef();
  const particles = [];

  // Генерируем частицы
  for (let i = 0; i < 100; i++) {
    const angle = i * 0.2;
    const radius = 0.05 + i * 0.01;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = i * 0.02 - 1;
    particles.push([x, y, z]);
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        mesh.position.z += Math.sin(time + i) * 0.003;
        mesh.material.color.setHSL((time + i * 0.01) % 1, 0.8, 0.5);
      });
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={particlesRef}>
        {particles.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshPhysicalMaterial 
              emissive="#ffffff"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
    </group>
  );
};

// Вихревой визуализатор
const VortexVisualizer = () => {
  const groupRef = useRef();
  const ringsRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = time * (0.1 + i * 0.05);
        ring.rotation.x = Math.sin(time * 0.3) * 0.2;
        ring.scale.x = ring.scale.y = 1 + Math.sin(time * 0.5 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[0, 0, i * 0.1 - 0.3]}
          ref={el => (ringsRef.current[i] = el)}
        >
          <torusGeometry args={[1 + i * 0.1, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(i / 7, 0.8, 0.5)} 
            emissive={new THREE.Color().setHSL(i / 7, 0.8, 0.5)}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={1} />
    </group>
  );
};

// Сетчатый визуализатор
const GridVisualizer = () => {
  const groupRef = useRef();
  const gridRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    
    // Волновой эффект на сетке
    if (gridRef.current) {
      const positions = gridRef.current.geometry.attributes.position;
      const count = positions.count;
      
      for (let i = 0; i < count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.2;
        positions.setZ(i, wave);
      }
      
      positions.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={gridRef} receiveShadow>
        <planeGeometry args={[4, 4, 32, 32]} />
        <meshStandardMaterial 
          color="#6d52d1"
          wireframe={true}
          emissive="#6d52d1"
          emissiveIntensity={0.2}
        />
      </mesh>
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
    </group>
  );
};

// Орбитальный визуализатор
const OrbitVisualizer = () => {
  const groupRef = useRef();
  const orbitersRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    
    orbitersRef.current.forEach((orbiter, i) => {
      if (orbiter) {
        const angle = time * (0.2 + i * 0.1);
        const radius = 1 + i * 0.2;
        orbiter.position.x = Math.cos(angle) * radius;
        orbiter.position.z = Math.sin(angle) * radius;
        orbiter.rotation.y = -angle;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial 
          color="#8a2be2"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i} 
          ref={el => (orbitersRef.current[i] = el)}
          castShadow
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(i / 5, 0.8, 0.5)} 
            emissive={new THREE.Color().setHSL(i / 5, 0.8, 0.5)}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
    </group>
  );
};

// Выбор визуализатора по типу
const VisualizerSelector = ({ type }) => {
  switch(type) {
    case 'CRYSTAL':
      return <CrystalVisualizer />;
    case 'SPIRAL':
      return <SpiralVisualizer />;
    case 'VORTEX':
      return <VortexVisualizer />;
    case 'GRID':
      return <GridVisualizer />;
    case 'ORBIT':
      return <OrbitVisualizer />;
    default:
      return <CrystalVisualizer />;
  }
};

// Главный компонент визуализатора спредов
const SpreadVisualizer = ({ spreadId = 1 }) => {
  const visualizerType = VISUALIZER_TYPES[spreadId] || 'CRYSTAL';
  
  return (
    <VisualizerWrapper>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#12121f']} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <VisualizerSelector type={visualizerType} />
        </PresentationControls>
        
        <Environment preset="night" />
      </Canvas>
    </VisualizerWrapper>
  );
};

// Стили
const VisualizerWrapper = styled(motion.div)`
  width: 100%;
  height: 300px;
  border-radius: var(--radius);
  overflow: hidden;
  touch-action: none;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

export default SpreadVisualizer; 