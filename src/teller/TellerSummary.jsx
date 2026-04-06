// TellerSummary.jsx
import React, { useState, useEffect } from 'react';

const TellerSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    netFlow: 0,
    transactionCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('today');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch transactions data
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockTransactions = [
          {
            id: 1,
            transactionId: 'TXN001234',
            type: 'deposit',
            amount: 5000.00,
            currency: 'USD',
            accountNumber: '1001234567',
            accountName: 'John Doe',
            description: 'Cash deposit',
            tellerId: 'TEL001',
            timestamp: '2024-03-22 10:30:00',
            status: 'completed'
          },
          {
            id: 2,
            transactionId: 'TXN001235',
            type: 'withdrawal',
            amount: 1000.00,
            currency: 'USD',
            accountNumber: '1001234568',
            accountName: 'Jane Smith',
            description: 'ATM withdrawal',
            tellerId: 'TEL001',
            timestamp: '2024-03-22 11:15:00',
            status: 'completed'
          },
          {
            id: 3,
            transactionId: 'TXN001236',
            type: 'deposit',
            amount: 2500.00,
            currency: 'USD',
            accountNumber: '1001234569',
            accountName: 'ABC Corp',
            description: 'Cheque deposit',
            tellerId: 'TEL002',
            timestamp: '2024-03-22 12:00:00',
            status: 'completed'
          },
          {
            id: 4,
            transactionId: 'TXN001237',
            type: 'withdrawal',
            amount: 500.00,
            currency: 'USD',
            accountNumber: '1001234570',
            accountName: 'Mary Johnson',
            description: 'Cash withdrawal',
            tellerId: 'TEL001',
            timestamp: '2024-03-22 13:45:00',
            status: 'completed'
          },
          {
            id: 5,
            transactionId: 'TXN001238',
            type: 'deposit',
            amount: 3500.00,
            currency: 'USD',
            accountNumber: '1001234571',
            accountName: 'Robert Wilson',
            description: 'Transfer deposit',
            tellerId: 'TEL003',
            timestamp: '2024-03-22 14:20:00',
            status: 'completed'
          }
        ];
        
        setTransactions(mockTransactions);
        calculateSummary(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateSummary = (transactionsList) => {
    const deposits = transactionsList
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const withdrawals = transactionsList
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setSummary({
      totalDeposits: deposits,
      totalWithdrawals: withdrawals,
      netFlow: deposits - withdrawals,
      transactionCount: transactionsList.length
    });
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm) ||
      transaction.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTypeBadge = (type) => {
    if (type === 'deposit') {
      return <span className="badge bg-success">Deposit</span>;
    } else if (type === 'withdrawal') {
      return <span className="badge bg-danger">Withdrawal</span>;
    }
    return <span className="badge bg-secondary">{type}</span>;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading summary data...</p>
      </div>
    );
  }

  return (
    <div className="teller-summary">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-muted mb-0">Teller Transaction Summary</h6>
          <div className="btn-group btn-group-sm">
            <button 
              className={`btn btn-outline-secondary ${dateRange === 'today' ? 'active' : ''}`}
              onClick={() => setDateRange('today')}
            >
              Today
            </button>
            <button 
              className={`btn btn-outline-secondary ${dateRange === 'week' ? 'active' : ''}`}
              onClick={() => setDateRange('week')}
            >
              This Week
            </button>
            <button 
              className={`btn btn-outline-secondary ${dateRange === 'month' ? 'active' : ''}`}
              onClick={() => setDateRange('month')}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm bg-success bg-opacity-10">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Total Deposits</small>
                    <h4 className="mb-0 text-success">
                      {formatCurrency(summary.totalDeposits)}
                    </h4>
                  </div>
                  <i className="bi bi-arrow-down-circle fs-1 text-success"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm bg-danger bg-opacity-10">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Total Withdrawals</small>
                    <h4 className="mb-0 text-danger">
                      {formatCurrency(summary.totalWithdrawals)}
                    </h4>
                  </div>
                  <i className="bi bi-arrow-up-circle fs-1 text-danger"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Net Flow</small>
                    <h4 className={`mb-0 ${summary.netFlow >= 0 ? 'text-success' : 'text-danger'}`}>
                      {formatCurrency(summary.netFlow)}
                    </h4>
                  </div>
                  <i className={`bi bi-${summary.netFlow >= 0 ? 'arrow-up' : 'arrow-down'} fs-1 text-primary`}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm bg-info bg-opacity-10">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Transactions</small>
                    <h4 className="mb-0 text-info">
                      {summary.transactionCount}
                    </h4>
                  </div>
                  <i className="bi bi-receipt fs-1 text-info"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by transaction ID, account number, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="deposit">Deposits Only</option>
              <option value="withdrawal">Withdrawals Only</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-outline-primary w-100">
              <i className="bi bi-download me-2"></i>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Description</th>
              <th>Teller ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <code>{transaction.transactionId}</code>
                  </td>
                  <td>{getTypeBadge(transaction.type)}</td>
                  <td className={transaction.type === 'deposit' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                  </td>
                  <td>{transaction.accountNumber}</td>
                  <td>{transaction.accountName}</td>
                  <td>
                    <small>{transaction.description}</small>
                  </td>
                  <td>
                    <code>{transaction.tellerId}</code>
                  </td>
                  <td>
                    <small>{formatDateTime(transaction.timestamp)}</small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No transactions found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TellerSummary;