// src/components/admin/AdminSystemSettings.jsx
import React, { useState } from 'react';

const AdminSystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Bank Management System',
      timezone: 'UTC+0',
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD',
      language: 'en'
    },
    branch: {
      mainBranch: 'Main Branch',
      branches: [
        { id: 1, name: 'Main Branch', code: '001', address: '123 Main St', status: 'active' },
        { id: 2, name: 'Downtown Branch', code: '002', address: '456 Downtown Ave', status: 'active' },
        { id: 3, name: 'Westside Branch', code: '003', address: '789 West Blvd', status: 'inactive' }
      ]
    },
    products: {
      loanProducts: [
        { id: 1, name: 'Personal Loan', minAmount: 1000, maxAmount: 50000, interestRate: 10.5, tenure: 12 },
        { id: 2, name: 'Business Loan', minAmount: 5000, maxAmount: 200000, interestRate: 12.0, tenure: 24 },
        { id: 3, name: 'Home Loan', minAmount: 50000, maxAmount: 500000, interestRate: 8.5, tenure: 120 }
      ],
      accountTypes: ['Savings', 'Current', 'Fixed Deposit', 'Joint Account']
    },
    fees: {
      transactionFee: 0.5,
      accountMaintenanceFee: 10,
      loanProcessingFee: 100,
      atmWithdrawalFee: 1
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false,
      adminAlerts: true
    }
  });

  //const [editingBranch, setEditingBranch] = useState(null);
  //const [editingProduct, setEditingProduct] = useState(null);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value
      }
    });
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      fees: {
        ...settings.fees,
        [name]: parseFloat(value)
      }
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [name]: checked
      }
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const addBranch = (branch) => {
    const newBranch = {
      id: settings.branch.branches.length + 1,
      ...branch,
      status: 'active'
    };
    setSettings({
      ...settings,
      branch: {
        ...settings.branch,
        branches: [...settings.branch.branches, newBranch]
      }
    });
    setShowBranchModal(false);
  };

  const addProduct = (product) => {
    const newProduct = {
      id: settings.products.loanProducts.length + 1,
      ...product
    };
    setSettings({
      ...settings,
      products: {
        ...settings.products,
        loanProducts: [...settings.products.loanProducts, newProduct]
      }
    });
    setShowProductModal(false);
  };

  const toggleBranchStatus = (branchId) => {
    setSettings({
      ...settings,
      branch: {
        ...settings.branch,
        branches: settings.branch.branches.map(branch =>
          branch.id === branchId
            ? { ...branch, status: branch.status === 'active' ? 'inactive' : 'active' }
            : branch
        )
      }
    });
  };

  return (
    <div className="admin-system-settings">
      <div className="page-header">
        <h2>System Settings</h2>
        <button className="btn-primary" onClick={handleSaveSettings}>
          Save Changes
        </button>
      </div>

      <div className="settings-tabs">
        <button 
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >
          General Settings
        </button>
        <button 
          className={activeTab === 'branch' ? 'active' : ''}
          onClick={() => setActiveTab('branch')}
        >
          Branch Settings
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Product Settings
        </button>
        <button 
          className={activeTab === 'fees' ? 'active' : ''}
          onClick={() => setActiveTab('fees')}
        >
          Fee Settings
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notification Settings
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="general-settings">
          <div className="settings-card">
            <h3>System Configuration</h3>
            <div className="form-group">
              <label>System Name</label>
              <input
                type="text"
                name="systemName"
                value={settings.general.systemName}
                onChange={handleGeneralChange}
              />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select
                name="timezone"
                value={settings.general.timezone}
                onChange={handleGeneralChange}
              >
                <option>UTC+0</option>
                <option>UTC+1</option>
                <option>UTC+5:30</option>
                <option>UTC-5</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Format</label>
              <select
                name="dateFormat"
                value={settings.general.dateFormat}
                onChange={handleGeneralChange}
              >
                <option>YYYY-MM-DD</option>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select
                name="currency"
                value={settings.general.currency}
                onChange={handleGeneralChange}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
            <div className="form-group">
              <label>Default Language</label>
              <select
                name="language"
                value={settings.general.language}
                onChange={handleGeneralChange}
              >
                <option>en</option>
                <option>es</option>
                <option>fr</option>
                <option>de</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'branch' && (
        <div className="branch-settings">
          <div className="settings-card">
            <div className="card-header">
              <h3>Branch Management</h3>
              <button 
                className="btn-secondary"
                onClick={() => setShowBranchModal(true)}
              >
                + Add Branch
              </button>
            </div>
            
            <div className="branches-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Branch Code</th>
                    <th>Branch Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.branch.branches.map(branch => (
                    <tr key={branch.id}>
                      <td>{branch.code}</td>
                      <td>{branch.name}</td>
                      <td>{branch.address}</td>
                      <td>
                        <span className={`status-badge ${branch.status}`}>
                          {branch.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon">Edit</button>
                        <button 
                          className="btn-icon"
                          onClick={() => toggleBranchStatus(branch.id)}
                        >
                          {branch.status === 'active' ? 'Disable' : 'Enable'}
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

      {activeTab === 'products' && (
        <div className="product-settings">
          <div className="settings-card">
            <div className="card-header">
              <h3>Loan Products</h3>
              <button 
                className="btn-secondary"
                onClick={() => setShowProductModal(true)}
              >
                + Add Product
              </button>
            </div>

            <div className="products-grid">
              {settings.products.loanProducts.map(product => (
                <div key={product.id} className="product-card">
                  <h4>{product.name}</h4>
                  <div className="product-details">
                    <p><strong>Min Amount:</strong> ${product.minAmount.toLocaleString()}</p>
                    <p><strong>Max Amount:</strong> ${product.maxAmount.toLocaleString()}</p>
                    <p><strong>Interest Rate:</strong> {product.interestRate}%</p>
                    <p><strong>Tenure:</strong> {product.tenure} months</p>
                  </div>
                  <div className="product-actions">
                    <button className="btn-icon">Edit</button>
                    <button className="btn-icon">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="account-types">
              <h3>Account Types</h3>
              <div className="types-list">
                {settings.products.accountTypes.map((type, idx) => (
                  <div key={idx} className="type-badge">
                    {type}
                    <button className="remove-btn">×</button>
                  </div>
                ))}
                <button className="add-type-btn">+ Add Account Type</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fees' && (
        <div className="fee-settings">
          <div className="settings-card">
            <h3>Fee Configuration</h3>
            <div className="form-group">
              <label>Transaction Fee (%)</label>
              <input
                type="number"
                name="transactionFee"
                value={settings.fees.transactionFee}
                onChange={handleFeeChange}
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Account Maintenance Fee ($)</label>
              <input
                type="number"
                name="accountMaintenanceFee"
                value={settings.fees.accountMaintenanceFee}
                onChange={handleFeeChange}
              />
            </div>
            <div className="form-group">
              <label>Loan Processing Fee ($)</label>
              <input
                type="number"
                name="loanProcessingFee"
                value={settings.fees.loanProcessingFee}
                onChange={handleFeeChange}
              />
            </div>
            <div className="form-group">
              <label>ATM Withdrawal Fee ($)</label>
              <input
                type="number"
                name="atmWithdrawalFee"
                value={settings.fees.atmWithdrawalFee}
                onChange={handleFeeChange}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="notification-settings">
          <div className="settings-card">
            <h3>Notification Preferences</h3>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onChange={handleNotificationChange}
                />
                Email Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.notifications.smsNotifications}
                  onChange={handleNotificationChange}
                />
                SMS Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={settings.notifications.pushNotifications}
                  onChange={handleNotificationChange}
                />
                Push Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  name="adminAlerts"
                  checked={settings.notifications.adminAlerts}
                  onChange={handleNotificationChange}
                />
                Admin Alerts
              </label>
            </div>

            <div className="email-templates">
              <h4>Email Templates</h4>
              <div className="template-list">
                <div className="template-item">
                  <span>Welcome Email</span>
                  <button className="btn-icon">Edit</button>
                </div>
                <div className="template-item">
                  <span>Transaction Alert</span>
                  <button className="btn-icon">Edit</button>
                </div>
                <div className="template-item">
                  <span>Loan Approval</span>
                  <button className="btn-icon">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Branch Modal */}
      {showBranchModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Branch</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addBranch({
                code: formData.get('code'),
                name: formData.get('name'),
                address: formData.get('address')
              });
            }}>
              <div className="form-group">
                <label>Branch Code</label>
                <input type="text" name="code" required />
              </div>
              <div className="form-group">
                <label>Branch Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" rows="3" required></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowBranchModal(false)}>
                  Cancel
                </button>
                <button type="submit">Add Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Loan Product</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addProduct({
                name: formData.get('name'),
                minAmount: parseFloat(formData.get('minAmount')),
                maxAmount: parseFloat(formData.get('maxAmount')),
                interestRate: parseFloat(formData.get('interestRate')),
                tenure: parseInt(formData.get('tenure'))
              });
            }}>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Minimum Amount</label>
                <input type="number" name="minAmount" required />
              </div>
              <div className="form-group">
                <label>Maximum Amount</label>
                <input type="number" name="maxAmount" required />
              </div>
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" name="interestRate" step="0.1" required />
              </div>
              <div className="form-group">
                <label>Tenure (months)</label>
                <input type="number" name="tenure" required />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowProductModal(false)}>
                  Cancel
                </button>
                <button type="submit">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSystemSettings;