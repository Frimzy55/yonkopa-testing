// AdminDashboard.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import CustomerMaintenance from './customer/CustomerMaintenance';
import Enquiries from './customer/Enquiries';
import IndividualCustomer from './customer/create-customer/IndividualCustomer';
import CorporateCustomer from './customer/create-customer/CorporateCustomer';
import JointAccount from './customer/create-customer/SolidarityGroup';

import CreateAccount from './Account/CreateAccount';
import AccountList from './Account/AccountList';
import CloseAccount from './Account/CloseAccount';

import TellerDeposit from './teller/TellerDeposit';
import TellerWithdraw from './teller/TellerWithdraw';
import TellerSummary from './teller/TellerSummary';

import LoanApplication from './loans/LoanApplication';
import LoanApproval from './loans/LoanApproval';
import LoanDisbursement from './loans/LoanDisbursement';
import LoanRepayment from './loans/LoanRepayment';

import GLAccounts from './internal-account/GLAccounts';
import InternalTransfers from './internal-account/InternalTransfers';

import UserManagement from './UserManagement';
import Roles from './Roles';
//reports//
import LoanReports from './reports/LoanReports';
import CustomerReports from './reports/CustomerReports';
import KYCComplianceReports from './reports/KYCComplianceReports';
import TellerReports from './reports/TellerReports';
import SavingsAccountReports from './reports/SavingsAccountReports';
import CollectionReports from './reports/CollectionReports';
import RiskReports from './reports/RiskReports';
import AuthorizationReports from './reports/AuthorizationReports';
import FinancialReports from './reports/FinancialReports';
import InternalAccountGLReports from './reports/InternalAccountGLReports';
import PendingKYCReport from './reports/kyc-reports/PendingKYCReport';
import VerifiedKYCReport from './reports/kyc-reports/VerifiedKYCReport';
import RejectedKYCReport from './reports/kyc-reports/RejectedKYCReport';
import ExpiredIDReport from './reports/kyc-reports/ExpiredIDReport';
import PEPScreeningReport from './reports/kyc-reports/PEPScreeningReport';
import HighRiskCustomerReport from './reports/kyc-reports/HighRiskCustomerReport';
import LoanPortfolioReport from './reports/loan-reports/LoanPortfolioReport';
import LoanDisbursementReport from './reports/loan-reports/LoanDisbursementReport';
import LoanRepaymentReport from './reports/loan-reports/LoanRepaymentReport';
import LoanArrearsReport from './reports/loan-reports/LoanArrearsReport';
import PortfolioAtRiskReport from './reports/loan-reports/PortfolioAtRiskReport';
import NonPerformingLoansReport from './reports/loan-reports/NonPerformingLoansReport';
import LoanAgingAnalysisReport from './reports/loan-reports/LoanAgingAnalysisReport';
import WrittenOffLoansReport from './reports/loan-reports/WrittenOffLoansReport';
import CustomerMasterList from './reports/customer-reports/CustomerMasterList';
import NewCustomersReport from './reports/customer-reports/NewCustomersReport';
import ActiveCustomersReport from './reports/customer-reports/ActiveCustomersReport';
import DormantCustomersReport from './reports/customer-reports/DormantCustomersReport';
import CustomerByBranchReport from './reports/customer-reports/CustomerByBranchReport';
import CustomerByRelationshipOfficerReport from './reports/customer-reports/CustomerByRelationshipOfficerReport';
import DailyTellerTransactionsReport from './reports/teller-reports/DailyTellerTransactionsReport';
import DepositReport from './reports/teller-reports/DepositReport';
import WithdrawalReport from './reports/teller-reports/WithdrawalReport';
import TellerBalancingReport from './reports/teller-reports/TellerBalancingReport';
import BranchCashSummaryReport from './reports/teller-reports/BranchCashSummaryReport';

// Import Savings Account Reports
import SavingsAccountListing from './reports/savings-reports/SavingsAccountListing';
import NewAccountsOpenedReport from './reports/savings-reports/NewAccountsOpenedReport';
import ClosedAccountsReport from './reports/savings-reports/ClosedAccountsReport';
import DormantAccountsReport from './reports/savings-reports/DormantAccountsReport';
import AccountBalanceReport from './reports/savings-reports/AccountBalanceReport';

// Import Collection Reports
import CollectionPerformanceReport from './reports/collection-reports/CollectionPerformanceReport';
import ExpectedVsActualCollections from './reports/collection-reports/ExpectedVsActualCollections';
import DailyCollectionSheet from './reports/collection-reports/DailyCollectionSheet';
import MissedPaymentReport from './reports/collection-reports/MissedPaymentReport';
import RecoveryFollowUpReport from './reports/collection-reports/RecoveryFollowUpReport';

// Import Risk Reports
import PortfolioAtRiskReportRisk from './reports/risk-reports/PortfolioAtRiskReport';
import PARGreaterThan30DaysReport from './reports/risk-reports/PARGreaterThan30DaysReport';
import DelinquencyTrendReport from './reports/risk-reports/DelinquencyTrendReport';
import TopExposureCustomersReport from './reports/risk-reports/TopExposureCustomersReport';

// Import Authorization Reports
import PendingCustomerAuthorization from './reports/authorization-reports/PendingCustomerAuthorization';
import PendingLoanAuthorization from './reports/authorization-reports/PendingLoanAuthorization';
import PendingAccountAuthorization from './reports/authorization-reports/PendingAccountAuthorization';

// Import Financial Reports
import RevenueReport from './reports/financial-reports/RevenueReport';
import ExpenseReport from './reports/financial-reports/ExpenseReport';
import RevenueVsExpenseReport from './reports/financial-reports/RevenueVsExpenseReport';

// Import GL Transaction Report
import GLTransactionReport from './reports/gl-reports/GLTransactionReport';

// Import Batch Upload Components
import UploadCustomers from './batch-upload/UploadCustomers';
import UploadLoans from './batch-upload/UploadLoans';

// Import System Settings Components
import Branches from './system-settings/Branches';
import Configurations from './system-settings/Configurations';

// Import Portfolio Summary Components (create these if needed)
// For now, we'll create placeholder components
const PortfolioSummary = () => (
  <div className="p-4">
    <h4>Portfolio Summary</h4>
    <p>Total Portfolio Value: $1,234,567</p>
    <p>Active Loans: 456</p>
    <p>Average Loan Size: $2,707</p>
    <p>Total Customers: 1,234</p>
    <p>Active Accounts: 987</p>
  </div>
);

const LoanSummary = () => (
  <div className="p-4">
    <h4>Loan Summary</h4>
    <p>Total Disbursed: $987,654</p>
    <p>Total Repaid: $654,321</p>
    <p>Outstanding Balance: $333,333</p>
    <p>Active Loans: 456</p>
    <p>Default Rate: 3.2%</p>
  </div>
);

const TellerSummaryComponent = () => (
  <div className="p-4">
    <h4>Teller Summary</h4>
    <p>Total Deposits Today: $45,678</p>
    <p>Total Withdrawals Today: $23,456</p>
    <p>Net Cash Flow: $22,222</p>
    <p>Transactions Today: 156</p>
    <p>Active Tellers: 8</p>
  </div>
);

const RiskSummary = () => (
  <div className="p-4">
    <h4>Risk Summary</h4>
    <p>Portfolio at Risk: 12.5%</p>
    <p>Non-Performing Loans: 5.2%</p>
    <p>High Risk Customers: 23</p>
    <p>PAR  30 Days: $45,678</p>
    <p>Credit Risk Score: 78/100</p>
  </div>
);

const AuthorizationSummary = () => (
  <div className="p-4">
    <h4>Authorization Summary</h4>
    <p>Pending Customer Approvals: 15</p>
    <p>Pending Loan Approvals: 8</p>
    <p>Pending Account Approvals: 12</p>
    <p>Pending Transactions: 24</p>
    <p>Pending KYC Reviews: 7</p>
  </div>
);

const RevenueVsExpenseSummary = () => (
  <div className="p-4">
    <h4>Revenue vs Expense Summary</h4>
    <p>Total Revenue: $567,890</p>
    <p>Total Expenses: $345,678</p>
    <p>Net Profit: $222,212</p>
    <p>Profit Margin: 39.1%</p>
    <p>Revenue Growth: +12.5%</p>
  </div>
);

const KYCSummary = () => (
  <div className="p-4">
    <h4>KYC Summary</h4>
    <p>Pending KYC: 45</p>
    <p>Verified KYC: 890</p>
    <p>Rejected KYC: 12</p>
    <p>Expired IDs: 23</p>
    <p>PEP Customers: 5</p>
    <p>Compliance Rate: 94%</p>
  </div>
);

const AdminDashboard = () => {
  const [navigation, setNavigation] = useState({
    activeMenu: 'Dashboard',
    activeSubMenu: null,
    activeNestedMenu: null,
    activeReportType: null,
    activeReportName: null
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandedSubMenus, setExpandedSubMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState('portfolio');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const contentAreaRef = useRef(null);
  const summaryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Store scroll positions for different sections
  const scrollPositions = useRef({
    Dashboard: 0,
    Customer: {},
    Account: {},
    Teller: {},
    Loans: {},
    'Internal Accounts': {},
    Admin: {},
    Reports: {},
    'Batch Upload': {},
    'System Settings': {}
  });

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (summaryDropdownRef.current && !summaryDropdownRef.current.contains(event.target)) {
        setIsSummaryDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save scroll position for current section
  const saveCurrentScrollPosition = useCallback(() => {
    if (!contentAreaRef.current) return;
    
    const currentScrollTop = contentAreaRef.current.scrollTop;
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportName } = navigation;
    
    // Create a unique key for the current view
    let scrollKey = activeMenu;
    if (activeSubMenu) scrollKey = `${activeMenu}-${activeSubMenu}`;
    if (activeNestedMenu) scrollKey = `${activeMenu}-${activeSubMenu}-${activeNestedMenu}`;
    if (activeReportName) scrollKey = `Reports-${activeReportName}`;
    
    // Save scroll position
    scrollPositions.current[scrollKey] = currentScrollTop;
    
    // Also save to sessionStorage for persistence
    sessionStorage.setItem(`scroll_${scrollKey}`, currentScrollTop);
  }, [navigation]);

  // Restore scroll position for current section
  const restoreScrollPosition = useCallback(() => {
    if (!contentAreaRef.current) return;
    
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportName } = navigation;
    
    // Create a unique key for the current view
    let scrollKey = activeMenu;
    if (activeSubMenu) scrollKey = `${activeMenu}-${activeSubMenu}`;
    if (activeNestedMenu) scrollKey = `${activeMenu}-${activeSubMenu}-${activeNestedMenu}`;
    if (activeReportName) scrollKey = `Reports-${activeReportName}`;
    
    // Get saved scroll position
    let savedPosition = scrollPositions.current[scrollKey];
    if (savedPosition === undefined) {
      savedPosition = sessionStorage.getItem(`scroll_${scrollKey}`);
      if (savedPosition) {
        savedPosition = parseInt(savedPosition);
        scrollPositions.current[scrollKey] = savedPosition;
      }
    }
    
    // Restore scroll position if exists
    if (savedPosition && !isNaN(savedPosition)) {
      setTimeout(() => {
        if (contentAreaRef.current) {
          contentAreaRef.current.scrollTop = savedPosition;
        }
      }, 50);
    } else {
      // If no saved position, scroll to top
      setTimeout(() => {
        if (contentAreaRef.current) {
          contentAreaRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [navigation]);

  // Save scroll position on scroll
  useEffect(() => {
    const scrollContainer = contentAreaRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        saveCurrentScrollPosition();
      };
      
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [saveCurrentScrollPosition]);

  // Restore scroll position when navigation changes
  useEffect(() => {
    restoreScrollPosition();
  }, [navigation.activeMenu, navigation.activeSubMenu, navigation.activeNestedMenu, navigation.activeReportName, restoreScrollPosition]);

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
  const handleProfile = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsUserDropdownOpen(false);
    navigate('/admin/profile');
  }, [navigate]);

  const handleSettings = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsUserDropdownOpen(false);
    navigate('/admin/settings');
  }, [navigate]);

  const handleLogout = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsUserDropdownOpen(false);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const handleSummarySelect = useCallback((summaryType, summaryName) => {
    setSelectedSummary(summaryType);
    setShowSummaryModal(true);
    setIsSummaryDropdownOpen(false);
  }, []);

  const closeSummaryModal = useCallback(() => {
    setShowSummaryModal(false);
  }, []);

  const toggleSummaryDropdown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSummaryDropdownOpen(prev => !prev);
  }, []);

  const toggleUserDropdown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserDropdownOpen(prev => !prev);
  }, []);

  const toggleSubMenu = useCallback((menuName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  }, []);

  const toggleNestedMenu = useCallback((parentMenu, subMenuName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const key = `${parentMenu}-${subMenuName}`;
    setExpandedSubMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const handleMenuClick = useCallback((item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Save current scroll position before changing
    saveCurrentScrollPosition();
    
    setNavigation({
      activeMenu: item.name,
      activeSubMenu: null,
      activeNestedMenu: null,
      activeReportType: null,
      activeReportName: null
    });
    
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, saveCurrentScrollPosition]);

  const handleSubMenuClick = useCallback((parentMenu, subMenuName, hasNestedOrReports = false, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Save current scroll position before changing
    saveCurrentScrollPosition();
    
    setNavigation({
      activeMenu: parentMenu,
      activeSubMenu: subMenuName,
      activeNestedMenu: null,
      activeReportType: null,
      activeReportName: null
    });
    
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, saveCurrentScrollPosition]);

  const handleNestedMenuClick = useCallback((parentMenu, subMenuName, nestedMenuName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Save current scroll position before changing
    saveCurrentScrollPosition();
    
    setNavigation({
      activeMenu: parentMenu,
      activeSubMenu: subMenuName,
      activeNestedMenu: nestedMenuName,
      activeReportType: null,
      activeReportName: null
    });
    
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, saveCurrentScrollPosition]);

  const handleReportClick = useCallback((reportType, reportName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Save current scroll position before changing
    saveCurrentScrollPosition();
    
    setNavigation({
      activeMenu: 'Reports',
      activeSubMenu: reportType,
      activeNestedMenu: null,
      activeReportType: reportType,
      activeReportName: reportName
    });
    
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, saveCurrentScrollPosition]);

  const getDisplayTitle = useCallback(() => {
    if (navigation.activeReportName) {
      return navigation.activeReportName;
    }
    if (navigation.activeNestedMenu) {
      return navigation.activeNestedMenu;
    }
    if (navigation.activeSubMenu) {
      return navigation.activeSubMenu;
    }
    return navigation.activeMenu;
  }, [navigation]);

  const handleMouseEnter = useCallback((itemId) => {
    setHoveredItem(itemId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // ==================== MENU HELPER FUNCTIONS ====================
  const getMenuItemId = useCallback((item, level, parent = null) => {
    if (level === 'main') return `main-${item.name}`;
    if (level === 'sub') return `sub-${parent}-${item.name}`;
    if (level === 'nested') return `nested-${parent}-${item.name}`;
    if (level === 'report') return `report-${parent}-${item.name}`;
    return item.name;
  }, []);

  const isMainMenuActive = useCallback((item) => {
    return navigation.activeMenu === item.name && 
           !navigation.activeSubMenu && 
           !navigation.activeNestedMenu && 
           !navigation.activeReportName;
  }, [navigation]);

  const isSubMenuActive = useCallback((subItem) => {
    return navigation.activeSubMenu === subItem.name && 
           !navigation.activeNestedMenu && 
           !navigation.activeReportName;
  }, [navigation]);

  const isReportActive = useCallback((reportName) => {
    return navigation.activeReportName === reportName;
  }, [navigation]);

  const isNestedActive = useCallback((nestedName) => {
    return navigation.activeNestedMenu === nestedName;
  }, [navigation]);

  // ==================== MENU ITEMS ====================
  const menuItems = useMemo(() => [
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
            { name: 'Solidarity Group', icon: 'bi-people-fill' }
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
    { 
      name: 'Reports', 
      icon: 'bi-file-bar-graph',
      subMenus: [
        { 
          name: 'Loan Reports', 
          icon: 'bi-piggy-bank',
          reportType: 'Loan Reports',
          reports: [
            { name: 'Loan Portfolio Report', icon: 'bi-bank' },
            { name: 'Loan Disbursement Report', icon: 'bi-cash' },
            { name: 'Loan Repayment Report', icon: 'bi-arrow-return-left' },
            { name: 'Loan Arrears Report', icon: 'bi-exclamation-triangle' },
            { name: 'Portfolio At Risk (PAR) Report', icon: 'bi-graph-up' },
            { name: 'Non-Performing Loans Report', icon: 'bi-flag' },
            { name: 'Loan Aging Analysis Report', icon: 'bi-calendar' },
            { name: 'Written-Off Loans Report', icon: 'bi-trash' }
          ]
        },
        { 
          name: 'Customer Reports', 
          icon: 'bi-people',
          reportType: 'Customer Reports',
          reports: [
            { name: 'Customer Master List', icon: 'bi-list-ul' },
            { name: 'New Customers Report', icon: 'bi-person-plus' },
            { name: 'Active Customers Report', icon: 'bi-person-check' },
            { name: 'Dormant Customers Report', icon: 'bi-person-x' },
            { name: 'Customer by Branch Report', icon: 'bi-building' },
            { name: 'Customer by Relationship Officer Report', icon: 'bi-person-badge' }
          ]
        },
        { 
          name: 'KYC & Compliance Reports', 
          icon: 'bi-shield-check',
          reportType: 'KYC & Compliance Reports',
          reports: [
            { name: 'Pending KYC Report', icon: 'bi-hourglass-split' },
            { name: 'Verified KYC Report', icon: 'bi-check-circle-fill' },
            { name: 'Rejected KYC Report', icon: 'bi-x-circle-fill' },
            { name: 'Expired ID Report', icon: 'bi-calendar-x' },
            { name: 'PEP Screening Report', icon: 'bi-shield-shaded' },
            { name: 'High Risk Customer Report', icon: 'bi-exclamation-triangle-fill' }
          ]
        },
        { 
          name: 'Teller Reports', 
          icon: 'bi-cash-stack',
          reportType: 'Teller Reports',
          reports: [
            { name: 'Daily Teller Transactions Report', icon: 'bi-calendar-day' },
            { name: 'Deposit Report', icon: 'bi-arrow-down-circle' },
            { name: 'Withdrawal Report', icon: 'bi-arrow-up-circle' },
            { name: 'Teller Balancing Report', icon: 'bi-calculator' },
            { name: 'Branch Cash Summary Report', icon: 'bi-building' }
          ]
        },
        { 
          name: 'Savings / Account Reports', 
          icon: 'bi-bank',
          reportType: 'Savings / Account Reports',
          reports: [
            { name: 'Savings Account Listing', icon: 'bi-list-ul' },
            { name: 'New Accounts Opened Report', icon: 'bi-plus-circle' },
            { name: 'Closed Accounts Report', icon: 'bi-x-circle' },
            { name: 'Dormant Accounts Report', icon: 'bi-moon' },
            { name: 'Account Balance Report', icon: 'bi-calculator' }
          ]
        },
        { 
          name: 'Collection Reports', 
          icon: 'bi-receipt',
          reportType: 'Collection Reports',
          reports: [
            { name: 'Collection Performance Report', icon: 'bi-graph-up' },
            { name: 'Expected vs Actual Collections', icon: 'bi-bar-chart-steps' },
            { name: 'Daily Collection Sheet', icon: 'bi-calendar-check' },
            { name: 'Missed Payment Report', icon: 'bi-exclamation-circle' },
            { name: 'Recovery Follow-up Report', icon: 'bi-telephone' }
          ]
        },
        { 
          name: 'Risk Reports', 
          icon: 'bi-exclamation-triangle',
          reportType: 'Risk Reports',
          reports: [
            { name: 'Portfolio At Risk Report', icon: 'bi-pie-chart' },
            { name: 'PAR > 30 Days Report', icon: 'bi-exclamation-triangle-fill' },
            { name: 'Delinquency Trend Report', icon: 'bi-graph-up' },
            { name: 'Top Exposure Customers Report', icon: 'bi-trophy' }
          ]
        },
        { 
          name: 'Authorization Reports', 
          icon: 'bi-shield-lock',
          reportType: 'Authorization Reports',
          reports: [
            { name: 'Pending Customer Authorization', icon: 'bi-person-check' },
            { name: 'Pending Loan Authorization', icon: 'bi-file-check' },
            { name: 'Pending Account Authorization', icon: 'bi-bank-check' }
          ]
        },
        { 
          name: 'Financial Reports', 
          icon: 'bi-graph-up',
          reportType: 'Financial Reports',
          reports: [
            { name: 'Revenue Report', icon: 'bi-cash-stack' },
            { name: 'Expense Report', icon: 'bi-receipt' },
            { name: 'Revenue vs Expense', icon: 'bi-bar-chart-steps' }
          ]
        },
        { 
          name: 'Internal Account / GL Reports', 
          icon: 'bi-diagram-3',
          reportType: 'Internal Account / GL Reports',
          reports: [
            { name: 'GL Transaction Report', icon: 'bi-journal-bookmark-fill' }
          ]
        }
      ]
    },
    { 
      name: 'Batch Upload', 
      icon: 'bi-cloud-upload',
      subMenus: [
        { name: 'Upload Customers', icon: 'bi-person-plus' },
        { name: 'Upload Loans', icon: 'bi-piggy-bank' }
      ]
    },
    { 
      name: 'System Settings', 
      icon: 'bi-gear',
      subMenus: [
        { name: 'Branches', icon: 'bi-building' },
        { name: 'Configurations', icon: 'bi-sliders2' }
      ]
    },
  ], []);

  const toggleSidebar = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  }, [isMobile, mobileMenuOpen]);

  // ==================== SIDEBAR CONTENT ====================
  const SidebarContent = useCallback(() => (
    <>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary flex-shrink-0">
        {(!sidebarCollapsed || isMobile) && (
          <h5 className="mb-0 text-white fw-bold">General Portal</h5>
        )}
        {!isMobile && (
          <button
            className="btn btn-sm btn-outline-light rounded-circle sidebar-toggle"
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

      <div className="flex-grow-1 overflow-auto sidebar-menu-container" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <ul className="nav nav-pills flex-column mb-auto mt-3 px-2">
          {menuItems.map((item) => {
            const mainItemId = getMenuItemId(item, 'main');
            const isMainActive = isMainMenuActive(item);
            const isMainHovered = hoveredItem === mainItemId;
            
            return (
              <li key={item.name} className="nav-item mb-1">
                <button
                  id={mainItemId}
                  onClick={(e) => {
                    if (item.subMenus) {
                      toggleSubMenu(item.name, e);
                    } else {
                      handleMenuClick(item, e);
                    }
                  }}
                  onMouseEnter={() => handleMouseEnter(mainItemId)}
                  onMouseLeave={handleMouseLeave}
                  className={`menu-item nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                    isMainActive ? 'active' : ''
                  } ${isMainHovered && !isMainActive ? 'hovered' : ''}`}
                >
                  <div className="d-flex align-items-center">
                    <i className={`bi ${item.icon} menu-icon`}></i>
                    {(!sidebarCollapsed || isMobile) && <span className="menu-text ms-2">{item.name}</span>}
                  </div>
                  {(!sidebarCollapsed || isMobile) && item.subMenus && (
                    <i className={`bi ${expandedMenus[item.name] ? 'bi-chevron-down' : 'bi-chevron-right'} menu-arrow`}></i>
                  )}
                </button>
                
                {(!sidebarCollapsed || isMobile) && item.subMenus && expandedMenus[item.name] && (
                  <ul className="nav flex-column ms-3 mt-1 submenu-container">
                    {item.subMenus.map((subItem) => {
                      const subItemId = getMenuItemId(subItem, 'sub', item.name);
                      const isSubActive = isSubMenuActive(subItem);
                      const isSubHovered = hoveredItem === subItemId;
                      
                      return (
                        <li key={subItem.name} className="nav-item">
                          <button
                            id={subItemId}
                            onClick={(e) => {
                              if (subItem.reports || subItem.nestedMenus) {
                                toggleNestedMenu(item.name, subItem.name, e);
                              } else {
                                handleSubMenuClick(item.name, subItem.name, false, e);
                              }
                            }}
                            onMouseEnter={() => handleMouseEnter(subItemId)}
                            onMouseLeave={handleMouseLeave}
                            className={`submenu-item nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                              isSubActive ? 'active' : ''
                            } ${isSubHovered && !isSubActive ? 'hovered' : ''}`}
                          >
                            <div className="d-flex align-items-center">
                              <i className={`bi ${subItem.icon} submenu-icon`}></i>
                              <span className="submenu-text ms-2">{subItem.name}</span>
                            </div>
                            {(subItem.reports || subItem.nestedMenus) && (
                              <i className={`bi ${expandedSubMenus[`${item.name}-${subItem.name}`] ? 'bi-chevron-down' : 'bi-chevron-right'} submenu-arrow`}></i>
                            )}
                          </button>
                          
                          {subItem.reports && expandedSubMenus[`${item.name}-${subItem.name}`] && (
                            <ul className="nav flex-column ms-3 mt-1 report-container">
                              {subItem.reports.map((report) => {
                                const reportId = getMenuItemId(report, 'report', subItem.name);
                                const isReportActiveFlag = isReportActive(report.name);
                                const isReportHovered = hoveredItem === reportId;
                                
                                return (
                                  <li key={report.name} className="nav-item">
                                    <button
                                      id={reportId}
                                      onClick={(e) => handleReportClick(subItem.reportType, report.name, e)}
                                      onMouseEnter={() => handleMouseEnter(reportId)}
                                      onMouseLeave={handleMouseLeave}
                                      className={`report-item nav-link w-100 text-start d-flex align-items-center ${
                                        isReportActiveFlag ? 'active' : ''
                                      } ${isReportHovered && !isReportActiveFlag ? 'hovered' : ''}`}
                                    >
                                      <i className={`bi ${report.icon} report-icon`}></i>
                                      <span className="report-text ms-2">{report.name}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          
                          {subItem.nestedMenus && expandedSubMenus[`${item.name}-${subItem.name}`] && (
                            <ul className="nav flex-column ms-3 mt-1 nested-container">
                              {subItem.nestedMenus.map((nestedItem) => {
                                const nestedId = getMenuItemId(nestedItem, 'nested', subItem.name);
                                const isNestedActiveFlag = isNestedActive(nestedItem.name);
                                const isNestedHovered = hoveredItem === nestedId;
                                
                                return (
                                  <li key={nestedItem.name} className="nav-item">
                                    <button
                                      id={nestedId}
                                      onClick={(e) => handleNestedMenuClick(item.name, subItem.name, nestedItem.name, e)}
                                      onMouseEnter={() => handleMouseEnter(nestedId)}
                                      onMouseLeave={handleMouseLeave}
                                      className={`nested-item nav-link w-100 text-start d-flex align-items-center ${
                                        isNestedActiveFlag ? 'active' : ''
                                      } ${isNestedHovered && !isNestedActiveFlag ? 'hovered' : ''}`}
                                    >
                                      <i className={`bi ${nestedItem.icon} nested-icon`}></i>
                                      <span className="nested-text ms-2">{nestedItem.name}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
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
  ), [
    sidebarCollapsed, 
    isMobile, 
    expandedMenus, 
    expandedSubMenus, 
    hoveredItem, 
    menuItems,
    getMenuItemId, 
    isMainMenuActive, 
    isSubMenuActive, 
    isReportActive, 
    isNestedActive, 
    toggleSubMenu, 
    toggleNestedMenu, 
    handleMenuClick, 
    handleSubMenuClick, 
    handleReportClick, 
    handleNestedMenuClick, 
    handleMouseEnter, 
    handleMouseLeave, 
    toggleSidebar
  ]);

  // ==================== RENDER SUMMARY MODAL ====================
  const renderSummaryModal = () => {
    if (!showSummaryModal) return null;

    let summaryContent = null;
    let modalTitle = '';
    switch(selectedSummary) {
      case 'portfolio':
        summaryContent = <PortfolioSummary />;
        modalTitle = 'Portfolio Summary';
        break;
      case 'loan':
        summaryContent = <LoanSummary />;
        modalTitle = 'Loan Summary';
        break;
      case 'teller':
        summaryContent = <TellerSummaryComponent />;
        modalTitle = 'Teller Summary';
        break;
      case 'risk':
        summaryContent = <RiskSummary />;
        modalTitle = 'Risk Summary';
        break;
      case 'authorization':
        summaryContent = <AuthorizationSummary />;
        modalTitle = 'Authorization Summary';
        break;
      case 'revenue':
        summaryContent = <RevenueVsExpenseSummary />;
        modalTitle = 'Revenue vs Expense Summary';
        break;
      case 'kyc':
        summaryContent = <KYCSummary />;
        modalTitle = 'KYC Summary';
        break;
      default:
        summaryContent = <PortfolioSummary />;
        modalTitle = 'Portfolio Summary';
    }

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" className="btn-close" onClick={closeSummaryModal}></button>
            </div>
            <div className="modal-body">
              {summaryContent}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeSummaryModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER CONTENT ====================
  const renderContent = useCallback(() => {
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportType, activeReportName } = navigation;

    if (activeMenu === 'Customer') {
      if (activeSubMenu === 'Create Customer') {
        switch(activeNestedMenu) {
          case 'Individual Customer':
            return <IndividualCustomer />;
          case 'Corporate Customer':
            return <CorporateCustomer />;
          case 'Solidarity Group':
            return <JointAccount />;
          default:
            return (
              <div className="bg-light p-4 rounded-3 text-center">
                <i className="bi bi-person-plus fs-1 text-secondary"></i>
                <p className="mt-2 mb-0">Please select a customer type to create.</p>
              </div>
            );
        }
      }
      
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
            </div>
          );
      }
    }

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
            </div>
          );
      }
    }

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
            </div>
          );
      }
    }

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
            </div>
          );
      }
    }

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
            </div>
          );
      }
    }

    if (activeMenu === 'Reports') {
      if (activeReportType === 'Loan Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Loan Portfolio Report':
            return <LoanPortfolioReport />;
          case 'Loan Disbursement Report':
            return <LoanDisbursementReport />;
          case 'Loan Repayment Report':
            return <LoanRepaymentReport />;
          case 'Loan Arrears Report':
            return <LoanArrearsReport />;
          case 'Portfolio At Risk (PAR) Report':
            return <PortfolioAtRiskReport />;
          case 'Non-Performing Loans Report':
            return <NonPerformingLoansReport />;
          case 'Loan Aging Analysis Report':
            return <LoanAgingAnalysisReport />;
          case 'Written-Off Loans Report':
            return <WrittenOffLoansReport />;
          default:
            return <LoanReports />;
        }
      }
      
      if (activeReportType === 'Customer Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Customer Master List':
            return <CustomerMasterList />;
          case 'New Customers Report':
            return <NewCustomersReport />;
          case 'Active Customers Report':
            return <ActiveCustomersReport />;
          case 'Dormant Customers Report':
            return <DormantCustomersReport />;
          case 'Customer by Branch Report':
            return <CustomerByBranchReport />;
          case 'Customer by Relationship Officer Report':
            return <CustomerByRelationshipOfficerReport />;
          default:
            return <CustomerReports />;
        }
      }
      
      if (activeReportType === 'KYC & Compliance Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Pending KYC Report':
            return <PendingKYCReport />;
          case 'Verified KYC Report':
            return <VerifiedKYCReport />;
          case 'Rejected KYC Report':
            return <RejectedKYCReport />;
          case 'Expired ID Report':
            return <ExpiredIDReport />;
          case 'PEP Screening Report':
            return <PEPScreeningReport />;
          case 'High Risk Customer Report':
            return <HighRiskCustomerReport />;
          default:
            return <KYCComplianceReports />;
        }
      }
      
      if (activeReportType === 'Teller Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Daily Teller Transactions Report':
            return <DailyTellerTransactionsReport />;
          case 'Deposit Report':
            return <DepositReport />;
          case 'Withdrawal Report':
            return <WithdrawalReport />;
          case 'Teller Balancing Report':
            return <TellerBalancingReport />;
          case 'Branch Cash Summary Report':
            return <BranchCashSummaryReport />;
          default:
            return <TellerReports />;
        }
      }

      if (activeReportType === 'Savings / Account Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Savings Account Listing':
            return <SavingsAccountListing />;
          case 'New Accounts Opened Report':
            return <NewAccountsOpenedReport />;
          case 'Closed Accounts Report':
            return <ClosedAccountsReport />;
          case 'Dormant Accounts Report':
            return <DormantAccountsReport />;
          case 'Account Balance Report':
            return <AccountBalanceReport />;
          default:
            return <SavingsAccountReports />;
        }
      }

      if (activeReportType === 'Collection Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Collection Performance Report':
            return <CollectionPerformanceReport />;
          case 'Expected vs Actual Collections':
            return <ExpectedVsActualCollections />;
          case 'Daily Collection Sheet':
            return <DailyCollectionSheet />;
          case 'Missed Payment Report':
            return <MissedPaymentReport />;
          case 'Recovery Follow-up Report':
            return <RecoveryFollowUpReport />;
          default:
            return <CollectionReports />;
        }
      }

      if (activeReportType === 'Risk Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Portfolio At Risk Report':
            return <PortfolioAtRiskReportRisk />;
          case 'PAR > 30 Days Report':
            return <PARGreaterThan30DaysReport />;
          case 'Delinquency Trend Report':
            return <DelinquencyTrendReport />;
          case 'Top Exposure Customers Report':
            return <TopExposureCustomersReport />;
          default:
            return <RiskReports />;
        }
      }

      if (activeReportType === 'Authorization Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Pending Customer Authorization':
            return <PendingCustomerAuthorization />;
          case 'Pending Loan Authorization':
            return <PendingLoanAuthorization />;
          case 'Pending Account Authorization':
            return <PendingAccountAuthorization />;
          default:
            return <AuthorizationReports />;
        }
      }

      if (activeReportType === 'Financial Reports' && activeReportName) {
        switch(activeReportName) {
          case 'Revenue Report':
            return <RevenueReport />;
          case 'Expense Report':
            return <ExpenseReport />;
          case 'Revenue vs Expense':
            return <RevenueVsExpenseReport />;
          default:
            return <FinancialReports />;
        }
      }

      if (activeReportType === 'Internal Account / GL Reports' && activeReportName) {
        switch(activeReportName) {
          case 'GL Transaction Report':
            return <GLTransactionReport />;
          default:
            return <InternalAccountGLReports />;
        }
      }
      
      switch(activeSubMenu) {
        case 'Loan Reports':
          return <LoanReports />;
        case 'Customer Reports':
          return <CustomerReports />;
        case 'KYC & Compliance Reports':
          return <KYCComplianceReports />;
        case 'Teller Reports':
          return <TellerReports />;
        case 'Savings / Account Reports':
          return <SavingsAccountReports />;
        case 'Collection Reports':
          return <CollectionReports />;
        case 'Risk Reports':
          return <RiskReports />;
        case 'Authorization Reports':
          return <AuthorizationReports />;
        case 'Financial Reports':
          return <FinancialReports />;
        case 'Internal Account / GL Reports':
          return <InternalAccountGLReports />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-file-bar-graph fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a report type from the menu.</p>
            </div>
          );
      }
    }

    if (activeMenu === 'Batch Upload') {
      switch(activeSubMenu) {
        case 'Upload Customers':
          return <UploadCustomers />;
        case 'Upload Loans':
          return <UploadLoans />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-cloud-upload fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a batch upload option from the menu.</p>
            </div>
          );
      }
    }

    if (activeMenu === 'System Settings') {
      switch(activeSubMenu) {
        case 'Branches':
          return <Branches />;
        case 'Configurations':
          return <Configurations />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-gear fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a system settings option from the menu.</p>
            </div>
          );
      }
    }

    if (activeMenu === 'Dashboard') {
  return (
    <div className="mt-4">

      {/* TOP METRICS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>Total Portfolio Value</h6>
            <h4 className="text-primary">GHS 12,480,000</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>Active Customers</h6>
            <h4>12,480</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>Active Accounts</h6>
            <h4>8,315</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h6>Portfolio At Risk (PAR)</h6>
            <h4 className="text-danger">4.8%</h4>
          </div>
        </div>
      </div>

      {/* ANALYTICS + QUICK ACTION */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Analytics Overview</h6>
            <div style={{ height: "150px", background: "#f1f1f1" }}>
              {/* Graph Area Placeholder */}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Quick Create Customer</h6>
            <button className="btn btn-primary mt-2">
              + New Customer
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="card p-3">
        <h6>Recent Activities</h6>
        <ul className="list-unstyled mb-0">
          <li>New customer created - IND000123</li>
          <li>Loan approved - LN004512</li>
          <li>Deposit posted - GHS 4,500</li>
          <li>KYC pending review - 12 accounts</li>
        </ul>
      </div>

    </div>
  );
}

    return (
      <div className="bg-light p-4 rounded-3 text-center">
        <i className={`bi ${menuItems.find(m => m.name === activeMenu)?.icon || 'bi-grid'} fs-1 text-secondary`}></i>
        <p className="mt-2 mb-0">
          Manage your {activeMenu.toLowerCase()} here.
        </p>
      </div>
    );
  }, [navigation, menuItems]);

  // ==================== MAIN RENDER ====================
  return (
    <>
      {/* Full-width top navbar */}
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
            {/* Portfolio Summary Dropdown - Custom Implementation with White Background */}
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
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('portfolio', 'Portfolio Summary')}
                    >
                      <i className="bi bi-briefcase"></i>
                      Portfolio Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('loan', 'Loan Summary')}
                    >
                      <i className="bi bi-piggy-bank"></i>
                      Loan Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('teller', 'Teller Summary')}
                    >
                      <i className="bi bi-cash-stack"></i>
                      Teller Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('risk', 'Risk Summary')}
                    >
                      <i className="bi bi-exclamation-triangle"></i>
                      Risk Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('authorization', 'Authorization Summary')}
                    >
                      <i className="bi bi-shield-lock"></i>
                      Authorization Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('revenue', 'Revenue vs Expense Summary')}
                    >
                      <i className="bi bi-graph-up"></i>
                      Revenue Against Expense Summary
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSummarySelect('kyc', 'KYC Summary')}
                    >
                      <i className="bi bi-shield-check"></i>
                      KYC Summary
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <button className="btn btn-light position-relative rounded-circle p-2">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>

            {/* Admin User Dropdown - Custom Implementation */}
            <div className="dropdown" ref={userDropdownRef}>
              <button
                className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-2 px-md-3 py-1"
                onClick={toggleUserDropdown}
                aria-expanded={isUserDropdownOpen}
              >
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-person-fill"></i>
                </div>
                <span className="d-none d-sm-block">Admin User</span>
                <i className={`bi ${isUserDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} small d-none d-sm-block`}></i>
              </button>
              {isUserDropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 45px)' }}>
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
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Summary Modal */}
      {renderSummaryModal()}

      {/* Main layout with sidebar and content */}
      <div className="d-flex vh-100 overflow-hidden" style={{ marginTop: '70px' }}>
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

        {isMobile && mobileMenuOpen && (
          <>
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
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

        <div className="d-flex flex-column flex-grow-1 bg-light" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <div 
            ref={contentAreaRef}
            className="dashboard-content-area"
          >
            <div className="p-3 p-md-4">
              <div className="card border-0 shadow-sm mb-3 mb-md-4">
                <div className="card-body bg-primary bg-opacity-10 rounded-3 p-3 p-md-4">
                  <h4 className="mb-2 fs-5 fs-md-4">Welcome back, Admin!</h4>
                  <p className="mb-0 text-secondary small">
                    You are currently viewing: <strong>{getDisplayTitle()}</strong>
                  </p>
                </div>
              </div>

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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;