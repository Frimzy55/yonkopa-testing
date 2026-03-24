// AccountList.jsx
import React, { useState, useEffect } from 'react';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAccounts = [
          {
            id: 1,
            accountNumber: '1001234567',
            accountName: 'John Doe',
            accountType: 'Savings Account',
            balance: 5000.00,
            currency: 'USD',
            status: 'Active',
            customerId: 'CUST001',
            openedDate: '2024-01-15',
            lastTransaction: '2024-03-20'
          },
          {
            id: 2,
            accountNumber: '1001234568',
            accountName: 'Jane Smith',
            accountType: 'Current Account',
            balance: 12500.50,
            currency: 'USD',
            status: 'Active',
            customerId: 'CUST002',
            openedDate: '2024-01-20',
            lastTransaction: '2024-03-19'
          },
          {
            id: 3,
            accountNumber: '1001234569',
            accountName: 'ABC Corporation',
            accountType: 'Business Account',
            balance: 75000.00,
            currency: 'USD',
            status: 'Active',
            customerId: 'CUST003',
            openedDate: '2024-01-10',
            lastTransaction: '2024-03-18'
          },
          {
            id: 4,
            accountNumber: '1001234570',
            accountName: 'Mary Johnson',
            accountType: 'Fixed Deposit',
            balance: 100000.00,
            currency: 'USD',
            status: 'Inactive',
            customerId: 'CUST004',
            openedDate: '2023-12-01',
            lastTransaction: '2024-02-15'
          },
          {
            id: 5,
            accountNumber: '1001234571',
            accountName: 'Robert Wilson',
            accountType: 'Savings Account',
            balance: 3250.75,
            currency: 'USD',
            status: 'Dormant',
            customerId: 'CUST005',
            openedDate: '2023-11-15',
            lastTransaction: '2024-01-10'
          }
        ];
        
        setAccounts(mockAccounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Filter and search accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || account.accountType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Dormant': 'warning'
    };
    return `badge bg-${statusColors[status] || 'secondary'}`;
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div className="account-list">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="text-muted mb-0">Account Management</h6>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary">
              <i className="bi bi-download me-1"></i> Export
            </button>
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-plus-circle me-1"></i> New Account
            </button>
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
                placeholder="Search by account number, name, or customer ID..."
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
              <option value="all">All Account Types</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Current Account">Current Account</option>
              <option value="Business Account">Business Account</option>
              <option value="Fixed Deposit">Fixed Deposit</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="text-muted small py-2">
              Total: {filteredAccounts.length} accounts
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Customer ID</th>
              <th>Opened Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAccounts.length > 0 ? (
              currentAccounts.map(account => (
                <tr key={account.id}>
                  <td>
                    <strong>{account.accountNumber}</strong>
                  </td>
                  <td>{account.accountName}</td>
                  <td>{account.accountType}</td>
                  <td className="fw-semibold">
                    {formatCurrency(account.balance, account.currency)}
                  </td>
                  <td>
                    <span className={getStatusBadge(account.status)}>
                      {account.status}
                    </span>
                  </td>
                  <td>
                    <code>{account.customerId}</code>
                  </td>
                  <td>
                    <small>{new Date(account.openedDate).toLocaleDateString()}</small>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-primary" title="View Details">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-outline-secondary" title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-danger" title="Close Account">
                        <i className="bi bi-x-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No accounts found</p>
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

export default AccountList;