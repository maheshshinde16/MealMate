import api from './api';

const restaurantService = {
  getAll: (params) =>
    api.get('/restaurants', { params }),

  getById: (id) =>
    api.get(`/restaurants/${id}`),

  getMenu: (restaurantId) =>
    api.get(`/restaurants/${restaurantId}/menu`),

  search: (query) =>
    api.get('/restaurants/search', { params: { q: query } }),

  getByFilters: (filters) =>
    api.get('/restaurants', { params: filters }),

  getNearby: (latitude, longitude, radius = 10) =>
    api.get('/restaurants/nearby', {
      params: { latitude, longitude, radius },
    }),

  getTrending: () =>
    api.get('/restaurants/trending'),

  getByRating: (minRating = 4) =>
    api.get('/restaurants', { params: { minRating } }),

  getRatings: (restaurantId) =>
    api.get(`/restaurants/${restaurantId}/ratings`),
};

export default restaurantService;
