// LoanApproval.jsx
import React, { useState, useEffect } from 'react';

const LoanApproval = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockApplications = [
        {
          id: 1,
          applicationId: 'LN10001',
          customerId: 'CUST001',
          customerName: 'John Doe',
          loanType: 'Personal Loan',
          loanAmount: 50000,
          loanTerm: 36,
          interestRate: 12.5,
          monthlyIncome: 5000,
          creditScore: 720,
          applicationDate: '2024-03-15',
          status: 'pending',
          documents: ['ID Proof', 'Income Statement', 'Bank Statement']
        },
        {
          id: 2,
          applicationId: 'LN10002',
          customerId: 'CUST002',
          customerName: 'Jane Smith',
          loanType: 'Home Loan',
          loanAmount: 250000,
          loanTerm: 240,
          interestRate: 8.5,
          monthlyIncome: 8000,
          creditScore: 750,
          applicationDate: '2024-03-14',
          status: 'pending',
          documents: ['ID Proof', 'Property Documents', 'Income Statement']
        },
        {
          id: 3,
          applicationId: 'LN10003',
          customerId: 'CUST003',
          customerName: 'Robert Johnson',
          loanType: 'Car Loan',
          loanAmount: 35000,
          loanTerm: 48,
          interestRate: 9.5,
          monthlyIncome: 4500,
          creditScore: 680,
          applicationDate: '2024-03-13',
          status: 'approved',
          documents: ['ID Proof', 'Vehicle Quote', 'Income Statement']
        }
      ];
      
      setApplications(mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleReject = async (application) => {
    if (window.confirm('Are you sure you want to reject this loan application?')) {
      setProcessing(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Application rejected successfully');
        fetchApplications();
      } catch (error) {
        alert('Error processing request');
      } finally {
        setProcessing(false);
      }
    }
  };

  const submitApproval = async () => {
    if (!approvalNotes) {
      alert('Please enter approval notes');
      return;
    }
    
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Loan application ${selectedApplication.applicationId} approved successfully`);
      setShowModal(false);
      setApprovalNotes('');
      fetchApplications();
    } catch (error) {
      alert('Error approving application');
    } finally {
      setProcessing(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    return <span className={`badge bg-${colors[status]}`}>{status.toUpperCase()}</span>;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="loan-approval">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Loan Approval</h6>
        <p className="small text-secondary">Review and approve loan applications</p>
      </div>

      {/* Search and Filter */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by application ID, customer name, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-outline-primary w-100" onClick={fetchApplications}>
            <i className="bi bi-arrow-repeat me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Application ID</th>
              <th>Customer</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Term</th>
              <th>Credit Score</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <tr key={app.id}>
                  <td><code>{app.applicationId}</code></td>
                  <td>
                    <div>{app.customerName}</div>
                    <small className="text-muted">{app.customerId}</small>
                  </td>
                  <td>{app.loanType}</td>
                  <td>{formatCurrency(app.loanAmount)}</td>
                  <td>{app.loanTerm} months</td>
                  <td>
                    <span className={`badge ${app.creditScore >= 700 ? 'bg-success' : app.creditScore >= 600 ? 'bg-warning' : 'bg-danger'}`}>
                      {app.creditScore}
                    </span>
                  </td>
                  <td>{app.applicationDate}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    {app.status === 'pending' && (
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(app)}
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(app)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    )}
                    {app.status !== 'pending' && (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No applications found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approval Modal */}
      {showModal && selectedApplication && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Loan Application Details - {selectedApplication.applicationId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setApprovalNotes('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <div className="bg-light p-3 rounded mb-3">
                      <p><strong>Name:</strong> {selectedApplication.customerName}</p>
                      <p><strong>Customer ID:</strong> {selectedApplication.customerId}</p>
                      <p><strong>Monthly Income:</strong> {formatCurrency(selectedApplication.monthlyIncome)}</p>
                      <p><strong>Credit Score:</strong> {selectedApplication.creditScore}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Loan Details</h6>
                    <div className="bg-light p-3 rounded mb-3">
                      <p><strong>Type:</strong> {selectedApplication.loanType}</p>
                      <p><strong>Amount:</strong> {formatCurrency(selectedApplication.loanAmount)}</p>
                      <p><strong>Term:</strong> {selectedApplication.loanTerm} months</p>
                      <p><strong>Interest Rate:</strong> {selectedApplication.interestRate}%</p>
                      <p><strong>EMI:</strong> {formatCurrency(selectedApplication.loanAmount * selectedApplication.interestRate / 100 / 12)}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h6>Documents</h6>
                    <div className="bg-light p-3 rounded mb-3">
                      <ul className="mb-0">
                        {selectedApplication.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {selectedApplication.status === 'pending' && (
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Approval Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter approval notes and conditions..."
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setApprovalNotes('');
                  }}
                >
                  Close
                </button>
                {selectedApplication.status === 'pending' && (
                  <button
                    className="btn btn-success"
                    onClick={submitApproval}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Approve Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApproval;