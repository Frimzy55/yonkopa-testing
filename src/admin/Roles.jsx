import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { availablePermissions, getGroupedPermissions } from './permissions';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showStaffPermissionsModal, setShowStaffPermissionsModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [viewingRole, setViewingRole] = useState(null);
  const [viewingStaff, setViewingStaff] = useState(null);
  const [expandedRole, setExpandedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Group permissions by category
  const groupedPermissions = getGroupedPermissions();

  // Fetch roles - defined inside useCallback to avoid dependency warning
  const fetchRoles = useCallback(() => {
    // Define enum roles inside the useCallback
    const enumRoles = [
      { id: 2, name: 'loan_officer', description: 'Can process and manage loan applications', permissions: ['view_dashboard', 'view_customers', 'manage_loans', 'approve_loans', 'disburse_loans'] },
      { id: 3, name: 'supervisor', description: 'Supervises loan officers and daily operations', permissions: ['view_dashboard', 'manage_customers', 'manage_loans', 'approve_loans', 'view_reports'] },
      { id: 4, name: 'manager', description: 'Manages branch operations and staff', permissions: ['view_dashboard', 'manage_customers', 'manage_loans', 'approve_loans', 'manage_users', 'view_reports'] },
      { id: 5, name: 'admin', description: 'Full system access', permissions: ['view_dashboard', 'manage_customers', 'manage_accounts', 'manage_loans', 'manage_users', 'manage_roles', 'view_reports', 'system_settings'] }
    ];

    setLoading(true);
    try {
      setRoles(enumRoles);
    } catch (error) {
      console.error('Error loading roles:', error);
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getusers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, [fetchRoles, fetchUsers]);

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
        newPermissions = prev.permissions.filter(p => !categoryPermissions.includes(p));
      } else {
        newPermissions = [...new Set([...prev.permissions, ...categoryPermissions])];
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSelectAllPermissions = () => {
    const allPermissionIds = availablePermissions.map(p => p.id);
    const allSelected = allPermissionIds.every(p => formData.permissions.includes(p));
    
    if (allSelected) {
      setFormData(prev => ({ ...prev, permissions: [] }));
    } else {
      setFormData(prev => ({ ...prev, permissions: allPermissionIds }));
    }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingRole) {
        toast.success('Role updated successfully');
        const updatedRoles = roles.map(role => 
          role.name === editingRole.name ? { ...role, ...formData } : role
        );
        setRoles(updatedRoles);
      } else {
        toast.success('Role created successfully');
        const newRole = {
          id: roles.length + 2,
          name: formData.name.toLowerCase().replace(/\s/g, '_'),
          description: formData.description,
          permissions: formData.permissions
        };
        setRoles([...roles, newRole]);
      }
      
      resetForm();
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

  const handleViewPermissions = (role) => {
    setViewingRole(role);
    setShowPermissionsModal(true);
  };

  const handleViewStaffPermissions = (staff) => {
    const staffRole = roles.find(r => r.name === staff.role);
    setViewingStaff(staff);
    setViewingRole(staffRole);
    setShowStaffPermissionsModal(true);
  };

  const handleEditStaffRole = (staff) => {
    const staffRole = roles.find(r => r.name === staff.role);
    if (staffRole) {
      handleEdit(staffRole);
    } else {
      toast.error('Role not found for this staff member');
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

  const toggleExpandedRole = (roleName) => {
    if (expandedRole === roleName) {
      setExpandedRole(null);
    } else {
      setExpandedRole(roleName);
    }
  };

  const getUsersForRole = (roleName) => {
    return users.filter(user => user.role === roleName);
  };

  const getRoleBadgeColor = (roleName) => {
    const colors = {
      'admin': 'bg-info',
      'manager': 'bg-info',
      'supervisor': 'bg-info',
      'loan_officer': 'bg-info'
    };
    return colors[roleName] || 'bg-secondary';
  };

  const displayContactInfo = (user) => {
    const hasEmail = user.email && user.email.trim() !== '';
    const hasPhone = user.phone && user.phone.trim() !== '';
    
    if (hasEmail && hasPhone) {
      return `${user.email} / ${user.phone}`;
    } else if (hasEmail) {
      return user.email;
    } else if (hasPhone) {
      return user.phone;
    }
    return '—';
  };

  return (
    <div className="roles-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="mb-1">Staff Role Management</h4>
          <p className="text-muted mb-0">Manage staff roles, assign permissions, and view assigned users</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create New Role
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card bg-primary bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Staff Roles</h6>
                  <h3 className="mb-0">{roles.length}</h3>
                </div>
                <i className="bi bi-shield-lock fs-1 text-primary"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card bg-info bg-opacity-10 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Staff</h6>
                  <h3 className="mb-0">
                    {users.filter(user => user.role !== 'customer').length}
                  </h3>
                </div>
                <i className="bi bi-people fs-1 text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Accordion */}
      <div className="accordion" id="rolesAccordion">
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
            <p className="mt-2 text-muted">No staff roles found.</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => setShowModal(true)}
            >
              Create Your First Role
            </button>
          </div>
        ) : (
          roles.map((role) => {
            const usersInRole = getUsersForRole(role.name);
            const isExpanded = expandedRole === role.name;
            
            return (
              <div key={role.id} className="card mb-3">
                <div 
                  className="card-header bg-white d-flex justify-content-between align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleExpandedRole(role.name)}
                >
                  <div>
                    <span className={`badge ${getRoleBadgeColor(role.name)} me-2`}>
                      {role.name.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="fw-semibold">{role.name.replace('_', ' ')}</span>
                    <span className="text-muted ms-2 fs-6">
                      ({usersInRole.length} {usersInRole.length === 1 ? 'staff member' : 'staff members'})
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-info me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPermissions(role);
                      }}
                      title="View Permissions"
                    >
                      <i className="bi bi-eye"></i> View Permissions
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(role);
                      }}
                      title="Edit Role"
                      disabled={role.name === 'admin'}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <i className={`bi ms-2 ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <h6 className="text-muted">Description</h6>
                        <p>{role.description || 'No description available'}</p>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="row">
                      <div className="col-md-12">
                        <h6 className="mb-3">
                          <i className="bi bi-people-fill me-2"></i>
                          Staff Members ({usersInRole.length})
                        </h6>
                        
                        {usersInRole.length === 0 ? (
                          <p className="text-muted">No staff members assigned to this role yet.</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-hover table-sm">
                              <thead className="table-light">
                                <tr>
                                  <th>#</th>
                                  <th>Full Name</th>
                                  <th>Contact Info</th>
                                  <th>Joined Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {usersInRole.map((user, idx) => (
                                  <tr key={user.id}>
                                    <td>{idx + 1}</td>
                                    <td className="fw-semibold">{user.full_name || '—'}</td>
                                    <td>{displayContactInfo(user)}</td>
                                    <td>
                                      {user.created_at 
                                        ? new Date(user.created_at).toLocaleDateString() 
                                        : '—'}
                                    </td>
                                    <td>
                                      <div className="btn-group btn-group-sm" role="group">
                                        <button
                                          className="btn btn-outline-info"
                                          onClick={() => handleViewStaffPermissions(user)}
                                          title="View Permissions"
                                        >
                                          <i className="bi bi-eye"></i> View Permissions
                                        </button>
                                        <button
                                          className="btn btn-outline-primary"
                                          onClick={() => handleEditStaffRole(user)}
                                          title="Edit Role Permissions"
                                          disabled={user.role === 'admin'}
                                        >
                                          <i className="bi bi-pencil"></i> Edit
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="row">
                      <div className="col-md-12">
                        <h6 className="mb-3">
                          <i className="bi bi-key-fill me-2"></i>
                          Assigned Permissions ({role.permissions?.length || 0})
                        </h6>
                        <div className="row">
                          {role.permissions?.map(permission => {
                            const permDetails = availablePermissions.find(p => p.id === permission);
                            return permDetails ? (
                              <div key={permission} className="col-md-3 mb-2">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                <small>{permDetails.name}</small>
                              </div>
                            ) : null;
                          })}
                          {(!role.permissions || role.permissions.length === 0) && (
                            <p className="text-muted">No permissions assigned to this role.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create/Edit Role Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">
                  {editingRole ? `Edit Role: ${editingRole.name.replace('_', ' ').toUpperCase()}` : 'Create New Role & Assign Permissions'}
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
                        disabled={editingRole?.name === 'admin'}
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
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Permissions</h6>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={handleSelectAllPermissions}
                    >
                      {availablePermissions.every(p => formData.permissions.includes(p.id)) 
                        ? 'Deselect All' 
                        : 'Select All Permissions'}
                    </button>
                  </div>
                  
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

      {/* View Role Permissions Modal */}
      {showPermissionsModal && viewingRole && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">
                  <i className="bi bi-key-fill me-2"></i>
                  Permissions for Role: {viewingRole.name.replace('_', ' ').toUpperCase()}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPermissionsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p><strong>Description:</strong> {viewingRole.description || 'No description'}</p>
                  </div>
                </div>
                <hr />
                <h6 className="mb-3">Assigned Permissions ({viewingRole.permissions?.length || 0})</h6>
                
                {Object.entries(groupedPermissions).map(([category, permissions]) => {
                  const categoryPermissions = permissions.filter(p => 
                    viewingRole.permissions?.includes(p.id)
                  );
                  
                  if (categoryPermissions.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4">
                      <h6 className="mb-2 text-primary">{category}</h6>
                      <div className="row">
                        {categoryPermissions.map(permission => (
                          <div key={permission.id} className="col-md-6 mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {permission.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {(!viewingRole.permissions || viewingRole.permissions.length === 0) && (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-shield-slash fs-1"></i>
                    <p className="mt-2">No permissions assigned to this role.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowPermissionsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Staff Permissions Modal */}
      {showStaffPermissionsModal && viewingStaff && viewingRole && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">
                  <i className="bi bi-person-badge me-2"></i>
                  Permissions for: {viewingStaff.full_name}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowStaffPermissionsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p><strong>Staff Name:</strong> {viewingStaff.full_name}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Role:</strong> 
                      <span className={`badge ${getRoleBadgeColor(viewingStaff.role)} ms-2`}>
                        {viewingStaff.role?.toUpperCase() || 'N/A'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p><strong>Role Description:</strong> {viewingRole.description || 'No description'}</p>
                  </div>
                </div>
                <hr />
                <h6 className="mb-3">Assigned Permissions ({viewingRole.permissions?.length || 0})</h6>
                
                {Object.entries(groupedPermissions).map(([category, permissions]) => {
                  const categoryPermissions = permissions.filter(p => 
                    viewingRole.permissions?.includes(p.id)
                  );
                  
                  if (categoryPermissions.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4">
                      <h6 className="mb-2 text-primary">{category}</h6>
                      <div className="row">
                        {categoryPermissions.map(permission => (
                          <div key={permission.id} className="col-md-6 mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {permission.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {(!viewingRole.permissions || viewingRole.permissions.length === 0) && (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-shield-slash fs-1"></i>
                    <p className="mt-2">No permissions assigned to this role.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowStaffPermissionsModal(false);
                    handleEdit(viewingRole);
                  }}
                  disabled={viewingStaff.role === 'admin'}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Permissions
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowStaffPermissionsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;