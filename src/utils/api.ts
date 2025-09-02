import axios from 'axios';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token && token === '1') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints (mock implementations since no real backend)
export const tankAPI = {
  getAllTanks: () => apiClient.get('/tanks'),
  getTank: (id: string) => apiClient.get(`/tanks/${id}`),
  updateTank: (id: string, data: any) => apiClient.put(`/tanks/${id}`, data),
  refillTank: (id: string) => apiClient.post(`/tanks/${id}/refill`),
};

export const alertAPI = {
  getAllAlerts: () => apiClient.get('/alerts'),
  markAsResolved: (id: string) => apiClient.patch(`/alerts/${id}`, { resolved: true }),
  createAlert: (data: any) => apiClient.post('/alerts', data),
};

export const reportsAPI = {
  getConsumptionReport: (params: any) => apiClient.get('/reports/consumption', { params }),
  exportCSV: (params: any) => apiClient.get('/reports/export', { params }),
};

// AI API endpoints (would connect to actual AI service)
export const aiAPI = {
  getForecast: (tankId: string) => apiClient.get(`/ai/forecast/${tankId}`),
  getAnomalies: () => apiClient.get('/ai/anomalies'),
  getRecommendations: () => apiClient.get('/ai/recommendations'),
  chatQuery: (query: string) => apiClient.post('/ai/chat', { query }),
};