// src/components/LoanDetailsModal.jsx
import React, { useState } from "react";
import { Modal, Button, Table, ProgressBar } from "react-bootstrap";

const LoanDetailsModal = ({
  show,
  onClose,
  loan,
  onApprove,
  onReject,
  onViewKyc,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  if (!loan) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ helper to build image URL safely
  const getImageUrl = (path) => {
    if (!path) return null;

    // if already full URL
    if (path.startsWith("http")) return path;

    // otherwise prepend backend URL
    return `${process.env.REACT_APP_API_URL}/${path}`;
  };

  // ✅ image preview component
  const renderImage = (path, label) => {
    const url = getImageUrl(path);

    return url ? (
      <div>
        <img
          src={url}
          alt={label}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => window.open(url, "_blank")}
        />
      </div>
    ) : (
      "—"
    );
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Loan Application Details</Modal.Title>
      </Modal.Header>

      {/* Progress */}
      <ProgressBar
        now={(step / totalSteps) * 100}
        label={`Step ${step} of ${totalSteps}`}
        className="mb-3"
      />

      <Modal.Body>
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h5>Personal Information</h5>
            <Table bordered size="sm">
              <tbody>
                <tr><td><b>Customer ID</b></td><td>{loan.kyc_code}</td></tr>
                <tr><td><b>Name</b></td><td>{loan.applicant_fullName}</td></tr>
                <tr><td><b>Email</b></td><td>{loan.applicant_email}</td></tr>
                <tr><td><b>Phone</b></td><td>{loan.applicant_phone}</td></tr>
                <tr>
                  <td><b>DOB</b></td>
                  <td>
                    {loan.personal_dob
                      ? new Date(loan.personal_dob).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
                <tr><td><b>Gender</b></td><td>{loan.applicant_gender || "—"}</td></tr>
                <tr><td><b>National ID</b></td><td>{loan.applicant_national_id || "—"}</td></tr>
                <tr><td><b>Marital Status</b></td><td>{loan.applicant_marital_status || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h5>Loan Details</h5>
            <Table bordered size="sm">
              <tbody>
                <tr><td><b>Amount</b></td><td>₵{loan.loanAmount}</td></tr>
                <tr><td><b>Purpose</b></td><td>{loan.loanPurpose}</td></tr>
                <tr>
                  <td><b>Status</b></td>
                  <td>
                    <span className={`badge bg-${
                      loan.loan_status === "pending"
                        ? "warning"
                        : loan.loan_status === "approved"
                        ? "success"
                        : "danger"
                    }`}>
                      {loan.loan_status}
                    </span>
                  </td>
                </tr>
                <tr><td><b>Term</b></td><td>{loan.loanTerm}</td></tr>
                <tr><td><b>Monthly Payment</b></td><td>{loan.monthlyPayment}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h5>Guarantor</h5>
            <Table bordered size="sm">
              <tbody>
                <tr><td><b>Name</b></td><td>{loan.guarantorName || "—"}</td></tr>
                <tr><td><b>Phone</b></td><td>{loan.guarantorPhone || "—"}</td></tr>
                <tr><td><b>Address</b></td><td>{loan.guarantorAddress || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h5>Documents (Preview)</h5>
            <Table bordered size="sm">
              <tbody>

                <tr>
                  <td><b>Profile Picture</b></td>
                  <td>{renderImage(loan.guarantorProfilePicture, "Profile")}</td>
                </tr>

                <tr>
                  <td><b>Payslip</b></td>
                  <td>{renderImage(loan.guarantorPayslip, "Payslip")}</td>
                </tr>

                <tr>
                  <td><b>Business Picture</b></td>
                  <td>{renderImage(loan.guarantorBusinessPicture, "Business")}</td>
                </tr>

                <tr>
                  <td><b>Ghana Card Front</b></td>
                  <td>{renderImage(loan.guarantorGhanaCardFront, "Ghana Card Front")}</td>
                </tr>

                <tr>
                  <td><b>Ghana Card Back</b></td>
                  <td>{renderImage(loan.guarantorGhanaCardBack, "Ghana Card Back")}</td>
                </tr>

              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <div>
          {step > 1 && (
            <Button variant="secondary" onClick={prevStep} className="me-2">
              Previous
            </Button>
          )}
          {step < totalSteps && (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>

        <div>
          {/* Approve / Reject */}
          {loan.loan_status === "pending" && step === 2 && (
            <>
              <Button
                variant="success"
                onClick={() => {
                  onApprove(loan);
                  onClose();
                }}
                className="me-2"
              >
                Approve
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  onReject(loan);
                  onClose();
                }}
                className="me-2"
              >
                Reject
              </Button>
            </>
          )}

          {/* View KYC */}
          <Button
            variant="info"
            onClick={() => onViewKyc(loan)}
            className="me-2"
          >
            View KYC Details
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoanDetailsModal;