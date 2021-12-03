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

API.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
    }
  },
);

export default API;
