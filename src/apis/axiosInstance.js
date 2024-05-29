import axios from 'axios';
import baseUrl from "../controllers/baseUrl";
import PATHS from '../common/paths/paths';

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
    if (error.response || error.response && error.response.status === 401) {
      // Redirect to login if 401 Unauthorized response
      localStorage.setItem('loginStatus', false);
      window.location.replace(PATHS.login); 
    }
    console.log('error',error)
    return Promise.reject(error);
  }
);

export default axiosInstance;
