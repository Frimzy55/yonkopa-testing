// components/TopNavbar.jsx
import React, { memo } from 'react';

export const TopNavbar = memo(({
  getDisplayTitle,
  sidebarCollapsed,
  isMobile,
  toggleSidebar,
  isSummaryDropdownOpen,
  setIsSummaryDropdownOpen,
  summaryDropdownRef,
  handleSummarySelect,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  userDropdownRef,
  handleProfile,
  handleSettings,
  handleLogout
}) => {
  
  const toggleSummaryDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSummaryDropdownOpen(prev => !prev);
  };

  const toggleUserDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserDropdownOpen(prev => !prev);
  };

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
          {/* Portfolio Summary Dropdown */}
          <div className="dropdown" ref={summaryDropdownRef}>
            <button
              className="btn btn-white d-flex align-items-center gap-2 rounded-pill px-3 py-1 border"
              onClick={toggleSummaryDropdown}
              aria-expanded={isSummaryDropdownOpen}
              style={{ backgroundColor: '#fff', color: '#0d6efd' }}
            >
              <i className="bi bi-pie-chart"></i>
              <span className="d-none d-sm-block">Portfolio Summary</span>
              <i className={`bi ${isSummaryDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} small`}></i>
            </button>
            {isSummaryDropdownOpen && (
              <ul className="dropdown-menu show" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 40px)' }}>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('portfolio', 'Portfolio Summary')}>
                    <i className="bi bi-briefcase"></i> Portfolio Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('loan', 'Loan Summary')}>
                    <i className="bi bi-piggy-bank"></i> Loan Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('teller', 'Teller Summary')}>
                    <i className="bi bi-cash-stack"></i> Teller Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('risk', 'Risk Summary')}>
                    <i className="bi bi-exclamation-triangle"></i> Risk Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('authorization', 'Authorization Summary')}>
                    <i className="bi bi-shield-lock"></i> Authorization Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('revenue', 'Revenue vs Expense Summary')}>
                    <i className="bi bi-graph-up"></i> Revenue Against Expense Summary
                  </button>
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSummarySelect('kyc', 'KYC Summary')}>
                    <i className="bi bi-shield-check"></i> KYC Summary
                  </button>
                </li>
              </ul>
            )}
          </div>

          <button className="btn btn-light position-relative rounded-circle p-2">
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </button>

          {/* Admin User Dropdown */}
          <div className="dropdown" ref={userDropdownRef}>
            <button
              className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-2 px-md-3 py-1"
              onClick={toggleUserDropdown}
              aria-expanded={isUserDropdownOpen}
            >
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-person-fill"></i>
              </div>
              <span className="d-none d-sm-block">Admin User</span>
              <i className={`bi ${isUserDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} small d-none d-sm-block`}></i>
            </button>
            {isUserDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 45px)' }}>
                <li><button className="dropdown-item" onClick={handleProfile}><i className="bi bi-person me-2"></i>Profile</button></li>
                <li><button className="dropdown-item" onClick={handleSettings}><i className="bi bi-gear me-2"></i>Settings</button></li>
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