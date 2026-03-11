// src/pages/CustomerDashboard/CustomerDashboard.jsx
import React, { useEffect, useState } from 'react';
import './CustomerDashboard.css';
import DashboardHome from './CustomerDashboardHome';
import NotificationsSupport from './CustomerNotificationsSupport';
import CustomerCompleteKyc from './CustomerCompleteKyc';
import CustomerApplyLoan from './CustomerApplyLoan';
import CustomerLoanStatus from './CustomerLoanStatus';
import CustomerRepayloan from './CustomerRepayloan';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('kyc'); // default active menu

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const menuItems = [
    { id: 'kyc', label: 'Complete KYC And Profile', icon: '💳', description: 'Complete KYC And Profile', color: '#e67e22' },
    { id: 'loan', label: 'Apply For Loan', icon: '✅', description: 'Apply For Loan', color: '#e67e22' },
    { id: 'loanStatus', label: 'Loan Status', icon: '💰', description: 'View and manage loans', color: '#e67e22' },
    { id: 'loanrepay', label: 'Repay Loan', icon: '🔄', description: 'Transaction history', color: '#e67e22' },
    { id: 'profile', label: 'Notifications and Support', icon: '👤', description: 'Personal settings', color: '#e67e22' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'kyc': return <CustomerCompleteKyc user={user} />;
      case 'loan': return <CustomerApplyLoan user={user} />;
      case 'loanStatus': return <CustomerLoanStatus user={user} />;
      case 'loanrepay': return <CustomerRepayloan user={user} />;
      case 'profile': return <NotificationsSupport user={user} />;
      default: return <DashboardHome user={user} />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <div className="top-bar-left"><h1>👤 {user?.fullName || 'user'}</h1></div>
        <div className="top-bar-right">
          <span className="welcome-text">Yonkopa {user?.fullName || ''}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="sidebar-cards">
          <div className="sidebar-header"><h3>Navigation</h3></div>
          <div className="menu-cards-grid">
            {menuItems.map((item) => {
              // Disable only loanStatus, loanrepay, and profile
              const isDisabled = ['loanStatus', 'loanrepay', 'profile'].includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`menu-card ${activeMenu === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && setActiveMenu(item.id)}
                  style={{
                    '--card-color': item.color,
                    borderLeft: `4px solid ${item.color}`,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <div className="menu-card-icon" style={{ backgroundColor: item.color }}>{item.icon}</div>
                  <div className="menu-card-content">
                    <h4>{item.label}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="menu-card-arrow">→</div>
                </div>
              );
            })}
          </div>
        </nav>

        <main className="main-content">
          {user ? renderContent() : <div className="loading-container"><p>Loading your profile...</p></div>}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;