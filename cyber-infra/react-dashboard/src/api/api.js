// API utility for Cyber Infra dashboard
// Handles alerts, incidents, and auth
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAlerts = (params) => api.get('/alerts', { params });
export const fetchAlert = (id) => api.get(`/alerts/${id}`);
export const fetchIncidents = (params) => api.get('/incidents', { params });
export const fetchIncident = (id) => api.get(`/incidents/${id}`);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export const fetchAnalytics = (params) => api.get('/analytics', { params });
export const fetchBlocklist = () => api.get('/blocklist');
export const fetchRules = () => api.get('/rules');
export const updateRule = (id, data) => api.patch(`/rules/${id}`, data);
export const createIncident = (data) => api.post('/incidents', data);
export const updateIncident = (id, data) => api.patch(`/incidents/${id}`, data);
export const addNoteToAlert = (id, note) => api.post(`/alerts/${id}/notes`, { note });
export default api;
