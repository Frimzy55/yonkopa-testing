// Enquiries.jsx
import React, { useState } from 'react';

const Enquiries = () => {
  const [enquiryType, setEnquiryType] = useState('balance');
  const [accountNumber, setAccountNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockBalanceData = {
    accountNumber: 'ACC123456789',
    accountHolder: 'John Doe',
    balance: 15250.75,
    currency: 'USD',
    lastTransaction: '2024-03-20'
  };

  const mockTransactionHistory = [
    { id: 1, date: '2024-03-20', description: 'Deposit', amount: 1000.00, type: 'credit' },
    { id: 2, date: '2024-03-19', description: 'Withdrawal', amount: 500.00, type: 'debit' },
    { id: 3, date: '2024-03-18', description: 'Transfer', amount: 200.00, type: 'debit' },
  ];

  const mockCustomerInfo = {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    status: 'Active',
    joinDate: '2024-01-15',
    accounts: ['Savings - ACC123456789', 'Current - ACC987654321']
  };

  const handleBalanceEnquiry = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        type: 'balance',
        data: mockBalanceData
      });
      setLoading(false);
    }, 1000);
  };

  const handleTransactionHistory = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        type: 'transactions',
        data: mockTransactionHistory
      });
      setLoading(false);
    }, 1000);
  };

  const handleCustomerInfo = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        type: 'customer',
        data: mockCustomerInfo
      });
      setLoading(false);
    }, 1000);
  };

  const clearResult = () => {
    setResult(null);
    setAccountNumber('');
    setCustomerId('');
    setFromDate('');
    setToDate('');
  };

  const renderResult = () => {
    if (!result) return null;

    switch(result.type) {
      case 'balance':
        return (
          <div className="alert alert-success mt-3">
            <h6 className="mb-3">Account Balance Details</h6>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-1"><strong>Account Number:</strong> {result.data.accountNumber}</p>
                <p className="mb-1"><strong>Account Holder:</strong> {result.data.accountHolder}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><strong>Current Balance:</strong> {result.data.currency} {result.data.balance.toLocaleString()}</p>
                <p className="mb-1"><strong>Last Transaction:</strong> {result.data.lastTransaction}</p>
              </div>
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="mt-3">
            <h6 className="mb-3">Transaction History</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                        {transaction.type === 'credit' ? '+' : '-'} ${transaction.amount.toLocaleString()}
                      </td>
                      <td>
                        <span className={`badge ${transaction.type === 'credit' ? 'bg-success' : 'bg-danger'}`}>
                          {transaction.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'customer':
        return (
          <div className="alert alert-info mt-3">
            <h6 className="mb-3">Customer Information</h6>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-1"><strong>Customer ID:</strong> {result.data.id}</p>
                <p className="mb-1"><strong>Full Name:</strong> {result.data.name}</p>
                <p className="mb-1"><strong>Email:</strong> {result.data.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {result.data.phone}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><strong>Status:</strong> 
                  <span className={`badge ${result.data.status === 'Active' ? 'bg-success' : 'bg-warning'} ms-2`}>
                    {result.data.status}
                  </span>
                </p>
                <p className="mb-1"><strong>Join Date:</strong> {result.data.joinDate}</p>
                <p className="mb-1"><strong>Accounts:</strong></p>
                <ul className="mb-0">
                  {result.data.accounts.map((account, index) => (
                    <li key={index}>{account}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <h6 className="mb-4">Customer Enquiries</h6>
      
      {/* Enquiry Type Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${enquiryType === 'balance' ? 'active' : ''}`}
            onClick={() => {
              setEnquiryType('balance');
              clearResult();
            }}
          >
            <i className="bi bi-wallet2 me-2"></i>Balance Enquiry
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${enquiryType === 'transactions' ? 'active' : ''}`}
            onClick={() => {
              setEnquiryType('transactions');
              clearResult();
            }}
          >
            <i className="bi bi-clock-history me-2"></i>Transaction History
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${enquiryType === 'customer' ? 'active' : ''}`}
            onClick={() => {
              setEnquiryType('customer');
              clearResult();
            }}
          >
            <i className="bi bi-person-badge me-2"></i>Customer Information
          </button>
        </li>
      </ul>

      {/* Enquiry Forms */}
      <div className="row">
        <div className="col-md-6">
          {enquiryType === 'balance' && (
            <div className="card">
              <div className="card-body">
                <h6 className="card-title mb-3">Balance Enquiry</h6>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleBalanceEnquiry}
                  disabled={!accountNumber || loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>Check Balance
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {enquiryType === 'transactions' && (
            <div className="card">
              <div className="card-body">
                <h6 className="card-title mb-3">Transaction History</h6>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">From Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">To Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleTransactionHistory}
                  disabled={!accountNumber || loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Fetching...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>View History
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {enquiryType === 'customer' && (
            <div className="card">
              <div className="card-body">
                <h6 className="card-title mb-3">Customer Information</h6>
                <div className="mb-3">
                  <label className="form-label">Customer ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleCustomerInfo}
                  disabled={!customerId || loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Fetching...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>Get Details
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="col-md-6">
          {renderResult()}
          
          {!result && (
            <div className="text-center text-muted mt-5">
              <i className="bi bi-info-circle fs-1"></i>
              <p className="mt-2">Enter details above to view enquiry results</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="mt-5">
        <h6 className="mb-3">Recent Enquiries</h6>
        <div className="list-group">
          <div className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-wallet2 me-2 text-primary"></i>
                <strong>Balance Enquiry</strong> - Account: ACC123456789
              </div>
              <small className="text-muted">10 mins ago</small>
            </div>
          </div>
          <div className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-clock-history me-2 text-success"></i>
                <strong>Transaction History</strong> - Account: ACC987654321
              </div>
              <small className="text-muted">1 hour ago</small>
            </div>
          </div>
          <div className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-person-badge me-2 text-info"></i>
                <strong>Customer Info</strong> - ID: CUST001
              </div>
              <small className="text-muted">2 hours ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;