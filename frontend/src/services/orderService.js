import api from './api';

const orderService = {
  create: (orderData) =>
    api.post('/orders', orderData),

  getAll: (params) =>
    api.get('/orders', { params }),

  getById: (orderId) =>
    api.get(`/orders/${orderId}`),

  update: (orderId, data) =>
    api.put(`/orders/${orderId}`, data),

  cancel: (orderId) =>
    api.post(`/orders/${orderId}/cancel`),

  track: (orderId) =>
    api.get(`/orders/${orderId}/track`),

  getHistory: () =>
    api.get('/orders/history'),

  createGroupOrder: (orderData) =>
    api.post('/orders/group', orderData),

  getDeliveryStatus: (orderId) =>
    api.get(`/orders/${orderId}/delivery`),
};

export default orderService;
