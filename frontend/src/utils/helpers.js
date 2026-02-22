// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate distance
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Truncate text
export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Get storage
export const getFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
};

// Set storage
export const setInStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to storage:', error);
  }
};

// Remove from storage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};
