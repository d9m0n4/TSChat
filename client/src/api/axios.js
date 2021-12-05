import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

const API = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  console.log('inter');
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

API.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await axios
          .get(`${BASE_URL}/refresh`, { withCredentials: true })
          .then(({ data }) => {
            window.localStorage.setItem('token', data.tokens.accessToken);
            console.log(data);
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              console.log(response);
            }
          });
      } catch (e) {
        throw new Error();
      }
    }
    throw error;
  },
);

export default API;
