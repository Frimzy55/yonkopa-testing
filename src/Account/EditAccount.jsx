// Account/EditAccount.jsx
import React, { useState,  } from 'react';
import axios from 'axios';

const EditAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    accountName: '',
    accountType: '',
    accountStatus: 'Active',
    branch: '',
    interestRate: '',
    minimumBalance: '',
    overdraftLimit: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const accountTypes = ['Savings', 'Current', 'Fixed Deposit', 'Joint', 'Corporate'];
  const accountStatuses = ['Active', 'Dormant', 'Suspended', 'Closed'];
  const branches = ['Head Office', 'Downtown Branch', 'North Branch', 'East Branch', 'West Branch'];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter an account number');
      return;
    }

    setLoading(true);
    setError('');
    setAccount(null);
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/accounts/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setAccount(response.data);
        setFormData({
          accountName: response.data.accountName || '',
          accountType: response.data.accountType || '',
          accountStatus: response.data.accountStatus || 'Active',
          branch: response.data.branch || '',
          interestRate: response.data.interestRate || '',
          minimumBalance: response.data.minimumBalance || '',
          overdraftLimit: response.data.overdraftLimit || '',
          phoneNumber: response.data.phoneNumber || '',
          email: response.data.email || '',
          address: response.data.address || ''
        });
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Account not found');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/accounts/${searchTerm}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Account updated successfully!');
      setAccount(response.data);
      setIsEditing(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update account');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (account) {
      setFormData({
        accountName: account.accountName || '',
        accountType: account.accountType || '',
        accountStatus: account.accountStatus || 'Active',
        branch: account.branch || '',
        interestRate: account.interestRate || '',
        minimumBalance: account.minimumBalance || '',
        overdraftLimit: account.overdraftLimit || '',
        phoneNumber: account.phoneNumber || '',
        email: account.email || '',
        address: account.address || ''
      });
      setIsEditing(false);
      setError('');
      setSuccess('');
    }
  };

  return (
    <div className="edit-account-container">
      <h4 className="mb-4">Edit Account</h4>

      {/* Search Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">Search Account</h6>
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Account Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Searching...' : 'Search Account'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {/* Edit Form */}
      {account && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Account Information</h6>
              <div>
                <span className="badge bg-secondary me-2">Account: {account.accountNumber}</span>
                <span className={`badge ${account.accountStatus === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                  {account.accountStatus}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Account Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Account Type</label>
                  <select
                    className="form-select"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Account Type</option>
                    {accountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Account Status</label>
                  <select
                    className="form-select"
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleInputChange}
                    required
                  >
                    {accountStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Minimum Balance (GHS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="minimumBalance"
                    value={formData.minimumBalance}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Overdraft Limit (GHS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="overdraftLimit"
                    value={formData.overdraftLimit}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-4 d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading || !isEditing}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleReset}
                  disabled={!isEditing}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* No Account Selected Message */}
      {!account && !loading && !error && searchTerm && (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No account found. Please check the account number and try again.
        </div>
      )}
    </div>
  );
};

export default EditAccount;