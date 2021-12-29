import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

const API = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  console.log('req inter');
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

API.interceptors.response.use(
  (config) => {
    console.log('res inter');
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.tokens.accessToken);
        console.log('токен обновлен');
        return API.request(originalRequest);
      } catch (error) {
        console.log('не авторизован');
        return error;
      }
    }
    throw error;
  },
);

export default API;
