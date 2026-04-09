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
import EditAccount from './Account/EditAccount';
import SetReleaseLien from './Account/SetReleaseLien';
import AccountEnquiry from './Account/AccountEnquiry';
import AccountStatement from './Account/AccountStatement';

//import TellerDeposit from './teller/TellerDeposit';
//import TellerWithdraw from './teller/TellerWithdraw';
//import TellerSummary from './teller/TellerSummary';



import TellerDeposit from './teller/TellerDeposit';
import TellerWithdraw from './teller/TellerWithdraw';
import TellerSummary from './teller/TellerSummary';
import ReverseDeposit from './teller/ReverseDeposit';
import ReverseWithdrawal from './teller/ReverseWithdrawal';
import TillStatus from './teller/TillStatus';
import OpenCloseTill from './teller/OpenCloseTill';
import TillTransfer from './teller/TillTransfer';
import ReverseTillTransfer from './teller/ReverseTillTransfer';
import TillStatement from './teller/TillStatement';
import BackdatedDeposit from './teller/BackdatedDeposit';
import BackdatedWithdrawal from './teller/BackdatedWithdrawal';
import BackdatedEntryReversal from './teller/BackdatedEntryReversal';
import CallOver from './teller/CallOver';

import LoanApplication from './loans/LoanApplication';
import LoanApproval from './loans/LoanApproval';
import LoanDisbursement from './loans/LoanDisbursement';
import LoanRepayment from './loans/LoanRepayment';

// New Loan imports to add
import EditLoanApplication from './loans/EditLoanApplication';
import EditLoanEvaluation from './loans/EditLoanEvaluation';
import DisburseLoanList from './loans/DisburseLoanList';
import ExpectedRepayments from './loans/ExpectedRepayments';
import DueRepayments from './loans/DueRepayments';
import ViewLoan from './loans/ViewLoan';
import ReverseLoan from './loans/ReverseLoan';
import TerminateLoan from './loans/TerminateLoan';
import LoanReschedule from './loans/LoanReschedule';



// Investment imports
import NewInvestment from './investment/NewInvestment';
import ManageInvestment from './investment/ManageInvestment';
import InvestmentRedemption from './investment/InvestmentRedemption';
import InvestmentEnquiries from './investment/InvestmentEnquiries';

import GLAccounts from './internal-account/GLAccounts';
import InternalTransfers from './internal-account/InternalTransfers';

import UserManagement from './UserManagement';
import Roles from './Roles';

// Reports
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

// KYC Reports
import PendingKYCReport from './reports/kyc-reports/PendingKYCReport';
import VerifiedKYCReport from './reports/kyc-reports/VerifiedKYCReport';
import RejectedKYCReport from './reports/kyc-reports/RejectedKYCReport';
import ExpiredIDReport from './reports/kyc-reports/ExpiredIDReport';
import PEPScreeningReport from './reports/kyc-reports/PEPScreeningReport';
import HighRiskCustomerReport from './reports/kyc-reports/HighRiskCustomerReport';

// Loan Reports
import LoanPortfolioReport from './reports/loan-reports/LoanPortfolioReport';
import LoanDisbursementReport from './reports/loan-reports/LoanDisbursementReport';
import LoanRepaymentReport from './reports/loan-reports/LoanRepaymentReport';
import LoanArrearsReport from './reports/loan-reports/LoanArrearsReport';
import PortfolioAtRiskReport from './reports/loan-reports/PortfolioAtRiskReport';
import NonPerformingLoansReport from './reports/loan-reports/NonPerformingLoansReport';
import LoanAgingAnalysisReport from './reports/loan-reports/LoanAgingAnalysisReport';
import WrittenOffLoansReport from './reports/loan-reports/WrittenOffLoansReport';

// Customer Reports
import CustomerMasterList from './reports/customer-reports/CustomerMasterList';
import NewCustomersReport from './reports/customer-reports/NewCustomersReport';
import ActiveCustomersReport from './reports/customer-reports/ActiveCustomersReport';
import DormantCustomersReport from './reports/customer-reports/DormantCustomersReport';
import CustomerByBranchReport from './reports/customer-reports/CustomerByBranchReport';
import CustomerByRelationshipOfficerReport from './reports/customer-reports/CustomerByRelationshipOfficerReport';

// Teller Reports
import DailyTellerTransactionsReport from './reports/teller-reports/DailyTellerTransactionsReport';
import DepositReport from './reports/teller-reports/DepositReport';
import WithdrawalReport from './reports/teller-reports/WithdrawalReport';
import TellerBalancingReport from './reports/teller-reports/TellerBalancingReport';
import BranchCashSummaryReport from './reports/teller-reports/BranchCashSummaryReport';

// Savings Account Reports
import SavingsAccountListing from './reports/savings-reports/SavingsAccountListing';
import NewAccountsOpenedReport from './reports/savings-reports/NewAccountsOpenedReport';
import ClosedAccountsReport from './reports/savings-reports/ClosedAccountsReport';
import DormantAccountsReport from './reports/savings-reports/DormantAccountsReport';
import AccountBalanceReport from './reports/savings-reports/AccountBalanceReport';

// Collection Reports
import CollectionPerformanceReport from './reports/collection-reports/CollectionPerformanceReport';
import ExpectedVsActualCollections from './reports/collection-reports/ExpectedVsActualCollections';
import DailyCollectionSheet from './reports/collection-reports/DailyCollectionSheet';
import MissedPaymentReport from './reports/collection-reports/MissedPaymentReport';
import RecoveryFollowUpReport from './reports/collection-reports/RecoveryFollowUpReport';

// Risk Reports
import PortfolioAtRiskReportRisk from './reports/risk-reports/PortfolioAtRiskReport';
import PARGreaterThan30DaysReport from './reports/risk-reports/PARGreaterThan30DaysReport';
import DelinquencyTrendReport from './reports/risk-reports/DelinquencyTrendReport';
import TopExposureCustomersReport from './reports/risk-reports/TopExposureCustomersReport';

// Authorization Reports
import PendingCustomerAuthorization from './reports/authorization-reports/PendingCustomerAuthorization';
import PendingLoanAuthorization from './reports/authorization-reports/PendingLoanAuthorization';
import PendingAccountAuthorization from './reports/authorization-reports/PendingAccountAuthorization';

// Financial Reports
import RevenueReport from './reports/financial-reports/RevenueReport';
import ExpenseReport from './reports/financial-reports/ExpenseReport';
import RevenueVsExpenseReport from './reports/financial-reports/RevenueVsExpenseReport';

// GL Reports
import GLTransactionReport from './reports/gl-reports/GLTransactionReport';

// My Approvals Components
import ApproveUserCreation from './my-approvals/ApproveUserCreation';
import ApproveUserEdit from './my-approvals/ApproveUserEdit';
import ApproveRoleCreation from './my-approvals/ApproveRoleCreation';
import ApproveRoleEdit from './my-approvals/ApproveRoleEdit';
import ApproveUserRole from './my-approvals/ApproveUserRole';
import ApproveUserToRoleEdit from './my-approvals/ApproveUserToRoleEdit';
import ApproveUserPermissions from './my-approvals/ApproveUserPermissions';
import ApproveRoleAssignment from './my-approvals/ApproveRoleAssignment';
import ApproveTellerLimit from './my-approvals/ApproveTellerLimit';
import ApproveLoanThreshold from './my-approvals/ApproveLoanThreshold';
import ApproveNewLoanProduct from './my-approvals/ApproveNewLoanProduct';
import ApproveLoanProductEdit from './my-approvals/ApproveLoanProductEdit';
import ApproveNewBranch from './my-approvals/ApproveNewBranch';
import ApproveBranchEdit from './my-approvals/ApproveBranchEdit';
import ApproveNewCustomer from './my-approvals/ApproveNewCustomer';
import ApproveCustomerMaintenance from './my-approvals/ApproveCustomerMaintenance';
import ApproveROAssigning from './my-approvals/ApproveROAssigning';
import ApproveBatchUpload from './my-approvals/ApproveBatchUpload';
import ApproveNewAccounts from './my-approvals/ApproveNewAccounts';
import ApproveAccountMaintenance from './my-approvals/ApproveAccountMaintenance';
import ApproveLien from './my-approvals/ApproveLien';
import ApproveWebLoanApplication from './my-approvals/ApproveWebLoanApplication';
import ApproveNewIndividualLoan from './my-approvals/ApproveNewIndividualLoan';
import ApproveCorporateLoan from './my-approvals/ApproveCorporateLoan';
import ApproveGroupLoan from './my-approvals/ApproveGroupLoan';
import ApproveLoanMaintenance from './my-approvals/ApproveLoanMaintenance';
import ApproveLoanDisbursement from './my-approvals/ApproveLoanDisbursement';
import ApproveDailyCollections from './my-approvals/ApproveDailyCollections';
import ApproveTillTransfer from './my-approvals/ApproveTillTransfer';
import ApproveBackdatedTillTransfer from './my-approvals/ApproveBackdatedTillTransfer';
import ApproveCashDepositReversal from './my-approvals/ApproveCashDepositReversal';
import ApproveCashWithdrawalReversal from './my-approvals/ApproveCashWithdrawalReversal';
import ApproveTellerShortageOverage from './my-approvals/ApproveTellerShortageOverage';
import ApproveGLAccountCreation from './my-approvals/ApproveGLAccountCreation';
import ApproveGLAccountEdit from './my-approvals/ApproveGLAccountEdit';
import ApproveInternalTransfers from './my-approvals/ApproveInternalTransfers';
import ApproveManualGLPostings from './my-approvals/ApproveManualGLPostings';
import ApproveCustomerUpload from './my-approvals/ApproveCustomerUpload';
import ApproveAccountUpload from './my-approvals/ApproveAccountUpload';
import ApproveLoanUpload from './my-approvals/ApproveLoanUpload';
import ApproveDisbursementUpload from './my-approvals/ApproveDisbursementUpload';
import ApproveRepaymentUpload from './my-approvals/ApproveRepaymentUpload';
import ApproveChargesUpload from './my-approvals/ApproveChargesUpload';
import ApproveGLAdjustments from './my-approvals/ApproveGLAdjustments';
import ApproveBranchReassignment from './my-approvals/ApproveBranchReassignment';
import ApproveROReassignment from './my-approvals/ApproveROReassignment';
import ApprovePictureUploads from './my-approvals/ApprovePictureUploads';
import ApproveIDUploads from './my-approvals/ApproveIDUploads';

import ApproveBackdatedDeposit from './my-approvals/ApproveBackdatedDeposit';
import ApproveBackdatedWithdrawals from './my-approvals/ApproveBackdatedWithdrawals';

import ApproveFundTransfer from './my-approvals/ApproveFundTransfer';
import ApproveBackdatedFts from './my-approvals/ApproveBackdatedFts';

// Batch Upload Components
import UploadCustomers from './batch-upload/UploadCustomers';
import UploadLoans from './batch-upload/UploadLoans';

// System Settings Components
import Branches from './system-settings/Branches';
import Configurations from './system-settings/Configurations';

// Summary Components
const PortfolioSummary = () => (
  <div className="p-4">
    <h4>Portfolio Summary</h4>
    <p>Total Portfolio Value: GHS 12,480,000</p>
    <p>Active Loans: 1,234</p>
    <p>Average Loan Size: GHS 10,113</p>
    <p>Total Customers: 12,480</p>
    <p>Active Accounts: 8,315</p>
  </div>
);

const LoanSummary = () => (
  <div className="p-4">
    <h4>Loan Summary</h4>
    <p>Total Disbursed: GHS 8,456,789</p>
    <p>Total Repaid: GHS 5,234,567</p>
    <p>Outstanding Balance: GHS 3,222,222</p>
    <p>Active Loans: 1,234</p>
    <p>Default Rate: 3.2%</p>
  </div>
);

const TellerSummaryComponent = () => (
  <div className="p-4">
    <h4>Teller Summary</h4>
    <p>Total Deposits Today: GHS 45,678</p>
    <p>Total Withdrawals Today: GHS 23,456</p>
    <p>Net Cash Flow: GHS 22,222</p>
    <p>Transactions Today: 156</p>
    <p>Active Tellers: 8</p>
  </div>
);

const RiskSummary = () => (
  <div className="p-4">
    <h4>Risk Summary</h4>
    <p>Portfolio at Risk: 4.8%</p>
    <p>Non-Performing Loans: 5.2%</p>
    <p>High Risk Customers: 23</p>
    <p>PAR  30 Days: GHS 45,678</p>
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
    <p>Total Revenue: GHS 567,890</p>
    <p>Total Expenses: GHS 345,678</p>
    <p>Net Profit: GHS 222,212</p>
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
    'My Approvals': {},
    Reports: {},
    'Batch Upload': {},
    'System Settings': {}
  });

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
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
      { name: 'Edit Account', icon: 'bi-pencil-square' },
      { name: 'Account List', icon: 'bi-list-ul' },
      { name: 'Set or Release Lien', icon: 'bi-lock' },
      { name: 'Account Enquiry', icon: 'bi-search' },
      { name: 'Account Statement', icon: 'bi-receipt' },
      { name: 'Close Account', icon: 'bi-x-circle' }
    ]
  },
  { 
    name: 'Teller', 
    icon: 'bi-cash-stack',
    subMenus: [
      { 
        name: 'Deposit', 
        icon: 'bi-arrow-down-circle',
        nestedMenus: [
          { name: 'Deposit', icon: 'bi-arrow-down-circle' },
          { name: 'Reverse Deposit', icon: 'bi-arrow-return-left' }
        ]
      },
      { 
        name: 'Withdrawals', 
        icon: 'bi-arrow-up-circle',
        nestedMenus: [
          { name: 'Withdraw', icon: 'bi-arrow-up-circle' },
          { name: 'Reverse Withdrawal', icon: 'bi-arrow-return-right' }
        ]
      },
      { 
        name: 'Till Management', 
        icon: 'bi-calculator',
        nestedMenus: [
          { name: 'Till Status', icon: 'bi-graph-up' },
          { name: 'Open or Close Till', icon: 'bi-toggle-on' },
          { name: 'Till Transfer', icon: 'bi-arrow-left-right' },
          { name: 'Reverse Till Transfer', icon: 'bi-arrow-return-left' },
          { name: 'Till Statement', icon: 'bi-receipt' }
        ]
      },
      { 
        name: 'Back Dates', 
        icon: 'bi-calendar-date',
        nestedMenus: [
          { name: 'Backdated Deposit', icon: 'bi-calendar-plus' },
          { name: 'Backdated Withdrawal', icon: 'bi-calendar-minus' },
          { name: 'Backdated Entry Reversal', icon: 'bi-calendar-x' }
        ]
      },
      { name: 'Call Over', icon: 'bi-megaphone' },
       { name: 'Teller Summary', icon: 'bi-bar-chart' }  // Added Teller Summary here
    ]
  },
 { 
  name: 'Loans', 
  icon: 'bi-piggy-bank',
  subMenus: [
    { name: 'Loan Application', icon: 'bi-file-text' },
    { name: 'Edit Loan Application', icon: 'bi-pencil-square' },
    { name: 'Edit Loan Evaluation', icon: 'bi-clipboard-check' },
    { name: 'Loan Approval', icon: 'bi-check-circle' },
    { name: 'Loan Disbursement', icon: 'bi-cash' },
    { name: 'Disburse Loan List', icon: 'bi-list-check' },
    { name: 'Loan Repayment', icon: 'bi-arrow-return-left' },
    { name: 'Expected Repayments', icon: 'bi-calendar-check' },
    { name: 'Due Repayments', icon: 'bi-calendar-exclamation' },
    { name: 'View Loan', icon: 'bi-eye' },
    { name: 'Reverse Loan', icon: 'bi-arrow-return-right' },
    { name: 'Terminate Loan', icon: 'bi-x-octagon' },
    { name: 'Loan Reschedule', icon: 'bi-calendar-week' }
  ]
},

{ 
  name: 'Investment', 
  icon: 'bi-graph-up',
  subMenus: [
    { name: 'New Investment', icon: 'bi-plus-circle' },
    { name: 'Manage Investment', icon: 'bi-gear' },
    { name: 'Investment Redemption', icon: 'bi-cash-stack' },
    { name: 'Enquiries', icon: 'bi-question-circle' }
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
    name: 'My Approvals',
    icon: 'bi-check2-circle',
    subMenus: [
      { 
        name: 'Admin', 
        icon: 'bi-person-check',
        nestedMenus: [
          { name: 'Approve User Creation', icon: 'bi-person-plus' },
          { name: 'Approve User Edit', icon: 'bi-pencil-square' },
          { name: 'Approve Role Creation', icon: 'bi-shield-plus' },
          { name: 'Approve Role Edit', icon: 'bi-shield-shaded' },
          { name: 'Approve User Role', icon: 'bi-person-badge' },
          { name: 'Approve User to Role Edit', icon: 'bi-person-gear' },
          { name: 'Approve User Permissions', icon: 'bi-key' },
          { name: 'Approve Role Assignment', icon: 'bi-person-check-fill' },
          { name: 'Approve Teller Limit', icon: 'bi-cash-stack' },
          { name: 'Approve Loan Threshold', icon: 'bi-piggy-bank' },
          { name: 'Approve New Loan Product', icon: 'bi-file-plus' },
          { name: 'Approve Loan Product Edit', icon: 'bi-pencil' },
          { name: 'Approve New Branch', icon: 'bi-building-add' },
          { name: 'Approve Branch Edit', icon: 'bi-building-gear' }
        ]
      },
      { 
        name: 'Customer', 
        icon: 'bi-diagram-3',
        nestedMenus: [
          { name: 'Approve New Customer', icon: 'bi-person-plus' },
          { name: 'Approve Customer Maintenance', icon: 'bi-tools' },
          { name: 'Approve RO Assigning', icon: 'bi-person-badge' },
          { name: 'Approve Batch Upload', icon: 'bi-cloud-upload' }
        ]
      },
      { 
        name: 'Account', 
        icon: 'bi-file-check',
        nestedMenus: [
          { name: 'Approve New Accounts', icon: 'bi-plus-circle' },
          { name: 'Approve Account Maintenance', icon: 'bi-tools' },
          { name: 'Approve Lien', icon: 'bi-lock' }
        ]
      },
      { 
        name: 'Loans', 
        icon: 'bi-shield-plus',
        nestedMenus: [
          { name: 'Approve Web Loan Application', icon: 'bi-globe' },
          { name: 'Approve New Individual Loan', icon: 'bi-person' },
          { name: 'Approve Corporate Loan', icon: 'bi-building' },
          { name: 'Approve Group Loan', icon: 'bi-people-fill' },
          { name: 'Approve Loan Maintenance', icon: 'bi-tools' },
          { name: 'Approve Loan Disbursement', icon: 'bi-cash' }
        ]
      },
      { 
        name: 'Collections', 
        icon: 'bi-shield-check',
        nestedMenus: [
          { name: 'Approve Daily Collections', icon: 'bi-calendar-check' }
        ]
      },
      { 
        name: 'Teller', 
        icon: 'bi-person-gear',
        nestedMenus: [
          { name: 'Approve Till Transfer', icon: 'bi-arrow-left-right' },
          { name: 'Approve Backdated Till Transfer', icon: 'bi-calendar-minus' },
          { name: 'Approve Cash Deposit Reversal', icon: 'bi-arrow-return-left' },
          { name: 'Approve Cash Withdrawal Reversal', icon: 'bi-arrow-return-right' },
          { name: 'Approve Teller Shortage & Overage', icon: 'bi-exclamation-triangle' },
          { name: 'Approve Backdated deposit', icon: 'bi-arrow-return-right' },
          { name: 'Approve Backdated withdrawals', icon: 'bi-exclamation-triangle' }
        ]
      },
      { 
        name: 'Internal Accounts', 
        icon: 'bi-person-lines-fill',
        nestedMenus: [
          { name: 'Approve GL Account Creation', icon: 'bi-journal-plus' },
          { name: 'Approve GL Account Edit', icon: 'bi-pencil-square' },
          { name: 'Approve Internal Transfers', icon: 'bi-arrow-left-right' },
          { name: 'Approve Manual GL Postings', icon: 'bi-journal-bookmark-fill' },
          { name: 'Approve Fund Transfer', icon: 'bi-arrow-left-right' },
          { name: 'Approve Backdated FTs', icon: 'bi-journal-bookmark-fill' }
        ]
      },
      { 
        name: 'Batch Uploads', 
        icon: 'bi-key',
        nestedMenus: [
          { name: 'Approve Customer Upload', icon: 'bi-person-plus' },
          { name: 'Approve Account Upload', icon: 'bi-bank' },
          { name: 'Approve Loan Upload', icon: 'bi-piggy-bank' },
          { name: 'Approve Disbursement Upload', icon: 'bi-cash' },
          { name: 'Approve Repayment Upload', icon: 'bi-arrow-return-left' },
          { name: 'Approve Charges Upload', icon: 'bi-receipt' },
          { name: 'Approve GL Adjustments', icon: 'bi-journal-bookmark-fill' },
          { name: 'Approve Branch Reassignment', icon: 'bi-building' },
          { name: 'Approve RO Reassignment', icon: 'bi-person-badge' },
          { name: 'Approve Picture Uploads', icon: 'bi-image' },
          { name: 'Approve ID Uploads', icon: 'bi-file-earmark-person' }
        ]
      },
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
                
                {/* Always render submenus when expanded, regardless of sidebar state */}
                {item.subMenus && expandedMenus[item.name] && (
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

  // ==================== RENDER MY APPROVALS CONTENT ====================
  const renderMyApprovalsContent = useCallback(() => {
    const { activeSubMenu, activeNestedMenu } = navigation;
    
    if (!activeSubMenu) {
      return (
        <div className="bg-light p-4 rounded-3 text-center">
          <i className="bi bi-check2-circle fs-1 text-secondary"></i>
          <p className="mt-2 mb-0">Please select an approval category from the menu.</p>
        </div>
      );
    }

    // Admin approvals
    if (activeSubMenu === 'Admin') {
      switch(activeNestedMenu) {
        case 'Approve User Creation':
          return <ApproveUserCreation />;
        case 'Approve User Edit':
          return <ApproveUserEdit />;
        case 'Approve Role Creation':
          return <ApproveRoleCreation />;
        case 'Approve Role Edit':
          return <ApproveRoleEdit />;
        case 'Approve User Role':
          return <ApproveUserRole />;
        case 'Approve User to Role Edit':
          return <ApproveUserToRoleEdit />;
        case 'Approve User Permissions':
          return <ApproveUserPermissions />;
        case 'Approve Role Assignment':
          return <ApproveRoleAssignment />;
        case 'Approve Teller Limit':
          return <ApproveTellerLimit />;
        case 'Approve Loan Threshold':
          return <ApproveLoanThreshold />;
        case 'Approve New Loan Product':
          return <ApproveNewLoanProduct />;
        case 'Approve Loan Product Edit':
          return <ApproveLoanProductEdit />;
        case 'Approve New Branch':
          return <ApproveNewBranch />;
        case 'Approve Branch Edit':
          return <ApproveBranchEdit />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-person-check fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an admin approval option.</p>
            </div>
          );
      }
    }

    // Customer approvals
    if (activeSubMenu === 'Customer') {
      switch(activeNestedMenu) {
        case 'Approve New Customer':
          return <ApproveNewCustomer />;
        case 'Approve Customer Maintenance':
          return <ApproveCustomerMaintenance />;
        case 'Approve RO Assigning':
          return <ApproveROAssigning />;
        case 'Approve Batch Upload':
          return <ApproveBatchUpload />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-diagram-3 fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a customer approval option.</p>
            </div>
          );
      }
    }

    // Account approvals
    if (activeSubMenu === 'Account') {
      switch(activeNestedMenu) {
        case 'Approve New Accounts':
          return <ApproveNewAccounts />;
        case 'Approve Account Maintenance':
          return <ApproveAccountMaintenance />;
        case 'Approve Lien':
          return <ApproveLien />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-file-check fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an account approval option.</p>
            </div>
          );
      }
    }

    // Loans approvals
    if (activeSubMenu === 'Loans') {
      switch(activeNestedMenu) {
        case 'Approve Web Loan Application':
          return <ApproveWebLoanApplication />;
        case 'Approve New Individual Loan':
          return <ApproveNewIndividualLoan />;
        case 'Approve Corporate Loan':
          return <ApproveCorporateLoan />;
        case 'Approve Group Loan':
          return <ApproveGroupLoan />;
        case 'Approve Loan Maintenance':
          return <ApproveLoanMaintenance />;
        case 'Approve Loan Disbursement':
          return <ApproveLoanDisbursement />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-shield-plus fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a loan approval option.</p>
            </div>
          );
      }
    }

    // Collections approvals
    if (activeSubMenu === 'Collections') {
      switch(activeNestedMenu) {
        case 'Approve Daily Collections':
          return <ApproveDailyCollections />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-shield-check fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a collection approval option.</p>
            </div>
          );
      }
    }

    // Teller approvals
    if (activeSubMenu === 'Teller') {
      switch(activeNestedMenu) {
        case 'Approve Till Transfer':
          return <ApproveTillTransfer />;
        case 'Approve Backdated Till Transfer':
          return <ApproveBackdatedTillTransfer />;
        case 'Approve Cash Deposit Reversal':
          return <ApproveCashDepositReversal />;
        case 'Approve Cash Withdrawal Reversal':
          return <ApproveCashWithdrawalReversal />;
        case 'Approve Teller Shortage & Overage':
          return <ApproveTellerShortageOverage />;
        case 'Approve Backdated deposit':
          return <ApproveBackdatedDeposit/>;
        case 'Approve Backdated withdrawals':
         return <ApproveBackdatedWithdrawals />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-person-gear fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a teller approval option.</p>
            </div>
          );
      }
    }

    // Internal Accounts approvals
    if (activeSubMenu === 'Internal Accounts') {
      switch(activeNestedMenu) {
        case 'Approve GL Account Creation':
          return <ApproveGLAccountCreation />;
        case 'Approve GL Account Edit':
          return <ApproveGLAccountEdit />;
        case 'Approve Internal Transfers':
          return <ApproveInternalTransfers />;
        case 'Approve Manual GL Postings':
          return <ApproveManualGLPostings />;
        case 'Approve Fund Transfer':
          return <ApproveFundTransfer />;
        case 'Approve Backdated FTs':
          return <ApproveBackdatedFts />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-person-lines-fill fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select an internal accounts approval option.</p>
            </div>
          );
      }
    }

    // Batch Uploads approvals
    if (activeSubMenu === 'Batch Uploads') {
      switch(activeNestedMenu) {
        case 'Approve Customer Upload':
          return <ApproveCustomerUpload />;
        case 'Approve Account Upload':
          return <ApproveAccountUpload />;
        case 'Approve Loan Upload':
          return <ApproveLoanUpload />;
        case 'Approve Disbursement Upload':
          return <ApproveDisbursementUpload />;
        case 'Approve Repayment Upload':
          return <ApproveRepaymentUpload />;
        case 'Approve Charges Upload':
          return <ApproveChargesUpload />;
        case 'Approve GL Adjustments':
          return <ApproveGLAdjustments />;
        case 'Approve Branch Reassignment':
          return <ApproveBranchReassignment />;
        case 'Approve RO Reassignment':
          return <ApproveROReassignment />;
        case 'Approve Picture Uploads':
          return <ApprovePictureUploads />;
        case 'Approve ID Uploads':
          return <ApproveIDUploads />;
        default:
          return (
            <div className="bg-light p-4 rounded-3 text-center">
              <i className="bi bi-key fs-1 text-secondary"></i>
              <p className="mt-2 mb-0">Please select a batch upload approval option.</p>
            </div>
          );
      }
    }

    return (
      <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-check2-circle fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an approval category from the menu.</p>
      </div>
    );
  }, [navigation]);

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
        case 'Edit Account':
          return <EditAccount />;
        case 'Account List':
          return <AccountList />;
        case 'Set or Release Lien':
          return <SetReleaseLien />;
        case 'Account Enquiry':
          return <AccountEnquiry />;
        case 'Account Statement':
          return <AccountStatement />;
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
  if (activeSubMenu === 'Deposit') {
    switch(activeNestedMenu) {
      case 'Deposit':
        return <TellerDeposit />;
      case 'Reverse Deposit':
        return <ReverseDeposit />;
      default:
        return <TellerDeposit />;
    }
  }
  
  if (activeSubMenu === 'Withdrawals') {
    switch(activeNestedMenu) {
      case 'Withdraw':
        return <TellerWithdraw />;
      case 'Reverse Withdrawal':
        return <ReverseWithdrawal />;
      default:
        return <TellerWithdraw />;
    }
  }
  
  if (activeSubMenu === 'Till Management') {
    switch(activeNestedMenu) {
      case 'Till Status':
        return <TillStatus />;
      case 'Open or Close Till':
        return <OpenCloseTill />;
      case 'Till Transfer':
        return <TillTransfer />;
      case 'Reverse Till Transfer':
        return <ReverseTillTransfer />;
      case 'Till Statement':
        return <TillStatement />;
      default:
        return <TillStatus />;
    }
  }
  
  if (activeSubMenu === 'Back Dates') {
    switch(activeNestedMenu) {
      case 'Backdated Deposit':
        return <BackdatedDeposit />;
      case 'Backdated Withdrawal':
        return <BackdatedWithdrawal />;
      case 'Backdated Entry Reversal':
        return <BackdatedEntryReversal />;
      default:
        return <BackdatedDeposit />;
    }
  }
  
  if (activeSubMenu === 'Call Over') {
    return <CallOver />;
  }

  if (activeSubMenu === 'Teller Summary') {  // Added Teller Summary case
    return <TellerSummary />;
  }
  
  
  return (
    <div className="bg-light p-4 rounded-3 text-center">
      <i className="bi bi-cash-stack fs-1 text-secondary"></i>
      <p className="mt-2 mb-0">Please select a teller transaction option from the menu.</p>
    </div>
  );
}

    if (activeMenu === 'Loans') {
  switch(activeSubMenu) {
    case 'Loan Application':
      return <LoanApplication />;
    case 'Edit Loan Application':
      return <EditLoanApplication />;  // You'll need to create/import this component
    case 'Edit Loan Evaluation':
      return <EditLoanEvaluation />;   // You'll need to create/import this component
    case 'Loan Approval':
      return <LoanApproval />;
    case 'Loan Disbursement':
      return <LoanDisbursement />;
    case 'Disburse Loan List':
      return <DisburseLoanList />;     // You'll need to create/import this component
    case 'Loan Repayment':
      return <LoanRepayment />;
    case 'Expected Repayments':
      return <ExpectedRepayments />;   // You'll need to create/import this component
    case 'Due Repayments':
      return <DueRepayments />;        // You'll need to create/import this component
    case 'View Loan':
      return <ViewLoan />;             // You'll need to create/import this component
    case 'Reverse Loan':
      return <ReverseLoan />;          // You'll need to create/import this component
    case 'Terminate Loan':
      return <TerminateLoan />;        // You'll need to create/import this component
    case 'Loan Reschedule':
      return <LoanReschedule />;       // You'll need to create/import this component
    default:
      return (
        <div className="bg-light p-4 rounded-3 text-center">
          <i className="bi bi-piggy-bank fs-1 text-secondary"></i>
          <p className="mt-2 mb-0">Please select a loan management option from the menu.</p>
        </div>
      );
  }
}


if (activeMenu === 'Investment') {
  switch(activeSubMenu) {
    case 'New Investment':
      return <NewInvestment />;
    case 'Manage Investment':
      return <ManageInvestment />;
    case 'Investment Redemption':
      return <InvestmentRedemption />;
    case 'Enquiries':
      return <InvestmentEnquiries />;
    default:
      return (
        <div className="bg-light p-4 rounded-3 text-center">
          <i className="bi bi-graph-up fs-1 text-secondary"></i>
          <p className="mt-2 mb-0">Please select an investment option from the menu.</p>
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

    if (activeMenu === 'My Approvals') {
      return renderMyApprovalsContent();
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
  }, [navigation, menuItems, renderMyApprovalsContent]);

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