// AdminDashboard.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Hooks
import { useNavigation } from './hooks/useNavigation';
import { useScrollPersistence } from './hooks/useScrollPersistence';

// Components
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { SummaryModal } from './components/SummaryModals';

// Customer Components
import CustomerMaintenance from './customer/CustomerMaintenance';
import Enquiries from './customer/Enquiries';
import IndividualCustomer from './customer/create-customer/IndividualCustomer';
import CorporateCustomer from './customer/create-customer/CorporateCustomer';
import JointAccount from './customer/create-customer/SolidarityGroup';

// Account Components
import CreateAccount from './Account/CreateAccount';
import AccountList from './Account/AccountList';
import CloseAccount from './Account/CloseAccount';
import EditAccount from './Account/EditAccount';
import SetReleaseLien from './Account/SetReleaseLien';
import AccountEnquiry from './Account/AccountEnquiry';
import AccountStatement from './Account/AccountStatement';

// Teller Components
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

// Loan Components
import LoanApplication from './loans/LoanApplication';
import LoanApproval from './loans/LoanApproval';
import LoanDisbursement from './loans/LoanDisbursement';
import LoanRepayment from './loans/LoanRepayment';
import EditLoanApplication from './loans/EditLoanApplication';
import EditLoanEvaluation from './loans/EditLoanEvaluation';
import DisburseLoanList from './loans/DisburseLoanList';
import ExpectedRepayments from './loans/ExpectedRepayments';
import DueRepayments from './loans/DueRepayments';
import ViewLoan from './loans/ViewLoan';
import ReverseLoan from './loans/ReverseLoan';
import TerminateLoan from './loans/TerminateLoan';
import LoanReschedule from './loans/LoanReschedule';

// Investment Components
import NewInvestment from './investment/NewInvestment';
import ManageInvestment from './investment/ManageInvestment';
import InvestmentRedemption from './investment/InvestmentRedemption';
import InvestmentEnquiries from './investment/InvestmentEnquiries';

// Internal Accounts Components
import GLAccounts from './internal-account/GLAccounts';
import InternalTransfers from './internal-account/InternalTransfers';
import InternalAccountStatement from './internal-account/InternalAccountStatement';
import CreateFundTransfer from './internal-account/CreateFundTransfer';
import CreateBackdatedFT from './internal-account/CreateBackdatedFT';
import ListFundTransfers from './internal-account/ListFundTransfers';
import SetLien from './internal-account/SetLien';
import ReleaseLien from './internal-account/ReleaseLien';
import LienEnquiries from './internal-account/LienEnquiries';

// Admin Components
import UserManagement from './UserManagement';
import Roles from './Roles';

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

// Report Components
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState('portfolio');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const summaryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  
  // Custom hooks
  const {
    navigation,
    expandedMenus,
    expandedSubMenus,
    toggleSubMenu,
    toggleNestedMenu,
    handleMenuClick: handleMenuClickBase,
    handleSubMenuClick: handleSubMenuClickBase,
    handleNestedMenuClick: handleNestedMenuClickBase,
    handleReportClick: handleReportClickBase,
    getDisplayTitle
  } = useNavigation();
  
  const { contentAreaRef, saveCurrentScrollPosition } = useScrollPersistence(navigation);
  
  // Wrapper functions for navigation handlers
  const handleMenuClick = useCallback((item, e) => {
    if (e) e.preventDefault();
    handleMenuClickBase(item, saveCurrentScrollPosition);
    if (isMobile) setMobileMenuOpen(false);
  }, [handleMenuClickBase, saveCurrentScrollPosition, isMobile]);
  
  const handleSubMenuClick = useCallback((parentMenu, subMenuName, hasNestedOrReports, e) => {
    if (e) e.preventDefault();
    handleSubMenuClickBase(parentMenu, subMenuName, saveCurrentScrollPosition);
    if (isMobile) setMobileMenuOpen(false);
  }, [handleSubMenuClickBase, saveCurrentScrollPosition, isMobile]);
  
  const handleNestedMenuClick = useCallback((parentMenu, subMenuName, nestedMenuName, e) => {
    if (e) e.preventDefault();
    handleNestedMenuClickBase(parentMenu, subMenuName, nestedMenuName, saveCurrentScrollPosition);
    if (isMobile) setMobileMenuOpen(false);
  }, [handleNestedMenuClickBase, saveCurrentScrollPosition, isMobile]);
  
  const handleReportClick = useCallback((reportType, reportName, e) => {
    if (e) e.preventDefault();
    handleReportClickBase(reportType, reportName, saveCurrentScrollPosition);
    if (isMobile) setMobileMenuOpen(false);
  }, [handleReportClickBase, saveCurrentScrollPosition, isMobile]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
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

  // Handlers
  const handleProfile = useCallback((e) => {
    if (e) e.preventDefault();
    setIsUserDropdownOpen(false);
    navigate('/admin/profile');
  }, [navigate]);

  const handleSettings = useCallback((e) => {
    if (e) e.preventDefault();
    setIsUserDropdownOpen(false);
    navigate('/admin/settings');
  }, [navigate]);

  const handleLogout = useCallback((e) => {
    if (e) e.preventDefault();
    setIsUserDropdownOpen(false);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const handleSummarySelect = useCallback((summaryType, summaryName) => {
    setSelectedSummary(summaryType);
    setShowSummaryModal(true);
    setIsSummaryDropdownOpen(false);
  }, []);

  const closeSummaryModal = useCallback(() => setShowSummaryModal(false), []);

  const toggleSidebar = useCallback((e) => {
    if (e) e.preventDefault();
    if (isMobile) setMobileMenuOpen(!mobileMenuOpen);
    else setSidebarCollapsed(prev => !prev);
  }, [isMobile, mobileMenuOpen]);

  const handleMouseEnter = useCallback((itemId) => setHoveredItem(itemId), []);
  const handleMouseLeave = useCallback(() => setHoveredItem(null), []);

  // Menu helper functions
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

  const isReportActive = useCallback((reportName) => navigation.activeReportName === reportName, [navigation]);
  const isNestedActive = useCallback((nestedName) => navigation.activeNestedMenu === nestedName, [navigation]);

  // Menu Items
  const menuItems = useMemo(() => [
    { name: 'Dashboard', icon: 'bi-speedometer2' },
    { 
      name: 'Customer', icon: 'bi-people',
      subMenus: [
        { name: 'Create Customer', icon: 'bi-person-plus',
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
      name: 'Account', icon: 'bi-bank',
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
      name: 'Teller', icon: 'bi-cash-stack',
      subMenus: [
        { name: 'Deposit', icon: 'bi-arrow-down-circle',
          nestedMenus: [
            { name: 'Deposit', icon: 'bi-arrow-down-circle' },
            { name: 'Reverse Deposit', icon: 'bi-arrow-return-left' }
          ]
        },
        { name: 'Withdrawals', icon: 'bi-arrow-up-circle',
          nestedMenus: [
            { name: 'Withdraw', icon: 'bi-arrow-up-circle' },
            { name: 'Reverse Withdrawal', icon: 'bi-arrow-return-right' }
          ]
        },
        { name: 'Till Management', icon: 'bi-calculator',
          nestedMenus: [
            { name: 'Till Status', icon: 'bi-graph-up' },
            { name: 'Open or Close Till', icon: 'bi-toggle-on' },
            { name: 'Till Transfer', icon: 'bi-arrow-left-right' },
            { name: 'Reverse Till Transfer', icon: 'bi-arrow-return-left' },
            { name: 'Till Statement', icon: 'bi-receipt' }
          ]
        },
        { name: 'Back Dates', icon: 'bi-calendar-date',
          nestedMenus: [
            { name: 'Backdated Deposit', icon: 'bi-calendar-plus' },
            { name: 'Backdated Withdrawal', icon: 'bi-calendar-minus' },
            { name: 'Backdated Entry Reversal', icon: 'bi-calendar-x' }
          ]
        },
        { name: 'Call Over', icon: 'bi-megaphone' },
        { name: 'Teller Summary', icon: 'bi-bar-chart' }
      ]
    },
    { 
      name: 'Loans', icon: 'bi-piggy-bank',
      subMenus: [
        { name: 'Loan Application', icon: 'bi-file-text' },
        { name: 'Edit Loan Application', icon: 'bi-pencil-square' },
        { name: 'Edit Loan Evaluation', icon: 'bi-clipboard-check' },
        { name: 'Loan Evaluation', icon: 'bi-check-circle' },
        { name: 'Loan Disbursement', icon: 'bi-cash' },
        { name: 'Disburse Loan List', icon: 'bi-list-check' },
        { name: 'Due Repayment', icon: 'bi-arrow-return-left' },
        { name: 'Expected Repayments', icon: 'bi-calendar-check' },
        { name: 'View Loan', icon: 'bi-eye' },
        { name: 'Reverse Loan', icon: 'bi-arrow-return-right' },
        { name: 'Terminate Loan', icon: 'bi-x-octagon' },
        { name: 'Loan Reschedule', icon: 'bi-calendar-week' }
      ]
    },
    { 
      name: 'Investment', icon: 'bi-graph-up',
      subMenus: [
        { name: 'New Investment', icon: 'bi-plus-circle' },
        { name: 'Manage Investment', icon: 'bi-gear' },
        { name: 'Investment Redemption', icon: 'bi-cash-stack' },
        { name: 'Enquiries', icon: 'bi-question-circle' }
      ]
    },
    { 
      name: 'Internal Accounts', icon: 'bi-diagram-3',
      subMenus: [
        { name: 'GL Accounts', icon: 'bi-journal-bookmark-fill' },
        { name: 'Internal Transfers', icon: 'bi-arrow-left-right' },
        { name: 'Internal Account Statement', icon: 'bi-receipt' },
        { name: 'Fund Transfer', icon: 'bi-send',
          nestedMenus: [
            { name: 'Create Fund Transfer', icon: 'bi-plus-circle' },
            { name: 'Create Backdated FT', icon: 'bi-calendar-minus' },
            { name: 'List of Fund Transfers', icon: 'bi-list-ul' }
          ]
        },
        { name: 'Lien', icon: 'bi-lock',
          nestedMenus: [
            { name: 'Set Lien', icon: 'bi-lock-fill' },
            { name: 'Release Lien', icon: 'bi-unlock-fill' },
            { name: 'Enquiries', icon: 'bi-question-circle' }
          ]
        }
      ]
    },
    { 
      name: 'Admin', icon: 'bi-shield-lock',
      subMenus: [
        { name: 'User Management', icon: 'bi-people' },
        { name: 'Roles', icon: 'bi-shield-check' }
      ]
    },
    {
      name: 'My Approvals', icon: 'bi-check2-circle',
      subMenus: [
        { name: 'Admin', icon: 'bi-person-check',
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
        { name: 'Customer', icon: 'bi-diagram-3',
          nestedMenus: [
            { name: 'Approve New Customer', icon: 'bi-person-plus' },
            { name: 'Approve Customer Maintenance', icon: 'bi-tools' },
            { name: 'Approve RO Assigning', icon: 'bi-person-badge' },
            { name: 'Approve Batch Upload', icon: 'bi-cloud-upload' }
          ]
        },
        { name: 'Account', icon: 'bi-file-check',
          nestedMenus: [
            { name: 'Approve New Accounts', icon: 'bi-plus-circle' },
            { name: 'Approve Account Maintenance', icon: 'bi-tools' },
            { name: 'Approve Lien', icon: 'bi-lock' }
          ]
        },
        { name: 'Loans', icon: 'bi-shield-plus',
          nestedMenus: [
            { name: 'Approve Web Loan Application', icon: 'bi-globe' },
            { name: 'Approve New Individual Loan', icon: 'bi-person' },
            { name: 'Approve Corporate Loan', icon: 'bi-building' },
            { name: 'Approve Group Loan', icon: 'bi-people-fill' },
            { name: 'Approve Loan Maintenance', icon: 'bi-tools' },
            { name: 'Approve Loan Disbursement', icon: 'bi-cash' }
          ]
        },
        { name: 'Collections', icon: 'bi-shield-check',
          nestedMenus: [
            { name: 'Approve Daily Collections', icon: 'bi-calendar-check' }
          ]
        },
        { name: 'Teller', icon: 'bi-person-gear',
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
        { name: 'Internal Accounts', icon: 'bi-person-lines-fill',
          nestedMenus: [
            { name: 'Approve GL Account Creation', icon: 'bi-journal-plus' },
            { name: 'Approve GL Account Edit', icon: 'bi-pencil-square' },
            { name: 'Approve Internal Transfers', icon: 'bi-arrow-left-right' },
            { name: 'Approve Manual GL Postings', icon: 'bi-journal-bookmark-fill' },
            { name: 'Approve Fund Transfer', icon: 'bi-arrow-left-right' },
            { name: 'Approve Backdated FTs', icon: 'bi-journal-bookmark-fill' }
          ]
        },
        { name: 'Batch Uploads', icon: 'bi-key',
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
      name: 'Reports', icon: 'bi-file-bar-graph',
      subMenus: [
        { name: 'Loan Reports', icon: 'bi-piggy-bank', reportType: 'Loan Reports',
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
        { name: 'Customer Reports', icon: 'bi-people', reportType: 'Customer Reports',
          reports: [
            { name: 'Customer Master List', icon: 'bi-list-ul' },
            { name: 'New Customers Report', icon: 'bi-person-plus' },
            { name: 'Active Customers Report', icon: 'bi-person-check' },
            { name: 'Dormant Customers Report', icon: 'bi-person-x' },
            { name: 'Customer by Branch Report', icon: 'bi-building' },
            { name: 'Customer by Relationship Officer Report', icon: 'bi-person-badge' }
          ]
        },
        { name: 'KYC & Compliance Reports', icon: 'bi-shield-check', reportType: 'KYC & Compliance Reports',
          reports: [
            { name: 'Pending KYC Report', icon: 'bi-hourglass-split' },
            { name: 'Verified KYC Report', icon: 'bi-check-circle-fill' },
            { name: 'Rejected KYC Report', icon: 'bi-x-circle-fill' },
            { name: 'Expired ID Report', icon: 'bi-calendar-x' },
            { name: 'PEP Screening Report', icon: 'bi-shield-shaded' },
            { name: 'High Risk Customer Report', icon: 'bi-exclamation-triangle-fill' }
          ]
        },
        { name: 'Teller Reports', icon: 'bi-cash-stack', reportType: 'Teller Reports',
          reports: [
            { name: 'Daily Teller Transactions Report', icon: 'bi-calendar-day' },
            { name: 'Deposit Report', icon: 'bi-arrow-down-circle' },
            { name: 'Withdrawal Report', icon: 'bi-arrow-up-circle' },
            { name: 'Teller Balancing Report', icon: 'bi-calculator' },
            { name: 'Branch Cash Summary Report', icon: 'bi-building' }
          ]
        },
        { name: 'Savings / Account Reports', icon: 'bi-bank', reportType: 'Savings / Account Reports',
          reports: [
            { name: 'Savings Account Listing', icon: 'bi-list-ul' },
            { name: 'New Accounts Opened Report', icon: 'bi-plus-circle' },
            { name: 'Closed Accounts Report', icon: 'bi-x-circle' },
            { name: 'Dormant Accounts Report', icon: 'bi-moon' },
            { name: 'Account Balance Report', icon: 'bi-calculator' }
          ]
        },
        { name: 'Collection Reports', icon: 'bi-receipt', reportType: 'Collection Reports',
          reports: [
            { name: 'Collection Performance Report', icon: 'bi-graph-up' },
            { name: 'Expected vs Actual Collections', icon: 'bi-bar-chart-steps' },
            { name: 'Daily Collection Sheet', icon: 'bi-calendar-check' },
            { name: 'Missed Payment Report', icon: 'bi-exclamation-circle' },
            { name: 'Recovery Follow-up Report', icon: 'bi-telephone' }
          ]
        },
        { name: 'Risk Reports', icon: 'bi-exclamation-triangle', reportType: 'Risk Reports',
          reports: [
            { name: 'Portfolio At Risk Report', icon: 'bi-pie-chart' },
            { name: 'PAR > 30 Days Report', icon: 'bi-exclamation-triangle-fill' },
            { name: 'Delinquency Trend Report', icon: 'bi-graph-up' },
            { name: 'Top Exposure Customers Report', icon: 'bi-trophy' }
          ]
        },
        { name: 'Authorization Reports', icon: 'bi-shield-lock', reportType: 'Authorization Reports',
          reports: [
            { name: 'Pending Customer Authorization', icon: 'bi-person-check' },
            { name: 'Pending Loan Authorization', icon: 'bi-file-check' },
            { name: 'Pending Account Authorization', icon: 'bi-bank-check' }
          ]
        },
        { name: 'Financial Reports', icon: 'bi-graph-up', reportType: 'Financial Reports',
          reports: [
            { name: 'Revenue Report', icon: 'bi-cash-stack' },
            { name: 'Expense Report', icon: 'bi-receipt' },
            { name: 'Revenue vs Expense', icon: 'bi-bar-chart-steps' }
          ]
        },
        { name: 'Internal Account / GL Reports', icon: 'bi-diagram-3', reportType: 'Internal Account / GL Reports',
          reports: [
            { name: 'GL Transaction Report', icon: 'bi-journal-bookmark-fill' }
          ]
        }
      ]
    },
    { 
      name: 'Batch Upload', icon: 'bi-cloud-upload',
      subMenus: [
        { name: 'Upload Customers', icon: 'bi-person-plus' },
        { name: 'Upload Loans', icon: 'bi-piggy-bank' }
      ]
    },
    { 
      name: 'System Settings', icon: 'bi-gear',
      subMenus: [
        { name: 'Branches', icon: 'bi-building' },
        { name: 'Configurations', icon: 'bi-sliders2' }
      ]
    },
  ], []);

  // Render My Approvals Content
  const renderMyApprovalsContent = useCallback(() => {
    const { activeSubMenu, activeNestedMenu } = navigation;
    
    if (!activeSubMenu) {
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-check2-circle fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an approval category from the menu.</p>
      </div>;
    }

    const adminApprovals = {
      'Approve User Creation': ApproveUserCreation,
      'Approve User Edit': ApproveUserEdit,
      'Approve Role Creation': ApproveRoleCreation,
      'Approve Role Edit': ApproveRoleEdit,
      'Approve User Role': ApproveUserRole,
      'Approve User to Role Edit': ApproveUserToRoleEdit,
      'Approve User Permissions': ApproveUserPermissions,
      'Approve Role Assignment': ApproveRoleAssignment,
      'Approve Teller Limit': ApproveTellerLimit,
      'Approve Loan Threshold': ApproveLoanThreshold,
      'Approve New Loan Product': ApproveNewLoanProduct,
      'Approve Loan Product Edit': ApproveLoanProductEdit,
      'Approve New Branch': ApproveNewBranch,
      'Approve Branch Edit': ApproveBranchEdit,
    };

    const customerApprovals = {
      'Approve New Customer': ApproveNewCustomer,
      'Approve Customer Maintenance': ApproveCustomerMaintenance,
      'Approve RO Assigning': ApproveROAssigning,
      'Approve Batch Upload': ApproveBatchUpload,
    };

    const accountApprovals = {
      'Approve New Accounts': ApproveNewAccounts,
      'Approve Account Maintenance': ApproveAccountMaintenance,
      'Approve Lien': ApproveLien,
    };

    const loanApprovals = {
      'Approve Web Loan Application': ApproveWebLoanApplication,
      'Approve New Individual Loan': ApproveNewIndividualLoan,
      'Approve Corporate Loan': ApproveCorporateLoan,
      'Approve Group Loan': ApproveGroupLoan,
      'Approve Loan Maintenance': ApproveLoanMaintenance,
      'Approve Loan Disbursement': ApproveLoanDisbursement,
    };

    const tellerApprovals = {
      'Approve Till Transfer': ApproveTillTransfer,
      'Approve Backdated Till Transfer': ApproveBackdatedTillTransfer,
      'Approve Cash Deposit Reversal': ApproveCashDepositReversal,
      'Approve Cash Withdrawal Reversal': ApproveCashWithdrawalReversal,
      'Approve Teller Shortage & Overage': ApproveTellerShortageOverage,
      'Approve Backdated deposit': ApproveBackdatedDeposit,
      'Approve Backdated withdrawals': ApproveBackdatedWithdrawals,
    };

    const internalAccountsApprovals = {
      'Approve GL Account Creation': ApproveGLAccountCreation,
      'Approve GL Account Edit': ApproveGLAccountEdit,
      'Approve Internal Transfers': ApproveInternalTransfers,
      'Approve Manual GL Postings': ApproveManualGLPostings,
      'Approve Fund Transfer': ApproveFundTransfer,
      'Approve Backdated FTs': ApproveBackdatedFts,
    };

    const batchUploadApprovals = {
      'Approve Customer Upload': ApproveCustomerUpload,
      'Approve Account Upload': ApproveAccountUpload,
      'Approve Loan Upload': ApproveLoanUpload,
      'Approve Disbursement Upload': ApproveDisbursementUpload,
      'Approve Repayment Upload': ApproveRepaymentUpload,
      'Approve Charges Upload': ApproveChargesUpload,
      'Approve GL Adjustments': ApproveGLAdjustments,
      'Approve Branch Reassignment': ApproveBranchReassignment,
      'Approve RO Reassignment': ApproveROReassignment,
      'Approve Picture Uploads': ApprovePictureUploads,
      'Approve ID Uploads': ApproveIDUploads,
    };

    if (activeSubMenu === 'Admin' && adminApprovals[activeNestedMenu]) {
      const Component = adminApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Customer' && customerApprovals[activeNestedMenu]) {
      const Component = customerApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Account' && accountApprovals[activeNestedMenu]) {
      const Component = accountApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Loans' && loanApprovals[activeNestedMenu]) {
      const Component = loanApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Collections' && activeNestedMenu === 'Approve Daily Collections') {
      return <ApproveDailyCollections />;
    }

    if (activeSubMenu === 'Teller' && tellerApprovals[activeNestedMenu]) {
      const Component = tellerApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Internal Accounts' && internalAccountsApprovals[activeNestedMenu]) {
      const Component = internalAccountsApprovals[activeNestedMenu];
      return <Component />;
    }

    if (activeSubMenu === 'Batch Uploads' && batchUploadApprovals[activeNestedMenu]) {
      const Component = batchUploadApprovals[activeNestedMenu];
      return <Component />;
    }

    return (
      <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-check2-circle fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an approval category from the menu.</p>
      </div>
    );
  }, [navigation]);

  // Render Content
  const renderContent = useCallback(() => {
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportName } = navigation;

    // Customer Section
    if (activeMenu === 'Customer') {
      if (activeSubMenu === 'Create Customer') {
        const customerTypes = {
          'Individual Customer': IndividualCustomer,
          'Corporate Customer': CorporateCustomer,
          'Solidarity Group': JointAccount,
        };
        if (activeNestedMenu && customerTypes[activeNestedMenu]) {
          const Component = customerTypes[activeNestedMenu];
          return <Component />;
        }
        return <div className="bg-light p-4 rounded-3 text-center">
          <i className="bi bi-person-plus fs-1 text-secondary"></i>
          <p className="mt-2 mb-0">Please select a customer type to create.</p>
        </div>;
      }
      
      const customerComponents = {
        'Customer Maintenance': CustomerMaintenance,
        'Enquiries': Enquiries,
      };
      if (activeSubMenu && customerComponents[activeSubMenu]) {
        const Component = customerComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-people fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a customer management option from the menu.</p>
      </div>;
    }

    // Account Section
    if (activeMenu === 'Account') {
      const accountComponents = {
        'Create Account': CreateAccount,
        'Edit Account': EditAccount,
        'Account List': AccountList,
        'Set or Release Lien': SetReleaseLien,
        'Account Enquiry': AccountEnquiry,
        'Account Statement': AccountStatement,
        'Close Account': CloseAccount,
      };
      if (activeSubMenu && accountComponents[activeSubMenu]) {
        const Component = accountComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-bank fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an account management option from the menu.</p>
      </div>;
    }

    // Teller Section
    if (activeMenu === 'Teller') {
      if (activeSubMenu === 'Deposit') {
        const depositComponents = {
          'Deposit': TellerDeposit,
          'Reverse Deposit': ReverseDeposit,
        };
        if (activeNestedMenu && depositComponents[activeNestedMenu]) {
          const Component = depositComponents[activeNestedMenu];
          return <Component />;
        }
        return <TellerDeposit />;
      }
      
      if (activeSubMenu === 'Withdrawals') {
        const withdrawalComponents = {
          'Withdraw': TellerWithdraw,
          'Reverse Withdrawal': ReverseWithdrawal,
        };
        if (activeNestedMenu && withdrawalComponents[activeNestedMenu]) {
          const Component = withdrawalComponents[activeNestedMenu];
          return <Component />;
        }
        return <TellerWithdraw />;
      }
      
      if (activeSubMenu === 'Till Management') {
        const tillComponents = {
          'Till Status': TillStatus,
          'Open or Close Till': OpenCloseTill,
          'Till Transfer': TillTransfer,
          'Reverse Till Transfer': ReverseTillTransfer,
          'Till Statement': TillStatement,
        };
        if (activeNestedMenu && tillComponents[activeNestedMenu]) {
          const Component = tillComponents[activeNestedMenu];
          return <Component />;
        }
        return <TillStatus />;
      }
      
      if (activeSubMenu === 'Back Dates') {
        const backdateComponents = {
          'Backdated Deposit': BackdatedDeposit,
          'Backdated Withdrawal': BackdatedWithdrawal,
          'Backdated Entry Reversal': BackdatedEntryReversal,
        };
        if (activeNestedMenu && backdateComponents[activeNestedMenu]) {
          const Component = backdateComponents[activeNestedMenu];
          return <Component />;
        }
        return <BackdatedDeposit />;
      }
      
      if (activeSubMenu === 'Call Over') return <CallOver />;
      if (activeSubMenu === 'Teller Summary') return <TellerSummary />;
      
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-cash-stack fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a teller transaction option from the menu.</p>
      </div>;
    }

    // Loans Section
    if (activeMenu === 'Loans') {
      const loanComponents = {
        'Loan Application': LoanApplication,
        'Edit Loan Application': EditLoanApplication,
        'Edit Loan Evaluation': EditLoanEvaluation,
        'Loan Evaluation': LoanApproval,
        'Loan Disbursement': LoanDisbursement,
        'Disburse Loan List': DisburseLoanList,
        'Loan Repayment': LoanRepayment,
        'Expected Repayments': ExpectedRepayments,
        'Due Repayments': DueRepayments,
        'View Loan': ViewLoan,
        'Reverse Loan': ReverseLoan,
        'Terminate Loan': TerminateLoan,
        'Loan Reschedule': LoanReschedule,
      };
      if (activeSubMenu && loanComponents[activeSubMenu]) {
        const Component = loanComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-piggy-bank fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a loan management option from the menu.</p>
      </div>;
    }

    // Investment Section
    if (activeMenu === 'Investment') {
      const investmentComponents = {
        'New Investment': NewInvestment,
        'Manage Investment': ManageInvestment,
        'Investment Redemption': InvestmentRedemption,
        'Enquiries': InvestmentEnquiries,
      };
      if (activeSubMenu && investmentComponents[activeSubMenu]) {
        const Component = investmentComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-graph-up fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an investment option from the menu.</p>
      </div>;
    }

    // Internal Accounts Section
    if (activeMenu === 'Internal Accounts') {
      if (activeSubMenu === 'Fund Transfer') {
        const fundTransferComponents = {
          'Create Fund Transfer': CreateFundTransfer,
          'Create Backdated FT': CreateBackdatedFT,
          'List of Fund Transfers': ListFundTransfers,
        };
        if (activeNestedMenu && fundTransferComponents[activeNestedMenu]) {
          const Component = fundTransferComponents[activeNestedMenu];
          return <Component />;
        }
        return <CreateFundTransfer />;
      }
      
      if (activeSubMenu === 'Lien') {
        const lienComponents = {
          'Set Lien': SetLien,
          'Release Lien': ReleaseLien,
          'Enquiries': LienEnquiries,
        };
        if (activeNestedMenu && lienComponents[activeNestedMenu]) {
          const Component = lienComponents[activeNestedMenu];
          return <Component />;
        }
        return <SetLien />;
      }
      
      const internalComponents = {
        'GL Accounts': GLAccounts,
        'Internal Transfers': InternalTransfers,
        'Internal Account Statement': InternalAccountStatement,
      };
      if (activeSubMenu && internalComponents[activeSubMenu]) {
        const Component = internalComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-diagram-3 fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an internal accounts option from the menu.</p>
      </div>;
    }

    // Admin Section
    if (activeMenu === 'Admin') {
      const adminComponents = {
        'User Management': UserManagement,
        'Roles': Roles,
      };
      if (activeSubMenu && adminComponents[activeSubMenu]) {
        const Component = adminComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-shield-lock fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select an admin option from the menu.</p>
      </div>;
    }

    // My Approvals Section
    if (activeMenu === 'My Approvals') {
      return renderMyApprovalsContent();
    }

    // Reports Section
    if (activeMenu === 'Reports') {
      const reportComponents = {
        'Loan Portfolio Report': LoanPortfolioReport,
        'Loan Disbursement Report': LoanDisbursementReport,
        'Loan Repayment Report': LoanRepaymentReport,
        'Loan Arrears Report': LoanArrearsReport,
        'Portfolio At Risk (PAR) Report': PortfolioAtRiskReport,
        'Non-Performing Loans Report': NonPerformingLoansReport,
        'Loan Aging Analysis Report': LoanAgingAnalysisReport,
        'Written-Off Loans Report': WrittenOffLoansReport,
        'Customer Master List': CustomerMasterList,
        'New Customers Report': NewCustomersReport,
        'Active Customers Report': ActiveCustomersReport,
        'Dormant Customers Report': DormantCustomersReport,
        'Customer by Branch Report': CustomerByBranchReport,
        'Customer by Relationship Officer Report': CustomerByRelationshipOfficerReport,
        'Pending KYC Report': PendingKYCReport,
        'Verified KYC Report': VerifiedKYCReport,
        'Rejected KYC Report': RejectedKYCReport,
        'Expired ID Report': ExpiredIDReport,
        'PEP Screening Report': PEPScreeningReport,
        'High Risk Customer Report': HighRiskCustomerReport,
        'Daily Teller Transactions Report': DailyTellerTransactionsReport,
        'Deposit Report': DepositReport,
        'Withdrawal Report': WithdrawalReport,
        'Teller Balancing Report': TellerBalancingReport,
        'Branch Cash Summary Report': BranchCashSummaryReport,
        'Savings Account Listing': SavingsAccountListing,
        'New Accounts Opened Report': NewAccountsOpenedReport,
        'Closed Accounts Report': ClosedAccountsReport,
        'Dormant Accounts Report': DormantAccountsReport,
        'Account Balance Report': AccountBalanceReport,
        'Collection Performance Report': CollectionPerformanceReport,
        'Expected vs Actual Collections': ExpectedVsActualCollections,
        'Daily Collection Sheet': DailyCollectionSheet,
        'Missed Payment Report': MissedPaymentReport,
        'Recovery Follow-up Report': RecoveryFollowUpReport,
        'Portfolio At Risk Report': PortfolioAtRiskReportRisk,
        'PAR > 30 Days Report': PARGreaterThan30DaysReport,
        'Delinquency Trend Report': DelinquencyTrendReport,
        'Top Exposure Customers Report': TopExposureCustomersReport,
        'Pending Customer Authorization': PendingCustomerAuthorization,
        'Pending Loan Authorization': PendingLoanAuthorization,
        'Pending Account Authorization': PendingAccountAuthorization,
        'Revenue Report': RevenueReport,
        'Expense Report': ExpenseReport,
        'Revenue vs Expense': RevenueVsExpenseReport,
        'GL Transaction Report': GLTransactionReport,
      };
      
      if (activeReportName && reportComponents[activeReportName]) {
        const Component = reportComponents[activeReportName];
        return <Component />;
      }
      
      const categoryComponents = {
        'Loan Reports': LoanReports,
        'Customer Reports': CustomerReports,
        'KYC & Compliance Reports': KYCComplianceReports,
        'Teller Reports': TellerReports,
        'Savings / Account Reports': SavingsAccountReports,
        'Collection Reports': CollectionReports,
        'Risk Reports': RiskReports,
        'Authorization Reports': AuthorizationReports,
        'Financial Reports': FinancialReports,
        'Internal Account / GL Reports': InternalAccountGLReports,
      };
      
      if (activeSubMenu && categoryComponents[activeSubMenu]) {
        const Component = categoryComponents[activeSubMenu];
        return <Component />;
      }
      
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-file-bar-graph fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a report type from the menu.</p>
      </div>;
    }

    // Batch Upload Section
    if (activeMenu === 'Batch Upload') {
      const batchComponents = {
        'Upload Customers': UploadCustomers,
        'Upload Loans': UploadLoans,
      };
      if (activeSubMenu && batchComponents[activeSubMenu]) {
        const Component = batchComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-cloud-upload fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a batch upload option from the menu.</p>
      </div>;
    }

    // System Settings Section
    if (activeMenu === 'System Settings') {
      const settingsComponents = {
        'Branches': Branches,
        'Configurations': Configurations,
      };
      if (activeSubMenu && settingsComponents[activeSubMenu]) {
        const Component = settingsComponents[activeSubMenu];
        return <Component />;
      }
      return <div className="bg-light p-4 rounded-3 text-center">
        <i className="bi bi-gear fs-1 text-secondary"></i>
        <p className="mt-2 mb-0">Please select a system settings option from the menu.</p>
      </div>;
    }

    // Dashboard
    if (activeMenu === 'Dashboard') {
      return (
        <div className="mt-4">
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
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card p-3">
                <h6>Analytics Overview</h6>
                <div style={{ height: "150px", background: "#f1f1f1" }}></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3">
                <h6>Quick Create Customer</h6>
                <button className="btn btn-primary mt-2">+ New Customer</button>
              </div>
            </div>
          </div>
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
        <p className="mt-2 mb-0">Manage your {activeMenu.toLowerCase()} here.</p>
      </div>
    );
  }, [navigation, menuItems, renderMyApprovalsContent]);

  // Main Render
  return (
    <>
      <TopNavbar
        getDisplayTitle={getDisplayTitle}
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        isSummaryDropdownOpen={isSummaryDropdownOpen}
        setIsSummaryDropdownOpen={setIsSummaryDropdownOpen}
        summaryDropdownRef={summaryDropdownRef}
        handleSummarySelect={handleSummarySelect}
        isUserDropdownOpen={isUserDropdownOpen}
        setIsUserDropdownOpen={setIsUserDropdownOpen}
        userDropdownRef={userDropdownRef}
        handleProfile={handleProfile}
        handleSettings={handleSettings}
        handleLogout={handleLogout}
      />

      <SummaryModal
        show={showSummaryModal}
        summaryType={selectedSummary}
        onClose={closeSummaryModal}
      />

      <div className="d-flex vh-100 overflow-hidden" style={{ marginTop: '70px' }}>
        {!isMobile && (
          <div
            className={`bg-dark text-white d-flex flex-column flex-shrink-0 transition-all ${
              sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
            }`}
            style={{ width: sidebarCollapsed ? '80px' : '280px', transition: 'width 0.3s ease' }}
          >
            <Sidebar
              sidebarCollapsed={sidebarCollapsed}
              isMobile={isMobile}
              expandedMenus={expandedMenus}
              expandedSubMenus={expandedSubMenus}
              hoveredItem={hoveredItem}
              menuItems={menuItems}
              navigation={navigation}
              toggleSubMenu={toggleSubMenu}
              toggleNestedMenu={toggleNestedMenu}
              handleMenuClick={handleMenuClick}
              handleSubMenuClick={handleSubMenuClick}
              handleReportClick={handleReportClick}
              handleNestedMenuClick={handleNestedMenuClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              getMenuItemId={getMenuItemId}
              isMainMenuActive={isMainMenuActive}
              isSubMenuActive={isSubMenuActive}
              isReportActive={isReportActive}
              isNestedActive={isNestedActive}
              toggleSidebar={toggleSidebar}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        )}

        {isMobile && mobileMenuOpen && (
          <>
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
              style={{ zIndex: 1040 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <div 
              className="mobile-sidebar position-fixed top-0 start-0 h-100 bg-dark text-white d-flex flex-column"
              style={{ width: '280px', zIndex: 1045, transition: 'transform 0.3s ease', transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
            >
              <Sidebar
                sidebarCollapsed={sidebarCollapsed}
                isMobile={isMobile}
                expandedMenus={expandedMenus}
                expandedSubMenus={expandedSubMenus}
                hoveredItem={hoveredItem}
                menuItems={menuItems}
                navigation={navigation}
                toggleSubMenu={toggleSubMenu}
                toggleNestedMenu={toggleNestedMenu}
                handleMenuClick={handleMenuClick}
                handleSubMenuClick={handleSubMenuClick}
                handleReportClick={handleReportClick}
                handleNestedMenuClick={handleNestedMenuClick}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                getMenuItemId={getMenuItemId}
                isMainMenuActive={isMainMenuActive}
                isSubMenuActive={isSubMenuActive}
                isReportActive={isReportActive}
                isNestedActive={isNestedActive}
                toggleSidebar={toggleSidebar}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </div>
          </>
        )}

        <div className="d-flex flex-column flex-grow-1 bg-light" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <div ref={contentAreaRef} className="dashboard-content-area">
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