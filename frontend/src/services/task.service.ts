import { apiClient } from './api/client';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { User } from '../types/api.types';
import { Task, CreateTaskDTO } from '../types/task.types';


export const taskService = {
  async getGroupTasks(groupId: string, page = 0, size = 10): Promise<Task[]> {
    const response = await apiClient.get(`/tasks/group/${groupId}`, {
      params: { page, size }
    });
    return response.data;
  },

  async getUserTasks(assigneeId: string, page = 0, size = 10): Promise<Task[]> {
    const response = await apiClient.get(`/tasks/group/${assigneeId}`, {
      params: { page, size }
    });
    return response.data;
  },

  async getTaskById(taskId: string): Promise<Task> {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
  },

  async createTask(task: CreateTaskDTO): Promise<ApiResponse<Task>> {
    const response = await apiClient.post('/tasks', task);
    return response.data;
  },

  async updateTask(taskId: string, task: Partial<Task>): Promise<ApiResponse<Task>> {
    const response = await apiClient.put(`/tasks/${taskId}`, task);
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await apiClient.delete(`/tasks/${taskId}`);
  },

  async assignTask(taskId: string, userId: string): Promise<ApiResponse<Task>> {
    const response = await apiClient.post(`/tasks/${taskId}/assign/${userId}`);
    return response.data;
  },

  async completeTask(taskId: string): Promise<ApiResponse<Task>> {
    const response = await apiClient.post(`/tasks/${taskId}/complete`);
    return response.data;
  },
};