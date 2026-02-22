import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: Boolean(storedToken)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const user = action.payload.user;
      state.user = user?.id ? user : { ...user, id: user?._id };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
