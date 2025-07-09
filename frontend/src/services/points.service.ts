import { apiClient } from './api/client';
import { User } from '../types/api.types';


export const pointsService = {
    async getGroupLeaderboard(groupId: string): Promise<User[]> {
        console.log('Fetching leaderboard for group:', groupId);
        const response = await apiClient.get(`/points/leaderboard/${groupId}`);
        return response.data;
    }
}