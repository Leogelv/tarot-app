import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCards,
  setSpreads,
  setDailyCard,
  setReadings,
  addReading,
  setJournalEntries,
  addJournalEntry,
  setLoading,
  setError
} from '../store/slices/tarotSlice';
import tarotService from '../services/tarotService';

/**
 * Хук для работы с функционалом Таро через Redux
 */
export const useTarot = () => {
  const dispatch = useDispatch();
  const {
    cards,
    spreads,
    dailyCard,
    readings,
    journalEntries,
    loading,
    error
  } = useSelector(state => state.tarot);

  // Загрузка всех карт
  const loadCards = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const cards = tarotService.getAllCards();
      dispatch(setCards(cards));
    } catch (error) {
      console.error('Error loading cards:', error);
      dispatch(setError('Не удалось загрузить карты Таро'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Получение карты по ID
  const getCardById = useCallback((id) => {
    return tarotService.getCardById(id);
  }, []);

  // Получение случайной карты
  const getRandomCard = useCallback(() => {
    return tarotService.getRandomCard();
  }, []);

  // Загрузка карты дня
  const loadDailyCard = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const dailyCard = tarotService.getDailyCard();
      dispatch(setDailyCard(dailyCard));
    } catch (error) {
      console.error('Error loading daily card:', error);
      dispatch(setError('Не удалось загрузить карту дня'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Загрузка всех раскладов
  const loadSpreads = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const spreads = tarotService.getAllSpreads();
      dispatch(setSpreads(spreads));
    } catch (error) {
      console.error('Error loading spreads:', error);
      dispatch(setError('Не удалось загрузить расклады'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Получение расклада по ID
  const getSpreadById = useCallback((id) => {
    return tarotService.getSpreadById(id);
  }, []);

  // Сохранение нового расклада
  const saveReading = useCallback((spreadId, question, cards) => {
    dispatch(setLoading(true));
    try {
      const newReading = tarotService.createReading(spreadId, question, cards);
      dispatch(addReading(newReading));
      return newReading;
    } catch (error) {
      console.error('Error saving reading:', error);
      dispatch(setError('Не удалось сохранить расклад'));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Загрузка всех сохраненных раскладов
  const loadReadings = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const readings = tarotService.getAllReadings();
      dispatch(setReadings(readings));
    } catch (error) {
      console.error('Error loading readings:', error);
      dispatch(setError('Не удалось загрузить сохраненные расклады'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Получение расклада по ID
  const getReadingById = useCallback((id) => {
    return tarotService.getReadingById(id);
  }, []);

  // Обновление заметок к раскладу
  const updateReadingNotes = useCallback((readingId, notes) => {
    const success = tarotService.updateReadingNotes(readingId, notes);
    if (success) {
      loadReadings(); // Перезагружаем все расклады для обновления в Redux
    }
    return success;
  }, [loadReadings]);

  // Добавление записи в дневник
  const saveJournalEntry = useCallback((entry) => {
    dispatch(setLoading(true));
    try {
      const newEntry = tarotService.addJournalEntry(entry);
      dispatch(addJournalEntry(newEntry));
      return newEntry;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      dispatch(setError('Не удалось сохранить запись в дневнике'));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Загрузка всех записей дневника
  const loadJournalEntries = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const entries = tarotService.getAllJournalEntries();
      dispatch(setJournalEntries(entries));
    } catch (error) {
      console.error('Error loading journal entries:', error);
      dispatch(setError('Не удалось загрузить записи дневника'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Загрузка основных данных при инициализации
  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
    if (spreads.length === 0) {
      loadSpreads();
    }
    if (!dailyCard) {
      loadDailyCard();
    }
    if (readings.length === 0) {
      loadReadings();
    }
    if (journalEntries.length === 0) {
      loadJournalEntries();
    }
  }, [
    cards.length,
    spreads.length,
    dailyCard,
    readings.length,
    journalEntries.length,
    loadCards,
    loadSpreads,
    loadDailyCard,
    loadReadings,
    loadJournalEntries
  ]);

  return {
    // Данные из Redux
    cards,
    spreads,
    dailyCard,
    readings,
    journalEntries,
    loading,
    error,

    // Методы
    loadCards,
    getCardById,
    getRandomCard,
    loadDailyCard,
    loadSpreads,
    getSpreadById,
    saveReading,
    loadReadings,
    getReadingById,
    updateReadingNotes,
    saveJournalEntry,
    loadJournalEntries
  };
};

export default useTarot; 