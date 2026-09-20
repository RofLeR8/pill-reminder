import React from 'react';
import { useToast } from '../../contexts/ToastContext';
import './ToastContainer.css';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <div className="toast__icon">{getIcon(toast.type)}</div>
          <div className="toast__message">{toast.message}</div>
          <button
            className="toast__close"
            onClick={() => hideToast(toast.id)}
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
