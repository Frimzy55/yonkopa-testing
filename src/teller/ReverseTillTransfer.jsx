// teller/ReverseTillTransfer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ReverseTillTransfer = () => {
  const [transferId, setTransferId] = useState('');
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reason, setReason] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!transferId.trim()) {
      setError('Please enter a transfer ID');
      return;
    }

    setLoading(true);
    setError('');
    setTransfer(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/teller/transfers/${transferId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTransfer(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer not found');
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
      await axios.post(`/api/teller/transfers/${transferId}/reverse`, 
        { reason, reversedBy: 'Admin User' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Till transfer reversed successfully!');
      setTimeout(() => {
        setSuccess('');
        setTransfer(null);
        setTransferId('');
        setReason('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reverse transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reverse-till-transfer-container">
      <h4 className="mb-4">Reverse Till Transfer</h4>

      <div className="card">
        <div className="card-body">
          <h6 className="card-title mb-3">Search Transfer</h6>
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Transfer ID"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
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

      {transfer && (
        <div className="card mt-4">
          <div className="card-body">
            <h6 className="card-title mb-3">Transfer Details</h6>
            <div className="row mb-3">
              <div className="col-md-4">
                <small className="text-muted">Transfer ID</small>
                <p className="fw-bold">{transfer.id}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">From Till</small>
                <p>{transfer.fromTill}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">To Till</small>
                <p>{transfer.toTill}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Amount</small>
                <p className="fw-bold">GHS {transfer.amount?.toLocaleString()}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Date</small>
                <p>{new Date(transfer.date).toLocaleString()}</p>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Initiated By</small>
                <p>{transfer.initiatedBy}</p>
              </div>
              <div className="col-md-12">
                <small className="text-muted">Reason</small>
                <p>{transfer.reason}</p>
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
                  placeholder="Please provide a detailed reason for reversing this transfer"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger" disabled={loading}>
                {loading ? 'Processing...' : 'Reverse Transfer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseTillTransfer;