import axios from 'axios';
import { useAuthStore } from './stores/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const userId = authStore.userId;
    console.log(userId)
    if (userId) {
      config.headers['user-id'] = userId; 
    }
    return config
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
