import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ListTodo, 
  Users, 
  Trophy, 
  Settings 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to}
      className={`
        flex items-center space-x-2 p-2 rounded-md transition-colors duration-200
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r shadow-md p-4">
      <nav className="flex flex-col space-y-2">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          to="/" 
        />
        <SidebarItem 
          icon={<ListTodo size={20} />} 
          label="Tasks" 
          to="/tasks" 
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Groups" 
          to="/groups" 
        />
        <SidebarItem 
          icon={<Trophy size={20} />} 
          label="Leaderboard" 
          to="/leaderboard" 
        />
        <div className="border-t my-4"></div>
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          to="/settings" 
        />
      </nav>
    </aside>
  );
};