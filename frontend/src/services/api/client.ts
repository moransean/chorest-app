import axios, { AxiosInstance, AxiosError } from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'; MAYBE HOSTING?
const BASE_URL = 'http://localhost:8080/api';

// Create an Axios instance with default settings
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // 🔹 Automatically send cookies with requests
});

// Handle authentication errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";  // 🔹 Redirect to login if not authenticated
    }
    return Promise.reject(error);
  }
);
