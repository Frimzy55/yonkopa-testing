// components/Roles/ResetPasswordModal.js
import React, { useState } from 'react';

const ResetPasswordModal = ({ staff, onClose, onConfirm, loading }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      // toast handled by parent
      return;
    }
    if (newPassword !== confirmPassword) {
      return;
    }
    if (newPassword.length < 6) {
      return;
    }
    onConfirm(newPassword);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title"><i className="bi bi-key me-2"></i>Reset Password for: {staff?.full_name} (ID #{staff?.userId})</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
              <small className="text-muted">Password must be at least 6 characters long</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Resetting...</> : 'Reset Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;