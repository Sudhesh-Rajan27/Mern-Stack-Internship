import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
);

// Auth API calls
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Store auth data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Campaign API calls
export const getAllCampaigns = async () => {
  try {
    const response = await api.get('/campaigns');
    return response.data;
  } catch (error) {
    console.error('Get campaigns error:', error);
    throw error;
  }
};

export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  } catch (error) {
    console.error('Create campaign error:', error);
    throw error;
  }
};

export const getCampaignById = async (id) => {
  try {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get campaign error:', error);
    throw error;
  }
};

export const makeDonation = async (campaignId, donationData) => {
  try {
    const response = await api.post(`/campaigns/${campaignId}/donate`, donationData);
    return response.data;
  } catch (error) {
    console.error('Donation error:', error);
    throw error;
  }
};

export const updateCampaignAmount = async (campaignId, amount, transactionId) => {
  try {
    const response = await api.post(`/campaigns/${campaignId}/donate`, {
      amount,
      transactionId
    });
    return response.data;
  } catch (error) {
    console.error('Update campaign amount error:', error);
    throw error;
  }
};

export default api;
