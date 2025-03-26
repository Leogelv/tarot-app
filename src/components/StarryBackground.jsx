import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let active = true;

    // Настройка размера канваса
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Пересоздаем звезды при изменении размера
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Создание звезд (упрощенно)
    function initStars() {
      stars = [];
      // Уменьшаем количество звезд для повышения производительности
      const numberOfStars = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          brightness: Math.random(),
          speed: Math.random() * 0.02 + 0.01
        });
      }
    }

    // Упрощенная анимация звезд
    function animate() {
      if (!active) return;

      // Используем прозрачный черный фон для создания следа
      ctx.fillStyle = 'rgba(18, 18, 31, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Обновление яркости
        star.brightness += star.speed;
        if (star.brightness > 1) {
          star.brightness = 0;
        }

        // Рисуем простую звезду
        const opacity = star.brightness;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Запускаем анимацию
    animate();

    // Отключаем фон при неактивной вкладке для экономии ресурсов
    document.addEventListener('visibilitychange', () => {
      active = document.visibilityState === 'visible';
      if (active && !animationFrameId) {
        animate();
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', () => {});
      cancelAnimationFrame(animationFrameId);
      active = false;
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
  opacity: 0.6;
`;

export default StarryBackground; 