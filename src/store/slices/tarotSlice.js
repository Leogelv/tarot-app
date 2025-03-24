import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  spreads: [],
  dailyCard: null,
  readings: [],
  journalEntries: [],
  affirmations: [],
  loading: false,
  error: null,
};

export const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setSpreads: (state, action) => {
      state.spreads = action.payload;
    },
    setDailyCard: (state, action) => {
      state.dailyCard = action.payload;
    },
    setReadings: (state, action) => {
      state.readings = action.payload;
    },
    addReading: (state, action) => {
      state.readings.unshift(action.payload);
    },
    setJournalEntries: (state, action) => {
      state.journalEntries = action.payload;
    },
    addJournalEntry: (state, action) => {
      state.journalEntries.unshift(action.payload);
    },
    setAffirmations: (state, action) => {
      state.affirmations = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setCards,
  setSpreads,
  setDailyCard,
  setReadings,
  addReading,
  setJournalEntries,
  addJournalEntry,
  setAffirmations,
} = tarotSlice.actions;

export default tarotSlice.reducer;
