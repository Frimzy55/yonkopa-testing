import React from 'react';

const DashboardHome = ({ user }) => (
  <div className="content-section">
    <h2>Dashboard Overview</h2>
    <p>Welcome back, {user?.fullName}! Here's your financial summary.</p>
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <h3>Total Balance</h3>
          <p>$12,450.00</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📈</div>
        <div className="stat-info">
          <h3>This Month</h3>
          <p>+$2,340.00</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🎯</div>
        <div className="stat-info">
          <h3>Goals</h3>
          <p>75% Complete</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHome;
