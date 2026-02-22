import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  menu: [],
  loading: false,
  error: null,
  filters: {
    searchText: '',
    cuisineType: [],
    rating: 0,
    distance: 10,
  },
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchRestaurantsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRestaurantsSuccess: (state, action) => {
      state.restaurants = action.payload;
      state.loading = false;
    },
    fetchRestaurantsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    fetchMenuStart: (state) => {
      state.loading = true;
    },
    fetchMenuSuccess: (state, action) => {
      state.menu = action.payload;
      state.loading = false;
    },
    fetchMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setRestaurants,
  setLoading,
  setError,
  fetchRestaurantsStart,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
  selectRestaurant,
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  setFilters,
  clearFilters,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
