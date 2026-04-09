// teller/BackdatedEntryReversal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BackdatedEntryReversal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    reversalDate: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a transaction ID');
      return;
    }

    setLoading(true);
    setError('');
    setTransaction(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/teller/backdated/transactions/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTransaction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction not found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/teller/backdated/transactions/${searchTerm}/reverse`, 
        { ...formData, reversedBy: 'Admin User' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Backdated entry reversed successfully!');
      setTimeout(() => {
        setSuccess('');
        setTransaction(null);
        setSearchTerm('');
        setFormData({ reversalDate: new Date().toISOString().split('T')[0], reason: '' });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reverse backdated entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdated-entry-reversal-container">
      <h4 className="mb-4">Backdated Entry Reversal</h4>

      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">Search Backdated Transaction</h6>
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {transaction && (
        <div className="card">
          <div className="card-body">
            <div className="alert alert-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Warning:</strong> Reversing a backdated entry requires supervisor approval.
            </div>

            <h6 className="card-title mb-3">Transaction Details</h6>
            <div className="row mb-4">
              <div className="col-md-3">
                <small className="text-muted">Transaction ID</small>
                <p className="fw-bold">{transaction.id}</p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Type</small>
                <p><span className={`badge ${transaction.type === 'deposit' ? 'bg-success' : 'bg-danger'}`}>
                  {transaction.type.toUpperCase()}
                </span></p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Amount</small>
                <p className="fw-bold">GHS {transaction.amount?.toLocaleString()}</p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Original Date</small>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className="col-md-12">
                <small className="text-muted">Account Number</small>
                <p>{transaction.accountNumber}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Reversal Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="reversalDate"
                    value={formData.reversalDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Reason for Reversal *</label>
                  <textarea
                    className="form-control"
                    name="reason"
                    rows="3"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please provide a detailed reason for reversing this backdated entry"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <button type="submit" className="btn btn-danger" disabled={loading}>
                    {loading ? 'Processing...' : 'Reverse Backdated Entry'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackdatedEntryReversal;