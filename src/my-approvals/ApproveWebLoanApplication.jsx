// src/pages/ApproveWebLoanApplication.js
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Dropdown, ButtonGroup, Form, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";

const ApproveWebLoanApplication = () => {
  const [loanData, setLoanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
       const response = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/admin/full-loan-kyc`
);
        setLoanData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Error fetching loan data"
        );
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  const handleAction = (action, loanId) => {
    console.log(`Action: ${action} for Loan ID: ${loanId}`);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = loanData.filter(
      (loan) =>
        loan.applicant_fullName.toLowerCase().includes(term) ||
        loan.kyc_code.toLowerCase().includes(term) ||
        loan.mobileNumber.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value));
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge bg="success">{status}</Badge>;
      case "rejected":
        return <Badge bg="danger">{status}</Badge>;
      case "pending":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="loan-table-container">
      <h2 className="mb-4">Full Loan KYC Applications</h2>

      <Row className="mb-3 align-items-center">
        <Col md={6} sm={12} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by name, customer ID or phone..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col md={3} sm={6} className="mb-2">
          <Form.Select value={entries} onChange={handleEntriesChange}>
            <option value={5}>Show 5 entries</option>
            <option value={10}>Show 10 entries</option>
            <option value={25}>Show 25 entries</option>
            <option value={50}>Show 50 entries</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Loan Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No loan applications found
              </td>
            </tr>
          ) : (
            filteredData.slice(0, entries).map((loan) => (
              <tr key={loan.userId}>
                <td>{loan.kyc_code}</td>
                <td>{loan.applicant_fullName}</td>
                <td>{loan.mobileNumber}</td>
                <td>₵{loan.loanAmount}</td>
                <td>{getStatusBadge(loan.loan_status)}</td>
                <td>{new Date(loan.applicant_created_at).toLocaleString()}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction("approve", loan.userId)}>
                        Approve
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("reject", loan.userId)}>
                        Reject
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("view", loan.userId)}>
                        View Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ApproveWebLoanApplication;