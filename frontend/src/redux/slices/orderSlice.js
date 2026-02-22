import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  orderStatus: null,
  deliveryStatus: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
    },
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.orders.unshift(action.payload);
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrdersStart: (state) => {
      state.loading = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    updateDeliveryStatus: (state, action) => {
      state.deliveryStatus = action.payload;
    },
    cancelOrderStart: (state) => {
      state.loading = true;
    },
    cancelOrderSuccess: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload
      );
      if (index !== -1) {
        state.orders[index].status = 'cancelled';
      }
      state.loading = false;
    },
    cancelOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrder,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  updateOrderStatus,
  updateDeliveryStatus,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
