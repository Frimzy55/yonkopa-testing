// teller/CallOver.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CallOver = () => {
  const [tillId, setTillId] = useState('');
  const [tills, setTills] = useState([]);
  const [callOverData, setCallOverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    fetchTills();
  }, []);

  const fetchTills = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/teller/tills', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTills(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tills');
    }
  };

  const fetchCallOverData = async () => {
    if (!tillId) {
      setError('Please select a till');
      return;
    }

    setLoading(true);
    setError('');
    setCallOverData(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/teller/tills/${tillId}/callover`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCallOverData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch call over data');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/teller/tills/${tillId}/callover/confirm`, 
        { confirmedBy: 'Admin User', confirmedAt: new Date() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Call over confirmed successfully!');
      setTimeout(() => {
        setSuccess('');
        setCallOverData(null);
        setTillId('');
        setConfirmation(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to confirm call over');
    } finally {
      setLoading(false);
    }
  };

  const getVarianceClass = (variance) => {
    if (Math.abs(variance) < 0.01) return 'text-success';
    return 'text-danger';
  };

  return (
    <div className="call-over-container">
      <h4 className="mb-4">Call Over</h4>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Select Till for Call Over</label>
              <select 
                className="form-select" 
                value={tillId} 
                onChange={(e) => setTillId(e.target.value)}
              >
                <option value="">Choose a till...</option>
                {tills.filter(t => t.status === 'Open').map(till => (
                  <option key={till.id} value={till.id}>
                    {till.name} - {till.tellerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">&nbsp;</label>
              <button 
                className="btn btn-primary w-100" 
                onClick={fetchCallOverData}
                disabled={loading || !tillId}
              >
                {loading ? 'Loading...' : 'Start Call Over'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {callOverData && !confirmation && (
        <div className="card">
          <div className="card-body">
            <h6 className="card-title mb-3">Call Over Verification</h6>
            
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Please verify that all transactions have been properly authorized and recorded.
            </div>

            <div className="row mb-4">
              <div className="col-md-3">
                <small className="text-muted">Till Name</small>
                <p className="fw-bold">{callOverData.tillName}</p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Teller</small>
                <p>{callOverData.tellerName}</p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Date</small>
                <p>{new Date(callOverData.date).toLocaleDateString()}</p>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Status</small>
                <p><span className="badge bg-warning">Pending Verification</span></p>
              </div>
            </div>

            <h6 className="mb-3">Transaction Summary</h6>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Metric</th>
                    <th className="text-end">Amount (GHS)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>System Balance</td>
                    <td className="text-end">{callOverData.systemBalance?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Physical Cash Count</td>
                    <td className="text-end">{callOverData.physicalCount?.toLocaleString()}</td>
                  </tr>
                  <tr className={getVarianceClass(callOverData.variance)}>
                    <td><strong>Variance</strong></td>
                    <td className="text-end">
                      <strong>{callOverData.variance >= 0 ? '+' : ''}{callOverData.variance?.toLocaleString()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h6 className="mb-3">Transaction Counts</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <small className="text-muted">Total Deposits</small>
                    <h5 className="text-success mb-0">{callOverData.depositCount || 0}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <small className="text-muted">Total Withdrawals</small>
                    <h5 className="text-danger mb-0">{callOverData.withdrawalCount || 0}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <small className="text-muted">Total Transfers</small>
                    <h5 className="text-info mb-0">{callOverData.transferCount || 0}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setCallOverData(null);
                  setTillId('');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={() => setConfirmation(true)}
              >
                Confirm Call Over
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmation && callOverData && (
        <div className="card mt-3">
          <div className="card-body">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Confirmation Required:</strong> Are you sure you want to confirm the call over for {callOverData.tillName}?
              {Math.abs(callOverData.variance) > 0 && (
                <div className="mt-2">
                  <strong>Note:</strong> There is a variance of GHS {Math.abs(callOverData.variance).toLocaleString()}. 
                  Please ensure this has been investigated.
                </div>
              )}
            </div>
            
            <div className="d-flex justify-content-end gap-2">
              <button 
                className="btn btn-secondary" 
                onClick={() => setConfirmation(false)}
                disabled={loading}
              >
                No, Go Back
              </button>
              <button 
                className="btn btn-success" 
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Yes, Confirm Call Over'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallOver;