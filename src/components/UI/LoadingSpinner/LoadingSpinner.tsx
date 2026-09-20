import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <div className={`loading-spinner loading-spinner--${size}`}>
          <div className="loading-spinner__circle"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};
