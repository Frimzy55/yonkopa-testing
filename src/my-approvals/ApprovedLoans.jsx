// ApprovedLoans.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ApprovedLoans = () => {
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  // Date filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fromDate, toDate]);

  const fetchApprovedLoans = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/approved-loan`
      );

      setApprovedLoans(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching approved loans:", err);
      setError("Failed to load approved loans.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check if ANY filter is applied
  const hasFilter = searchTerm || fromDate || toDate;

  // Filtering logic
  const filteredLoans = approvedLoans.filter((loan) => {
    const nameMatch = loan.applicant_fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const loanDate = loan.approved_date
      ? new Date(loan.approved_date)
      : null;

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const dateMatch =
      (!from || (loanDate && loanDate >= from)) &&
      (!to || (loanDate && loanDate <= to));

    return nameMatch && dateMatch;
  });

  // ❗ BLOCK DISPLAY until filter is applied
  const dataToShow = hasFilter ? filteredLoans : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataToShow.length / itemsPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading approved loans...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <div className="approved-loans-container">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h5 className="mb-0">
          Approved Loans ({dataToShow.length})
        </h5>

        <div className="d-flex gap-2 flex-wrap">

          {/* Date Filters */}
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          {/* Search */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="btn btn-outline-primary"
            onClick={fetchApprovedLoans}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Amount Approved</th>
              <th>Date Approved</th>
            </tr>
          </thead>

          <tbody>
            {!hasFilter ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  Please enter a customer name or select a date range to view approved loans
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  No results found
                </td>
              </tr>
            ) : (
              currentItems.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.applicant_fullName || "N/A"}</td>
                  <td>{loan.mobileNumber || loan.applicant_phone || "N/A"}</td>
                  <td>{formatCurrency(loan.kyc_loan_amount)}</td>
                  <td>{formatDate(loan.approved_date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {hasFilter && totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ApprovedLoans;