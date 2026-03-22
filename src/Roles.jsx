import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Available permissions
  const availablePermissions = [
    { id: 'view_dashboard', name: 'View Dashboard', category: 'General' },
    { id: 'manage_customers', name: 'Manage Customers', category: 'Customer' },
    { id: 'view_customers', name: 'View Customers', category: 'Customer' },
    { id: 'create_customer', name: 'Create Customer', category: 'Customer' },
    { id: 'edit_customer', name: 'Edit Customer', category: 'Customer' },
    { id: 'delete_customer', name: 'Delete Customer', category: 'Customer' },
    { id: 'manage_accounts', name: 'Manage Accounts', category: 'Account' },
    { id: 'view_accounts', name: 'View Accounts', category: 'Account' },
    { id: 'create_account', name: 'Create Account', category: 'Account' },
    { id: 'close_account', name: 'Close Account', category: 'Account' },
    { id: 'teller_transactions', name: 'Teller Transactions', category: 'Teller' },
    { id: 'deposit', name: 'Process Deposit', category: 'Teller' },
    { id: 'withdraw', name: 'Process Withdrawal', category: 'Teller' },
    { id: 'view_teller_summary', name: 'View Teller Summary', category: 'Teller' },
    { id: 'manage_loans', name: 'Manage Loans', category: 'Loans' },
    { id: 'approve_loans', name: 'Approve Loans', category: 'Loans' },
    { id: 'disburse_loans', name: 'Disburse Loans', category: 'Loans' },
    { id: 'manage_gl_accounts', name: 'Manage GL Accounts', category: 'Internal Accounts' },
    { id: 'internal_transfers', name: 'Internal Transfers', category: 'Internal Accounts' },
    { id: 'manage_users', name: 'Manage Users', category: 'Admin' },
    { id: 'manage_roles', name: 'Manage Roles', category: 'Admin' },
    { id: 'view_reports', name: 'View Reports', category: 'Reports' },
    { id: 'batch_upload', name: 'Batch Upload', category: 'Batch Upload' },
    { id: 'system_settings', name: 'System Settings', category: 'System' }
  ];

  // Group permissions by category
  const groupedPermissions = availablePermissions.reduce((groups, permission) => {
    if (!groups[permission.category]) {
      groups[permission.category] = [];
    }
    groups[permission.category].push(permission);
    return groups;
  }, {});

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePermissionChange = (permissionId) => {
    setFormData(prev => {
      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId];
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSelectAll = (category, permissions) => {
    const categoryPermissions = permissions.map(p => p.id);
    const allSelected = categoryPermissions.every(p => formData.permissions.includes(p));
    
    setFormData(prev => {
      let newPermissions;
      if (allSelected) {
        // Deselect all in category
        newPermissions = prev.permissions.filter(p => !categoryPermissions.includes(p));
      } else {
        // Select all in category
        newPermissions = [...new Set([...prev.permissions, ...categoryPermissions])];
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Role name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingRole) {
        await axios.put(`http://localhost:5000/api/roles/${editingRole.id}`, formData, config);
        toast.success('Role updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/roles', formData, config);
        toast.success('Role created successfully');
      }
      
      resetForm();
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error(error.response?.data?.message || 'Failed to save role');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      permissions: role.permissions || []
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role? This will affect all users with this role.')) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/roles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Role deleted successfully');
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        toast.error('Failed to delete role');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setEditingRole(null);
    setShowModal(false);
  };

  const getUserCount = (roleId) => {
    // This would come from API in real implementation
    return 0;
  };

  return (
    <div className="roles-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="mb-1">Role Management</h4>
          <p className="text-muted mb-0">Manage user roles and access permissions</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-shield-plus me-2"></i>
          Create Role
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Roles</h6>
                  <h3 className="mb-0">{roles.length}</h3>
                </div>
                <i className="bi bi-shield-lock fs-1 text-primary"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">System Roles</h6>
                  <h3 className="mb-0">
                    {roles.filter(role => role.name === 'Admin' || role.name === 'Super Admin').length}
                  </h3>
                </div>
                <i className="bi bi-star-fill fs-1 text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-info bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Custom Roles</h6>
                  <h3 className="mb-0">
                    {roles.filter(role => role.name !== 'Admin' && role.name !== 'Super Admin').length}
                  </h3>
                </div>
                <i className="bi bi-person-badge fs-1 text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="card">
        <div className="card-header bg-white">
          <h6 className="mb-0">System Roles & Permissions</h6>
        </div>
        <div className="card-body p-0">
          {loading && !roles.length ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading roles...</p>
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center p-5">
              <i className="bi bi-shield-lock fs-1 text-muted"></i>
              <p className="mt-2 text-muted">No roles found. Create your first role!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Role Name</th>
                    <th>Description</th>
                    <th>Permissions</th>
                    <th>Users</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td className="fw-semibold">
                        <i className="bi bi-shield-check me-2 text-primary"></i>
                        {role.name}
                      </td>
                      <td>{role.description || '—'}</td>
                      <td>
                        <span className="badge bg-info">
                          {role.permissions?.length || 0} permissions
                        </span>
                      </td>
                      <td>{getUserCount(role.id)}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(role)}
                          title="Edit Role"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(role.id)}
                          title="Delete Role"
                          disabled={role.name === 'Admin' || role.name === 'Super Admin'}
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

      {/* Modal for Create/Edit Role */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingRole ? 'Edit Role' : 'Create New Role'}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Role Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter role name (e.g., Teller, Account Manager)"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Brief description of the role"
                      />
                    </div>
                  </div>

                  <hr />
                  <h6 className="mb-3">Permissions</h6>
                  
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0 text-primary">{category}</h6>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleSelectAll(category, permissions)}
                        >
                          {permissions.every(p => formData.permissions.includes(p.id)) 
                            ? 'Deselect All' 
                            : 'Select All'}
                        </button>
                      </div>
                      <div className="row">
                        {permissions.map(permission => (
                          <div key={permission.id} className="col-md-4 mb-2">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onChange={() => handlePermissionChange(permission.id)}
                              />
                              <label className="form-check-label" htmlFor={permission.id}>
                                {permission.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {category !== Object.keys(groupedPermissions)[Object.keys(groupedPermissions).length - 1] && (
                        <hr className="my-3" />
                      )}
                    </div>
                  ))}
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
                      editingRole ? 'Update Role' : 'Create Role'
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

export default Roles;