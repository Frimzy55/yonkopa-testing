import React, { useEffect, useState, useRef } from 'react';
import './CustomerDashboard.css';
import { useNavigate } from "react-router-dom";

import DashboardHome from './CustomerDashboardHome';
import NotificationsSupport from './CustomerNotificationsSupport';
import CustomerCompleteKyc from './CustomerCompleteKyc';
import CustomerKycDetails from './CustomerKycDetails';
import CustomerApplyLoan from './CustomerApplyLoan';
import CustomerLoanStatus from './CustomerLoanStatus';
import CustomerRepayloan from './CustomerRepayloan';
import AvatarDropdown from './AvatarDropdown';

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

// Helper function to create beep sounds programmatically
const createBeepSound = (frequency, duration, volume = 0.3) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const samples = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, samples, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < samples; i++) {
      // Create sine wave
      data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * volume;
      // Add fade in and fade out
      if (i < samples * 0.1) {
        data[i] *= (i / (samples * 0.1));
      }
      if (i > samples * 0.9) {
        data[i] *= (1 - (i - samples * 0.9) / (samples * 0.1));
      }
    }
    
    return {
      play: () => {
        try {
          const newSource = audioContext.createBufferSource();
          newSource.buffer = buffer;
          newSource.connect(audioContext.destination);
          
          if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
              newSource.start();
            }).catch(err => console.log("Audio context resume error:", err));
          } else {
            newSource.start();
          }
        } catch (err) {
          console.log("Sound play error:", err);
        }
      }
    };
  } catch (error) {
    console.error("Web Audio API error:", error);
    return null;
  }
};

const CustomerView = () => {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('kyc');
  const [notifications, setNotifications] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const prevNotificationsRef = useRef(0);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  
  // Audio refs
  const notificationSound = useRef(null);
  const bellSound = useRef(null);
  const audioContextRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Initialize audio with Web Audio API (no external files needed)
  useEffect(() => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create notification sound (higher pitch, longer)
      notificationSound.current = createBeepSound(880, 0.5, 0.2);
      
      // Create bell click sound (lower pitch, shorter)
      bellSound.current = createBeepSound(660, 0.15, 0.15);
      
      console.log("Sounds created successfully");
    } catch (error) {
      console.error("Failed to create sounds:", error);
      // Create silent fallback
      notificationSound.current = { play: () => {} };
      bellSound.current = { play: () => {} };
    }
  }, []);

  // Unlock audio on first user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioUnlocked && audioContextRef.current) {
        try {
          await audioContextRef.current.resume();
          setAudioUnlocked(true);
          console.log("Audio unlocked successfully");
        } catch (err) {
          console.log("Audio unlock failed:", err);
        }
      }
    };
    
    // Unlock on any user interaction
    const handleUserInteraction = () => {
      unlockAudio();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
    
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audioUnlocked]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch notifications periodically and play sound for new notifications
  useEffect(() => {
    if (!user?.userId) return;

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token'); // Get auth token
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (res.status === 403) {
          console.error("Authentication failed for notifications");
          return;
        }
        
        const data = await res.json();
        const unreadCount = data.filter(n => n.isRead === 0).length;

        // Play sound only if audio is unlocked and new notification arrived
        if (unreadCount > prevNotificationsRef.current && audioUnlocked && notificationSound.current) {
          notificationSound.current.play();
        }

        // Update ref + state
        prevNotificationsRef.current = unreadCount;
        setNotifications(unreadCount);

      } catch (error) {
        console.error("Notification fetch error:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, [user, audioUnlocked]);

  // Fetch avatar with authentication
  useEffect(() => {
    if (!user?.userId) return;

    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/kyc/avatar/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (res.status === 403) {
          console.error("Authentication failed for avatar fetch");
          return;
        }
        
        const data = await res.json();
        if (data?.avatar) setAvatar(data.avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, [user]);

  // Function to play bell click sound
  const playBellSound = () => {
    if (bellSound.current && audioUnlocked) {
      try {
        bellSound.current.play();
      } catch (err) {
        console.log("Bell sound play error:", err);
      }
    }
  };

  const menuItems = [
    { id: 'kyc', label: 'Complete KYC', icon: <FaIdCard />, description: 'Complete KYC And Profile', color: '#e67e22' },
    { id: 'loan', label: 'Apply For Loan', icon: <FaCheckCircle />, description: 'Apply For Loan', color: '#e67e22' },
    { id: 'loanStatus', label: 'Loan Status', icon: <FaMoneyBillWave />, description: 'View and manage loans', color: '#e67e22' },
    { id: 'loanrepay', label: 'Repay Loan', icon: <FaSyncAlt />, description: 'Transaction history', color: '#e67e22' },
    { id: 'profile', label: 'Notifications', icon: <FaUserCog />, description: 'Personal settings', color: '#e67e22' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'kyc': return <CustomerCompleteKyc user={user} />;
      case 'viewKyc': return <CustomerKycDetails user={user} />;
      case 'loan': return <CustomerApplyLoan user={user} />;
      case 'loanStatus': return <CustomerLoanStatus user={user} onApplyLoan={() => setActiveMenu('loan')} />;
      case 'loanrepay': return <CustomerRepayloan user={user} />;
      case 'profile': return <NotificationsSupport user={user} />;
      default: return <DashboardHome user={user} />;
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Also remove token
    navigate('/apply');
  };

  const handleMenuClick = (itemId) => {
    setActiveMenu(itemId);
    setMobileMenuOpen(false);
  };

  const handleNotificationClick = async () => {
    // Play bell sound when clicking notification
    playBellSound();
    
    if (!user?.userId) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/mark-read/${user.userId}`, { 
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Error marking notifications:", error);
    }

    setNotifications(0);
    setActiveMenu('profile');
    setMobileMenuOpen(false);
  };

  const handleAvatarClick = () => setShowDropdown(!showDropdown);
  const handleChangePassword = () => { alert("Navigate to Change Password Page"); setShowDropdown(false); };
  const handleViewKyc = () => { setActiveMenu('viewKyc'); setShowDropdown(false); };

  const displayName = user?.fullName || 'User';
  const firstName = displayName.split(' ')[0];

  return (
    <div className="dashboard-container">
      {/* TOP BAR */}
      <header className="top-bar" style={{ textDecoration: 'none' }}>
        <div className="top-bar-left">
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="dashboard-title" style={{ textDecoration: 'none' }}>
            <FaHome className="home-icon" />
            <span className="user-name">{firstName}</span>
          </h1>
        </div>

        <div className="top-bar-right">
          {/* NOTIFICATION BELL */}
          <div className={`notification-bell ${notifications > 0 ? 'has-notification' : ''}`} onClick={handleNotificationClick}>
            <FaBell size={20} className="bell-icon" />
            <span className={`notification-badge ${notifications > 0 ? "show" : "hide"}`}>
              {notifications > 99 ? '99+' : notifications}
            </span>
          </div>

          {/* AVATAR */}
          <div className="user-avatar" style={{ position: "relative" }}>
            <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
              {avatar ? (
                <img src={`${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${avatar}`} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar-placeholder">{firstName?.charAt(0)}</div>
              )}
            </div>

            {showDropdown && (
              <AvatarDropdown
                userId={user?.userId}
                onClose={() => setShowDropdown(false)}
                onChangePassword={handleChangePassword}
                onViewKyc={handleViewKyc}
              />
            )}
          </div>

          <span className="welcome-text">{firstName}</span>
          <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="dashboard-content">
        {/* SIDEBAR */}
        <nav className={`sidebar-cards ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="menu-cards-grid">
            {menuItems.map(item => {
              const isDisabled = ['loanrepay', 'profile'].includes(item.id);
              return (
                <div key={item.id} 
                     className={`menu-card ${activeMenu === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                     onClick={() => !isDisabled && handleMenuClick(item.id)}
                     style={{ borderLeftColor: item.color }}>
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

        {/* MAIN CONTENT */}
        <main className="main-content">
          {user ? renderContent() : (
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

export default CustomerView;