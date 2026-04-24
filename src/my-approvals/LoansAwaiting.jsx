import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
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

  // ✅ Fetch data
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/loan-full-view-evaluation`
        );

        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // ✅ View Loan Details
  const handleView = async (loan) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/loan/${loan.loan_id}`
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

      setSelectedKyc(loan);
      setShowKycModal(true);
    }
  };

 // const getStatusBadge = (status) => {
   // return <Badge bg="warning">{status}</Badge>;
  //};

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
      return <Badge bg="secondary">{status}</Badge>;
  }
};

  // ✅ Loading
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="loan-table-container">
      <h2 className="mb-4">Approved Web Loans</h2>

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
          {data.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No approved loans found
              </td>
            </tr>
          ) : (
            data
              // ✅ FILTER OUT NULL loan_eval_id
              .filter(
                (loan) =>
                  loan.loan_eval_id !== null &&
                  loan.loan_eval_id !== undefined
              )
              .map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{loan.loan_id}</td>
                  <td>{loan.kyc_code}</td>
                  <td>{loan.applicant_fullName}</td>
                  <td>{loan.mobileNumber}</td>
                  <td>₵{loan.kyc_loan_amount}</td>

                  {/* ✅ SAFE DISPLAY */}
                 

                  <td>{getStatusBadge(loan.momo_loan_status)}</td>

                  <td>
                    {new Date(
                      loan.applicationDate ||
                        loan.created_at
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

      {/* Loan Modal */}
      <LoanDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
        onViewKyc={handleViewKyc}
      />

      {/* KYC Modal */}
      <KycDetailsModal
        show={showKycModal}
        onClose={() => setShowKycModal(false)}
        kyc={selectedKyc}
      />
    </div>
  );
};

export default ApprovedWebLoan;