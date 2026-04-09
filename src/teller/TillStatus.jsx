// teller/TillStatus.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TillStatus = () => {
  const [tills, setTills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTill, setSelectedTill] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open':
        return <span className="badge bg-success">Open</span>;
      case 'Closed':
        return <span className="badge bg-danger">Closed</span>;
      case 'Suspended':
        return <span className="badge bg-warning">Suspended</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading till status...</div>;
  }

  return (
    <div className="till-status-container">
      <h4 className="mb-4">Till Status</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {tills.map((till) => (
          <div key={till.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-title">{till.name}</h6>
                    <p className="text-muted mb-1">Teller: {till.tellerName}</p>
                  </div>
                  {getStatusBadge(till.status)}
                </div>
                
                <hr />
                
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">Current Balance</small>
                    <p className="fw-bold mb-0">GHS {till.balance?.toLocaleString() || 0}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Opening Balance</small>
                    <p className="mb-0">GHS {till.openingBalance?.toLocaleString() || 0}</p>
                  </div>
                  <div className="col-6 mt-2">
                    <small className="text-muted">Today's Deposits</small>
                    <p className="text-success mb-0">GHS {till.todayDeposits?.toLocaleString() || 0}</p>
                  </div>
                  <div className="col-6 mt-2">
                    <small className="text-muted">Today's Withdrawals</small>
                    <p className="text-danger mb-0">GHS {till.todayWithdrawals?.toLocaleString() || 0}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <small className="text-muted">Last Opened</small>
                  <p className="mb-0 small">{new Date(till.lastOpened).toLocaleString()}</p>
                  <small className="text-muted">Last Closed</small>
                  <p className="mb-0 small">{till.lastClosed ? new Date(till.lastClosed).toLocaleString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tills.length === 0 && !loading && (
        <div className="alert alert-info">No tills found</div>
      )}
    </div>
  );
};

export default TillStatus;