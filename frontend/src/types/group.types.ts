import { User } from "./api.types";
import { Task } from "./task.types";

export interface Group {
    id: string;
    name: string;
    createdAt: string;
    members: User[]; 
    tasks: Task[];
  }
  
  export interface CreateGroupDto {
    name: string;
  }