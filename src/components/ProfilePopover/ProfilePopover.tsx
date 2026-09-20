import React, { useEffect, useRef } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import './ProfilePopover.css';

interface ProfilePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  isOpen,
  onClose,
  onNavigate,
  anchorRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={popoverRef} className="profile-popover">
      <button
        className="profile-popover__item"
        onClick={() => handleNavigate('profile-settings')}
      >
        <User size={20} />
        <span>Настройки профиля</span>
      </button>

      <button
        className="profile-popover__item"
        onClick={() => handleNavigate('app-settings')}
      >
        <Settings size={20} />
        <span>Настройки приложения</span>
      </button>

      <div className="profile-popover__divider" />

      <button
        className="profile-popover__item profile-popover__item--destructive"
        onClick={() => handleNavigate('logout')}
      >
        <LogOut size={20} />
        <span>Выйти</span>
      </button>
    </div>
  );
};
