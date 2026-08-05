import { createSlice } from '@reduxjs/toolkit';

const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

const storedAuth = getStoredAuth();

const initialState = storedAuth || {
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message || 'Login successful';
      state.error = null;
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: true, user: action.payload.user, message: state.message })
      );
      window.localStorage.setItem('isAuthenticated', 'true');
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.message = null;
      window.localStorage.removeItem('auth');
      window.localStorage.setItem('isAuthenticated', 'false');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = null;
      window.localStorage.removeItem('auth');
      window.localStorage.setItem('isAuthenticated', 'false');
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
