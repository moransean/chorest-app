export interface UserDetails {
    id: string;
    username: string;
    email: string;
    groupIds: Set<number>;
  }
  
  export interface AuthState {
    user: UserDetails | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    email: string;
  }