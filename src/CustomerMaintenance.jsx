// CustomerMaintenance.jsx
import React, { useState, useEffect } from 'react';

const CustomerMaintenance = () => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      status: 'Active',
      accountType: 'Savings',
      joinDate: '2024-01-15'
    },
    {
      id: 'CUST002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      status: 'Inactive',
      accountType: 'Current',
      joinDate: '2024-02-20'
    },
    {
      id: 'CUST003',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1122334455',
      status: 'Active',
      accountType: 'Savings',
      joinDate: '2024-03-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditFormData({ ...customer });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setCustomers(customers.map(customer => 
      customer.id === selectedCustomer.id ? editFormData : customer
    ));
    setShowEditModal(false);
    alert('Customer updated successfully!');
  };

  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    alert(`Customer status updated to ${newStatus}`);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Active': return 'bg-success';
      case 'Inactive': return 'bg-warning';
      case 'Suspended': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div>
      <h6 className="mb-4">Customer Maintenance</h6>
      
      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, phone or customer ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div className="col-md-3 text-end">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>Export List
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Type</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <strong>{customer.id}</strong>
                </td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.accountType}</td>
                <td>{customer.joinDate}</td>
                <td>
                  <select
                    className={`badge border-0 ${getStatusBadgeClass(customer.status)}`}
                    value={customer.status}
                    onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                    style={{ cursor: 'pointer', padding: '5px 10px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => handleEdit(customer)}
                    title="Edit Customer"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger me-1"
                    onClick={() => handleDelete(customer.id)}
                    title="Delete Customer"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-info"
                    title="View Details"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted"></i>
            <p className="text-muted mt-2">No customers found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Customer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editFormData.name || ''}
                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editFormData.email || ''}
                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editFormData.phone || ''}
                        onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Account Type</label>
                      <select
                        className="form-select"
                        value={editFormData.accountType || ''}
                        onChange={(e) => setEditFormData({...editFormData, accountType: e.target.value})}
                      >
                        <option>Savings</option>
                        <option>Current</option>
                        <option>Fixed Deposit</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
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

export default CustomerMaintenance;