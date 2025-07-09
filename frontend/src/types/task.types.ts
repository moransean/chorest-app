import { User } from "./api.types";

export interface Task {
    id: string;
    title: string;
    description: string;
    pointValue: number;
    status: 'INCOMPLETED' | 'COMPLETED'; //figure this out
    dueDate: string;
    createdAt: string;
    completedAt: string;
    groupId: string;
    assignee: User;
  }
  
  export interface CreateTaskDTO {
    title: string;
    description: string;
    pointValue: number;
    groupId: string;
    dueDate: string;
  }