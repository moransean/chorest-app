import { apiClient } from './api/client';
import { LoginCredentials, RegisterCredentials, UserDetails } from '../types/auth.types';
import { ApiResponse } from '../types/api.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<UserDetails> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<UserDetails> {
    const response = await apiClient.post('/auth/register', credentials);
    console.log("Register response:", response);       // Log the full response
    console.log("Register response data:", response.data);  // Log just response.data
    return response.data;
  },

  async validateToken(): Promise<UserDetails> {
    const response = await apiClient.get('/auth/validate');
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async updateProfile(userData: Partial<UserDetails>): Promise<ApiResponse<UserDetails>> {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<UserDetails> {
    const response = await apiClient.get('/auth/me',  {withCredentials: true}); // Adjust the endpoint based on your backend
    return response.data;
  },
};
