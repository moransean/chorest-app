import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ListTodo, 
  Users, 
  Trophy, 
  LogOut 
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            Chore Champion
          </Link>
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/tasks" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary"
            >
              <ListTodo size={20} />
              <span>Tasks</span>
            </Link>
            <Link 
              to="/groups" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary"
            >
              <Users size={20} />
              <span>Groups</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary"
            >
              <Trophy size={20} />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-gray-700">
                Welcome, {user.username}
              </span>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={logout}
                className="flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};