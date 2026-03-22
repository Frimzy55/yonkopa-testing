// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import CreateCustomer from './CreateCustomer';
import CustomerMaintenance from './CustomerMaintenance';
import Enquiries from './Enquiries';
import IndividualCustomer from './IndividualCustomer';
import CorporateCustomer from './CorporateCustomer';
import JointAccount from './JointAccount';
// Import account components
import CreateAccount from './CreateAccount';
import AccountList from './AccountList';
import CloseAccount from './CloseAccount';
// Import teller components
import TellerDeposit from './TellerDeposit';
import TellerWithdraw from './TellerWithdraw';
import TellerSummary from './TellerSummary';
// Import loan components
import LoanApplication from './LoanApplication';
import LoanApproval from './LoanApproval';
import LoanDisbursement from './LoanDisbursement';
import LoanRepayment from './LoanRepayment';
// Import internal accounts components
import GLAccounts from './GLAccounts';
import InternalTransfers from './InternalTransfers';
// Import admin components
import UserManagement from './UserManagement';
import Roles from './Roles';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandedSubMenus, setExpandedSubMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-sidebar') && !e.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // ==================== HANDLERS ====================
  const handleProfile = () => {
    navigate('/admin/profile');
  };

  const handleSettings = () => {
    navigate('/admin/settings');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSubMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const toggleNestedMenu = (parentMenu, subMenuName) => {
    const key = `${parentMenu}-${subMenuName}`;
    setExpandedSubMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    if (!item.subMenus) {
      setActiveSubMenu(null);
      setActiveNestedMenu(null);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleSubMenuClick = (parentMenu, subMenuName) => {
    setActiveMenu(parentMenu);
    setActiveSubMenu(subMenuName);
    setActiveNestedMenu(null);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleNestedMenuClick = (parentMenu, subMenuName, nestedMenuName) => {
    setActiveMenu(parentMenu);
    setActiveSubMenu(subMenuName);
    setActiveNestedMenu(nestedMenuName);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Menu items configuration with nested submenus
  const menuItems = [
    { name: 'Dashboard', icon: 'bi-speedometer2' },
    { 
      name: 'Customer', 
      icon: 'bi-people',
      subMenus: [
        { 
          name: 'Create Customer', 
          icon: 'bi-person-plus',
          nestedMenus: [
            { name: 'Individual Customer', icon: 'bi-person' },
            { name: 'Corporate Customer', icon: 'bi-building' },
            { name: 'Joint Account', icon: 'bi-people-fill' }
          ]
        },
        { name: 'Customer Maintenance', icon: 'bi-tools' },
        { name: 'Enquiries', icon: 'bi-question-circle' }
      ]
    },
    { 
      name: 'Account', 
      icon: 'bi-bank',
      subMenus: [
        { name: 'Create Account', icon: 'bi-plus-circle' },
        { name: 'Account List', icon: 'bi-list-ul' },
        { name: 'Close Account', icon: 'bi-x-circle' }
      ]
    },
    { 
      name: 'Teller', 
      icon: 'bi-cash-stack',
      subMenus: [
        { name: 'Teller Deposit', icon: 'bi-arrow-down-circle' },
        { name: 'Withdraw', icon: 'bi-arrow-up-circle' },
        { name: 'Teller Summary', icon: 'bi-bar-chart' }
      ]
    },
    { 
      name: 'Loans', 
      icon: 'bi-piggy-bank',
      subMenus: [
        { name: 'Loan Application', icon: 'bi-file-text' },
        { name: 'Loan Approval', icon: 'bi-check-circle' },
        { name: 'Loan Disbursement', icon: 'bi-cash' },
        { name: 'Loan Repayment', icon: 'bi-arrow-return-left' }
      ]
    },
    { 
      name: 'Internal Accounts', 
      icon: 'bi-diagram-3',
      subMenus: [
        { name: 'GL Accounts', icon: 'bi-journal-bookmark-fill' },
        { name: 'Internal Transfers', icon: 'bi-arrow-left-right' }
      ]
    },
    { 
      name: 'Admin', 
      icon: 'bi-shield-lock',
      subMenus: [
        { name: 'User Management', icon: 'bi-people' },
        { name: 'Roles', icon: 'bi-shield-check' }
      ]
    },
    { name: 'Reports', icon: 'bi-file-bar-graph' },
    { name: 'Batch Upload', icon: 'bi-cloud-upload' },
    { name: 'System Settings', icon: 'bi-gear' },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Get current display title
  const getDisplayTitle = () => {
    if (activeNestedMenu) {
      return activeNestedMenu;
    }
    if (activeSubMenu) {
      return activeSubMenu;
    }
    return activeMenu;
  };

  // Render content based on active menu/submenu/nested menu
  const renderContent = () => {
    // Customer Submenu Content
    if (activeMenu === 'Customer') {
      // Handle nested menus under Create Customer
      if (activeSubMenu === 'Create Customer') {
        switch(activeNestedMenu) {
          case 'Individual Customer':
            return <IndividualCustomer />;
          case 'Corporate Customer':
            return <CorporateCustomer />;
          case 'Joint Account':
            return <JointAccount />;
          default:
            return (
              <div className="bg-light p-4 rounded-3 text-center">
                <i className="bi bi-person-plus fs-1 text-secondary"></i>
                <p className="mt-2 mb-0">Please select a customer type to create.</p>
                <div className="mt-3">
                  <div className="row g-3">
                    <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-person fs-1 text-primary"></i>
                          <h6 className="mt-2">Individual Customer</h6>
                          <p className="small text-muted">For single person accounts</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-building fs-1 text-success"></i>
                          <h6 className="mt-2">Corporate Customer</h6>
                          <p className="small text-muted">For businesses and organizations</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-people-fill fs-1 text-info"></i>
                          <h6 className="mt-2">Joint Account</h6>
                          <p className="small text-muted">For multiple account holders</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        }
      }
      
      // Handle other submenus
      switch(activeSubMenu) {
        case 'Customer Maintenance':
          return <CustomerMaintenance />;
        case 'Enquiries':
          return <Enquiries />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-people fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a customer management option from the menu.</p>
            </div>
          );
      }
    }

    // Account Submenu Content
    if (activeMenu === 'Account') {
      switch(activeSubMenu) {
        case 'Create Account':
          return <CreateAccount />;
        case 'Account List':
          return <AccountList />;
        case 'Close Account':
          return <CloseAccount />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-bank fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an account management option from the menu.</p>
              <div className="mt-3">
                <div className="row g-3">
                  <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-plus-circle fs-1 text-primary"></i>
                        <h6 className="mt-2">Create Account</h6>
                        <p className="small text-muted">Open new bank accounts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-list-ul fs-1 text-success"></i>
                        <h6 className="mt-2">Account List</h6>
                        <p className="small text-muted">View all accounts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-x-circle fs-1 text-danger"></i>
                        <h6 className="mt-2">Close Account</h6>
                        <p className="small text-muted">Close existing accounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    // Teller Submenu Content
    if (activeMenu === 'Teller') {
      switch(activeSubMenu) {
        case 'Teller Deposit':
          return <TellerDeposit />;
        case 'Withdraw':
          return <TellerWithdraw />;
        case 'Teller Summary':
          return <TellerSummary />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-cash-stack fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a teller transaction option from the menu.</p>
              <div className="mt-3">
                <div className="row g-3">
                  <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-arrow-down-circle fs-1 text-success"></i>
                        <h6 className="mt-2">Teller Deposit</h6>
                        <p className="small text-muted">Process cash deposits</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-arrow-up-circle fs-1 text-danger"></i>
                        <h6 className="mt-2">Withdraw</h6>
                        <p className="small text-muted">Process cash withdrawals</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-bar-chart fs-1 text-primary"></i>
                        <h6 className="mt-2">Teller Summary</h6>
                        <p className="small text-muted">View daily transactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    // Loans Submenu Content
    if (activeMenu === 'Loans') {
      switch(activeSubMenu) {
        case 'Loan Application':
          return <LoanApplication />;
        case 'Loan Approval':
          return <LoanApproval />;
        case 'Loan Disbursement':
          return <LoanDisbursement />;
        case 'Loan Repayment':
          return <LoanRepayment />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-piggy-bank fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a loan management option from the menu.</p>
              <div className="mt-3">
                <div className="row g-3">
                  <div className="col-sm-12 col-md-3 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-file-text fs-1 text-primary"></i>
                        <h6 className="mt-2">Loan Application</h6>
                        <p className="small text-muted">Submit new loan requests</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-check-circle fs-1 text-success"></i>
                        <h6 className="mt-2">Loan Approval</h6>
                        <p className="small text-muted">Review and approve loans</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-cash fs-1 text-info"></i>
                        <h6 className="mt-2">Loan Disbursement</h6>
                        <p className="small text-muted">Release approved loans</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-arrow-return-left fs-1 text-warning"></i>
                        <h6 className="mt-2">Loan Repayment</h6>
                        <p className="small text-muted">Process loan payments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    // Internal Accounts Submenu Content
    if (activeMenu === 'Internal Accounts') {
      switch(activeSubMenu) {
        case 'GL Accounts':
          return <GLAccounts />;
        case 'Internal Transfers':
          return <InternalTransfers />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-diagram-3 fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an internal accounts option from the menu.</p>
              <div className="mt-3">
                <div className="row g-3">
                  <div className="col-sm-12 col-md-6 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-journal-bookmark-fill fs-1 text-primary"></i>
                        <h6 className="mt-2">GL Accounts</h6>
                        <p className="small text-muted">Manage General Ledger accounts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-arrow-left-right fs-1 text-success"></i>
                        <h6 className="mt-2">Internal Transfers</h6>
                        <p className="small text-muted">Process transfers between accounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    // Admin Submenu Content
    if (activeMenu === 'Admin') {
      switch(activeSubMenu) {
        case 'User Management':
          return <UserManagement />;
        case 'Roles':
          return <Roles />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-shield-lock fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an admin option from the menu.</p>
              <div className="mt-3">
                <div className="row g-3">
                  <div className="col-sm-12 col-md-6 mb-3 mb-md-0">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-people fs-1 text-primary"></i>
                        <h6 className="mt-2">User Management</h6>
                        <p className="small text-muted">Manage system users</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-shield-check fs-1 text-success"></i>
                        <h6 className="mt-2">Roles</h6>
                        <p className="small text-muted">Manage user roles and permissions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    // Other menu content
    if (activeMenu === 'Batch Upload') {
      return (
        <div className="mt-4 p-4 border rounded-3 bg-white">
          <input type="file" className="form-control mb-3" />
          <button className="btn btn-primary w-100 w-md-auto">
            <i className="bi bi-cloud-upload me-2"></i>Upload
          </button>
        </div>
      );
    }

    if (activeMenu === 'Dashboard') {
      return (
        <div className="mt-4">
          <h6>Recent Activities</h6>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Activity</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Customer Registered</td>
                  <td>10 mins ago</td>
                  <td><span className="badge bg-success">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default content for other menus
    return (
      <div className="bg-light p-4 rounded-3 text-center">
        <i className={`bi ${menuItems.find(m => m.name === activeMenu)?.icon || 'bi-grid'} fs-1 text-secondary`}></i>
        <p className="mt-2 mb-0">
          Manage your {activeMenu.toLowerCase()} here.
        </p>
      </div>
    );
  };

  // Sidebar content component (reused for both desktop and mobile)
  const SidebarContent = () => (
    <>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary flex-shrink-0">
        {(!sidebarCollapsed || isMobile) && (
          <h5 className="mb-0 text-white fw-bold">General Portal</h5>
        )}
        {!isMobile && (
          <button
            className="btn btn-sm btn-outline-light rounded-circle"
            onClick={toggleSidebar}
          >
            <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-chevron-left'}`}></i>
          </button>
        )}
        {isMobile && (
          <button
            className="btn btn-sm btn-outline-light rounded-circle"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      <div className="flex-grow-1 overflow-auto" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <ul className="nav nav-pills flex-column mb-auto mt-3 px-2">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item mb-2">
              <button
                onClick={() => {
                  if (item.subMenus) {
                    toggleSubMenu(item.name);
                  } else {
                    handleMenuClick(item);
                  }
                }}
                className={`nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                  activeMenu === item.name && !activeSubMenu && !activeNestedMenu
                    ? 'active bg-primary text-white'
                    : 'text-white-50 hover-bg-secondary'
                }`}
                style={{
                  borderRadius: '8px',
                  border: 'none',
                  padding: '10px 12px',
                }}
              >
                <div className="d-flex align-items-center">
                  <i className={`bi ${item.icon} fs-5`} style={{ minWidth: '28px' }}></i>
                  {(!sidebarCollapsed || isMobile) && <span className="ms-2">{item.name}</span>}
                </div>
                {(!sidebarCollapsed || isMobile) && item.subMenus && (
                  <i className={`bi ${expandedMenus[item.name] ? 'bi-chevron-down' : 'bi-chevron-right'} small`}></i>
                )}
              </button>
              
              {/* Submenu */}
              {(!sidebarCollapsed || isMobile) && item.subMenus && expandedMenus[item.name] && (
                <ul className="nav flex-column ms-4 mt-1">
                  {item.subMenus.map((subItem) => (
                    <li key={subItem.name}>
                      <button
                        onClick={() => {
                          if (subItem.nestedMenus) {
                            toggleNestedMenu(item.name, subItem.name);
                          } else {
                            handleSubMenuClick(item.name, subItem.name);
                          }
                        }}
                        className={`nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                          activeSubMenu === subItem.name && !activeNestedMenu
                            ? 'active bg-primary text-white'
                            : 'text-white-50 hover-bg-secondary'
                        }`}
                        style={{
                          borderRadius: '6px',
                          border: 'none',
                          padding: '6px 12px',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <i className={`bi ${subItem.icon} fs-6`} style={{ minWidth: '24px' }}></i>
                          <span className="ms-1">{subItem.name}</span>
                        </div>
                        {subItem.nestedMenus && (
                          <i className={`bi ${expandedSubMenus[`${item.name}-${subItem.name}`] ? 'bi-chevron-down' : 'bi-chevron-right'} small`}></i>
                        )}
                      </button>
                      
                      {/* Nested Menu */}
                      {subItem.nestedMenus && expandedSubMenus[`${item.name}-${subItem.name}`] && (
                        <ul className="nav flex-column ms-4 mt-1">
                          {subItem.nestedMenus.map((nestedItem) => (
                            <li key={nestedItem.name} className="nav-item mb-1">
                              <button
                                onClick={() => handleNestedMenuClick(item.name, subItem.name, nestedItem.name)}
                                className={`nav-link w-100 text-start d-flex align-items-center ${
                                  activeNestedMenu === nestedItem.name
                                    ? 'active bg-primary text-white'
                                    : 'text-white-50 hover-bg-secondary'
                                }`}
                                style={{
                                  borderRadius: '6px',
                                  border: 'none',
                                  padding: '6px 12px',
                                  fontSize: '0.85rem',
                                }}
                              >
                                <i className={`bi ${nestedItem.icon} fs-6`} style={{ minWidth: '24px' }}></i>
                                <span className="ms-1">{nestedItem.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-top border-secondary p-3 flex-shrink-0">
        {(!sidebarCollapsed || isMobile) ? (
          <div className="small text-white-50">
            <i className="bi bi-building me-1"></i> v2.0.0
          </div>
        ) : (
          <div className="text-center text-white-50 small">
            <i className="bi bi-building"></i>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`bg-dark text-white d-flex flex-column flex-shrink-0 transition-all ${
            sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
          }`}
          style={{
            width: sidebarCollapsed ? '80px' : '280px',
            transition: 'width 0.3s ease',
          }}
        >
          <SidebarContent />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileMenuOpen && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-index-1040"
            style={{ zIndex: 1040 }}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div 
            className="mobile-sidebar position-fixed top-0 start-0 h-100 bg-dark text-white d-flex flex-column"
            style={{ 
              width: '280px', 
              zIndex: 1045,
              transition: 'transform 0.3s ease',
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}
          >
            <SidebarContent />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 bg-light overflow-auto">
        {/* Top Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-md-4 py-2 sticky-top">
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
              <button className="btn btn-light position-relative rounded-circle p-2">
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>

              {/* USER DROPDOWN */}
              <div className="dropdown">
                <button
                  className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-2 px-md-3 py-1"
                  data-bs-toggle="dropdown"
                >
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{ width: '32px', height: '32px' }}>
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <span className="d-none d-sm-block">Admin User</span>
                  <i className="bi bi-chevron-down small d-none d-sm-block"></i>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li>
                    <button className="dropdown-item" onClick={handleProfile}>
                      <i className="bi bi-person me-2"></i>Profile
                    </button>
                  </li>

                  <li>
                    <button className="dropdown-item" onClick={handleSettings}>
                      <i className="bi bi-gear me-2"></i>Settings
                    </button>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="p-3 p-md-4">
          {/* Welcome Card */}
          <div className="card border-0 shadow-sm mb-3 mb-md-4">
            <div className="card-body bg-primary bg-opacity-10 rounded-3 p-3 p-md-4">
              <h4 className="mb-2 fs-5 fs-md-4">Welcome back, Admin!</h4>
              <p className="mb-0 text-secondary small">
                You are currently viewing: <strong>{getDisplayTitle()}</strong>
              </p>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-semibold fs-6 fs-md-5">{getDisplayTitle()} Section</h5>
            </div>

            <div className="card-body p-3 p-md-4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .hover-bg-secondary:hover {
          background-color: rgba(255,255,255,0.1) !important;
        }
        
        /* Custom scrollbar styling */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: #2c2c2c;
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background: #6c757d;
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #5a6268;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sidebar-expanded, .sidebar-collapsed {
            position: fixed;
            z-index: 1050;
            height: 100vh;
          }
          
          .table-responsive {
            font-size: 0.875rem;
          }
          
          .btn {
            font-size: 0.875rem;
          }
          
          .card-body {
            padding: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .p-4 {
            padding: 1rem !important;
          }
          
          h4 {
            font-size: 1.25rem;
          }
          
          .fs-1 {
            font-size: 2rem !important;
          }
        }
        
        /* Smooth transitions */
        .transition-all {
          transition: all 0.3s ease;
        }
        
        /* Z-index management */
        .z-index-1040 {
          z-index: 1040;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;