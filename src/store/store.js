import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tarotReducer from './slices/tarotSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tarot: tarotReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 