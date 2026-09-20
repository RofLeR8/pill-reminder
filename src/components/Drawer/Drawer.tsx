import React, { useEffect, useRef } from 'react';
import { X, Home, Pill, Calendar, History, Bell, BarChart3, Download, Settings, HelpCircle, LogOut } from 'lucide-react';
import './Drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  currentPage = 'home',
  onNavigate,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div ref={drawerRef} className={`drawer ${isOpen ? 'drawer--open' : ''}`}>
        <div className="drawer__header">
          <button className="drawer__close" onClick={onClose} aria-label="Закрыть меню">
            <X size={24} />
          </button>
          <h2 className="drawer__title">Меню</h2>
        </div>

        <nav className="drawer__nav">
          <button
            className={`drawer__item ${currentPage === 'home' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('home')}
          >
            <Home size={20} />
            <span>Главная</span>
          </button>

          <button
            className={`drawer__item ${currentPage === 'medicines' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('medicines')}
          >
            <Pill size={20} />
            <span>Мои лекарства</span>
          </button>

          <button
            className={`drawer__item ${currentPage === 'schedule' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('schedule')}
          >
            <Calendar size={20} />
            <span>Расписание</span>
          </button>

          <button
            className={`drawer__item ${currentPage === 'history' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('history')}
          >
            <History size={20} />
            <span>История приемов</span>
          </button>

          <button
            className={`drawer__item ${currentPage === 'reminders' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('reminders')}
          >
            <Bell size={20} />
            <span>Напоминания</span>
          </button>

          <button
            className={`drawer__item ${currentPage === 'statistics' ? 'drawer__item--active' : ''}`}
            onClick={() => handleNavigate('statistics')}
          >
            <BarChart3 size={20} />
            <span>Статистика</span>
          </button>

          <div className="drawer__divider" />

          <button
            className="drawer__item"
            onClick={() => handleNavigate('export')}
          >
            <Download size={20} />
            <span>Экспорт данных</span>
          </button>

          <button
            className="drawer__item"
            onClick={() => handleNavigate('settings')}
          >
            <Settings size={20} />
            <span>Настройки</span>
          </button>

          <button
            className="drawer__item"
            onClick={() => handleNavigate('help')}
          >
            <HelpCircle size={20} />
            <span>Помощь</span>
          </button>

          <div className="drawer__divider" />

          <button
            className="drawer__item drawer__item--destructive"
            onClick={() => handleNavigate('logout')}
          >
            <LogOut size={20} />
            <span>Выйти</span>
          </button>
        </nav>
      </div>
    </>
  );
};
