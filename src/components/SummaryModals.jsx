// components/SummaryModals.jsx
import React from 'react';

// Summary Components
export const PortfolioSummary = () => (
  <div className="p-4">
    <h4>Portfolio Summary</h4>
    <p>Total Portfolio Value: GHS 12,480,000</p>
    <p>Active Loans: 1,234</p>
    <p>Average Loan Size: GHS 10,113</p>
    <p>Total Customers: 12,480</p>
    <p>Active Accounts: 8,315</p>
  </div>
);

export const LoanSummary = () => (
  <div className="p-4">
    <h4>Loan Summary</h4>
    <p>Total Disbursed: GHS 8,456,789</p>
    <p>Total Repaid: GHS 5,234,567</p>
    <p>Outstanding Balance: GHS 3,222,222</p>
    <p>Active Loans: 1,234</p>
    <p>Default Rate: 3.2%</p>
  </div>
);

export const TellerSummaryComponent = () => (
  <div className="p-4">
    <h4>Teller Summary</h4>
    <p>Total Deposits Today: GHS 45,678</p>
    <p>Total Withdrawals Today: GHS 23,456</p>
    <p>Net Cash Flow: GHS 22,222</p>
    <p>Transactions Today: 156</p>
    <p>Active Tellers: 8</p>
  </div>
);

export const RiskSummary = () => (
  <div className="p-4">
    <h4>Risk Summary</h4>
    <p>Portfolio at Risk: 4.8%</p>
    <p>Non-Performing Loans: 5.2%</p>
    <p>High Risk Customers: 23</p>
    <p>PAR 30 Days: GHS 45,678</p>
    <p>Credit Risk Score: 78/100</p>
  </div>
);

export const AuthorizationSummary = () => (
  <div className="p-4">
    <h4>Authorization Summary</h4>
    <p>Pending Customer Approvals: 15</p>
    <p>Pending Loan Approvals: 8</p>
    <p>Pending Account Approvals: 12</p>
    <p>Pending Transactions: 24</p>
    <p>Pending KYC Reviews: 7</p>
  </div>
);

export const RevenueVsExpenseSummary = () => (
  <div className="p-4">
    <h4>Revenue vs Expense Summary</h4>
    <p>Total Revenue: GHS 567,890</p>
    <p>Total Expenses: GHS 345,678</p>
    <p>Net Profit: GHS 222,212</p>
    <p>Profit Margin: 39.1%</p>
    <p>Revenue Growth: +12.5%</p>
  </div>
);

export const KYCSummary = () => (
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

export const SummaryModal = ({ show, summaryType, onClose }) => {
  if (!show) return null;

  let summaryContent = null;
  let modalTitle = '';
  
  switch(summaryType) {
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
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {summaryContent}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};