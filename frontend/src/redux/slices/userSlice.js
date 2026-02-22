import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  profile: null,
  addresses: [],
  favorites: [],
  orders: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
      state.user = action.payload;
    },
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.profile = action.payload;
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.profile = action.payload;
      state.user = action.payload;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
});

export const {
  updateUserProfile,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addAddress,
  removeAddress,
  addFavorite,
  removeFavorite,
} = userSlice.actions;

export default userSlice.reducer;
