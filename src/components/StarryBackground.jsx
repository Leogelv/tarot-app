import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    // Настройка размера канваса
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Пересоздаем звезды при изменении размера
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Создание звезд
    function initStars() {
      stars = [];
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 10000); // Адаптивное количество звезд
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          brightness: Math.random(),
          speed: Math.random() * 0.05,
          angle: Math.random() * Math.PI * 2
        });
      }
    }

    // Анимация звезд
    function animate() {
      ctx.fillStyle = 'rgba(18, 18, 31, 0.1)'; // Цвет фона с небольшим следом
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Обновление яркости
        star.brightness += star.speed;
        if (star.brightness > 1) {
          star.brightness = 0;
        }

        // Рисуем звезду
        const opacity = star.brightness;
        const size = star.size * (0.5 + star.brightness * 0.5);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Добавляем свечение
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Медленное движение звезд
        star.x += Math.cos(star.angle) * 0.1;
        star.y += Math.sin(star.angle) * 0.1;

        // Возвращаем звезды в пределы экрана
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

export default StarryBackground; 