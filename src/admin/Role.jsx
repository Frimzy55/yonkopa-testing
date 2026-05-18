// components/Roles/Roles.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { menuItems } from '../menuItems';
import { getAllPermissionsFromMenu } from './permissionsUtils';
import { fetchUsers, resetPassword, activateUser, deactivateUser, blockUserLogin, unblockUserLogin, removeUserTask, assignTasks, fetchUserTasks } from './staffService';
import { filterStaffMembers, getRoleDisplayName } from './staffHelpers';
import StaffTable from './StaffTable';
import ResetPasswordModal from './ResetPasswordModal';
import StaffPermissionsModal from './StaffPermissionsModal';
import RolePermissionModal from './RolePermissionModal';

const Roles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStaffPermissionsModal, setShowStaffPermissionsModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [viewingStaff, setViewingStaff] = useState(null);
  const [viewingRole, setViewingRole] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandedSubMenus, setExpandedSubMenus] = useState({});
  const [expandedNestedMenus, setExpandedNestedMenus] = useState({});
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);
  const searchTimeoutRef = useRef(null);
  const dropdownRefs = useRef({});
  const buttonRefs = useRef({});

  const availablePermissions = getAllPermissionsFromMenu();

  // Load users
  const loadUsers = useCallback(async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Filter staff
  const getStaffList = () => {
    const staffRoles = ['loan_officer', 'supervisor', 'manager', 'admin'];
    return users.filter(u => staffRoles.includes(u.role));
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const filtered = filterStaffMembers(getStaffList(), searchTerm);
      setFilteredStaff(filtered);
    }, 300);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [users, searchTerm]);

  useEffect(() => {
    setFilteredStaff(getStaffList());
  }, [users]);

  // UI helpers
  const resetModalForm = () => {
    setFormData({ name: '', description: '', permissions: [] });
    setEditingStaff(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePermission = (permId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const handleSelectAll = () => {
    const allIds = availablePermissions.map(p => p.id);
    const allSelected = allIds.every(id => formData.permissions.includes(id));
    setFormData(prev => ({ ...prev, permissions: allSelected ? [] : allIds }));
  };

  // Action handlers
  const handleAction = async (action, staff, event) => {
    if (action === 'toggleDropdown') {
      if (openDropdownId === staff.userId) {
        setOpenDropdownId(null);
        setDropdownPosition({});
        return;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 450;
      let top, bottom;
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        bottom = viewportHeight - rect.top + 10;
        top = 'auto';
      } else {
        top = rect.bottom + 5;
        bottom = 'auto';
      }
      setDropdownPosition({ position: 'fixed', top, bottom, left: rect.left, zIndex: 9999 });
      setOpenDropdownId(staff.userId);
      return;
    }

    setOpenDropdownId(null);
    if (action === 'view') {
      const perms = await fetchUserTasks(staff.userId);
      setViewingStaff(staff);
      setViewingRole({ name: staff.role, description: `${staff.role} permissions`, permissions: perms });
      setShowStaffPermissionsModal(true);
    } else if (action === 'edit') {
      const perms = await fetchUserTasks(staff.userId);
      setEditingStaff(staff);
      setFormData({ name: staff.role, description: `${staff.role} permissions`, permissions: perms });
      setShowModal(true);
    } else if (action === 'resetPassword') {
      setSelectedStaff(staff);
      setShowResetPasswordModal(true);
    } else if (action === 'activate') {
      if (!window.confirm(`Activate ${staff.full_name}?`)) return;
      setLoading(true);
      try {
        await activateUser(staff.userId);
        toast.success(`${staff.full_name} activated`);
        loadUsers();
      } catch (err) { toast.error(err.response?.data?.message); }
      finally { setLoading(false); }
    } else if (action === 'deactivate') {
      if (!window.confirm(`Deactivate ${staff.full_name}?`)) return;
      setLoading(true);
      try {
        await deactivateUser(staff.userId);
        toast.success(`${staff.full_name} deactivated`);
        loadUsers();
      } catch (err) { toast.error(err.response?.data?.message); }
      finally { setLoading(false); }
    } else if (action === 'block') {
      if (!window.confirm(`Block login for ${staff.full_name}?`)) return;
      setLoading(true);
      try {
        await blockUserLogin(staff.userId);
        toast.success(`Login blocked for ${staff.full_name}`);
        loadUsers();
      } catch (err) { toast.error(err.response?.data?.message); }
      finally { setLoading(false); }
    } else if (action === 'unblock') {
      if (!window.confirm(`Unblock login for ${staff.full_name}?`)) return;
      setLoading(true);
      try {
        await unblockUserLogin(staff.userId);
        toast.success(`Login unblocked for ${staff.full_name}`);
        loadUsers();
      } catch (err) { toast.error(err.response?.data?.message); }
      finally { setLoading(false); }
    }
  };

  const handleResetPasswordConfirm = async (newPassword) => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(selectedStaff.userId, newPassword);
      toast.success(`Password reset for ${selectedStaff.full_name}`);
      setShowResetPasswordModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePermission = async (permId) => {
    if (!window.confirm(`Remove permission?`)) return;
    setLoading(true);
    try {
      await removeUserTask(viewingStaff.userId, permId);
      toast.success('Permission removed');
      // Update local view
      const newPerms = viewingRole.permissions.filter(p => p !== permId);
      setViewingRole({ ...viewingRole, permissions: newPerms });
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Role name required');
      return;
    }
    setLoading(true);
    try {
      if (editingStaff) {
        await assignTasks(editingStaff.userId, editingStaff.full_name, formData.permissions);
        toast.success(`Permissions updated for ${editingStaff.full_name}`);
        loadUsers();
      } else {
        toast.success('Role created (mock)');
      }
      resetModalForm();
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle functions for menu tree
  const toggleMenu = (name) => setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  const toggleSubMenu = (menu, sub) => setExpandedSubMenus(prev => ({ ...prev, [`${menu}_${sub}`]: !prev[`${menu}_${sub}`] }));
  const toggleNestedMenu = (menu, sub, nested) => setExpandedNestedMenus(prev => ({ ...prev, [`${menu}_${sub}_${nested}`]: !prev[`${menu}_${sub}_${nested}`] }));

  return (
    <div className="roles-container">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div><h4 className="mb-1">Staff Management</h4><p className="text-muted mb-0">Manage staff members, roles, and permissions</p></div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3"><div className="card bg-primary bg-opacity-10 border-0"><div className="card-body"><div className="d-flex justify-content-between align-items-center"><div><h6 className="text-muted mb-1">Total Staff</h6><h3 className="mb-0">{getStaffList().length}</h3></div><i className="bi bi-people fs-1 text-primary"></i></div></div></div></div>
        <div className="col-md-3 mb-3"><div className="card bg-success bg-opacity-10 border-0"><div className="card-body"><div className="d-flex justify-content-between align-items-center"><div><h6 className="text-muted mb-1">Loan Officers</h6><h3 className="mb-0">{getStaffList().filter(u => u.role === 'loan_officer').length}</h3></div><i className="bi bi-person-check fs-1 text-success"></i></div></div></div></div>
        <div className="col-md-3 mb-3"><div className="card bg-warning bg-opacity-10 border-0"><div className="card-body"><div className="d-flex justify-content-between align-items-center"><div><h6 className="text-muted mb-1">Supervisors</h6><h3 className="mb-0">{getStaffList().filter(u => u.role === 'supervisor').length}</h3></div><i className="bi bi-person-badge fs-1 text-warning"></i></div></div></div></div>
        <div className="col-md-3 mb-3"><div className="card bg-info bg-opacity-10 border-0"><div className="card-body"><div className="d-flex justify-content-between align-items-center"><div><h6 className="text-muted mb-1">Managers & Admins</h6><h3 className="mb-0">{getStaffList().filter(u => u.role === 'manager' || u.role === 'admin').length}</h3></div><i className="bi bi-shield-lock fs-1 text-info"></i></div></div></div></div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="card border-0 shadow-sm"><div className="card-body p-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search by name, ID, email, phone, role, status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {searchTerm && <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')}><i className="bi bi-x-lg"></i></button>}
            </div>
            <div className="mt-2 text-muted small"><i className="bi bi-info-circle me-1"></i>Showing {filteredStaff.length} of {getStaffList().length} staff members</div>
          </div></div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="card">
        <div className="card-header bg-white"><h5 className="mb-0"><i className="bi bi-table me-2"></i>All Staff Members{searchTerm && <span className="badge bg-secondary ms-2">Filtered</span>}</h5></div>
        <div className="card-body">
          {loading && !getStaffList().length ? (
            <div className="text-center p-5"><div className="spinner-border text-primary"></div><p className="mt-2">Loading...</p></div>
          ) : filteredStaff.length === 0 ? (
            <div className="text-center p-5"><i className="bi bi-people fs-1 text-muted"></i><p className="mt-2">{searchTerm ? 'No matches.' : 'No staff found.'}</p>{searchTerm && <button className="btn btn-sm btn-outline-primary" onClick={() => setSearchTerm('')}>Clear Search</button>}</div>
          ) : (
            <StaffTable staffMembers={filteredStaff} onActionClick={handleAction} openDropdownId={openDropdownId} dropdownPosition={dropdownPosition} buttonRefs={buttonRefs} dropdownRefs={dropdownRefs} loading={loading} />
          )}
        </div>
      </div>

      {/* Modals */}
      {showResetPasswordModal && selectedStaff && (
        <ResetPasswordModal staff={selectedStaff} onClose={() => setShowResetPasswordModal(false)} onConfirm={handleResetPasswordConfirm} loading={loading} />
      )}

      {showModal && (
        <RolePermissionModal
          editingStaff={editingStaff}
          formData={formData}
          onInputChange={handleInputChange}
          onPermissionChange={togglePermission}
          onSelectAll={handleSelectAll}
          expandedMenus={expandedMenus}
          expandedSubMenus={expandedSubMenus}
          expandedNestedMenus={expandedNestedMenus}
          onToggleMenu={toggleMenu}
          onToggleSubMenu={toggleSubMenu}
          onToggleNestedMenu={toggleNestedMenu}
          menuItems={menuItems}
          onSubmit={handleSubmit}
          onClose={resetModalForm}
          loading={loading}
        />
      )}

      {showStaffPermissionsModal && viewingStaff && viewingRole && (
        <StaffPermissionsModal
          staff={viewingStaff}
          role={viewingRole}
          availablePermissions={availablePermissions}
          onClose={() => setShowStaffPermissionsModal(false)}
          onRemovePermission={handleRemovePermission}
          loading={loading}
        />
      )}

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .hover-bg:hover { background-color: #f8f9fa !important; }
        .menu-tree { max-height: 500px; overflow-y: auto; }
        .menu-tree::-webkit-scrollbar { width: 8px; }
        .menu-tree::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .menu-tree::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
        .custom-dropdown { position: relative; display: inline-block; }
        .custom-dropdown-menu { min-width: 240px; padding: 0.5rem 0; margin: 0; font-size: 0.875rem; color: #212529; background-color: #fff; border: 1px solid rgba(0,0,0,0.15); border-radius: 0.375rem; box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.175); }
        .custom-dropdown-menu .dropdown-item { display: flex; align-items: center; width: 100%; padding: 0.6rem 1rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; text-decoration: none; white-space: nowrap; background-color: transparent; border: 0; cursor: pointer; transition: all 0.2s ease; }
        .custom-dropdown-menu .dropdown-item:hover { background-color: #f8f9fa; color: #0d6efd; }
        .custom-dropdown-menu .dropdown-divider { height: 0; margin: 0.5rem 0; border-top: 1px solid #e9ecef; }
        .custom-dropdown-menu .text-warning { color: #ffc107 !important; }
        .custom-dropdown-menu .text-success { color: #198754 !important; }
        .custom-dropdown-menu .text-danger { color: #dc3545 !important; }
      `}</style>
    </div>
  );
};

export default Roles;