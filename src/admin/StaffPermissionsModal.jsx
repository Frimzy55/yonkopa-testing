// components/Roles/StaffPermissionsModal.js
import React from 'react';
import { groupPermissionsByCategory } from './permissionsUtils';
import { getRoleBadgeColor, getRoleDisplayName } from './staffHelpers';

const StaffPermissionsModal = ({ staff, role, availablePermissions, onClose, onRemovePermission, loading }) => {
  const grouped = groupPermissionsByCategory(role?.permissions || [], availablePermissions);
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title">
              <i className="bi bi-person-badge me-2"></i>
              Permissions for: {staff?.full_name} (User ID: #{staff?.userId})
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-4"><p><strong>User ID:</strong> #{staff?.userId}</p></div>
              <div className="col-md-4"><p><strong>Staff Name:</strong> {staff?.full_name}</p></div>
              <div className="col-md-4"><p><strong>Role:</strong> <span className={`badge bg-${getRoleBadgeColor(staff?.role)} ms-2`}>{getRoleDisplayName(staff?.role)}</span></p></div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12"><p><strong>Role Description:</strong> {role?.description || 'No description'}</p></div>
            </div>
            <hr />
            <h6 className="mb-3">Assigned Permissions ({role?.permissions?.length || 0})</h6>
            {Object.keys(grouped).length > 0 ? (
              Object.entries(grouped).map(([category, perms]) => (
                <div key={category} className="mb-3 border rounded p-2">
                  <div className="fw-bold text-primary mb-2 text-uppercase">{category.replace(/_/g, ' ')}</div>
                  {perms.map((perm, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span>{perm.name}</span>
                        <small className="text-muted ms-2">(raw: {perm.id})</small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onRemovePermission(perm.id)} disabled={loading}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                No permissions assigned to this staff member.
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPermissionsModal;