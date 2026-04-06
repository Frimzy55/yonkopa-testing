// LoanDisbursement.jsx
import React, { useState, useEffect } from 'react';

const LoanDisbursement = () => {
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [disbursementMethod, setDisbursementMethod] = useState('account');
  const [disbursementNotes, setDisbursementNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  const fetchApprovedLoans = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockApprovedLoans = [
        {
          id: 1,
          applicationId: 'LN10003',
          customerId: 'CUST003',
          customerName: 'Robert Johnson',
          loanType: 'Car Loan',
          loanAmount: 35000,
          loanTerm: 48,
          interestRate: 9.5,
          approvedDate: '2024-03-13',
          approvedBy: 'Admin User',
          accountNumber: '1001234569',
          status: 'approved',
          disbursedAmount: 0
        },
        {
          id: 2,
          applicationId: 'LN10004',
          customerId: 'CUST004',
          customerName: 'Mary Williams',
          loanType: 'Business Loan',
          loanAmount: 100000,
          loanTerm: 60,
          interestRate: 10.5,
          approvedDate: '2024-03-12',
          approvedBy: 'Admin User',
          accountNumber: '1001234570',
          status: 'approved',
          disbursedAmount: 0
        }
      ];
      
      setApprovedLoans(mockApprovedLoans);
    } catch (error) {
      console.error('Error fetching approved loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisburse = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const processDisbursement = async () => {
    if (!disbursementMethod) {
      alert('Please select disbursement method');
      return;
    }
    
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Loan ${selectedLoan.applicationId} disbursed successfully! Amount: ${formatCurrency(selectedLoan.loanAmount)}`);
      setShowModal(false);
      setDisbursementMethod('account');
      setDisbursementNotes('');
      fetchApprovedLoans();
    } catch (error) {
      alert('Error processing disbursement');
    } finally {
      setProcessing(false);
    }
  };

  const filteredLoans = approvedLoans.filter(loan => {
    const matchesSearch = 
      loan.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading approved loans...</p>
      </div>
    );
  }

  return (
    <div className="loan-disbursement">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Loan Disbursement</h6>
        <p className="small text-secondary">Process and release approved loans</p>
      </div>

      {/* Search */}
      <div className="row g-2 mb-3">
        <div className="col-md-8">
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
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100" onClick={fetchApprovedLoans}>
            <i className="bi bi-arrow-repeat me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Total Approved Loans</small>
              <h4 className="mb-0">{approvedLoans.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-success bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Total Amount</small>
              <h4 className="mb-0 text-success">
                {formatCurrency(approvedLoans.reduce((sum, loan) => sum + loan.loanAmount, 0))}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-info bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Average Loan</small>
              <h4 className="mb-0">
                {formatCurrency(approvedLoans.reduce((sum, loan) => sum + loan.loanAmount, 0) / (approvedLoans.length || 1))}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Application ID</th>
              <th>Customer</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Term</th>
              <th>Interest Rate</th>
              <th>Approved Date</th>
              <th>Account</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map(loan => (
                <tr key={loan.id}>
                  <td><code>{loan.applicationId}</code></td>
                  <td>
                    <div>{loan.customerName}</div>
                    <small className="text-muted">{loan.customerId}</small>
                  </td>
                  <td>{loan.loanType}</td>
                  <td className="fw-semibold">{formatCurrency(loan.loanAmount)}</td>
                  <td>{loan.loanTerm} months</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.approvedDate}</td>
                  <td>
                    <code>{loan.accountNumber}</code>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDisburse(loan)}
                    >
                      <i className="bi bi-cash me-1"></i> Disburse
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No approved loans found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Disbursement Modal */}
      {showModal && selectedLoan && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Disbursement</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setDisbursementMethod('account');
                    setDisbursementNotes('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="bg-light p-3 rounded mb-3">
                  <p><strong>Application ID:</strong> {selectedLoan.applicationId}</p>
                  <p><strong>Customer:</strong> {selectedLoan.customerName}</p>
                  <p><strong>Loan Amount:</strong> {formatCurrency(selectedLoan.loanAmount)}</p>
                  <p><strong>Account Number:</strong> {selectedLoan.accountNumber}</p>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Disbursement Method <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={disbursementMethod}
                    onChange={(e) => setDisbursementMethod(e.target.value)}
                  >
                    <option value="account">Credit to Account</option>
                    <option value="cheque">Issue Cheque</option>
                    <option value="cash">Cash Disbursement</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Disbursement Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter any additional notes..."
                    value={disbursementNotes}
                    onChange={(e) => setDisbursementNotes(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Please verify all details before confirming disbursement.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setDisbursementMethod('account');
                    setDisbursementNotes('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={processDisbursement}
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
                      Confirm Disbursement
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDisbursement;