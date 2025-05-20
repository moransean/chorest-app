import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './context/QueryProvider';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import App from './App';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} /> 
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* protected routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/tasks" element={<TasksPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
            
          </Routes>
      </AuthProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);