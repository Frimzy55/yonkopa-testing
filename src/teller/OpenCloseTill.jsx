// teller/OpenCloseTill.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenCloseTill = () => {
  const [tills, setTills] = useState([]);
  const [selectedTill, setSelectedTill] = useState('');
  const [action, setAction] = useState('Open');
  const [openingBalance, setOpeningBalance] = useState('');
  const [closingBalance, setClosingBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        tillId: selectedTill,
        action,
        ...(action === 'Open' && { openingBalance: parseFloat(openingBalance) }),
        ...(action === 'Close' && { closingBalance: parseFloat(closingBalance) })
      };
      
      await axios.post('/api/teller/tills/status', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(`Till ${action.toLowerCase()}ed successfully!`);
      setTimeout(() => {
        setSuccess('');
        fetchTills();
        setSelectedTill('');
        setOpeningBalance('');
        setClosingBalance('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action.toLowerCase()} till`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="open-close-till-container">
      <h4 className="mb-4">Open / Close Till</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Select Till</label>
                <select 
                  className="form-select" 
                  value={selectedTill} 
                  onChange={(e) => setSelectedTill(e.target.value)}
                  required
                >
                  <option value="">Choose a till...</option>
                  {tills.map(till => (
                    <option key={till.id} value={till.id}>
                      {till.name} - {till.tellerName} ({till.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Action</label>
                <select 
                  className="form-select" 
                  value={action} 
                  onChange={(e) => setAction(e.target.value)}
                  required
                >
                  <option value="Open">Open Till</option>
                  <option value="Close">Close Till</option>
                </select>
              </div>

              {action === 'Open' && (
                <div className="col-md-12">
                  <label className="form-label">Opening Balance (GHS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={openingBalance}
                    onChange={(e) => setOpeningBalance(e.target.value)}
                    placeholder="Enter opening cash balance"
                    required
                  />
                </div>
              )}

              {action === 'Close' && (
                <div className="col-md-12">
                  <label className="form-label">Closing Balance (GHS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={closingBalance}
                    onChange={(e) => setClosingBalance(e.target.value)}
                    placeholder="Enter closing cash balance"
                    required
                  />
                </div>
              )}

              <div className="col-md-12">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing...' : `${action} Till`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenCloseTill;