import { createSlice } from '@reduxjs/toolkit';

const storedUser = sessionStorage.getItem('user');
const storedToken = sessionStorage.getItem('token');

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
      sessionStorage.setItem('user', JSON.stringify(state.user));
      sessionStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
