// teller/BackdatedWithdrawal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BackdatedWithdrawal = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      await axios.post('/api/teller/backdated/withdrawal', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Backdated withdrawal processed successfully!');
      setTimeout(() => {
        setSuccess('');
        setFormData({
          accountNumber: '',
          amount: '',
          transactionDate: new Date().toISOString().split('T')[0],
          description: '',
          reason: ''
        });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process backdated withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdated-withdrawal-container">
      <h4 className="mb-4">Backdated Withdrawal</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <div className="card-body">
          <div className="alert alert-warning mb-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Warning:</strong> Backdated transactions require approval from a supervisor.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Account Number *</label>
                <input
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Amount (GHS) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Transaction Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="transactionDate"
                  value={formData.transactionDate}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted">Date must be before today</small>
              </div>

              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional description"
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Reason for Backdating *</label>
                <textarea
                  className="form-control"
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please provide a detailed reason for the backdated transaction"
                  required
                />
              </div>

              <div className="col-md-12">
                <button type="submit" className="btn btn-warning" disabled={loading}>
                  {loading ? 'Processing...' : 'Submit Backdated Withdrawal'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BackdatedWithdrawal;