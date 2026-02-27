import axios from './axios';

export const orderApi = {
  getAllOrders: async () => {
    const response = await axios.get('/orders');
    // Unwrap ApiResponse wrapper to get actual orders array
    return response.data.data || response.data;
  },

  getUserOrders: async (userId) => {
    const response = await axios.get(`/orders/user/${userId}`);
    // Unwrap ApiResponse wrapper to get actual orders array
    return response.data.data || response.data;
  },

  getVendorOrders: async (vendorId) => {
    const response = await axios.get(`/orders/vendor/${vendorId}`);
    // Unwrap ApiResponse wrapper to get actual orders array
    return response.data.data || response.data;
  },

  getOrderById: async (id) => {
    const response = await axios.get(`/orders/${id}`);
    // Unwrap ApiResponse wrapper to get actual order object
    return response.data.data || response.data;
  },

  createOrder: async (orderData) => {
    const response = await axios.post('/orders', orderData);
    // Unwrap ApiResponse wrapper to get actual order object
    return response.data.data || response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await axios.put(`/orders/${id}`, orderData);
    // Unwrap ApiResponse wrapper to get actual order object
    return response.data.data || response.data;
  },

  deleteOrder: async (id) => {
    const response = await axios.delete(`/orders/${id}`);
    // Unwrap ApiResponse wrapper to get actual response
    return response.data.data || response.data;
  },

  getAvailableOrdersForRiders: async () => {
    const response = await axios.get('/orders/available/riders');
    // Unwrap ApiResponse wrapper to get actual orders array
    return response.data.data || response.data;
  },

  getRiderOrders: async (riderId) => {
    const response = await axios.get(`/orders/rider/${riderId}`);
    // Unwrap ApiResponse wrapper to get actual orders array
    return response.data.data || response.data;
  },
};

export default orderApi;
