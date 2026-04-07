// CloseAccount.jsx
import React, { useState } from 'react';

const CloseAccount = () => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [closeReason, setCloseReason] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const closeReasons = [
    'Customer Request',
    'Account Dormant',
    'Business Closed',
    'Fraudulent Activity',
    'Regulatory Closure',
    'Deceased Customer',
    'Duplicate Account',
    'Others'
  ];

  const handleSearchAccount = async () => {
    if (!accountNumber) {
      setError('Please enter an account number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to fetch account details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock account details
      if (accountNumber === '1001234567') {
        setAccountDetails({
          accountNumber: '1001234567',
          accountName: 'John Doe',
          accountType: 'Savings Account',
          balance: 5000.00,
          currency: 'USD',
          status: 'Active',
          customerId: 'CUST001',
          openedDate: '2024-01-15',
          lastTransaction: '2024-03-20'
        });
        setStep(2);
      } else {
        setError('Account not found. Please check the account number and try again.');
        setAccountDetails(null);
      }
    } catch (err) {
      setError('Failed to fetch account details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAccount = async () => {
    if (!closeReason) {
      setError('Please select a reason for closing the account');
      return;
    }

    if (accountDetails.balance > 0) {
      setError('Account has a positive balance. Please process final settlement before closing.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to close account
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(`Account ${accountNumber} has been successfully closed.`);
      setStep(3);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        handleReset();
      }, 3000);
    } catch (err) {
      setError('Failed to close account. Please try again.');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAccountNumber('');
    setAccountDetails(null);
    setCloseReason('');
    setComments('');
    setError('');
    setSuccess('');
    setShowConfirm(false);
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="close-account">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Close Bank Account</h6>
        <p className="small text-secondary">Process account closure with proper verification</p>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {/* Step 1: Search Account */}
      {step === 1 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-search fs-1 text-primary"></i>
              </div>
              <h5>Find Account to Close</h5>
              <p className="text-muted small">Enter the account number to verify account details</p>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-bank"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchAccount()}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSearchAccount}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-search me-2"></i>
                        Search
                      </>
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <small className="text-muted">Example: 1001234567</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Verify and Close Account */}
      {step === 2 && accountDetails && (
        <div>
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-white">
              <h6 className="mb-0">Account Details Verification</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td className="text-muted">Account Number:</td>
                        <td className="fw-semibold">{accountDetails.accountNumber}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Account Name:</td>
                        <td>{accountDetails.accountName}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Account Type:</td>
                        <td>{accountDetails.accountType}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Customer ID:</td>
                        <td><code>{accountDetails.customerId}</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td className="text-muted">Current Balance:</td>
                        <td className={`fw-bold ${accountDetails.balance > 0 ? 'text-success' : accountDetails.balance < 0 ? 'text-danger' : ''}`}>
                          {formatCurrency(accountDetails.balance, accountDetails.currency)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">Status:</td>
                        <td>
                          <span className="badge bg-success">{accountDetails.status}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">Opened Date:</td>
                        <td>{new Date(accountDetails.openedDate).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Last Transaction:</td>
                        <td>{new Date(accountDetails.lastTransaction).toLocaleDateString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {accountDetails.balance > 0 && (
                <div className="alert alert-warning mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Warning:</strong> This account has a positive balance of {formatCurrency(accountDetails.balance, accountDetails.currency)}. 
                  Please process final settlement before closing the account.
                </div>
              )}

              {accountDetails.balance < 0 && (
                <div className="alert alert-danger mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Alert:</strong> This account has an overdraft of {formatCurrency(Math.abs(accountDetails.balance), accountDetails.currency)}. 
                  Clear the negative balance before proceeding.
                </div>
              )}
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h6 className="mb-0">Closure Information</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Reason for Closure <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={closeReason}
                  onChange={(e) => setCloseReason(e.target.value)}
                >
                  <option value="">Select Reason</option>
                  {closeReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Additional Comments</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter any additional notes or comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              <div className="alert alert-danger">
                <i className="bi bi-exclamation-octagon me-2"></i>
                <strong>Important:</strong> This action is irreversible. Once the account is closed, 
                all associated services will be terminated and cannot be restored.
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  className="btn btn-danger"
                  onClick={() => setShowConfirm(true)}
                  disabled={loading || accountDetails.balance !== 0}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Close Account
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
              <i className="bi bi-check-circle-fill fs-1 text-success"></i>
            </div>
            <h5>Account Closed Successfully</h5>
            <p className="text-muted">
              Account {accountNumber} has been permanently closed.
            </p>
            <button
              className="btn btn-primary mt-2"
              onClick={handleReset}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Close Another Account
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Account Closure</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to close the following account?</p>
                <div className="bg-light p-3 rounded mb-3">
                  <strong>Account Number:</strong> {accountDetails?.accountNumber}<br />
                  <strong>Account Name:</strong> {accountDetails?.accountName}<br />
                  <strong>Balance:</strong> {formatCurrency(accountDetails?.balance || 0, accountDetails?.currency || 'USD')}
                </div>
                <p className="text-danger mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  This action cannot be undone!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCloseAccount}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>
                      Yes, Close Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseAccount;