// src/components/admin/AdminManagement.jsx
import React, { useState, useEffect } from 'react';

const AdminManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    fullName: '',
    role: '',
    status: 'active'
  });
  const [roleForm, setRoleForm] = useState({
    name: '',
    permissions: []
  });

  useEffect(() => {
    // Sample users
    const sampleUsers = [
      { id: 1, username: 'john_doe', email: 'john@example.com', fullName: 'John Doe', role: 'admin', status: 'active', lastLogin: '2024-01-20' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', fullName: 'Jane Smith', role: 'teller', status: 'active', lastLogin: '2024-01-19' },
      { id: 3, username: 'bob_johnson', email: 'bob@example.com', fullName: 'Bob Johnson', role: 'credit_officer', status: 'inactive', lastLogin: '2024-01-15' },
    ];
    
    const sampleRoles = [
      { id: 1, name: 'Administrator', permissions: ['all'], userCount: 1 },
      { id: 2, name: 'Teller', permissions: ['deposit', 'withdrawal', 'transfer'], userCount: 3 },
      { id: 3, name: 'Credit Officer', permissions: ['loan_application', 'loan_assessment'], userCount: 2 },
    ];
    
    const sampleAuditLogs = [
      { id: 1, user: 'john_doe', action: 'User Created', timestamp: '2024-01-20 10:30:00', details: 'Created user jane_smith' },
      { id: 2, user: 'admin', action: 'Role Updated', timestamp: '2024-01-19 15:20:00', details: 'Updated Teller permissions' },
      { id: 3, user: 'jane_smith', action: 'Login', timestamp: '2024-01-19 09:00:00', details: 'Successful login' },
    ];
    
    setUsers(sampleUsers);
    setRoles(sampleRoles);
    setAuditLogs(sampleAuditLogs);
  }, []);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...userForm,
      lastLogin: 'Never'
    };
    setUsers([...users, newUser]);
    setShowUserModal(false);
    setUserForm({
      username: '',
      email: '',
      fullName: '',
      role: '',
      status: 'active'
    });
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      id: roles.length + 1,
      ...roleForm,
      userCount: 0
    };
    setRoles([...roles, newRole]);
    setShowRoleModal(false);
    setRoleForm({
      name: '',
      permissions: []
    });
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const permissionOptions = [
    'dashboard_view', 'user_manage', 'role_manage', 'audit_view',
    'deposit', 'withdrawal', 'transfer', 'loan_application',
    'loan_assessment', 'report_view', 'system_settings'
  ];

  return (
    <div className="admin-management">
      <div className="page-header">
        <h2>Administration</h2>
        {activeTab === 'users' && (
          <button className="btn-primary" onClick={() => setShowUserModal(true)}>
            + Add User
          </button>
        )}
        {activeTab === 'roles' && (
          <button className="btn-primary" onClick={() => setShowRoleModal(true)}>
            + Create Role
          </button>
        )}
      </div>

      <div className="management-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={activeTab === 'roles' ? 'active' : ''}
          onClick={() => setActiveTab('roles')}
        >
          Role & Permissions
        </button>
        <button 
          className={activeTab === 'audit' ? 'active' : ''}
          onClick={() => setActiveTab('audit')}
        >
          Audit Logs
        </button>
        <button 
          className={activeTab === 'backup' ? 'active' : ''}
          onClick={() => setActiveTab('backup')}
        >
          System Backup
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="users-section">
          <div className="users-table">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <button className="btn-icon">Edit</button>
                        <button 
                          className="btn-icon"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="roles-section">
          <div className="roles-grid">
            {roles.map(role => (
              <div key={role.id} className="role-card">
                <h3>{role.name}</h3>
                <p className="user-count">{role.userCount} users assigned</p>
                <div className="permissions-list">
                  <strong>Permissions:</strong>
                  <ul>
                    {role.permissions.map((perm, idx) => (
                      <li key={idx}>{perm}</li>
                    ))}
                  </ul>
                </div>
                <div className="role-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="audit-section">
          <div className="audit-filters">
            <input type="text" placeholder="Search logs..." className="search-input" />
            <input type="date" className="date-input" />
            <button className="btn-secondary">Filter</button>
          </div>
          <div className="audit-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.timestamp}</td>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="backup-section">
          <div className="backup-card">
            <h3>System Backup</h3>
            <p>Create a backup of your system data including users, transactions, and configurations.</p>
            
            <div className="backup-options">
              <div className="form-group">
                <label>Backup Type</label>
                <select>
                  <option>Full Backup</option>
                  <option>Database Only</option>
                  <option>Configuration Only</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Include</label>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" /> User Data
                  </label>
                  <label>
                    <input type="checkbox" /> Transactions
                  </label>
                  <label>
                    <input type="checkbox" /> System Logs
                  </label>
                </div>
              </div>
              
              <button className="btn-primary">Create Backup Now</button>
            </div>
            
            <div className="backup-history">
              <h4>Recent Backups</h4>
              <ul>
                <li>2024-01-20 - Full Backup (2.3 GB)</li>
                <li>2024-01-19 - Database Backup (1.1 GB)</li>
                <li>2024-01-18 - Configuration Backup (45 MB)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New User</h3>
            <form onSubmit={handleUserSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={userForm.fullName}
                  onChange={(e) => setUserForm({...userForm, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name.toLowerCase()}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUserModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Role</h3>
            <form onSubmit={handleRoleSubmit}>
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Permissions</label>
                <div className="permissions-grid">
                  {permissionOptions.map(perm => (
                    <label key={perm} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={perm}
                        checked={roleForm.permissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoleForm({
                              ...roleForm,
                              permissions: [...roleForm.permissions, perm]
                            });
                          } else {
                            setRoleForm({
                              ...roleForm,
                              permissions: roleForm.permissions.filter(p => p !== perm)
                            });
                          }
                        }}
                      />
                      {perm.replace('_', ' ').toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowRoleModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;