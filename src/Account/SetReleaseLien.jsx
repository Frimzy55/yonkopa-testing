// Account/SetReleaseLien.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SetReleaseLien = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lienType, setLienType] = useState('Set');
  const [lienData, setLienData] = useState({
    amount: '',
    reason: '',
    expiryDate: '',
    reference: ''
  });

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
        // Check if account has active lien
        if (response.data.lien) {
          setLienType('Release');
          setLienData({
            amount: response.data.lien.amount || '',
            reason: response.data.lien.reason || '',
            expiryDate: response.data.lien.expiryDate || '',
            reference: response.data.lien.reference || ''
          });
        } else {
          setLienType('Set');
          setLienData({
            amount: '',
            reason: '',
            expiryDate: '',
            reference: ''
          });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Account not found');
    } finally {
      setLoading(false);
    }
  };

  const handleLienDataChange = (e) => {
    const { name, value } = e.target;
    setLienData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      let response;
      
      if (lienType === 'Set') {
        response = await axios.post(`/api/accounts/${searchTerm}/lien`, lienData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Lien set successfully!');
      } else {
        response = await axios.delete(`/api/accounts/${searchTerm}/lien`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Lien released successfully!');
      }
      
      // Refresh account data
      const updatedAccount = await axios.get(`/api/accounts/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccount(updatedAccount.data);
      
      if (updatedAccount.data.lien) {
        setLienType('Release');
        setLienData({
          amount: updatedAccount.data.lien.amount || '',
          reason: updatedAccount.data.lien.reason || '',
          expiryDate: updatedAccount.data.lien.expiryDate || '',
          reference: updatedAccount.data.lien.reference || ''
        });
      } else {
        setLienType('Set');
        setLienData({
          amount: '',
          reason: '',
          expiryDate: '',
          reference: ''
        });
      }
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${lienType === 'Set' ? 'set' : 'release'} lien`);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableBalance = () => {
    if (!account) return 0;
    const lienAmount = account.lien?.amount || 0;
    return account.balance - lienAmount;
  };

  return (
    <div className="set-release-lien-container">
      <h4 className="mb-4">Set / Release Lien</h4>

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

      {/* Account Details */}
      {account && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="card-title mb-3">Account Details</h6>
              <div className="row">
                <div className="col-md-3">
                  <small className="text-muted">Account Number</small>
                  <p className="fw-bold">{account.accountNumber}</p>
                </div>
                <div className="col-md-3">
                  <small className="text-muted">Account Name</small>
                  <p className="fw-bold">{account.accountName}</p>
                </div>
                <div className="col-md-3">
                  <small className="text-muted">Account Balance</small>
                  <p className="fw-bold">GHS {account.balance?.toLocaleString() || 0}</p>
                </div>
                <div className="col-md-3">
                  <small className="text-muted">Available Balance</small>
                  <p className="fw-bold text-success">GHS {getAvailableBalance().toLocaleString()}</p>
                </div>
              </div>
              {account.lien && (
                <div className="alert alert-warning mt-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Active Lien:</strong> GHS {account.lien.amount?.toLocaleString()} - {account.lien.reason}
                  {account.lien.expiryDate && ` (Expires: ${new Date(account.lien.expiryDate).toLocaleDateString()})`}
                </div>
              )}
            </div>
          </div>

          {/* Lien Form */}
          <div className="card">
            <div className="card-body">
              <h6 className="card-title mb-3">
                {lienType === 'Set' ? 'Set Lien' : 'Release Lien'}
              </h6>
              
              <form onSubmit={handleSubmit}>
                {lienType === 'Set' ? (
                  <>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Lien Amount (GHS)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          name="amount"
                          value={lienData.amount}
                          onChange={handleLienDataChange}
                          max={account.balance}
                          required
                        />
                        <small className="text-muted">Maximum: GHS {account.balance?.toLocaleString()}</small>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Reference Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="reference"
                          value={lienData.reference}
                          onChange={handleLienDataChange}
                          placeholder="e.g., Court Order #123, Tax Lien"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Reason for Lien</label>
                        <textarea
                          className="form-control"
                          name="reason"
                          rows="3"
                          value={lienData.reason}
                          onChange={handleLienDataChange}
                          placeholder="Provide detailed reason for the lien"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Expiry Date (Optional)</label>
                        <input
                          type="date"
                          className="form-control"
                          name="expiryDate"
                          value={lienData.expiryDate}
                          onChange={handleLienDataChange}
                        />
                        <small className="text-muted">Leave empty for indefinite lien</small>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Are you sure you want to release the lien on this account?
                    <ul className="mt-2 mb-0">
                      <li><strong>Lien Amount:</strong> GHS {account.lien?.amount?.toLocaleString()}</li>
                      <li><strong>Reason:</strong> {account.lien?.reason}</li>
                      {account.lien?.reference && <li><strong>Reference:</strong> {account.lien.reference}</li>}
                    </ul>
                  </div>
                )}

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : (lienType === 'Set' ? 'Set Lien' : 'Release Lien')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SetReleaseLien;