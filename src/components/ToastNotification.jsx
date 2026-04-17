// src/components/Notification/ToastNotification.jsx
import React, { useEffect } from 'react';
import './ToastNotification.css';

export const ToastNotification = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast-notification toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' && '✅'}
        {type === 'error' && '❌'}
        {type === 'info' && 'ℹ️'}
        {type === 'warning' && '⚠️'}
      </div>
      <div className="toast-content">
        <div className="toast-title">
          {type === 'success' && 'Success!'}
          {type === 'error' && 'Error!'}
          {type === 'info' && 'Information'}
          {type === 'warning' && 'Warning'}
        </div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};
