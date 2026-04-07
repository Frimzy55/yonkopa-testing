// src/components/admin/AdminInternalAccounts.jsx
import React, { useState, useEffect } from 'react';

const AdminInternalAccounts = () => {
  const [activeTab, setActiveTab] = useState('gl');
  const [accounts, setAccounts] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    // Sample GL Accounts
    const sampleGLAccounts = [
      { id: 1, code: 'GL-1001', name: 'Cash in Hand', type: 'Asset', balance: 150000, category: 'Current Asset' },
      { id: 2, code: 'GL-1002', name: 'Bank Account', type: 'Asset', balance: 2500000, category: 'Current Asset' },
      { id: 3, code: 'GL-2001', name: 'Loan Portfolio', type: 'Asset', balance: 5000000, category: 'Non-Current Asset' },
      { id: 4, code: 'GL-3001', name: 'Customer Deposits', type: 'Liability', balance: 3000000, category: 'Current Liability' },
    ];
    
    const sampleSuspenseAccounts = [
      { id: 1, code: 'SUSP-001', name: 'Uncleared Cheques', balance: 25000, pendingItems: 5 },
      { id: 2, code: 'SUSP-002', name: 'Unmatched Transactions', balance: 12000, pendingItems: 3 },
    ];
    
    setAccounts(activeTab === 'gl' ? sampleGLAccounts : sampleSuspenseAccounts);
  }, [activeTab]);

  const handleTransfer = (e) => {
    e.preventDefault();
    const newTransfer = {
      id: transfers.length + 1,
      ...transferData,
      date: new Date().toISOString(),
      status: 'completed'
    };
    setTransfers([newTransfer, ...transfers]);
    setTransferData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: ''
    });
  };

  const handleReconciliation = () => {
    alert('Reconciliation process started');
  };

  return (
    <div className="admin-internal-accounts">
      <div className="page-header">
        <h2>Internal Accounts Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Account
        </button>
      </div>

      <div className="accounts-tabs">
        <button 
          className={activeTab === 'gl' ? 'active' : ''}
          onClick={() => setActiveTab('gl')}
        >
          General Ledger Accounts
        </button>
        <button 
          className={activeTab === 'suspense' ? 'active' : ''}
          onClick={() => setActiveTab('suspense')}
        >
          Suspense Accounts
        </button>
        <button 
          className={activeTab === 'transfers' ? 'active' : ''}
          onClick={() => setActiveTab('transfers')}
        >
          Internal Transfers
        </button>
        <button 
          className={activeTab === 'reconciliation' ? 'active' : ''}
          onClick={() => setActiveTab('reconciliation')}
        >
          Account Reconciliation
        </button>
      </div>

      {activeTab === 'gl' && (
        <div className="gl-accounts">
          <div className="accounts-summary">
            <div className="summary-card">
              <h4>Total Assets</h4>
              <p className="amount">$7,650,000</p>
            </div>
            <div className="summary-card">
              <h4>Total Liabilities</h4>
              <p className="amount">$3,000,000</p>
            </div>
            <div className="summary-card">
              <h4>Equity</h4>
              <p className="amount">$4,650,000</p>
            </div>
          </div>

          <div className="accounts-table">
            <table>
              <thead>
                <tr>
                  <th>Account Code</th>
                  <th>Account Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.id}>
                    <td>{account.code}</td>
                    <td>{account.name}</td>
                    <td>{account.type}</td>
                    <td>{account.category}</td>
                    <td>${account.balance.toLocaleString()}</td>
                    <td>
                      <button className="btn-icon">View</button>
                      <button className="btn-icon">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'suspense' && (
        <div className="suspense-accounts">
          <div className="accounts-table">
            <table>
              <thead>
                <tr>
                  <th>Account Code</th>
                  <th>Account Name</th>
                  <th>Balance</th>
                  <th>Pending Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.id}>
                    <td>{account.code}</td>
                    <td>{account.name}</td>
                    <td>${account.balance.toLocaleString()}</td>
                    <td>{account.pendingItems}</td>
                    <td>
                      <button className="btn-icon">Clear Items</button>
                      <button className="btn-icon">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transfers' && (
        <div className="internal-transfers">
          <div className="transfer-form">
            <h3>Internal Transfer</h3>
            <form onSubmit={handleTransfer}>
              <div className="form-group">
                <label>From Account</label>
                <select
                  value={transferData.fromAccount}
                  onChange={(e) => setTransferData({...transferData, fromAccount: e.target.value})}
                  required
                >
                  <option value="">Select Account</option>
                  <option value="GL-1001">GL-1001 - Cash in Hand</option>
                  <option value="GL-1002">GL-1002 - Bank Account</option>
                  <option value="SUSP-001">SUSP-001 - Uncleared Cheques</option>
                </select>
              </div>

              <div className="form-group">
                <label>To Account</label>
                <select
                  value={transferData.toAccount}
                  onChange={(e) => setTransferData({...transferData, toAccount: e.target.value})}
                  required
                >
                  <option value="">Select Account</option>
                  <option value="GL-1001">GL-1001 - Cash in Hand</option>
                  <option value="GL-1002">GL-1002 - Bank Account</option>
                  <option value="SUSP-001">SUSP-001 - Uncleared Cheques</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={transferData.description}
                  onChange={(e) => setTransferData({...transferData, description: e.target.value})}
                  rows="3"
                />
              </div>

              <button type="submit" className="btn-primary">Process Transfer</button>
            </form>
          </div>

          <div className="transfer-history">
            <h3>Transfer History</h3>
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>From Account</th>
                    <th>To Account</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map(transfer => (
                    <tr key={transfer.id}>
                      <td>{new Date(transfer.date).toLocaleString()}</td>
                      <td>{transfer.fromAccount}</td>
                      <td>{transfer.toAccount}</td>
                      <td>${transfer.amount}</td>
                      <td>
                        <span className="status-badge completed">{transfer.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reconciliation' && (
        <div className="reconciliation">
          <div className="reconciliation-form">
            <h3>Account Reconciliation</h3>
            <div className="form-group">
              <label>Select Account</label>
              <select>
                <option>GL-1001 - Cash in Hand</option>
                <option>GL-1002 - Bank Account</option>
                <option>SUSP-001 - Uncleared Cheques</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reconciliation Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Statement Balance</label>
              <input type="number" placeholder="Enter statement balance" />
            </div>

            <div className="reconciliation-items">
              <h4>Outstanding Items</h4>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-01-15</td>
                    <td>Cheque #12345</td>
                    <td>$1,500</td>
                    <td>Uncleared</td>
                  </tr>
                  <tr>
                    <td>2024-01-14</td>
                    <td>Deposit in transit</td>
                    <td>$2,000</td>
                    <td>Outstanding</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="btn-primary" onClick={handleReconciliation}>
              Perform Reconciliation
            </button>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Internal Account</h3>
            <form>
              <div className="form-group">
                <label>Account Type</label>
                <select>
                  <option>General Ledger</option>
                  <option>Suspense Account</option>
                </select>
              </div>
              <div className="form-group">
                <label>Account Code</label>
                <input type="text" placeholder="Enter account code" />
              </div>
              <div className="form-group">
                <label>Account Name</label>
                <input type="text" placeholder="Enter account name" />
              </div>
              <div className="form-group">
                <label>Account Category</label>
                <select>
                  <option>Asset</option>
                  <option>Liability</option>
                  <option>Equity</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInternalAccounts;