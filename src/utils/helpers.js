/**
 * Перемешивает элементы массива по алгоритму Фишера-Йейтса
 * @param {Array} array Исходный массив
 * @returns {Array} Новый перемешанный массив
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Форматирует дату в локализованную строку
 * @param {string|Date} date Дата для форматирования
 * @returns {string} Форматированная строка даты
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Ограничивает длину текста с добавлением многоточия
 * @param {string} text Исходный текст
 * @param {number} maxLength Максимальная длина
 * @returns {string} Обрезанный текст
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Генерирует уникальный ID
 * @returns {string} Уникальный идентификатор
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

/**
 * Задержка выполнения на указанное время
 * @param {number} ms Время задержки в миллисекундах
 * @returns {Promise} Промис, который разрешится через указанное время
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 