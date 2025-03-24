import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const TarotBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Инициализация сцены
    const initialize = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Создаем сцену
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Создаем камеру
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 30;
      cameraRef.current = camera;
      
      // Создаем рендерер
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;
      
      // Добавляем canvas в DOM
      containerRef.current.appendChild(renderer.domElement);
      
      // Создаем частицы
      createParticles();
      
      // Запускаем анимацию
      animate();
      
      // Обработчик изменения размера окна
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Очистка
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
      };
    };
    
    // Создаем частицы для фона
    const createParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const count = 1500;
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      
      const color1 = new THREE.Color('#9c88ff');
      const color2 = new THREE.Color('#8c7ae6');
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        const mixedColor = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
        
        scales[i] = Math.random();
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      
      const material = new THREE.PointsMaterial({
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(geometry, material);
      sceneRef.current.add(particles);
      particlesRef.current = particles;
    };
    
    // Анимация сцены
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.0005;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      requestAnimationFrame(animate);
    };
    
    initialize();
    
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  return <BackgroundContainer ref={containerRef} />;
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(20, 20, 40, 0.5) 0%,
      rgba(20, 20, 40, 0.7) 100%
    );
  }
`;

export default TarotBackground; 