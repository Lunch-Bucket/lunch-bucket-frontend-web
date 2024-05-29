import axios from 'axios';
import baseUrl from "../controllers/baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('lb_auth_token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if 401 Unauthorized response
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
