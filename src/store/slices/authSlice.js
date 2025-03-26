import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signUp, signOut, getCurrentUser, getUserProfile } from '../../services/supabase/supabaseClient';

// Initial state
const initialState = {
  user: null,
  profile: null,
  token: localStorage.getItem('token') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isAuthenticated: false
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signIn(email, password);
      
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      
      const token = response.data.session?.access_token;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, userData }, { rejectWithValue }) => {
    try {
      const response = await signUp(email, password, userData);
      
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      
      const token = response.data.session?.access_token;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await signOut();
      
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      
      localStorage.removeItem('token');
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      
      if (response.error) {
        return rejectWithValue(response.error.message);
      }
      
      if (!response.data.user) {
        return rejectWithValue('User not authenticated');
      }
      
      // Get user profile
      const profileResponse = await getUserProfile(response.data.user.id);
      
      if (profileResponse.error) {
        return rejectWithValue(profileResponse.error.message);
      }
      
      return {
        user: response.data.user,
        profile: profileResponse.data
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.session?.access_token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.session?.access_token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.profile = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  }
});

export const { clearAuthError, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
