import axios from './axios';

export const getAllVendors = async () => {
  const response = await axios.get('/vendors');
  // Unwrap ApiResponse wrapper to get actual vendor array
  return response.data.data || response.data;
};

export const getVendorById = async (id) => {
  const response = await axios.get(`/vendors/${id}`);
  return response.data.data || response.data;
};

export const createVendor = async (vendorData) => {
  const response = await axios.post('/vendors', vendorData);
  return response.data.data || response.data;
};

export const updateVendor = async (id, vendorData) => {
  const response = await axios.put(`/vendors/${id}`, vendorData);
  return response.data.data || response.data;
};

export const deleteVendor = async (id) => {
  const response = await axios.delete(`/vendors/${id}`);
  return response.data.data || response.data;
};

const vendorApi = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor
};

export default vendorApi;
