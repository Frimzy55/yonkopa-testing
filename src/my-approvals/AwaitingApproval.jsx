import React, { useState, useEffect } from 'react';
import { Table, Dropdown, ButtonGroup } from 'react-bootstrap';
import './AwaitingApproval.css';
import LoanDetailsModal from "./AwaitLoanDetailsModal";

const AwaitingApproval = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/loan-full-view-evaluation?status=all`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLoans(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching loan data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'danger',
      'under_review': 'info',
      'disbursed': 'primary'
    };
    const color = statusColors[status?.toLowerCase()] || 'secondary';
    return <span className={`badge bg-${color}`}>{status || 'Pending'}</span>;
  };

  const handleAction = async (action, loan) => {
    switch (action) {
      case "view":
        setSelectedLoan(loan);
        setShowModal(true);
        break;

      case "approve":
        try {
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/admin/approve-loan1/${loan.loan_id}`,
            { method: "PUT", headers: { "Content-Type": "application/json" } }
          );
          const updated = loans.map((item) =>
            item.loan_id === loan.loan_id
              ? { ...item, loan_status: "approved" }
              : item
          );
          setLoans(updated);
        } catch (err) {
          console.error("Approve failed:", err);
        }
        break;

      case "reject":
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/loan/reject1`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ loan_id: loan.loan_id }),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Reject failed");
          }
          const updated = loans.map((item) =>
            item.loan_id === loan.loan_id
              ? { ...item, loan_status: "rejected" }
              : item
          );
          setLoans(updated);
          console.log("Loan rejected successfully");
        } catch (err) {
          console.error("Reject failed:", err);
          alert(err.message);
        }
        break;

      default:
        break;
    }
  };

  // Filter for table: hide approved & rejected
  const filteredData = loans.filter((loan) => {
    if (["approved", "rejected"].includes(loan.loan_status?.toLowerCase())) {
      return false;
    }
    if (!searchTerm) return true;
    const searchFields = [
      loan.loan_id,
      loan.kyc_code,
      loan.applicant_fullName,
      loan.mobileNumber,
      loan.kyc_loan_amount,
      loan.loan_status,
    ];
    return searchFields.some(
      (field) =>
        field &&
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading loan applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={fetchLoanData} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="awaiting-approval-container">
      <div className="header-section">
        <h1>Loan Applications - Awaiting Approval</h1>
        <div className="stats">
          <span className="total-count">Total Applications: {loans.length}</span>
          <span className="pending-count">
            Pending: {
              loans.filter(
                (l) => l.loan_status?.toLowerCase() === "pending"
              ).length
            }
          </span>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Loan ID, Customer ID, Name, Phone, Amount, or Status..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="entries-select">
          <label>Show entries: </label>
          <select value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <button onClick={fetchLoanData} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="table-container">
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Kyc code</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, entries).map((loan) => (
              <tr
                key={loan.applicant_id || loan.loan_id}
                id={`loan-row-${loan.loan_id}`}
                className={highlightedRowId === loan.loan_id ? "highlight-row" : ""}
              >
                <td>{loan.loan_id}</td>
                <td>{loan.kyc_code}</td>
                <td>{loan.applicant_fullName}</td>
                <td>{loan.mobileNumber}</td>
                <td>₵{parseFloat(loan.kyc_loan_amount).toLocaleString()}</td>
                <td>{getStatusBadge(loan.loan_status)}</td>
                <td>
                  {loan.loan_created_at
                    ? new Date(loan.loan_created_at).toLocaleString()
                    : '-'}
                </td>
                <td>
                  <Dropdown as={ButtonGroup} size="sm" drop="up">
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction('view', loan)}>
                        View Details
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction('approve', loan)}>
                        Approve
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction('reject', loan)}>
                        Reject
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No loan applications found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <div className="pagination-info">
          Showing {Math.min(entries, filteredData.length)} of {filteredData.length} applications
          {filteredData.length !== loans.length && ` (filtered from ${loans.length} total)`}
        </div>
      )}

      <LoanDetailsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        loan={selectedLoan}
      />
    </div>
  );
};

export default AwaitingApproval;