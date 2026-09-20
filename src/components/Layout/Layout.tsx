import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Drawer } from '../Drawer/Drawer';
import { ProfilePopover } from '../ProfilePopover/ProfilePopover';
import './Layout.css';

export const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'medicines':
        navigate('/medicines');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'reminders':
        navigate('/reminders');
        break;
      case 'statistics':
        navigate('/statistics');
        break;
      case 'export':
        navigate('/export');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'profile-settings':
        navigate('/profile');
        break;
      case 'app-settings':
        navigate('/settings');
        break;
      case 'logout':
        localStorage.removeItem('pill-reminder-auth');
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/medicines')) return 'medicines';
    if (path.startsWith('/schedule')) return 'schedule';
    if (path.startsWith('/history')) return 'history';
    if (path.startsWith('/statistics')) return 'statistics';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  return (
    <div className="layout">
      <Header
        onMenuClick={() => setIsDrawerOpen(true)}
        onProfileClick={() => setIsProfileOpen(!isProfileOpen)}
        hasNotification={true}
      />

      <main className="layout__content">
        <Outlet />
      </main>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPage={getCurrentPage()}
        onNavigate={handleNavigate}
      />

      <ProfilePopover
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
