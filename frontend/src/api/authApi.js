import axios from './axios';

export const authApi = {
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data.data;
  },

  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data.data;
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return sessionStorage.getItem('token');
  },

  setAuthData: (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  },
};

export default authApi;
