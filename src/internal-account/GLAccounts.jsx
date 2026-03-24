import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GLAccounts = () => {
  const [glAccounts, setGlAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountCode: '',
    accountName: '',
    accountType: 'Asset',
    category: '',
    normalBalance: 'Debit',
    description: '',
    status: 'Active',
    parentAccount: '',
    isSubAccount: false
  });

  const accountTypes = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];
  const normalBalances = ['Debit', 'Credit'];
  const statuses = ['Active', 'Inactive', 'Suspended'];

  // Fetch GL Accounts
  useEffect(() => {
    fetchGLAccounts();
  }, []);

  const fetchGLAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/gl-accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGlAccounts(response.data);
    } catch (error) {
      console.error('Error fetching GL accounts:', error);
      toast.error('Failed to fetch GL accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingAccount) {
        // Update existing account
        await axios.put(`http://localhost:5000/api/gl-accounts/${editingAccount.id}`, formData, config);
        toast.success('GL Account updated successfully');
      } else {
        // Create new account
        await axios.post('http://localhost:5000/api/gl-accounts', formData, config);
        toast.success('GL Account created successfully');
      }
      
      resetForm();
      fetchGLAccounts();
    } catch (error) {
      console.error('Error saving GL account:', error);
      toast.error(error.response?.data?.message || 'Failed to save GL account');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      accountCode: account.accountCode,
      accountName: account.accountName,
      accountType: account.accountType,
      category: account.category || '',
      normalBalance: account.normalBalance,
      description: account.description || '',
      status: account.status,
      parentAccount: account.parentAccount || '',
      isSubAccount: account.isSubAccount || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this GL Account?')) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/gl-accounts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('GL Account deleted successfully');
        fetchGLAccounts();
      } catch (error) {
        console.error('Error deleting GL account:', error);
        toast.error('Failed to delete GL account');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      accountCode: '',
      accountName: '',
      accountType: 'Asset',
      category: '',
      normalBalance: 'Debit',
      description: '',
      status: 'Active',
      parentAccount: '',
      isSubAccount: false
    });
    setEditingAccount(null);
    setShowModal(false);
  };

  const getBalanceTypeColor = (balance) => {
    return balance === 'Debit' ? 'text-success' : 'text-danger';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Active': 'bg-success',
      'Inactive': 'bg-secondary',
      'Suspended': 'bg-warning'
    };
    return badges[status] || 'bg-secondary';
  };

  return (
    <div className="gl-accounts-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="mb-1">General Ledger Accounts</h4>
          <p className="text-muted mb-0">Manage chart of accounts and GL master data</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create GL Account
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Accounts</h6>
                  <h3 className="mb-0">{glAccounts.length}</h3>
                </div>
                <i className="bi bi-journal-bookmark-fill fs-1 text-primary"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Active Accounts</h6>
                  <h3 className="mb-0">
                    {glAccounts.filter(acc => acc.status === 'Active').length}
                  </h3>
                </div>
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Asset Accounts</h6>
                  <h3 className="mb-0">
                    {glAccounts.filter(acc => acc.accountType === 'Asset').length}
                  </h3>
                </div>
                <i className="bi bi-cash-stack fs-1 text-info"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Liability Accounts</h6>
                  <h3 className="mb-0">
                    {glAccounts.filter(acc => acc.accountType === 'Liability').length}
                  </h3>
                </div>
                <i className="bi bi-bank fs-1 text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Account Type</label>
              <select className="form-select">
                <option value="">All Types</option>
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select className="form-select">
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Search</label>
              <input type="text" className="form-control" placeholder="Account code or name..." />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-secondary w-100">
                <i className="bi bi-search me-2"></i>Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GL Accounts Table */}
      <div className="card">
        <div className="card-body p-0">
          {loading && !glAccounts.length ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading GL accounts...</p>
            </div>
          ) : glAccounts.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-journal-bookmark fs-1 text-muted"></i>
              <p className="mt-2 text-muted">No GL accounts found. Create your first GL account!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Normal Balance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {glAccounts.map((account) => (
                    <tr key={account.id}>
                      <td className="fw-semibold">{account.accountCode}</td>
                      <td>{account.accountName}</td>
                      <td>
                        <span className={`badge ${account.accountType === 'Asset' ? 'bg-info' : 
                          account.accountType === 'Liability' ? 'bg-warning' : 
                          account.accountType === 'Equity' ? 'bg-success' : 
                          account.accountType === 'Revenue' ? 'bg-primary' : 'bg-secondary'}`}>
                          {account.accountType}
                        </span>
                      </td>
                      <td>{account.category || '—'}</td>
                      <td className={getBalanceTypeColor(account.normalBalance)}>
                        <i className={`bi ${account.normalBalance === 'Debit' ? 'bi-arrow-up' : 'bi-arrow-down'} me-1`}></i>
                        {account.normalBalance}
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(account.status)}`}>
                          {account.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(account)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(account.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingAccount ? 'Edit GL Account' : 'Create New GL Account'}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Account Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="accountCode"
                        value={formData.accountCode}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 1010, 2020"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Account Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Cash in Bank"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Account Type *</label>
                      <select
                        className="form-select"
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleInputChange}
                        required
                      >
                        {accountTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g., Current Assets, Fixed Assets"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Normal Balance *</label>
                      <select
                        className="form-select"
                        name="normalBalance"
                        value={formData.normalBalance}
                        onChange={handleInputChange}
                        required
                      >
                        {normalBalances.map(balance => (
                          <option key={balance} value={balance}>{balance}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status *</label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Parent Account</label>
                      <select
                        className="form-select"
                        name="parentAccount"
                        value={formData.parentAccount}
                        onChange={handleInputChange}
                      >
                        <option value="">None (Main Account)</option>
                        {glAccounts
                          .filter(acc => !acc.isSubAccount && acc.id !== editingAccount?.id)
                          .map(account => (
                            <option key={account.id} value={account.accountCode}>
                              {account.accountCode} - {account.accountName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="isSubAccount"
                          checked={formData.isSubAccount}
                          onChange={handleInputChange}
                          id="isSubAccount"
                        />
                        <label className="form-check-label" htmlFor="isSubAccount">
                          This is a sub-account
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter account description..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      editingAccount ? 'Update Account' : 'Create Account'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GLAccounts;