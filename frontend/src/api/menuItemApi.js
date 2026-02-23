import axios from './axios';

export const getAllMenuItems = async () => {
  const response = await axios.get('/menu-items');
  return response.data.data || response.data;
};

export const getMenuItemsByVendor = async (vendorId) => {
  const response = await axios.get(`/menu-items/vendor/${vendorId}`);
  return response.data.data || response.data;
};

export const getMenuItemById = async (id) => {
  const response = await axios.get(`/menu-items/${id}`);
  return response.data.data || response.data;
};

export const createMenuItem = async (menuItemData) => {
  const response = await axios.post('/menu-items', menuItemData);
  return response.data.data || response.data;
};

export const updateMenuItem = async (id, menuItemData) => {
  const response = await axios.put(`/menu-items/${id}`, menuItemData);
  return response.data.data || response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await axios.delete(`/menu-items/${id}`);
  return response.data.data || response.data;
};

const menuItemApi = {
  getAllMenuItems,
  getMenuItemsByVendor,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};

export default menuItemApi;
