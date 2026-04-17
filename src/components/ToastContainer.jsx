
// src/components/Notification/ToastContainer.jsx
import React from 'react';
import { ToastNotification } from './ToastNotification';
import './ToastNotification.css';

export const ToastContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="toast-container">
      {notifications.map(notification => (
        <ToastNotification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};