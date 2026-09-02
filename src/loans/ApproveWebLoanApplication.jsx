// src/loans/ApproveWebLoanApplication.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Badge,
  Modal,
  Button,
  Card,
  Overlay,
  ButtonGroup,
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

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectLoan, setRejectLoan] = useState(null);

  const [evaluatingLoan, setEvaluatingLoan] = useState(null);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const tableRef = useRef(null);
  const [evaluationStep, setEvaluationStep] = useState(1);

  // Action menu state
  const [actionTarget, setActionTarget] = useState(null);
  const [actionLoan, setActionLoan] = useState(null);

  // Helper: format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
          err.response?.data?.error ||
            err.message ||
            "Error fetching loan data"
        );
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  // Scroll to and highlight row when returning from evaluation
  useEffect(() => {
    if (!evaluatingLoan && highlightedRowId && tableRef.current) {
      const rowElement = document.getElementById(
        `loan-row-${highlightedRowId}`
      );

      if (rowElement) {
        rowElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          setHighlightedRowId(null);
        }, 3000);
      }
    }
  }, [evaluatingLoan, highlightedRowId]);

  // Close action menu when page scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (actionTarget) {
        setActionTarget(null);
        setActionLoan(null);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [actionTarget]);

  const handleActionMenu = (event, loan) => {
    if (actionLoan?.loan_id === loan.loan_id && actionTarget) {
      setActionTarget(null);
      setActionLoan(null);
      return;
    }

    setActionTarget(event.currentTarget);
    setActionLoan(loan);
  };

  const closeActionMenu = () => {
    setActionTarget(null);
    setActionLoan(null);
  };

  const handleAction = async (action, loan) => {
    closeActionMenu();

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
        await axios.post(
          `${process.env.REACT_APP_API_URL}/loan/approve`,
          {
            loan_id: loan.loan_id,
          }
        );

        const updated = loanData.map((item) =>
          item.loan_id === loan.loan_id
            ? { ...item, loan_status: "approved" }
            : item
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
      setRejectLoan(loan);
      setShowRejectModal(true);
    }

    if (action === "skip") {
      setHighlightedRowId(loan.loan_id);
      setEvaluatingLoan(loan);
      setEvaluationStep(4);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectLoan) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/loan/reject`,
        {
          loan_id: rejectLoan.loan_id,
        }
      );

      const updated = loanData.map((item) =>
        item.loan_id === rejectLoan.loan_id
          ? { ...item, loan_status: "rejected" }
          : item
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
        loan.applicant_fullName?.toLowerCase().includes(term) ||
        loan.kyc_code?.toLowerCase().includes(term) ||
        loan.mobileNumber?.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  };

  const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value));
  };

  const getStatusBadge = (status) => {
    const map = {
      approved: "success",
      rejected: "danger",
      pending: "warning",
    };

    const variant = map[status?.toLowerCase()] || "secondary";

    return (
      <Badge bg={variant} pill className="px-3 py-2">
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

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
    <div className="container-fluid p-4" ref={tableRef}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-secondary">
          Full Loan KYC Applications
        </h4>
      </div>

      {/* Highlight styling */}
      <style>
        {`
          .highlight-row {
            animation: highlightFade 3s ease-in-out;
            background-color: #fff3cd !important;
            border-left: 4px solid #ffc107 !important;
          }

          @keyframes highlightFade {
            0% {
              background-color: #fff3cd;
            }

            70% {
              background-color: #fff3cd;
            }

            100% {
              background-color: transparent;
            }
          }

          .loan-action-menu {
            min-width: 190px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 10px;
            padding: 6px 0;
            background: #fff;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
            z-index: 99999;
          }

          .loan-action-item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 10px 14px;
            border: 0;
            background: transparent;
            color: #333;
            text-align: left;
            font-size: 14px;
            cursor: pointer;
          }

          .loan-action-item:hover {
            background: #f5f6f8;
          }

          .loan-action-item i {
            width: 22px;
          }

          .loan-actions-button {
            min-width: 100px;
            font-weight: 500;
          }
        `}
      </style>

      {/* Filters */}
      <Row className="mb-3 align-items-end">
        <Col md={6} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by name, KYC code or phone..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-pill"
          />
        </Col>

        <Col md={3} lg={2}>
          <Form.Select
            value={entries}
            onChange={handleEntriesChange}
            className="rounded-pill"
          >
            <option value={5}>5 entries</option>
            <option value={10}>10 entries</option>
            <option value={25}>25 entries</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table Card */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table
              hover
              className="mb-0"
              style={{
                borderCollapse: "separate",
                borderSpacing: "0",
              }}
            >
              <thead
                className="bg-light"
                style={{
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                <tr>
                  <th className="fw-semibold text-muted py-3">
                    Loan ID
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    KYC Code
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    Full Name
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    Phone
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    Amount
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    Status
                  </th>

                  <th className="fw-semibold text-muted py-3">
                    Date
                  </th>

                  <th className="fw-semibold text-muted py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-muted py-5"
                    >
                      No loan applications found.
                    </td>
                  </tr>
                ) : (
                  filteredData.slice(0, entries).map((loan) => (
                    <tr
                      key={loan.applicant_id}
                      id={`loan-row-${loan.loan_id}`}
                      className={
                        highlightedRowId === loan.loan_id
                          ? "highlight-row"
                          : ""
                      }
                    >
                      <td className="py-2">
                        <strong className="text-primary">
                          WL-
                          {String(loan.loan_id).padStart(5, "0")}
                        </strong>
                      </td>

                      <td className="py-2">
                        {loan.kyc_code}
                      </td>

                      <td className="py-2">
                        {loan.applicant_fullName}
                      </td>

                      <td className="py-2">
                        {loan.mobileNumber}
                      </td>

                      <td className="py-2 fw-semibold">
                        ₵{loan.loanAmount}
                      </td>

                      <td className="py-2">
                        {getStatusBadge(loan.loan_status)}
                      </td>

                      <td className="py-2">
                        {formatDate(loan.applicant_created_at)}
                      </td>

                      <td className="py-2 text-center">
                        <ButtonGroup>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-pill px-3 loan-actions-button"
                            onClick={(event) =>
                              handleActionMenu(event, loan)
                            }
                          >
                            Actions
                            <i
                              className={`bi ms-2 ${
                                actionLoan?.loan_id === loan.loan_id &&
                                actionTarget
                                  ? "bi-chevron-up"
                                  : "bi-chevron-down"
                              }`}
                            ></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Action Menu */}
      <Overlay
        target={actionTarget}
        show={Boolean(actionTarget && actionLoan)}
        placement="auto"
        rootClose
        onHide={closeActionMenu}
      >
        {({
          placement,
          arrowProps,
          show: _show,
          popper,
          ...props
        }) => (
          <div
            {...props}
            className="loan-action-menu"
            style={{
              ...props.style,
              zIndex: 99999,
            }}
          >
            <button
              type="button"
              className="loan-action-item"
              onClick={() => handleAction("review", actionLoan)}
            >
              <i className="bi bi-eye me-2"></i>
              <span>Review</span>
            </button>

            <button
              type="button"
              className="loan-action-item"
              onClick={() => handleAction("evaluate", actionLoan)}
            >
              <i className="bi bi-clipboard-check me-2"></i>
              <span>Evaluate Loan</span>
            </button>

            <button
              type="button"
              className="loan-action-item"
              onClick={() => handleAction("skip", actionLoan)}
            >
              <i className="bi bi-fast-forward me-2"></i>
              <span>Skip Evaluation</span>
            </button>

            <button
              type="button"
              className="loan-action-item"
              onClick={() => handleAction("reject", actionLoan)}
            >
              <i className="bi bi-x-circle me-2 text-danger"></i>
              <span>Reject</span>
            </button>
          </div>
        )}
      </Overlay>

      {/* Reject Confirmation Modal */}
      <Modal
        show={showRejectModal}
        onHide={handleCancelReject}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">
            Confirm Rejection
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="py-4">
          <p className="mb-0">
            Are you sure you want to reject this loan application?
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button
            variant="light"
            onClick={handleCancelReject}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirmReject}
            className="px-4"
          >
            Yes, Reject
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Loan Details */}
      <LoanDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
        onApprove={(loan) => handleAction("approve", loan)}
        onReject={(loan) => handleAction("reject", loan)}
        onViewKyc={handleViewKyc}
      />

      {/* KYC Details */}
      <KycDetailsModal
        show={showKycModal}
        onClose={() => setShowKycModal(false)}
        kyc={selectedKyc}
      />
    </div>
  );
};

export default ApproveWebLoanApplication;