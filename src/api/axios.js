import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  }
});


apiClient.interceptors.request.use(
  (config) => {
    console.log(`→ ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error.response?.status === 401) {
      console.log('Unauthorized — redirect to login');
    }

    if (error.response?.status === 500) {
      console.error('Server error — check backend logs');
    }

    return Promise.reject(error);
  }
);

export default apiClient;