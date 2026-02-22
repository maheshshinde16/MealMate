// API Endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  RESTAURANTS: '/restaurants',
  ORDERS: '/orders',
  PAYMENTS: '/payments',
  DELIVERIES: '/deliveries',
  RATINGS: '/ratings',
  SOCIAL: '/social',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  DRIVER: 'driver',
  ADMIN: 'admin',
  SUPPORT: 'support',
};

// Order Status
export const ORDER_STATUS = {
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Delivery Status
export const DELIVERY_STATUS = {
  ASSIGNED: 'assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
};

// Cuisine Types
export const CUISINE_TYPES = [
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'Thai',
  'Japanese',
  'Continental',
  'Fast Food',
  'Cafe',
  'Desserts',
  'Beverages',
];

// Time Slots
export const TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

// Rating Levels
export const RATING_LEVELS = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  VERY_POOR: 1,
};
