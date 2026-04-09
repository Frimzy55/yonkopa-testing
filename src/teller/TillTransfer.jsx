// teller/TillTransfer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TillTransfer = () => {
  const [tills, setTills] = useState([]);
  const [formData, setFormData] = useState({
    fromTill: '',
    toTill: '',
    amount: '',
    reason: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.fromTill === formData.toTill) {
      setError('Source and destination tills cannot be the same');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/teller/tills/transfer', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Till transfer completed successfully!');
      setTimeout(() => {
        setSuccess('');
        setFormData({ fromTill: '', toTill: '', amount: '', reason: '' });
        fetchTills();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to transfer funds');
    } finally {
      setLoading(false);
    }
  };

  const getTillBalance = (tillId) => {
    const till = tills.find(t => t.id === tillId);
    return till ? till.balance : 0;
  };

  return (
    <div className="till-transfer-container">
      <h4 className="mb-4">Till Transfer</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">From Till</label>
                <select 
                  className="form-select" 
                  name="fromTill"
                  value={formData.fromTill} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select source till...</option>
                  {tills.filter(t => t.status === 'Open').map(till => (
                    <option key={till.id} value={till.id}>
                      {till.name} - {till.tellerName} (Balance: GHS {till.balance?.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">To Till</label>
                <select 
                  className="form-select" 
                  name="toTill"
                  value={formData.toTill} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select destination till...</option>
                  {tills.filter(t => t.status === 'Open' && t.id !== formData.fromTill).map(till => (
                    <option key={till.id} value={till.id}>
                      {till.name} - {till.tellerName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Amount (GHS)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  max={getTillBalance(formData.fromTill)}
                  placeholder="Enter amount to transfer"
                  required
                />
                {formData.fromTill && (
                  <small className="text-muted">
                    Available balance: GHS {getTillBalance(formData.fromTill).toLocaleString()}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Reason for Transfer</label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g., Cash replenishment, Till balancing"
                  required
                />
              </div>

              <div className="col-md-12">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing...' : 'Transfer Funds'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TillTransfer;