// src/components/LoanDetailsModal.jsx
import React, { useState } from "react";
import { Modal, Button, Table, ProgressBar } from "react-bootstrap";

const LoanDetailsModal = ({ show, onClose, loan, onApprove, onReject, onViewKyc }) => {
  const [step, setStep] = useState(1); // 1 = Personal, 2 = Loan, 3 = Guarantor, 4 = Documents
  const totalSteps = 4;

  if (!loan) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Loan Application Details</Modal.Title>
      </Modal.Header>

      {/* Step Progress Bar */}
      <ProgressBar now={(step / totalSteps) * 100} label={`Step ${step} of ${totalSteps}`} className="mb-3" />

      <Modal.Body>
        {/* Step 1: Personal Information */}
       {/* Step 1: Personal Information */}
{step === 1 && (
  <>
    <h5>Personal Information</h5>
    <Table bordered size="sm" className="mb-4">
      <tbody>
        <tr>
          <td style={{ width: "30%", fontWeight: "bold" }}>Customer ID:</td>
          <td>{loan.kyc_code}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Full Name:</td>
          <td>{loan.applicant_fullName}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Email:</td>
          <td>{loan.applicant_email}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Phone:</td>
          <td>{loan.applicant_phone}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Date of Birth:</td>
          <td>{loan.personal_dob ? new Date(loan.applicant_dob).toLocaleDateString() : "—"}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Gender:</td>
          <td>{loan.applicant_gender || "—"}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>National ID:</td>
          <td>{loan.applicant_national_id || "—"}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Marital Status:</td>
          <td>{loan.applicant_marital_status || "—"}</td>
        </tr>
      </tbody>
    </Table>
  </>
)}
        {/* Step 2: Loan Details */}
        {step === 2 && (
          <>
            <h5>Loan Details</h5>
            <Table bordered size="sm" className="mb-4">
              <tbody>
                <tr>
                  <td style={{ width: "30%", fontWeight: "bold" }}>Loan Amount:</td>
                  <td>₵{loan.loanAmount}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Loan Purpose:</td>
                  <td>{loan.loanPurpose}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Loan Status:</td>
                  <td>
                    <span
                      className={`badge bg-${
                        loan.loan_status === "pending"
                          ? "warning"
                          : loan.loan_status === "approved"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {loan.loan_status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Loan Term (months):</td>
                  <td>{loan.loanTerm}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Repayment Frequency:</td>
                  <td>{loan.repaymentFrequency}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Rate per Annum (%):</td>
                  <td>{Number(loan.ratePerAnnum)?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Interest (₵):</td>
                  <td>{Number(loan.interest)?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Total Interest (₵):</td>
                  <td>{Number(loan.totalInterest)?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Monthly Payment (₵):</td>
                  <td>{Number(loan.monthlyPayment)?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Loan Fees (₵):</td>
                  <td>{Number(loan.loanFees)?.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {/* Step 3: Guarantor Info */}
        {step === 3 && (
          <>
            <h5>Guarantor Information</h5>
            <Table bordered size="sm" className="mb-4">
              <tbody>
                <tr>
                  <td style={{ width: "30%", fontWeight: "bold" }}>Guarantor Name:</td>
                  <td>{loan.guarantorName || "—"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Guarantor Phone:</td>
                  <td>{loan.guarantorPhone || "—"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Guarantor Address:</td>
                  <td>{loan.guarantorAddress || "—"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Residence Location:</td>
                  <td>{loan.guarantorResidenceLocation || "—"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>ID Number:</td>
                  <td>{loan.guarantorIdNumber || "—"}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {/* Step 4: Documents */}
        {step === 4 && (
          <>
            <h5>Guarantor Documents</h5>
            <Table bordered size="sm">
              <tbody>
                <tr>
                  <td style={{ width: "30%", fontWeight: "bold" }}>Profile Picture:</td>
                  <td>
                    {loan.guarantorProfilePicture ? (
                      <a href={loan.guarantorProfilePicture} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    ) : "—"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Payslip:</td>
                  <td>
                    {loan.guarantorPayslip ? (
                      <a href={loan.guarantorPayslip} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    ) : "—"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Business Picture:</td>
                  <td>
                    {loan.guarantorBusinessPicture ? (
                      <a href={loan.guarantorBusinessPicture} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    ) : "—"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Ghana Card (Front):</td>
                  <td>
                    {loan.guarantorGhanaCardFront ? (
                      <a href={loan.guarantorGhanaCardFront} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    ) : "—"}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Ghana Card (Back):</td>
                  <td>
                    {loan.guarantorGhanaCardBack ? (
                      <a href={loan.guarantorGhanaCardBack} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    ) : "—"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between w-100">
        <div>
          {step > 1 && <Button variant="secondary" onClick={prevStep} className="me-2">Previous</Button>}
          {step < totalSteps && <Button variant="primary" onClick={nextStep}>Next</Button>}
        </div>
        <div>
          {loan.loan_status === "pending" && step === 2 && (
            <>
              <Button variant="success" onClick={() => { onApprove(loan); onClose(); }} className="me-2">
                Approve
              </Button>
              <Button variant="danger" onClick={() => { onReject(loan); onClose(); }} className="me-2">
                Reject
              </Button>
            </>
          )}

          {/* View KYC button */}
          <Button variant="info" onClick={() => onViewKyc(loan)} className="me-2">
            View KYC Details
          </Button>

          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoanDetailsModal;