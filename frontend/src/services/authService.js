import api from './api';

const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (userData) =>
    api.post('/auth/register', userData),

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  verifyOTP: (email, otp) =>
    api.post('/auth/verify-otp', { email, otp }),

  resetPassword: (email, otp, newPassword) =>
    api.post('/auth/reset-password', { email, otp, newPassword }),

  refreshToken: () =>
    api.post('/auth/refresh-token'),

  getCurrentUser: () =>
    api.get('/auth/me'),
};

export default authService;
