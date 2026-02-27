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

  // Google OAuth methods
  googleRegister: async (googleUserData, role) => {
    const payload = {
      email: googleUserData.email,
      fullName: googleUserData.fullName,
      googleId: googleUserData.googleId,
      picture: googleUserData.picture,
      role: role,
      // For Google auth, we generate a random password
      password: Math.random().toString(36).slice(-16)
    };
    const response = await axios.post('/auth/google/register', payload);
    return response.data.data;
  },

  googleLogin: async (googleUserData, role) => {
    const payload = {
      email: googleUserData.email,
      googleId: googleUserData.googleId,
      role: role
    };
    const response = await axios.post('/auth/google/login', payload);
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
