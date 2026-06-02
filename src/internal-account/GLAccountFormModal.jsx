import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GLAccountFormModal = ({ show, onClose, onSave, initialData, accounts }) => {
  const [loading, setLoading] = useState(false);
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

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (show) {
      if (initialData) {
        setFormData({
          accountCode: initialData.accountCode,
          accountName: initialData.accountName,
          accountType: initialData.accountType,
          category: initialData.category || '',
          normalBalance: initialData.normalBalance,
          description: initialData.description || '',
          status: initialData.status,
          parentAccount: initialData.parentAccount || '',
          isSubAccount: initialData.isSubAccount || false
        });
      } else {
        // Reset to default for create mode
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
      }
    }
  }, [show, initialData]);

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

      if (initialData) {
        // Update existing account
        await axios.put(`http://localhost:5000/api/gl-accounts/${initialData.id}`, formData, config);
        toast.success('GL Account updated successfully');
      } else {
        // Create new account
        await axios.post('http://localhost:5000/api/gl-accounts', formData, config);
        toast.success('GL Account created successfully');
      }

      onSave(); // notify parent to refresh list
      onClose(); // close modal
    } catch (error) {
      console.error('Error saving GL account:', error);
      toast.error(error.response?.data?.message || 'Failed to save GL account');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? 'Edit GL Account' : 'Create New GL Account'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
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
                    {accounts
                      .filter(acc => !acc.isSubAccount && acc.id !== initialData?.id)
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
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  initialData ? 'Update Account' : 'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GLAccountFormModal;