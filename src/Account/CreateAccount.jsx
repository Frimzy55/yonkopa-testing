// CreateAccount.jsx
import React, { useState } from 'react';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    accountType: '',
    customerId: '',
    accountName: '',
    initialDeposit: '',
    currency: 'USD',
    branch: '',
    accountOfficer: '',
    productType: '',
    email: '',
    phone: '',
    address: '',
    tin: '',
    status: 'Active'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const accountTypes = [
    'Savings Account',
    'Current Account',
    'Fixed Deposit',
    'Money Market',
    'Domiciliary Account'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'GHS', 'ZAR'];
  const branches = ['Head Office', 'Downtown Branch', 'Uptown Branch', 'Eastside Branch', 'Westside Branch'];
  const productTypes = ['Standard', 'Premium', 'Business', 'Student', 'Senior Citizen'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.accountType || !formData.customerId || !formData.accountName || !formData.initialDeposit) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.initialDeposit) < 0) {
      setError('Initial deposit cannot be negative');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate account number (simulated)
      const accountNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
      
      setSuccess(`Account created successfully! Account Number: ${accountNumber}`);
      
      // Reset form
      setFormData({
        accountType: '',
        customerId: '',
        accountName: '',
        initialDeposit: '',
        currency: 'USD',
        branch: '',
        accountOfficer: '',
        productType: '',
        email: '',
        phone: '',
        address: '',
        tin: '',
        status: 'Active'
      });
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account">
      <div className="mb-4">
        <h6 className="text-muted mb-3">Create New Bank Account</h6>
        <p className="small text-secondary">Fill in the details below to open a new account</p>
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
          {/* Account Type */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Account Type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="">Select Account Type</option>
              {accountTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Customer ID */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Customer ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              placeholder="Enter Customer ID"
              required
            />
            <small className="text-muted">Enter the existing customer ID</small>
          </div>

          {/* Account Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Account Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Enter Account Name"
              required
            />
          </div>

          {/* Initial Deposit */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Initial Deposit <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                name="initialDeposit"
                value={formData.initialDeposit}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          {/* Currency */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Currency</label>
            <select
              className="form-select"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Branch</label>
            <select
              className="form-select"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Product Type */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Product Type</label>
            <select
              className="form-select"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="">Select Product Type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Account Officer */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Account Officer</label>
            <input
              type="text"
              className="form-control"
              name="accountOfficer"
              value={formData.accountOfficer}
              onChange={handleChange}
              placeholder="Enter Account Officer Name"
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@example.com"
            />
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>

          {/* Address */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              placeholder="Enter full address"
            ></textarea>
          </div>

          {/* TIN */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Tax Identification Number (TIN)</label>
            <input
              type="text"
              className="form-control"
              name="tin"
              value={formData.tin}
              onChange={handleChange}
              placeholder="Enter TIN"
            />
          </div>

          {/* Status */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Dormant">Dormant</option>
            </select>
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Creating...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                Create Account
              </>
            )}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFormData({
                accountType: '',
                customerId: '',
                accountName: '',
                initialDeposit: '',
                currency: 'USD',
                branch: '',
                accountOfficer: '',
                productType: '',
                email: '',
                phone: '',
                address: '',
                tin: '',
                status: 'Active'
              });
            }}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;