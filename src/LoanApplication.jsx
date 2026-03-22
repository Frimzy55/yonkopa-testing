// LoanApplication.jsx
import React, { useState } from 'react';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    loanType: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
    existingLoans: 'no',
    collateral: 'none',
    accountNumber: '',
    applicationDate: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [customerFound, setCustomerFound] = useState(false);

  const loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Business Loan',
    'Education Loan',
    'Agricultural Loan'
  ];

  const employmentStatuses = ['Employed', 'Self-Employed', 'Business Owner', 'Retired', 'Unemployed'];
  const collateralTypes = ['None', 'Property', 'Vehicle', 'Fixed Deposit', 'Gold', 'Shares'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchCustomer = async () => {
    if (!formData.customerId) {
      setError('Please enter a customer ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock customer data
      if (formData.customerId === 'CUST001') {
        setFormData(prev => ({
          ...prev,
          customerName: 'John Doe',
          accountNumber: '1001234567',
          monthlyIncome: '5000'
        }));
        setCustomerFound(true);
      } else {
        setError('Customer not found');
        setCustomerFound(false);
      }
    } catch (err) {
      setError('Failed to fetch customer details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!customerFound) {
      setError('Please search and verify the customer first');
      return;
    }
    
    if (!formData.loanType || !formData.loanAmount || !formData.loanTerm) {
      setError('Please fill in all required fields');
      return;
    }
    
    setShowConfirm(true);
  };

  const processApplication = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const applicationId = 'LN' + Math.floor(Math.random() * 100000);
      
      setSuccess(`Loan application submitted successfully! Application ID: ${applicationId}`);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          customerId: '',
          customerName: '',
          loanType: '',
          loanAmount: '',
          loanTerm: '',
          interestRate: '',
          purpose: '',
          employmentStatus: '',
          monthlyIncome: '',
          existingLoans: 'no',
          collateral: 'none',
          accountNumber: '',
          applicationDate: new Date().toISOString().split('T')[0]
        });
        setCustomerFound(false);
        setSuccess('');
        setShowConfirm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateEstimatedEMI = () => {
    if (!formData.loanAmount || !formData.loanTerm || !formData.interestRate) return 0;
    
    const principal = parseFloat(formData.loanAmount);
    const months = parseFloat(formData.loanTerm);
    const ratePerMonth = parseFloat(formData.interestRate) / 100 / 12;
    
    if (ratePerMonth === 0) return principal / months;
    
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, months) / (Math.pow(1 + ratePerMonth, months) - 1);
    return emi;
  };

  return (
    <div className="loan-application">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Loan Application</h6>
        <p className="small text-secondary">Submit a new loan application</p>
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

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Customer Search */}
          <div className="col-md-12">
            <div className="card bg-light">
              <div className="card-body">
                <h6 className="mb-3">Customer Information</h6>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Customer ID <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        placeholder="Enter Customer ID"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSearchCustomer}
                        disabled={loading || !formData.customerId}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i className="bi bi-search"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.customerName}
                      readOnly
                      disabled
                    />
                  </div>
                  {customerFound && (
                    <>
                      <div className="col-md-6 mt-2">
                        <label className="form-label fw-semibold">Account Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.accountNumber}
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="col-md-6 mt-2">
                        <label className="form-label fw-semibold">Monthly Income</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formatCurrency(formData.monthlyIncome)}
                          readOnly
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="col-md-12">
            <h6 className="mb-3 mt-2">Loan Details</h6>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Loan Type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
            >
              <option value="">Select Loan Type</option>
              {loanTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Loan Amount <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="0.00"
                step="1000"
                min="1000"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Loan Term (Months) <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              required
            >
              <option value="">Select Term</option>
              <option value="12">12 Months (1 Year)</option>
              <option value="24">24 Months (2 Years)</option>
              <option value="36">36 Months (3 Years)</option>
              <option value="48">48 Months (4 Years)</option>
              <option value="60">60 Months (5 Years)</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Interest Rate (%) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="Enter interest rate"
              step="0.1"
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold">Loan Purpose</label>
            <textarea
              className="form-control"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows="2"
              placeholder="Describe the purpose of the loan"
            ></textarea>
          </div>

          {/* Employment & Financial Info */}
          <div className="col-md-12">
            <h6 className="mb-3 mt-2">Employment & Financial Information</h6>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Employment Status</label>
            <select
              className="form-select"
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              {employmentStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Existing Loans</label>
            <select
              className="form-select"
              name="existingLoans"
              value={formData.existingLoans}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold">Collateral Type</label>
            <select
              className="form-select"
              name="collateral"
              value={formData.collateral}
              onChange={handleChange}
            >
              {collateralTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* EMI Display */}
          {formData.loanAmount && formData.loanTerm && formData.interestRate && (
            <div className="col-md-12">
              <div className="alert alert-info">
                <i className="bi bi-calculator me-2"></i>
                <strong>Estimated Monthly EMI:</strong> {formatCurrency(calculateEstimatedEMI())}
              </div>
            </div>
          )}

          <div className="col-md-12 mt-3">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading || !customerFound}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Submit Application
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Loan Application</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please review the loan application details:</p>
                <div className="bg-light p-3 rounded mb-3">
                  <div className="row mb-2">
                    <div className="col-6"><strong>Customer:</strong></div>
                    <div className="col-6">{formData.customerName}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Loan Type:</strong></div>
                    <div className="col-6">{formData.loanType}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Loan Amount:</strong></div>
                    <div className="col-6">{formatCurrency(formData.loanAmount)}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Term:</strong></div>
                    <div className="col-6">{formData.loanTerm} months</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Interest Rate:</strong></div>
                    <div className="col-6">{formData.interestRate}%</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6"><strong>Estimated EMI:</strong></div>
                    <div className="col-6">{formatCurrency(calculateEstimatedEMI())}</div>
                  </div>
                </div>
                <p className="text-warning mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  This application will be sent for approval.
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
                  className="btn btn-primary"
                  onClick={processApplication}
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
                      Confirm Application
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

export default LoanApplication;