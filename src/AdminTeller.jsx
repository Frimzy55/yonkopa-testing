// src/components/admin/AdminTeller.jsx
import React, { useState } from 'react';

const AdminTeller = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [transactionData, setTransactionData] = useState({
    accountNumber: '',
    amount: '',
    description: '',
    chequeNumber: ''
  });
  const [transactions, setTransactions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      type: activeTab,
      ...transactionData,
      date: new Date().toISOString(),
      status: 'completed'
    };
    setTransactions([newTransaction, ...transactions]);
    setTransactionData({
      accountNumber: '',
      amount: '',
      description: '',
      chequeNumber: ''
    });
  };

  return (
    <div className="admin-teller">
      <div className="page-header">
        <h2>Teller Operations</h2>
      </div>

      <div className="teller-tabs">
        <button 
          className={activeTab === 'deposit' ? 'active' : ''}
          onClick={() => setActiveTab('deposit')}
        >
          Cash Deposit
        </button>
        <button 
          className={activeTab === 'withdrawal' ? 'active' : ''}
          onClick={() => setActiveTab('withdrawal')}
        >
          Cash Withdrawal
        </button>
        <button 
          className={activeTab === 'cheque' ? 'active' : ''}
          onClick={() => setActiveTab('cheque')}
        >
          Cheque Processing
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          Teller Reports
        </button>
      </div>

      {activeTab !== 'reports' ? (
        <div className="transaction-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={transactionData.accountNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={transactionData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            {activeTab === 'cheque' && (
              <div className="form-group">
                <label>Cheque Number</label>
                <input
                  type="text"
                  name="chequeNumber"
                  value={transactionData.chequeNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={transactionData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <button type="submit" className="btn-primary">
              Process {activeTab === 'deposit' ? 'Deposit' : activeTab === 'withdrawal' ? 'Withdrawal' : 'Cheque'}
            </button>
          </form>
        </div>
      ) : (
        <div className="reports-section">
          <h3>Recent Transactions</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Account Number</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleString()}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.accountNumber}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.description}</td>
                    <td>
                      <span className="status-badge completed">{transaction.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeller;