import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tarotReducer from './slices/tarotSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tarot: tarotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/initialize/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.profile'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'auth.profile'],
      },
    }),
});

export default store;
