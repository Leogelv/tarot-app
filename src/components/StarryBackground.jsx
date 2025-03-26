import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarryBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Устанавливаем размер холста
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Звезда
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.blinkSpeed = Math.random() * 0.02;
        this.blinkDirection = Math.random() > 0.5 ? 1 : -1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Мерцание
        this.opacity += this.blinkSpeed * this.blinkDirection;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.blinkDirection = -1;
        } else if (this.opacity < 0.2) {
          this.opacity = 0.2;
          this.blinkDirection = 1;
        }
        
        // Если звезда вышла за пределы холста, возвращаем ее
        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
        if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
      }
      
      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Создаем звезды
    let stars = [];
    const createStars = () => {
      stars = [];
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 2000);
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
      }
    };
    
    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Обработчик изменения размера окна
    const handleResize = () => {
      setCanvasSize();
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    setCanvasSize();
    createStars();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: transparent;
`;

export default StarryBackground; 