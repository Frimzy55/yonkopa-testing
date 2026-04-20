import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";

// ✅ FIXED PATH (adjust if needed)
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

  // ✅ Fetch approved loans
  useEffect(() => {
    const fetchApprovedLoans = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/approved-loans`
        );

        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchApprovedLoans();
  }, []);

  // ✅ View Loan Details
  const handleView = async (loan) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/loan/${loan.userId}`
      );

      setSelectedLoan(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  // ✅ View KYC Details
  const handleViewKyc = async (loan) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/kyc/${loan.kyc_code}`
      );

      setSelectedKyc(res.data);
      setShowKycModal(true);
    } catch (err) {
      console.error("Error fetching KYC:", err);

      // fallback if already included
      setSelectedKyc(loan);
      setShowKycModal(true);
    }
  };

  const getStatusBadge = (status) => {
    return <Badge bg="success">{status}</Badge>;
  };

  // ✅ Loading
  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  // ✅ Error
  if (error)
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="loan-table-container">
      <h2 className="mb-4">Approved Web Loans</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No approved loans found
              </td>
            </tr>
          ) : (
            data.map((loan) => (
              <tr key={loan.applicant_id}>
                <td>{loan.kyc_code}</td>
                <td>{loan.applicant_fullName}</td>
                <td>{loan.mobileNumber}</td>
                <td>₵{loan.loanAmount}</td>
                <td>{getStatusBadge(loan.loan_status)}</td>
                <td>
                  {new Date(
                    loan.applicant_created_at
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

      {/* ✅ Loan Modal */}
      <LoanDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
        onViewKyc={handleViewKyc}   // ✅ FIXED
      />

      {/* ✅ KYC Modal */}
      <KycDetailsModal
        show={showKycModal}
        onClose={() => setShowKycModal(false)}
        kyc={selectedKyc}
      />
    </div>
  );
};

export default ApprovedWebLoan;