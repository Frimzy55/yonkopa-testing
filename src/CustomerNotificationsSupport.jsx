// src/pages/CustomerDashboard/NotificationsSupport.jsx
import React from 'react';

const NotificationsSupport = ({ user }) => (
  <div className="content-section">
    <h2>Notifications and Support</h2>
    <p>Manage your notifications and get help when you need it.</p>

    <div className="profile-card">
      <div className="profile-info">
        <p><strong>Full Name:</strong> {user?.fullName}</p>
        <p><strong>Email:</strong> user@example.com</p>
        <p><strong>Member Since:</strong> January 2023</p>
      </div>

      <div className="notifications-section">
        <h4>Notification Preferences</h4>
        <div className="notification-setting">
          <label>
            <input type="checkbox" defaultChecked /> Email Notifications
          </label>
        </div>
        <div className="notification-setting">
          <label>
            <input type="checkbox" defaultChecked /> SMS Alerts
          </label>
        </div>
        <div className="notification-setting">
          <label>
            <input type="checkbox" /> Marketing Communications
          </label>
        </div>
      </div>

      <div className="support-section">
        <h4>Customer Support</h4>
        <button className="support-btn">Contact Support</button>
        <button className="support-btn">Live Chat</button>
      </div>
    </div>
  </div>
);

export default NotificationsSupport;
