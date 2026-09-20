import React from 'react';
import type { ReactNode } from 'react';
import './FAB.css';

interface FABProps {
  icon: ReactNode;
  onClick: () => void;
  label?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export const FAB: React.FC<FABProps> = ({
  icon,
  onClick,
  label,
  position = 'bottom-right',
}) => {
  return (
    <button
      className={`fab fab--${position}`}
      onClick={onClick}
      aria-label={label || 'Плавающая кнопка'}
    >
      {icon}
      {label && <span className="fab__label">{label}</span>}
    </button>
  );
};
