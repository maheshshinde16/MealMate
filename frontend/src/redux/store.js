import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../store/authSlice';
import userSlice from './slices/userSlice';
import restaurantSlice from './slices/restaurantSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import socialSlice from './slices/socialSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    restaurant: restaurantSlice,
    cart: cartSlice,
    order: orderSlice,
    social: socialSlice,
  },
});

export default store;
