import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState, LoginCredentials, RegisterCredentials, UserDetails } from "../types/auth.types";
import { ApiResponse } from "../types/api.types";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: UserDetails }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
  
        const user = await authService.getCurrentUser(); 
        
        if (user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: user }); 
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: "LOGIN_FAILURE" }); 
      }
    };
  
    initializeAuth();
  }, []);
  

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
  
      const user = await authService.login(credentials);
            
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        navigate('/dashboard');
      } else {
        throw new Error("Login successful but no user data returned");
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };
  
  const register = async (credentials: RegisterCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
  
      const user = await authService.register(credentials);      
      
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        navigate('/dashboard');
      } else {
        throw new Error("Registration successful but no user data returned");
      }
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };
  
  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};