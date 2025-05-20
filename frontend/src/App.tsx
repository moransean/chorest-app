import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow ml-64 mt-16 p-4">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
