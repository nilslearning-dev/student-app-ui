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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      window.localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
      window.localStorage.setItem('isAuthenticated', 'true');
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      window.localStorage.removeItem('auth');
      window.localStorage.setItem('isAuthenticated', 'false');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      window.localStorage.removeItem('auth');
      window.localStorage.setItem('isAuthenticated', 'false');
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
