// src/loans/ApproveWebLoanApplication.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Spinner,
  Alert,
  Dropdown,
  ButtonGroup,
  Form,
  Row,
  Col,
  Badge,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import LoanDetailsModal from "./LoanDetailsModal";
import KycDetailsModal from "./KycDetailsModal";
import LoanEvaluation from "./LoanEvaluation/LoanEvaluation";

const ApproveWebLoanApplication = () => {
  const [loanData, setLoanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [showKycModal, setShowKycModal] = useState(false);
  const [selectedKyc, setSelectedKyc] = useState(null);

  // Reject confirmation modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectLoan, setRejectLoan] = useState(null);

  // Evaluation screen state
  const [evaluatingLoan, setEvaluatingLoan] = useState(null);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const tableRef = useRef(null);
  const [evaluationStep, setEvaluationStep] = useState(1);

  // Fetch all loans
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

  // Scroll to and highlight row when returning from evaluation
  useEffect(() => {
    if (!evaluatingLoan && highlightedRowId && tableRef.current) {
      const rowElement = document.getElementById(`loan-row-${highlightedRowId}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setHighlightedRowId(null), 3000);
      }
    }
  }, [evaluatingLoan, highlightedRowId]);

  const handleAction = async (action, loan) => {
    if (action === "review") {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/loan/${loan.userId}`
        );
        setSelectedLoan(res.data);
        setShowModal(true);
      } catch (err) {
        console.error("Error fetching review:", err);
      }
    }

    if (action === "evaluate") {
      setHighlightedRowId(loan.loan_id);
      setEvaluatingLoan(loan);
      setEvaluationStep(1);
    }

    if (action === "approve") {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/loan/approve`, {
          loan_id: loan.loan_id,
        });
        const updated = loanData.map((item) =>
          item.loan_id === loan.loan_id ? { ...item, loan_status: "approved" } : item
        );
        setLoanData(updated);
        setFilteredData(updated);
        setEvaluatingLoan(null);
        setHighlightedRowId(null);
      } catch (err) {
        console.error("Approve failed:", err);
      }
    }

    if (action === "reject") {
      // Open custom modal instead of window.confirm
      setRejectLoan(loan);
      setShowRejectModal(true);
    }

    if (action === "skip") {
      setHighlightedRowId(loan.loan_id);
      setEvaluatingLoan(loan);
      setEvaluationStep(4);
    }
  };

  // Confirm reject from modal
  const handleConfirmReject = async () => {
    if (!rejectLoan) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/loan/reject`, {
        loan_id: rejectLoan.loan_id,
      });
      const updated = loanData.map((item) =>
        item.loan_id === rejectLoan.loan_id ? { ...item, loan_status: "rejected" } : item
      );
      setLoanData(updated);
      setFilteredData(updated);
      setEvaluatingLoan(null);
      setHighlightedRowId(null);
      setShowRejectModal(false);
      setRejectLoan(null);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
    setRejectLoan(null);
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
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  if (evaluatingLoan) {
    return (
      <LoanEvaluation
        loan={evaluatingLoan}
        initialStep={evaluationStep}
        onApprove={(loan) => handleAction("approve", loan)}
        onReject={(loan) => handleAction("reject", loan)}
        onBack={() => setEvaluatingLoan(null)}
      />
    );
  }

  return (
    <div className="loan-table-container" ref={tableRef}>
      <h2 className="mb-4">Full Loan KYC Applications</h2>

      <style>
        {`
          .highlight-row {
            animation: highlightFade 3s ease-in-out;
            background-color: #fff3cd !important;
            border-left: 4px solid #ffc107 !important;
          }
          @keyframes highlightFade {
            0% { background-color: #fff3cd; }
            70% { background-color: #fff3cd; }
            100% { background-color: transparent; }
          }
        `}
      </style>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={entries} onChange={handleEntriesChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </Form.Select>
        </Col>
      </Row>

      <Table bordered hover>
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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No loan applications found.
              </td>
            </tr>
          ) : (
            filteredData.slice(0, entries).map((loan) => (
              <tr
                key={loan.applicant_id}
                id={`loan-row-${loan.loan_id}`}
                className={highlightedRowId === loan.loan_id ? "highlight-row" : ""}
              >
                <td>{loan.loan_id}</td>
                <td>{loan.kyc_code}</td>
                <td>{loan.applicant_fullName}</td>
                <td>{loan.mobileNumber}</td>
                <td>₵{loan.loanAmount}</td>
                <td>{getStatusBadge(loan.loan_status)}</td>
                <td>{new Date(loan.applicant_created_at).toLocaleString()}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle size="sm">Actions</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction("review", loan)}>
                        Review
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("evaluate", loan)}>
                        Evaluate Loan
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("skip", loan)}>
                        Skip Evaluation
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("reject", loan)}>
                        Reject
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Reject Confirmation Modal */}
      <Modal show={showRejectModal} onHide={handleCancelReject} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reject this loan?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelReject}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmReject}>
            Yes, Reject
          </Button>
        </Modal.Footer>
      </Modal>

      <LoanDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
        onApprove={(loan) => handleAction("approve", loan)}
        onReject={(loan) => handleAction("reject", loan)}
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

export default ApproveWebLoanApplication;