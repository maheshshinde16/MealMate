import axios from './axios';

export const paymentApi = {
  getAllPayments: async () => {
    const response = await axios.get('/payments');
    return response.data;
  },

  getPaymentById: async (id) => {
    const response = await axios.get(`/payments/${id}`);
    return response.data;
  },

  createPayment: async (paymentData) => {
    const response = await axios.post('/payments', paymentData);
    return response.data;
  },

  updatePayment: async (id, paymentData) => {
    const response = await axios.put(`/payments/${id}`, paymentData);
    return response.data;
  },
};

export default paymentApi;
