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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setAuthData: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export default authApi;
