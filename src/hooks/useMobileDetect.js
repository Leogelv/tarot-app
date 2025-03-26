import { useState, useEffect } from 'react';

/**
 * Хук для определения типа устройства (мобильное или десктоп)
 * @param {number} breakpoint - Пороговое значение ширины экрана для определения мобильного устройства (по умолчанию 768px)
 * @returns {boolean} - true, если устройство мобильное, false - если десктоп
 */
const useMobileDetect = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для определения типа устройства
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Проверяем при первой загрузке
    checkIsMobile();

    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', checkIsMobile);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobileDetect; 