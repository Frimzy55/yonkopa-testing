// src/components/admin/AdminLoans.jsx
import React, { useState, useEffect } from 'react';

const AdminLoans = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    customerName: '',
    customerId: '',
    loanType: 'personal',
    amount: '',
    tenure: '',
    interestRate: '',
    purpose: ''
  });

  useEffect(() => {
    // Sample data
    const sampleLoans = [
      { id: 1, customerName: 'John Doe', loanType: 'Personal', amount: 10000, tenure: 12, status: 'pending', date: '2024-01-15' },
      { id: 2, customerName: 'Jane Smith', loanType: 'Business', amount: 50000, tenure: 24, status: 'approved', date: '2024-01-10' },
      { id: 3, customerName: 'Bob Johnson', loanType: 'Home', amount: 200000, tenure: 120, status: 'disbursed', date: '2024-01-05' },
    ];
    setLoans(sampleLoans);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm({ ...applicationForm, [name]: value });
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const newLoan = {
      id: loans.length + 1,
      ...applicationForm,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setLoans([...loans, newLoan]);
    setApplicationForm({
      customerName: '',
      customerId: '',
      loanType: 'personal',
      amount: '',
      tenure: '',
      interestRate: '',
      purpose: ''
    });
  };

  const handleAssessment = (loanId, decision) => {
    setLoans(loans.map(loan => 
      loan.id === loanId ? { ...loan, status: decision } : loan
    ));
    setSelectedLoan(null);
  };

  const filteredLoans = loans.filter(loan => {
    if (activeTab === 'applications') return loan.status === 'pending';
    if (activeTab === 'progress') return loan.status === 'approved';
    if (activeTab === 'active') return loan.status === 'disbursed';
    return true;
  });

  return (
    <div className="admin-loans">
      <div className="page-header">
        <h2>Loan Management</h2>
      </div>

      <div className="loans-tabs">
        <button 
          className={activeTab === 'applications' ? 'active' : ''}
          onClick={() => setActiveTab('applications')}
        >
          New Applications
        </button>
        <button 
          className={activeTab === 'progress' ? 'active' : ''}
          onClick={() => setActiveTab('progress')}
        >
          Application in Progress
        </button>
        <button 
          className={activeTab === 'assessment' ? 'active' : ''}
          onClick={() => setActiveTab('assessment')}
        >
          Loan Assessment
        </button>
        <button 
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Loans
        </button>
        <button 
          className={activeTab === 'repayment' ? 'active' : ''}
          onClick={() => setActiveTab('repayment')}
        >
          Loan Repayment
        </button>
      </div>

      {activeTab === 'applications' && (
        <div className="application-form">
          <h3>New Loan Application</h3>
          <form onSubmit={handleSubmitApplication}>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={applicationForm.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer ID</label>
                <input
                  type="text"
                  name="customerId"
                  value={applicationForm.customerId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Loan Type</label>
                <select
                  name="loanType"
                  value={applicationForm.loanType}
                  onChange={handleInputChange}
                >
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="auto">Auto Loan</option>
                  <option value="education">Education Loan</option>
                </select>
              </div>
              <div className="form-group">
                <label>Loan Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={applicationForm.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tenure (months)</label>
                <input
                  type="number"
                  name="tenure"
                  value={applicationForm.tenure}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={applicationForm.interestRate}
                  onChange={handleInputChange}
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <textarea
                name="purpose"
                value={applicationForm.purpose}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <button type="submit" className="btn-primary">Submit Application</button>
          </form>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="assessment-section">
          <h3>Loans Pending Assessment</h3>
          <div className="loans-table">
            <table>
              <thead>
                <tr>
                  <th>Application Date</th>
                  <th>Customer</th>
                  <th>Loan Type</th>
                  <th>Amount</th>
                  <th>Tenure</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.filter(l => l.status === 'pending').map(loan => (
                  <tr key={loan.id}>
                    <td>{loan.date}</td>
                    <td>{loan.customerName}</td>
                    <td>{loan.loanType}</td>
                    <td>${loan.amount}</td>
                    <td>{loan.tenure} months</td>
                    <td>
                      <button 
                        className="btn-icon approve"
                        onClick={() => handleAssessment(loan.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-icon reject"
                        onClick={() => handleAssessment(loan.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'progress' || activeTab === 'active') && (
        <div className="loans-list">
          <div className="loans-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Loan Type</th>
                  <th>Amount</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map(loan => (
                  <tr key={loan.id}>
                    <td>{loan.date}</td>
                    <td>{loan.customerName}</td>
                    <td>{loan.loanType}</td>
                    <td>${loan.amount}</td>
                    <td>{loan.tenure} months</td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'repayment' && (
        <div className="repayment-section">
          <div className="repayment-form">
            <h3>Process Loan Repayment</h3>
            <form>
              <div className="form-group">
                <label>Loan Account Number</label>
                <input type="text" placeholder="Enter loan account number" />
              </div>
              <div className="form-group">
                <label>Repayment Amount</label>
                <input type="number" placeholder="Enter amount" />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Process Repayment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoans;