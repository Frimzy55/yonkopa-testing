// components/Roles/RolePermissionModal.js
import React from 'react';
import MenuTree from './MenuTree';
import { getRoleDisplayName, getStatusBadge } from './staffHelpers';

const RolePermissionModal = ({
  editingStaff,
  formData,
  onInputChange,
  onPermissionChange,
  onSelectAll,
  expandedMenus,
  expandedSubMenus,
  expandedNestedMenus,
  onToggleMenu,
  onToggleSubMenu,
  onToggleNestedMenu,
  menuItems,
  onSubmit,
  onClose,
  loading
}) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title">
              {editingStaff ? (
                <><i className="bi bi-person-badge me-2"></i>Editing Permissions for: {editingStaff.full_name} (ID #{editingStaff.userId})</>
              ) : (
                <><i className="bi bi-plus-circle me-2"></i>Create New Role & Assign Permissions</>
              )}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              {editingStaff && (
                <div className="alert alert-info mb-3">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Editing permissions for staff member:</strong> {editingStaff.full_name} (ID #{editingStaff.userId})<br />
                  <small className="text-muted">Role: {getRoleDisplayName(editingStaff.role)} | Status: {getStatusBadge(editingStaff).text}</small>
                </div>
              )}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Role Name *</label>
                  <input type="text" className="form-control" name="name" value={formData.name}
                    onChange={onInputChange} required placeholder="Enter role name"
                    disabled={!!editingStaff} />
                  {editingStaff && <small className="text-muted"><i className="bi bi-info-circle me-1"></i>Role name cannot be changed when editing staff permissions</small>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" name="description" value={formData.description}
                    onChange={onInputChange} placeholder="Brief description of the role" />
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Menu Permissions (Click on blue headings to expand)</h6>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={onSelectAll}>Select All Permissions</button>
              </div>
              <MenuTree
                menuItems={menuItems}
                expandedMenus={expandedMenus}
                expandedSubMenus={expandedSubMenus}
                expandedNestedMenus={expandedNestedMenus}
                onToggleMenu={onToggleMenu}
                onToggleSubMenu={onToggleSubMenu}
                onToggleNestedMenu={onToggleNestedMenu}
                selectedPermissions={formData.permissions}
                onPermissionChange={onPermissionChange}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>{editingStaff ? 'Updating Permissions...' : 'Saving...'}</> : (editingStaff ? 'Update Staff Permissions' : 'Create Role')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionModal;