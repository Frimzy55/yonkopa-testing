// components/TopNavbar.jsx
import React, { memo } from 'react';

export const TopNavbar = memo(({
  getDisplayTitle,
  sidebarCollapsed,
  isMobile,
  toggleSidebar,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  userDropdownRef,
  handleProfile,
  handleLogout,
  user = {},
  currentDateTime = null
}) => {
  
  const toggleUserDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserDropdownOpen(prev => !prev);
  };

  // Get user display name (fallback to 'Loan Supervisor' or 'User')
  const displayName = user?.fullName || user?.name || 'Loan Supervisor';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-md-4 py-2 full-width-navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-2 mobile-menu-toggle"
            onClick={toggleSidebar}
            style={{ display: isMobile ? 'block' : 'none' }}
          >
            <i className="bi bi-list"></i>
          </button>
          <button
            className="btn btn-outline-secondary d-none d-md-block me-2"
            onClick={toggleSidebar}
            style={{ display: isMobile ? 'none' : 'block' }}
          >
            <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-chevron-left'}`}></i>
          </button>
          <span className="navbar-brand mb-0 h5 fw-semibold text-dark">
            {getDisplayTitle()}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 gap-md-3">
          {/* Professional time display - white text on primary (blue) background */}
          {currentDateTime && (
            <div className="d-none d-md-block">
              <div className="bg-primary text-white px-3 py-1 rounded-pill small fw-semibold">
                <i className="bi bi-clock me-2"></i>
                {currentDateTime}
              </div>
            </div>
          )}

          {/* Notification Bell (kept) */}
          <button className="btn btn-light position-relative rounded-circle p-2">
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </button>

          {/* User Dropdown – Settings removed */}
          <div className="dropdown" ref={userDropdownRef}>
            <button
              className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-2 px-md-3 py-1"
              onClick={toggleUserDropdown}
              aria-expanded={isUserDropdownOpen}
            >
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-person-fill"></i>
              </div>
              <span className="d-none d-sm-block">{displayName}</span>
              <i className={`bi ${isUserDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} small d-none d-sm-block`}></i>
            </button>
            {isUserDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 45px)' }}>
                <li><button className="dropdown-item" onClick={handleProfile}><i className="bi bi-person me-2"></i>Profile</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

TopNavbar.displayName = 'TopNavbar';