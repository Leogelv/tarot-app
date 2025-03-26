import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Редьюсеры для аутентификации
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    // Обновляет данные пользователя
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    // Устанавливает состояние загрузки
    setLoading: (state) => {
      state.status = 'loading';
    },
    // Устанавливает состояние ошибки
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

// Экспорт экшенов
export const { login, logout, updateUser, setLoading, setError } = authSlice.actions;

// Селекторы
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
