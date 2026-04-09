// Account/AccountStatement.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AccountStatement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [statementType, setStatementType] = useState('all'); // all, deposits, withdrawals

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter an account number');
      return;
    }

    setLoading(true);
    setError('');
    setAccount(null);
    setTransactions([]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/accounts/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAccount(response.data);
      await fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || 'Account not found');
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/accounts/${searchTerm}/transactions`, {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          type: statementType !== 'all' ? statementType : undefined
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (account) {
      fetchTransactions();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!transactions.length) return;
    
    const headers = ['Date', 'Description', 'Transaction Type', 'Debit (GHS)', 'Credit (GHS)', 'Balance (GHS)'];
    const csvData = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.type,
      t.type === 'withdrawal' ? t.amount : '',
      t.type === 'deposit' ? t.amount : '',
      t.balance
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement_${account.accountNumber}_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculateSummary = () => {
    const deposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    return { deposits, withdrawals, net: deposits - withdrawals };
  };

  const summary = calculateSummary();

  return (
    <div className="account-statement-container">
      <h4 className="mb-4">Account Statement</h4>

      {/* Search Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">Select Account</h6>
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
                {loading ? 'Loading...' : 'Load Account'}
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

      {/* Account Statement */}
      {account && (
        <>
          {/* Account Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mb-1">{account.accountName}</h5>
                  <p className="text-muted mb-0">Account Number: {account.accountNumber}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="mb-0">Statement Period: {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}</p>
                  <p className="mb-0">Opening Balance: GHS {account.openingBalance?.toLocaleString() || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleFilterSubmit} className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Transaction Type</label>
                  <select 
                    className="form-select" 
                    value={statementType} 
                    onChange={(e) => setStatementType(e.target.value)}
                  >
                    <option value="all">All Transactions</option>
                    <option value="deposit">Deposits Only</option>
                    <option value="withdrawal">Withdrawals Only</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-primary w-100">
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Total Deposits</small>
                  <h5 className="text-success mb-0">GHS {summary.deposits.toLocaleString()}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Total Withdrawals</small>
                  <h5 className="text-danger mb-0">GHS {summary.withdrawals.toLocaleString()}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <small className="text-muted">Net Change</small>
                  <h5 className={summary.net >= 0 ? "text-success" : "text-danger"} style={{ marginBottom: 0 }}>
                    GHS {summary.net.toLocaleString()}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-3 d-flex gap-2 justify-content-end">
            <button className="btn btn-outline-secondary" onClick={handlePrint}>
              <i className="bi bi-printer me-1"></i> Print
            </button>
            <button className="btn btn-outline-success" onClick={handleExportCSV}>
              <i className="bi bi-download me-1"></i> Export CSV
            </button>
          </div>

          {/* Transactions Table */}
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Transaction Type</th>
                      <th className="text-end">Debit (GHS)</th>
                      <th className="text-end">Credit (GHS)</th>
                      <th className="text-end">Balance (GHS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No transactions found for the selected period
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{new Date(transaction.date).toLocaleDateString()}</td>
                          <td>{transaction.description}</td>
                          <td>
                            <span className={`badge ${transaction.type === 'deposit' ? 'bg-success' : 'bg-danger'}`}>
                              {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                            </span>
                          </td>
                          <td className="text-end text-danger">
                            {transaction.type === 'withdrawal' ? `GHS ${transaction.amount.toLocaleString()}` : '-'}
                          </td>
                          <td className="text-end text-success">
                            {transaction.type === 'deposit' ? `GHS ${transaction.amount.toLocaleString()}` : '-'}
                          </td>
                          <td className="text-end fw-bold">GHS {transaction.balance.toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Closing Balance */}
          {transactions.length > 0 && !loading && (
            <div className="card mt-3">
              <div className="card-body text-end">
                <strong>Closing Balance: GHS {transactions[transactions.length - 1]?.balance?.toLocaleString() || 0}</strong>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountStatement;