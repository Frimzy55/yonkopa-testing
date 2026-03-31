// AccountList.jsx
import React, { useState, useEffect } from 'react';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLinkedAccountsModal, setShowLinkedAccountsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    branch: '',
    phoneNumber: '',
    relationshipOfficer: '',
    accountType: ''
  });

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
            customerId: 'CUST001',
            fullName: 'John Doe',
            branch: 'Downtown Branch',
            phoneNumber: '+1 (555) 123-4567',
            relationshipOfficer: 'Sarah Johnson',
            linkedAccounts: ['1001234567', '1001234568'],
            accountType: 'Savings Account'
          },
          {
            id: 2,
            customerId: 'CUST002',
            fullName: 'Jane Smith',
            branch: 'Uptown Branch',
            phoneNumber: '+1 (555) 234-5678',
            relationshipOfficer: 'Michael Brown',
            linkedAccounts: ['1001234569'],
            accountType: 'Current Account'
          },
          {
            id: 3,
            customerId: 'CUST003',
            fullName: 'ABC Corporation',
            branch: 'Business District',
            phoneNumber: '+1 (555) 345-6789',
            relationshipOfficer: 'Emily Davis',
            linkedAccounts: ['1001234570', '1001234571', '1001234572'],
            accountType: 'Business Account'
          },
          {
            id: 4,
            customerId: 'CUST004',
            fullName: 'Mary Johnson',
            branch: 'Suburban Branch',
            phoneNumber: '+1 (555) 456-7890',
            relationshipOfficer: 'Robert Wilson',
            linkedAccounts: ['1001234573'],
            accountType: 'Fixed Deposit'
          },
          {
            id: 5,
            customerId: 'CUST005',
            fullName: 'Robert Wilson',
            branch: 'Downtown Branch',
            phoneNumber: '+1 (555) 567-8901',
            relationshipOfficer: 'Sarah Johnson',
            linkedAccounts: ['1001234574', '1001234575'],
            accountType: 'Savings Account'
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
      account.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.relationshipOfficer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || account.accountType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // View account details
  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setShowViewModal(true);
  };

  // View linked accounts
  const handleViewLinkedAccounts = (account) => {
    setSelectedAccount(account);
    setShowLinkedAccountsModal(true);
  };

  // Edit account - open modal with current data
  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setEditFormData({
      fullName: account.fullName,
      branch: account.branch,
      phoneNumber: account.phoneNumber,
      relationshipOfficer: account.relationshipOfficer,
      accountType: account.accountType
    });
    setShowEditModal(true);
  };

  // Save edited account
  const handleSaveEdit = async () => {
    try {
      // Simulate API call to update account
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the account in the local state
      const updatedAccounts = accounts.map(account => 
        account.id === selectedAccount.id 
          ? { ...account, ...editFormData }
          : account
      );
      
      setAccounts(updatedAccounts);
      setShowEditModal(false);
      setSelectedAccount(null);
      
      // Show success message
      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Error updating account. Please try again.');
    }
  };

  // Handle input changes in edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
                placeholder="Search by customer ID, name, phone number, or relationship officer..."
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
              Total: {filteredAccounts.length} customers
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Branch</th>
              <th>Phone Number</th>
              <th>Relationship Officer</th>
              <th>Linked Accounts</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAccounts.length > 0 ? (
              currentAccounts.map(account => (
                <tr key={account.id}>
                  <td>
                    <code>{account.customerId}</code>
                  </td>
                  <td>
                    <strong>{account.fullName}</strong>
                    <br />
                    <small className="text-muted">{account.accountType}</small>
                  </td>
                  <td>{account.branch}</td>
                  <td>{account.phoneNumber}</td>
                  <td>{account.relationshipOfficer}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleViewLinkedAccounts(account)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      View ({account.linkedAccounts.length})
                    </button>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-primary" 
                        title="View Details"
                        onClick={() => handleViewDetails(account)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button 
                        className="btn btn-outline-secondary" 
                        title="Edit"
                        onClick={() => handleEditAccount(account)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No customers found</p>
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

      {/* View Details Modal */}
      {showViewModal && selectedAccount && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Account Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Customer ID</label>
                    <div className="fw-bold">{selectedAccount.customerId}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Full Name</label>
                    <div className="fw-bold">{selectedAccount.fullName}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Account Type</label>
                    <div>{selectedAccount.accountType}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Branch</label>
                    <div>{selectedAccount.branch}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Phone Number</label>
                    <div>{selectedAccount.phoneNumber}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small">Relationship Officer</label>
                    <div>{selectedAccount.relationshipOfficer}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="text-muted small">Linked Accounts</label>
                    <div>
                      {selectedAccount.linkedAccounts.map((acc, idx) => (
                        <span key={idx} className="badge bg-secondary me-1 mb-1">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked Accounts Modal */}
      {showLinkedAccountsModal && selectedAccount && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Linked Accounts - {selectedAccount.fullName}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowLinkedAccountsModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {selectedAccount.linkedAccounts.length > 0 ? (
                    selectedAccount.linkedAccounts.map((account, idx) => (
                      <div key={idx} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <i className="bi bi-bank me-2"></i>
                            <strong>Account Number:</strong> {account}
                          </div>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-arrow-right"></i> View
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted py-3">No linked accounts found</p>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowLinkedAccountsModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAccount && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Account - {selectedAccount.customerId}</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Account Type *</label>
                    <select
                      className="form-select"
                      name="accountType"
                      value={editFormData.accountType}
                      onChange={handleEditInputChange}
                    >
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Business Account">Business Account</option>
                      <option value="Fixed Deposit">Fixed Deposit</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Branch *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="branch"
                      value={editFormData.branch}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={editFormData.phoneNumber}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Relationship Officer *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="relationshipOfficer"
                      value={editFormData.relationshipOfficer}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountList;