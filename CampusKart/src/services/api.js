import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (formData) => {
    return api.post('/products', formData);
  },
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  search: (query) => api.get(`/products/search/${query}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

// Admin API
export const adminAPI = {
  getAllProducts: (status) => api.get(`/admin/products?status=${status || 'all'}`),
  updateProductStatus: (id, data) => api.put(`/admin/products/${id}/status`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => {
    const isFormData = userData instanceof FormData;
    return api.put('/users/profile', userData, {
      headers: isFormData ? {
        'Content-Type': 'multipart/form-data',
      } : {},
    });
  },
  getListings: () => api.get('/users/listings'),
  getPurchases: () => api.get('/users/purchases'),
  purchaseProduct: (productId) => api.post(`/users/purchase/${productId}`),
};

export default api;
