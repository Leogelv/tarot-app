import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  user: null,
  isAuthenticated: false,
  isSubscribed: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Асинхронное действие для проверки текущего пользователя
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация запроса API с задержкой
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем наличие пользователя в localStorage
      const userData = localStorage.getItem('tarot_user');
      
      if (userData) {
        return JSON.parse(userData);
      }
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для входа пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Имитация запроса API с задержкой
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Для демонстрации - простая проверка email/password
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const user = {
          id: 'user-1',
          email: credentials.email,
          name: 'Demo User',
          isSubscribed: false
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('tarot_user', JSON.stringify(user));
        
        return user;
      }
      
      return rejectWithValue('Неверный email или пароль');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для регистрации
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Имитация запроса API с задержкой
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        isSubscribed: false
      };
      
      // Сохраняем в localStorage
      localStorage.setItem('tarot_user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для выхода
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    // Удаляем из localStorage
    localStorage.removeItem('tarot_user');
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка проверки текущего пользователя
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isSubscribed = action.payload?.isSubscribed || false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Обработка входа
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSubscribed = action.payload.isSubscribed;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Обработка регистрации
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSubscribed = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Обработка выхода
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isSubscribed = false;
      });
  }
});

export const { clearErrors } = authSlice.actions;

export default authSlice.reducer;
