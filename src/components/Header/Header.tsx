import React from 'react';
import './Header.css';
import { Clock, Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
  hasNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onProfileClick,
  hasNotification = false,
}) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    });
  };

  return (
    <header className="header">
      <button className="header__button" onClick={onMenuClick}>
        <Menu size={20} />
        <span>Меню</span>
      </button>

      <div className="header__time">
        <div className="header__clock-icon">
          <Clock size={20} />
          {hasNotification && <span className="header__notification-badge" />}
        </div>
        <div className="header__time-content">
          <div className="header__time-value">{formatTime(currentTime)}</div>
          <div className="header__date-value">{formatDate(currentTime)}</div>
        </div>
      </div>

      <button className="header__button" onClick={onProfileClick}>
        <User size={20} />
        <span>Профиль</span>
      </button>
    </header>
  );
};
