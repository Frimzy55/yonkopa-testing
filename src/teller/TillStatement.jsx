// teller/TillStatement.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TillStatement = () => {
  const [selectedTill, setSelectedTill] = useState('');
  const [tills, setTills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tillDetails, setTillDetails] = useState(null);

  React.useEffect(() => {
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
    if (!selectedTill) {
      setError('Please select a till');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const [tillResponse, transactionsResponse] = await Promise.all([
        axios.get(`/api/teller/tills/${selectedTill}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/teller/tills/${selectedTill}/transactions`, {
          params: dateRange,
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setTillDetails(tillResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statement');
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = () => {
    const deposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    const transfersIn = transactions.filter(t => t.type === 'transfer_in').reduce((sum, t) => sum + t.amount, 0);
    const transfersOut = transactions.filter(t => t.type === 'transfer_out').reduce((sum, t) => sum + t.amount, 0);
    
    return { deposits, withdrawals, transfersIn, transfersOut, 
      netFlow: (deposits + transfersIn) - (withdrawals + transfersOut) };
  };

  const summary = calculateSummary();

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!transactions.length) return;
    
    const headers = ['Date', 'Type', 'Amount (GHS)', 'Reference', 'Balance (GHS)'];
    const csvData = transactions.map(t => [
      new Date(t.date).toLocaleString(),
      t.type,
      t.amount,
      t.reference,
      t.balance
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `till_statement_${selectedTill}_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="till-statement-container">
      <h4 className="mb-4">Till Statement</h4>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
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
                    {till.name} - {till.tellerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">&nbsp;</label>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {tillDetails && transactions.length > 0 && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>{tillDetails.name}</h6>
                  <p className="text-muted mb-0">Teller: {tillDetails.tellerName}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="mb-0">Period: {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Deposits</small>
                  <h6 className="text-success mb-0">GHS {summary.deposits.toLocaleString()}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Withdrawals</small>
                  <h6 className="text-danger mb-0">GHS {summary.withdrawals.toLocaleString()}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Transfers In</small>
                  <h6 className="text-info mb-0">GHS {summary.transfersIn.toLocaleString()}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Net Flow</small>
                  <h6 className={summary.netFlow >= 0 ? "text-success" : "text-danger"} style={{ marginBottom: 0 }}>
                    GHS {summary.netFlow.toLocaleString()}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={handlePrint}>
              <i className="bi bi-printer me-1"></i> Print
            </button>
            <button className="btn btn-outline-success" onClick={handleExportCSV}>
              <i className="bi bi-download me-1"></i> Export CSV
            </button>
          </div>

          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Amount (GHS)</th>
                      <th>Reference</th>
                      <th>Balance (GHS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{new Date(transaction.date).toLocaleString()}</td>
                        <td>
                          <span className={`badge ${transaction.type === 'deposit' ? 'bg-success' : transaction.type === 'withdrawal' ? 'bg-danger' : 'bg-info'}`}>
                            {transaction.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className={transaction.type === 'withdrawal' || transaction.type === 'transfer_out' ? 'text-danger' : 'text-success'}>
                          GHS {transaction.amount.toLocaleString()}
                        </td>
                        <td>{transaction.reference || '-'}</td>
                        <td>GHS {transaction.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TillStatement;