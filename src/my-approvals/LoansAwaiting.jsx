import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Badge, Button } from "react-bootstrap";
import axios from "axios";
import LoanDetailsModal from "./LoanDetailsModal";
import KycDetailsModal from "./KycDetailsModal";

const ApprovedWebLoan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showKycModal, setShowKycModal] = useState(false);
  const [selectedKyc, setSelectedKyc] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/loan-full-view-evaluation`
        );
        console.log("Fetched data:", res.data);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleView = async (loan) => {
    console.log("View button clicked for loan:", loan);
    
    if (!loan || !loan.loan_id) {
      console.error("No loan_id found:", loan);
      alert("Cannot fetch details: Missing loan_id");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/loan1/${loan.loan_id}`
      );
      console.log("Loan details response:", res.data);
      setSelectedLoan(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching details:", err);
      alert(`Failed to load loan details: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleViewKyc = async (loan) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/kyc/${loan.kyc_code}`
      );
      setSelectedKyc(res.data);
      setShowKycModal(true);
    } catch (err) {
      console.error("Error fetching KYC:", err);
      setSelectedKyc(loan);
      setShowKycModal(true);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <Badge bg="success">{status}</Badge>;
      case "pending":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      case "rejected":
        return <Badge bg="danger">{status}</Badge>;
      case "under_review":
        return <Badge bg="info">{status}</Badge>;
      case "disbursed":
        return <Badge bg="primary">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status || "N/A"}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Filter data (temporarily removed for debugging)
  const filteredData = data.filter(
    (loan) => loan.loan_eval_id !== null && loan.loan_eval_id !== undefined
  );

  console.log("Total data:", data.length);
  console.log("Filtered data:", filteredData.length);

  return (
    <div className="loan-table-container">
      <h2 className="mb-4">Approved Web Loans</h2>

      {filteredData.length === 0 && data.length > 0 && (
        <Alert variant="warning">
          No loans with loan_eval_id found. Total loans: {data.length}
        </Alert>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Customer ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Loan Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No approved loans found
              </td>
            </tr>
          ) : (
            filteredData.map((loan) => (
              <tr key={loan.loan_id}>
                <td>{loan.loan_id}</td>
                <td>{loan.kyc_code}</td>
                <td>{loan.applicant_fullName}</td>
                <td>{loan.mobileNumber}</td>
                <td>₵{loan.kyc_loan_amount}</td>
                <td>{getStatusBadge(loan.momo_loan_status)}</td>
                <td>
                  {new Date(
                    loan.applicationDate || loan.created_at || loan.loan_created_at
                  ).toLocaleString()}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleView(loan)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <LoanDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
        onViewKyc={handleViewKyc}
      />

      <KycDetailsModal
        show={showKycModal}
        onClose={() => setShowKycModal(false)}
        kyc={selectedKyc}
      />
    </div>
  );
};

export default ApprovedWebLoan;