import axios from 'axios';

const getBaseURL = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  if (!url.includes('/api/v1')) {
    url = url.replace(/\/$/, '') + '/api/v1';
  }
  return url.replace(/\/$/, '') + '/';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If it's a 401 and we haven't tried refreshing yet, and it's NOT a refresh request itself
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url?.includes('auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        await api.post('auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        // On refresh failure, we just reject. 
        // AuthContext will catch this in checkAuth and handle redirection.
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;
