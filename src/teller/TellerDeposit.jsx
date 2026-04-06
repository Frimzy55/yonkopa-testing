// TellerDeposit.jsx
import React, { useState } from 'react';

const TellerDeposit = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    depositType: 'cash',
    description: '',
    reference: '',
    tellerId: 'TEL001'
  });
  
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const depositTypes = ['cash', 'cheque', 'transfer'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchAccount = async () => {
    if (!formData.accountNumber) {
      setError('Please enter an account number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to fetch account details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock account details
      setAccountDetails({
        accountNumber: formData.accountNumber,
        accountName: 'John Doe',
        accountType: 'Savings Account',
        currentBalance: 5000.00,
        currency: 'USD',
        status: 'Active'
      });
    } catch (err) {
      setError('Account not found. Please check the account number.');
      setAccountDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accountDetails) {
      setError('Please search and verify the account first');
      return;
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid deposit amount');
      return;
    }

    setShowConfirm(true);
  };

  const processDeposit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to process deposit
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const depositAmount = parseFloat(formData.amount);
      const newBalance = accountDetails.currentBalance + depositAmount;
      
      setSuccess(`Deposit of ${accountDetails.currency} ${depositAmount.toFixed(2)} successfully processed! New balance: ${accountDetails.currency} ${newBalance.toFixed(2)}`);
      
      // Reset form
      setTimeout(() => {
        setFormData({
          accountNumber: '',
          amount: '',
          depositType: 'cash',
          description: '',
          reference: '',
          tellerId: 'TEL001'
        });
        setAccountDetails(null);
        setSuccess('');
        setShowConfirm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to process deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="teller-deposit">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Teller Deposit</h6>
        <p className="small text-secondary">Process cash and cheque deposits</p>
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

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-white">
              <h6 className="mb-0">Account Information</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Account Number <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter Account Number"
                    disabled={loading}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSearchAccount}
                    disabled={loading || !formData.accountNumber}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <i className="bi bi-search"></i>
                    )}
                  </button>
                </div>
              </div>

              {accountDetails && (
                <div className="bg-light p-3 rounded">
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Account Name:</small>
                      <div className="fw-semibold">{accountDetails.accountName}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Account Type:</small>
                      <div>{accountDetails.accountType}</div>
                    </div>
                    <div className="col-6 mt-2">
                      <small className="text-muted">Current Balance:</small>
                      <div className="fw-bold text-success">
                        {formatCurrency(accountDetails.currentBalance, accountDetails.currency)}
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <small className="text-muted">Status:</small>
                      <div>
                        <span className="badge bg-success">{accountDetails.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h6 className="mb-0">Deposit Details</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Deposit Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="depositType"
                    value={formData.depositType}
                    onChange={handleChange}
                  >
                    {depositTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Enter deposit description"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reference Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="Cheque number or reference"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Teller ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tellerId"
                    value={formData.tellerId}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading || !accountDetails}
                >
                  <i className="bi bi-arrow-down-circle me-2"></i>
                  Process Deposit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deposit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please confirm the deposit details:</p>
                <div className="bg-light p-3 rounded mb-3">
                  <div className="row mb-2">
                    <div className="col-6"><strong>Account:</strong></div>
                    <div className="col-6">{accountDetails?.accountNumber}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Account Name:</strong></div>
                    <div className="col-6">{accountDetails?.accountName}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Deposit Type:</strong></div>
                    <div className="col-6">{formData.depositType}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Amount:</strong></div>
                    <div className="col-6 fw-bold text-success">
                      {formatCurrency(parseFloat(formData.amount), accountDetails?.currency)}
                    </div>
                  </div>
                </div>
                <p className="text-warning mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Please verify the account details before confirming.
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
                  className="btn btn-success"
                  onClick={processDeposit}
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
                      Confirm Deposit
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

export default TellerDeposit;