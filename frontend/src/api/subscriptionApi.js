import axiosInstance from './axios';

export const getUserSubscriptions = (userId) =>
  axiosInstance.get(`/subscriptions/user/${userId}`);

export const activateSubscription = (id, userId) =>
  axiosInstance.put(`/subscriptions/${id}/activate`, null, {
    params: { userId },
  });

export const createSubscription = (userId, payload) =>
  axiosInstance.post('/subscriptions', payload, {
    params: { userId },
  });
