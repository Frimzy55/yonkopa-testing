// src/pages/CustomerDashboard/CustomerDashboard.jsx

import React, { useEffect, useState } from 'react';
import './CustomerDashboard.css';

import DashboardHome from './CustomerDashboardHome';
import NotificationsSupport from './CustomerNotificationsSupport';
import CustomerCompleteKyc from './CustomerCompleteKyc';
import CustomerApplyLoan from './CustomerApplyLoan';
import CustomerLoanStatus from './CustomerLoanStatus';
import CustomerRepayloan from './CustomerRepayloan';

import {
  FaBell,
  FaIdCard,
  FaCheckCircle,
  FaMoneyBillWave,
  FaSyncAlt,
  FaUserCog,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes
} from "react-icons/fa";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('kyc');
  const [notifications] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      id: 'kyc',
      label: 'Complete KYC',
      icon: <FaIdCard />,
      description: 'Complete KYC And Profile',
      color: '#e67e22'
    },
    {
      id: 'loan',
      label: 'Apply For Loan',
      icon: <FaCheckCircle />,
      description: 'Apply For Loan',
      color: '#e67e22'
    },
    {
      id: 'loanStatus',
      label: 'Loan Status',
      icon: <FaMoneyBillWave />,
      description: 'View and manage loans',
      color: '#e67e22'
    },
    {
      id: 'loanrepay',
      label: 'Repay Loan',
      icon: <FaSyncAlt />,
      description: 'Transaction history',
      color: '#e67e22'
    },
    {
      id: 'profile',
      label: 'Notifications',
      icon: <FaUserCog />,
      description: 'Personal settings',
      color: '#e67e22'
    },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'kyc':
        return <CustomerCompleteKyc user={user} />;
      case 'loan':
        return <CustomerApplyLoan user={user} />;
      case 'loanStatus':
        return <CustomerLoanStatus user={user} />;
      case 'loanrepay':
        return <CustomerRepayloan user={user} />;
      case 'profile':
        return <NotificationsSupport user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleMenuClick = (itemId) => {
    setActiveMenu(itemId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="dashboard-container">

      {/* TOP BAR */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="dashboard-title">
            <FaHome className="home-icon" />
            <span className="user-name">{user?.fullName?.split(' ')[0] || 'User'}</span>
          </h1>
        </div>

        <div className="top-bar-right">
          <div
            className="notification-bell"
            onClick={() => {
              setActiveMenu('profile');
              setMobileMenuOpen(false);
            }}
          >
            <FaBell size={20} />
            {notifications > 0 && (
              <span className="notification-badge">
                {notifications}
              </span>
            )}
          </div>

          <span className="welcome-text">
            Hi, {user?.fullName?.split(' ')[0] || ''}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <div className="dashboard-content">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <nav className={`sidebar-cards ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h3>Menu</h3>
          </div>

          <div className="menu-cards-grid">
            {menuItems.map((item) => {
              const isDisabled = ['loanStatus', 'loanrepay', 'profile'].includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className={`menu-card ${activeMenu === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && handleMenuClick(item.id)}
                  style={{
                    borderLeftColor: item.color,
                  }}
                >
                  <div
                    className="menu-card-icon"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>

                  <div className="menu-card-content">
                    <h4>{item.label}</h4>
                    <p className="menu-desktop-only">{item.description}</p>
                  </div>

                  <div className="menu-card-arrow">
                    →
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {user ? (
            renderContent()
          ) : (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your profile...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;