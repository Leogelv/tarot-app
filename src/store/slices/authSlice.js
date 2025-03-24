import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase, signIn, signUp, signOut, getCurrentUser, getUserProfile } from '../../services/supabase/supabaseClient';

// Initial state
const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isPremium: false,
  loading: false,
  initialized: false,
  error: null
};

// Async thunks
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    // Для демо-версии - всегда возвращаем фиктивного пользователя
    console.log('Демо-режим: инициализация с фейковыми данными');
    
    // Создаем фиктивного пользователя
    const demoUser = {
      id: 'demo-user-id',
      email: 'demo@example.com',
      user_metadata: {
        name: 'Демо Пользователь'
      }
    };
    
    // Фиктивный профиль с премиум-подпиской
    const demoProfile = {
      id: 'demo-profile-id',
      user_id: 'demo-user-id',
      name: 'Демо Пользователь',
      birth_date: '1990-01-01',
      preferences: 'Интересуюсь всеми аспектами Таро',
      subscription_status: 'active',
      subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 дней
    };
    
    return { user: demoUser, profile: demoProfile };
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    // Для демо версии - просто имитируем успешный вход с любыми данными
    console.log('Демо-режим: успешный вход с фейковыми данными');
    
    // Создаем фиктивного пользователя
    const demoUser = {
      id: 'demo-user-id',
      email: email || 'demo@example.com',
      user_metadata: {
        name: 'Демо Пользователь'
      }
    };
    
    // Фиктивный профиль с премиум-подпиской
    const demoProfile = {
      id: 'demo-profile-id',
      user_id: 'demo-user-id',
      name: 'Демо Пользователь',
      birth_date: '1990-01-01',
      preferences: 'Интересуюсь всеми аспектами Таро',
      subscription_status: 'active',
      subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 дней
    };
    
    return { user: demoUser, profile: demoProfile };
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, userData }, { rejectWithValue }) => {
    const { data, error } = await signUp(email, password, userData);
    
    if (error) {
      return rejectWithValue(error.message);
    }
    
    return { user: data.user, profile: null };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    console.log('Демо-режим: выход из системы');
    return null;
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        const { user, profile } = action.payload;
        state.user = user;
        state.profile = profile;
        state.isAuthenticated = !!user;
        state.isPremium = profile?.subscription_status === 'active';
        state.loading = false;
        state.initialized = true;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload || 'Failed to initialize authentication';
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, profile } = action.payload;
        state.user = user;
        state.profile = profile;
        state.isAuthenticated = true;
        state.isPremium = profile?.subscription_status === 'active';
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Note: We don't set the user here since we typically 
        // need to confirm email first (depends on Supabase setup)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.isPremium = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
      })
      
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.isPremium = action.payload?.subscription_status === 'active';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
