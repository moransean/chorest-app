import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../types/auth.types';
import '../../styles/LoginPage.css'; // Import the CSS file

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (e.g., show toast notification)
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="title">Welcome</h1>
          <p className="subtitle">Sign in to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              className={`input ${errors.username ? 'error' : ''}`}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="footer-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
