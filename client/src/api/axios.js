import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

const API = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default API;
