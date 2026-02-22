import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurantId: null,
  subtotal: 0,
  deliveryFee: 0,
  tax: 0,
  discount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );
      
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
      
      if (item.restaurantId) {
        // Clear cart if switching restaurants
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          state.items = [item];
        }
        state.restaurantId = item.restaurantId;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
    updatePricing: (state, action) => {
      const { subtotal, deliveryFee, tax, discount } = action.payload;
      state.subtotal = subtotal;
      state.deliveryFee = deliveryFee;
      state.tax = tax;
      state.discount = discount;
      state.total = subtotal + deliveryFee + tax - discount;
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  updatePricing,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
