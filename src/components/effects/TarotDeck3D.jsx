import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMouse } from 'react-use';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { Text, Html } from '@react-three/drei';

// Текстура рубашки карты 
const CARD_BACK_TEXTURE = 'https://i.ibb.co/N7PpRnK/card-back.jpg';

// Компонент отдельной карты
const TarotCard = ({ position, rotation, index, onClick, isSelected, cardData }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [backTexture] = useState(() => new THREE.TextureLoader().load(CARD_BACK_TEXTURE));
  
  // Эффект наведения и выбора
  const { scale, positionZ, cardRotation } = useSpring({
    scale: hovered && !isSelected ? 1.1 : 1,
    positionZ: hovered && !isSelected ? 0.5 : 0,
    cardRotation: isSelected ? [0, Math.PI, 0] : [rotation[0], rotation[1], rotation[2]],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Анимация карты при перетасовке
  useFrame(() => {
    if (!isSelected && mesh.current) {
      mesh.current.rotation.x += Math.sin(index * 0.1) * 0.001;
      mesh.current.rotation.z += Math.cos(index * 0.05) * 0.0005;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={[position[0], position[1], position[2] + positionZ]}
      rotation={cardRotation}
      scale={scale}
      onClick={() => onClick(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.7, 1.2, 0.01]} />
      <meshStandardMaterial color="#5a32a8" map={backTexture} attach="material-0" />
      <meshStandardMaterial color="#5a32a8" map={backTexture} attach="material-1" />
      <meshStandardMaterial color="#5a32a8" map={backTexture} attach="material-2" />
      <meshStandardMaterial color="#5a32a8" map={backTexture} attach="material-3" />
      <meshStandardMaterial color="#5a32a8" map={backTexture} attach="material-4" />
      <meshStandardMaterial color="#8b58ff" attach="material-5" />
      
      {isSelected && (
        <Html position={[0, 0, 0.02]} transform occlude>
          <div style={{ 
            width: '140px',
            height: '240px',
            backgroundColor: 'white',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            boxShadow: '0 0 15px rgba(138, 43, 226, 0.7)',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>{cardData?.name || 'Карта Таро'}</h4>
            {cardData?.image_url && (
              <img 
                src={cardData.image_url} 
                alt={cardData.name}
                style={{ width: '100px', height: '150px', objectFit: 'cover', margin: '5px 0' }}
              />
            )}
          </div>
        </Html>
      )}
    </animated.mesh>
  );
};

// Компонент сцены с колодой карт
const DeckScene = ({ onCardSelected, cardData }) => {
  const ref = useRef();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deckReady, setDeckReady] = useState(false);
  const { docX, docY } = useMouse();
  
  // Создание колоды с 78 картами (стандартная колода Таро)
  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < 78; i++) {
      newCards.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          i * -0.005
        ],
        rotation: [
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1,
          (Math.random() * 0.4 - 0.2) + (i % 2 === 0 ? 0.1 : -0.1)
        ]
      });
    }
    setCards(newCards);
    
    // Имитируем перетасовку колоды
    const timeout = setTimeout(() => {
      setDeckReady(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Интерактивное движение колоды при движении мыши
  useFrame(() => {
    if (ref.current && !selectedCard) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (docX / window.innerWidth) * 0.2 - 0.1,
        0.05
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        (docY / window.innerHeight) * 0.2 - 0.1,
        0.05
      );
    }
  });

  const handleCardClick = (index) => {
    if (deckReady && selectedCard === null) {
      setSelectedCard(index);
      
      // Уведомляем внешний компонент через коллбэк
      setTimeout(() => {
        if (onCardSelected) {
          onCardSelected(cardData);
        }
      }, 1000);
    }
  };

  return (
    <>
      {!deckReady && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Тасуем колоду...
        </Text>
      )}
      
      <group ref={ref}>
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            index={index}
            position={card.position}
            rotation={card.rotation}
            onClick={handleCardClick}
            isSelected={selectedCard === index}
            cardData={cardData}
          />
        ))}
      </group>
    </>
  );
};

// Основной экспортируемый компонент
const TarotDeck3D = ({ onCardSelected, cardData }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle at 50% 50%, #281c4a 0%, #12121f 100%)'
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b58ff" />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
      
      <fog attach="fog" args={['#12121f', 5, 15]} />
      
      <DeckScene onCardSelected={onCardSelected} cardData={cardData} />
    </Canvas>
  );
};

export default TarotDeck3D; 