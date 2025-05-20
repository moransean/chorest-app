import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/ui/toast';
import '../../styles/RegisterPage.css'; // Import the CSS file

// Registration form validation schema
const registrationSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be no more than 20 characters" }),
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegisterPage: React.FC = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await authRegister({
        username: data.username,
        email: data.email,
        password: data.password
      });
      
      console.error('Register success:');
      
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="card">
        <h2 className="title">Create Your Account</h2>
        <p className="subtitle">Sign up to start managing your tasks</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          {/* Username Field */}
          <div className="form-item">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              {...form.register('username')}
              className={`input ${form.formState.errors.username ? 'error' : ''}`}
              placeholder="Choose a username"
            />
            {form.formState.errors.username && (
              <p className="error-message">{form.formState.errors.username?.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-item">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              className={`input ${form.formState.errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {form.formState.errors.email && (
              <p className="error-message">{form.formState.errors.email?.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-item">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              {...form.register('password')}
              className={`input ${form.formState.errors.password ? 'error' : ''}`}
              placeholder="Create a password"
            />
            {form.formState.errors.password && (
              <p className="error-message">{form.formState.errors.password?.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-item">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...form.register('confirmPassword')}
              className={`input ${form.formState.errors.confirmPassword ? 'error' : ''}`}
              placeholder="Repeat your password"
            />
            {form.formState.errors.confirmPassword && (
              <p className="error-message">{form.formState.errors.confirmPassword?.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="button"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="footer">
          <p className="footer-text">
            Already have an account?{' '}
            <Link to="/login" className="footer-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

