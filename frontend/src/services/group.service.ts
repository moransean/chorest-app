import { apiClient } from './api/client';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { User } from '../types/api.types';
import { Group, CreateGroupDto } from '../types/group.types';


export const groupService = {
  async getGroups(page = 0, size = 10): Promise<Group[]> {
    const response = await apiClient.get('/groups/user', {
      params: { page, size }
    });
    return response.data;
  },

  async getGroupById(groupId: string): Promise<Group> {
    const response = await apiClient.get(`/groups/${groupId}`);
    return response.data;
  },//getMembers

  async createGroup(group: CreateGroupDto): Promise<Group> {
    const response = await apiClient.post('/groups', group);
    return response.data;
  },

  async updateGroup(groupId: string, group: Partial<Group>): Promise<Group> {
    const response = await apiClient.put(`/groups/${groupId}`, group);
    return response.data;
  },//unused for now

  async deleteGroup(groupId: string): Promise<void> {
    await apiClient.delete(`/groups/${groupId}`);
  },

  async addMember(groupId: string, userId: string): Promise<Group> {
    const response = await apiClient.post(`/groups/${groupId}/members/${userId}`);
    return response.data;
  },

  async removeMember(groupId: string, userId: string): Promise<Group> {
    const response = await apiClient.delete(`/groups/${groupId}/members/${userId}`);
    return response.data;
  },

  async getLeaderboard(groupId: string): Promise<User[]> {
    const response = await apiClient.get(`/points/leaderboard/${groupId}`);
    return response.data;
  },
};