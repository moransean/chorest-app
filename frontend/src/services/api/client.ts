import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://172.31.12.26:8080';

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
