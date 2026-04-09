// teller/ReverseWithdrawal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ReverseWithdrawal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reason, setReason] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a transaction ID or account number');
      return;
    }

    setLoading(true);
    setError('');
    setTransaction(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/teller/transactions/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.type === 'withdrawal') {
        setTransaction(response.data);
      } else {
        setError('No withdrawal transaction found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction not found');
    } finally {
      setLoading(false);
    }
  };

  const handleReverse = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please provide a reason for reversal');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/teller/transactions/${transaction.id}/reverse`, 
        { reason, reversedBy: 'Admin User' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Withdrawal reversed successfully!');
      setReason('');
      setTimeout(() => {
        setSuccess('');
        setTransaction(null);
        setSearchTerm('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reverse withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reverse-withdrawal-container">
      <h4 className="mb-4">Reverse Withdrawal</h4>

      <div className="card">
        <div className="card-body">
          <h6 className="card-title mb-3">Search Withdrawal Transaction</h6>
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Transaction ID or Account Number"
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

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}

      {transaction && (
        <div className="card mt-4">
          <div className="card-body">
            <h6 className="card-title mb-3">Transaction Details</h6>
            <div className="row mb-3">
              <div className="col-md-4">
                <small className="text-muted">Transaction ID</small>
                <p className="fw-bold">{transaction.id}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Account Number</small>
                <p className="fw-bold">{transaction.accountNumber}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Amount</small>
                <p className="fw-bold text-danger">GHS {transaction.amount?.toLocaleString()}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Date</small>
                <p>{new Date(transaction.date).toLocaleString()}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Teller</small>
                <p>{transaction.teller}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Status</small>
                <p><span className="badge bg-success">{transaction.status}</span></p>
              </div>
            </div>

            <form onSubmit={handleReverse}>
              <div className="mb-3">
                <label className="form-label">Reason for Reversal</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a detailed reason for reversing this withdrawal"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger" disabled={loading}>
                {loading ? 'Processing...' : 'Reverse Withdrawal'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseWithdrawal;