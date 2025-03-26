import { getAllTarotCards, getTarotCardById } from '../data/tarotCards';
import { getAllTarotSpreads, getTarotSpreadById } from '../data/tarotSpreads';

// Генерирует случайный индекс от 0 до max-1
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Класс сервиса для работы с Таро
class TarotService {
  constructor() {
    this.cards = getAllTarotCards();
    this.spreads = getAllTarotSpreads();
    this.dailyCardKey = 'tarot_daily_card';
    this.readingsKey = 'tarot_readings';
    this.journalKey = 'tarot_journal';
  }

  // Получить все карты
  getAllCards() {
    return this.cards;
  }

  // Получить карту по ID
  getCardById(id) {
    return getTarotCardById(id);
  }

  // Получить случайную карту
  getRandomCard() {
    const randomIndex = getRandomIndex(this.cards.length);
    return this.cards[randomIndex];
  }

  // Получить перевернутую или прямую карту случайным образом
  getRandomCardWithOrientation() {
    const card = this.getRandomCard();
    const isReversed = Math.random() > 0.5;
    
    return {
      ...card,
      isReversed,
      orientation: isReversed ? 'reversed' : 'upright',
      meaningForOrientation: isReversed ? card.reversedMeaning : card.uprightMeaning
    };
  }

  // Получить карту дня
  getDailyCard() {
    const today = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD
    
    // Проверяем, была ли уже выбрана карта дня
    const storedCard = localStorage.getItem(this.dailyCardKey);
    
    if (storedCard) {
      const { date, card } = JSON.parse(storedCard);
      
      // Если карта уже выбрана сегодня, возвращаем её
      if (date === today) {
        return card;
      }
    }
    
    // Если карты ещё нет или она от другого дня, выбираем новую
    const newDailyCard = this.getRandomCardWithOrientation();
    const dailyCardData = {
      date: today,
      card: newDailyCard
    };
    
    // Сохраняем в localStorage
    localStorage.setItem(this.dailyCardKey, JSON.stringify(dailyCardData));
    
    return newDailyCard;
  }

  // Получить все расклады
  getAllSpreads() {
    return this.spreads;
  }

  // Получить расклад по ID
  getSpreadById(id) {
    return getTarotSpreadById(id);
  }

  // Создать новый расклад
  createReading(spreadId, question, cards) {
    // Получаем текущие чтения из localStorage
    const readingsJson = localStorage.getItem(this.readingsKey);
    const readings = readingsJson ? JSON.parse(readingsJson) : [];
    
    // Получаем информацию о раскладе
    const spread = this.getSpreadById(spreadId);
    
    // Создаем новый расклад
    const newReading = {
      id: `reading-${Date.now()}`,
      date: new Date().toISOString(),
      spreadId,
      spreadName: spread?.name || 'Пользовательский расклад',
      question,
      cards,
      notes: ''
    };
    
    // Добавляем в начало массива
    readings.unshift(newReading);
    
    // Сохраняем обратно в localStorage
    localStorage.setItem(this.readingsKey, JSON.stringify(readings));
    
    return newReading;
  }

  // Получить все чтения
  getAllReadings() {
    const readingsJson = localStorage.getItem(this.readingsKey);
    return readingsJson ? JSON.parse(readingsJson) : [];
  }

  // Получить чтение по ID
  getReadingById(id) {
    const readings = this.getAllReadings();
    return readings.find(reading => reading.id === id);
  }

  // Обновить заметки о чтении
  updateReadingNotes(id, notes) {
    const readings = this.getAllReadings();
    const index = readings.findIndex(reading => reading.id === id);
    
    if (index !== -1) {
      readings[index].notes = notes;
      localStorage.setItem(this.readingsKey, JSON.stringify(readings));
      return true;
    }
    
    return false;
  }

  // Добавить запись в дневник
  addJournalEntry(entry) {
    const journalJson = localStorage.getItem(this.journalKey);
    const journal = journalJson ? JSON.parse(journalJson) : [];
    
    const newEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toISOString(),
      ...entry
    };
    
    journal.unshift(newEntry);
    localStorage.setItem(this.journalKey, JSON.stringify(journal));
    
    return newEntry;
  }

  // Получить все записи дневника
  getAllJournalEntries() {
    const journalJson = localStorage.getItem(this.journalKey);
    return journalJson ? JSON.parse(journalJson) : [];
  }
}

// Экспортируем экземпляр сервиса
const tarotService = new TarotService();

export default tarotService; 