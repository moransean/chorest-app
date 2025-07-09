export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    groupIds: string;
    totalPoints: number;
    weeklyPoints: number;
    monthlyPoints: number;
  }