// src/components/admin/AdminAccount.jsx
import React, { useState, useEffect } from 'react';

const AdminAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ setSelectedAccount] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: '',
    accountType: 'savings',
    customerName: '',
    customerId: '',
    balance: 0,
    status: 'active',
    branch: '',
    openingDate: new Date().toISOString().split('T')[0]
  });

  // Sample data - replace with API call
  useEffect(() => {
    // Simulate API call
    const sampleAccounts = [
      { id: 1, accountNumber: 'ACC001', accountType: 'Savings', customerName: 'John Doe', balance: 5000, status: 'active', branch: 'Main Branch' },
      { id: 2, accountNumber: 'ACC002', accountType: 'Current', customerName: 'Jane Smith', balance: 15000, status: 'active', branch: 'Downtown' },
      { id: 3, accountNumber: 'ACC003', accountType: 'Fixed Deposit', customerName: 'Bob Johnson', balance: 50000, status: 'inactive', branch: 'Main Branch' },
    ];
    setAccounts(sampleAccounts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const newAccount = {
      id: accounts.length + 1,
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
      customerName: formData.customerName,
      balance: parseFloat(formData.balance),
      status: formData.status,
      branch: formData.branch
    };
    setAccounts([...accounts, newAccount]);
    setShowCreateModal(false);
    setFormData({
      accountNumber: '',
      accountType: 'savings',
      customerName: '',
      customerId: '',
      balance: 0,
      status: 'active',
      branch: '',
      openingDate: new Date().toISOString().split('T')[0]
    });
  };

  const filteredAccounts = accounts.filter(account =>
    account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-account">
      <div className="page-header">
        <h2>Account Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New Account
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by account number or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="accounts-table">
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Customer Name</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map(account => (
              <tr key={account.id}>
                <td>{account.accountNumber}</td>
                <td>{account.accountType}</td>
                <td>{account.customerName}</td>
                <td>${account.balance.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${account.status}`}>
                    {account.status}
                  </span>
                </td>
                <td>{account.branch}</td>
                <td>
                  <button 
                    className="btn-icon"
                    onClick={() => setSelectedAccount(account)}
                  >
                    View
                  </button>
                  <button className="btn-icon">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Account</h3>
            <form onSubmit={handleCreateAccount}>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                >
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="fixed">Fixed Deposit</option>
                  <option value="joint">Joint Account</option>
                </select>
              </div>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Initial Balance</label>
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccount;