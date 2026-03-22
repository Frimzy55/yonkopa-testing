// LoanRepayment.jsx
import React, { useState, useEffect } from 'react';

const LoanRepayment = () => {
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  const fetchActiveLoans = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockActiveLoans = [
        {
          id: 1,
          loanId: 'LN10001',
          applicationId: 'LN10001',
          customerId: 'CUST001',
          customerName: 'John Doe',
          loanType: 'Personal Loan',
          principalAmount: 50000,
          outstandingBalance: 42500,
          nextPaymentDate: '2024-04-15',
          emiAmount: 1650.50,
          interestRate: 12.5,
          startDate: '2024-01-15',
          endDate: '2027-01-15',
          status: 'active',
          paymentsMade: 3,
          totalPayments: 36
        },
        {
          id: 2,
          loanId: 'LN10003',
          applicationId: 'LN10003',
          customerId: 'CUST003',
          customerName: 'Robert Johnson',
          loanType: 'Car Loan',
          principalAmount: 35000,
          outstandingBalance: 35000,
          nextPaymentDate: '2024-04-10',
          emiAmount: 890.75,
          interestRate: 9.5,
          startDate: '2024-03-15',
          endDate: '2028-03-15',
          status: 'active',
          paymentsMade: 1,
          totalPayments: 48
        }
      ];
      
      setActiveLoans(mockActiveLoans);
    } catch (error) {
      console.error('Error fetching active loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = (loan) => {
    setSelectedLoan(loan);
    setPaymentAmount(loan.emiAmount.toString());
    setShowModal(true);
  };

  const processPayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    
    if (parseFloat(paymentAmount) > selectedLoan.outstandingBalance) {
      alert('Payment amount exceeds outstanding balance');
      return;
    }
    
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Payment of ${formatCurrency(paymentAmount)} processed successfully for loan ${selectedLoan.loanId}`);
      setShowModal(false);
      setPaymentAmount('');
      setPaymentMethod('cash');
      setPaymentReference('');
      setPaymentNotes('');
      fetchActiveLoans();
    } catch (error) {
      alert('Error processing payment');
    } finally {
      setProcessing(false);
    }
  };

  const filteredLoans = activeLoans.filter(loan => {
    const matchesSearch = 
      loan.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const calculateProgress = (paid, total) => {
    return (paid / total) * 100;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading active loans...</p>
      </div>
    );
  }

  return (
    <div className="loan-repayment">
      <div className="mb-4">
        <h6 className="text-muted mb-2">Loan Repayment</h6>
        <p className="small text-secondary">Process loan payments and track repayment progress</p>
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
              placeholder="Search by loan ID, customer name, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100" onClick={fetchActiveLoans}>
            <i className="bi bi-arrow-repeat me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Active Loans</small>
              <h4 className="mb-0">{activeLoans.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Total Outstanding</small>
              <h4 className="mb-0 text-success">
                {formatCurrency(activeLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0))}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-info bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Total Principal</small>
              <h4 className="mb-0">
                {formatCurrency(activeLoans.reduce((sum, loan) => sum + loan.principalAmount, 0))}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning bg-opacity-10">
            <div className="card-body">
              <small className="text-muted">Monthly EMI Total</small>
              <h4 className="mb-0">
                {formatCurrency(activeLoans.reduce((sum, loan) => sum + loan.emiAmount, 0))}
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
              <th>Loan ID</th>
              <th>Customer</th>
              <th>Loan Type</th>
              <th>Principal</th>
              <th>Outstanding</th>
              <th>EMI Amount</th>
              <th>Next Payment</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map(loan => (
                <tr key={loan.id}>
                  <td><code>{loan.loanId}</code></td>
                  <td>
                    <div>{loan.customerName}</div>
                    <small className="text-muted">{loan.customerId}</small>
                  </td>
                  <td>{loan.loanType}</td>
                  <td>{formatCurrency(loan.principalAmount)}</td>
                  <td className="fw-semibold text-warning">
                    {formatCurrency(loan.outstandingBalance)}
                  </td>
                  <td>{formatCurrency(loan.emiAmount)}</td>
                  <td>
                    <small>{loan.nextPaymentDate}</small>
                    <br />
                    <small className="text-muted">{loan.paymentsMade}/{loan.totalPayments} payments</small>
                  </td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${calculateProgress(loan.paymentsMade, loan.totalPayments)}%`
                        }}
                      >
                        {Math.round(calculateProgress(loan.paymentsMade, loan.totalPayments))}%
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleMakePayment(loan)}
                    >
                      <i className="bi bi-cash me-1"></i> Pay Now
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 text-muted">No active loans found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showModal && selectedLoan && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setPaymentAmount('');
                    setPaymentMethod('cash');
                    setPaymentReference('');
                    setPaymentNotes('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="bg-light p-3 rounded mb-3">
                  <p><strong>Loan ID:</strong> {selectedLoan.loanId}</p>
                  <p><strong>Customer:</strong> {selectedLoan.customerName}</p>
                  <p><strong>Outstanding Balance:</strong> {formatCurrency(selectedLoan.outstandingBalance)}</p>
                  <p><strong>Regular EMI:</strong> {formatCurrency(selectedLoan.emiAmount)}</p>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Payment Amount <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter amount"
                      step="0.01"
                      min="0"
                      max={selectedLoan.outstandingBalance}
                    />
                  </div>
                  <small className="text-muted">Minimum: {formatCurrency(selectedLoan.emiAmount)}</small>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="card">Debit/Credit Card</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Reference Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Cheque number or transaction ID"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Payment Notes</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    placeholder="Additional notes..."
                  ></textarea>
                </div>
                
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  After payment, the outstanding balance will be updated automatically.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setPaymentAmount('');
                    setPaymentMethod('cash');
                    setPaymentReference('');
                    setPaymentNotes('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={processPayment}
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
                      Make Payment
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

export default LoanRepayment;