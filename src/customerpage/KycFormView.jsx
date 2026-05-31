// KycFormView.js
import React, { useState } from "react";
import { FaCheckCircle, FaCopy, FaCheck } from "react-icons/fa";

const KycFormView = ({
  checkingKyc,
  hasKyc,
  submitted,
  formData,
  renderPreview,
  renderStep,
  checkingNationalId,
  formErrors,
  currentStep,
  prevStep,
  nextStep,
  submitting,
  nationalIdAvailable,
  submitMessage,
  handleFinalSubmit,
  StepCards,
  onContinueToLoan,      // optional – if provided, will be called when button is clicked
}) => {
  // State for copy feedback
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyKycCode = () => {
    if (formData.kycCode) {
      navigator.clipboard.writeText(formData.kycCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Helper to get the contact value (email or phone)
  const getContactValue = () => {
    if (formData.email && formData.email.trim() !== "") {
      return { label: "Email Address", value: formData.email };
    } else if (formData.mobileNumber && formData.mobileNumber.trim() !== "") {
      return { label: "Phone Number", value: formData.mobileNumber };
    }
    return { label: "Contact", value: "Not provided" };
  };

  const contact = getContactValue();

  // Default handler when onContinueToLoan is not provided
  const handleContinueToLoan = () => {
    if (onContinueToLoan) {
      onContinueToLoan();
    } else {
      // 🔁 Replace this default action with your own navigation logic
      console.log("Continue to Apply Loan clicked – no handler provided");
      // Example: window.location.href = "/apply-loan";
      // Or if using React Router: navigate("/apply-loan");
    }
  };

  return (
    <div className="content-section">
      <h2>KYC Forms</h2>

      {checkingKyc ? (
        <p>Loading...</p>
      ) : hasKyc ? (
        <div className="kyc-preview">
          <div className="kyc-card">
            {/* Header Section */}
            <div className="kyc-header">
              <div className="kyc-icon">
                <FaCheckCircle size={48} style={{ color: "#2ecc71" }} />
              </div>
              <h3>KYC Submitted</h3>
              <p className="kyc-subtitle">
                Your identity verification has been completed successfully.
              </p>
            </div>


            <div className="kyc-action-buttons" style={{ marginTop: "24px", textAlign: "center" }}>
              <button
                type="button"
                className="btn-crazy btn-crazy-primary"
                onClick={handleContinueToLoan}
              >
               Apply For Loan
              </button>
            </div>

            {/* Professional KYC Code Section with Copy Button */}
            <div className="kyc-code-section">
              <div className="kyc-code-box professional">
                <span className="kyc-code-label">KYC Code</span>
                <div className="kyc-code-value-wrapper">
                  <span className="kyc-code-value">
                    {formData.kycCode || "—————"}
                  </span>
                  {formData.kycCode && (
                    <button
                      type="button"
                      className="copy-code-btn"
                      onClick={handleCopyKycCode}
                      title="Copy KYC code"
                    >
                      {copySuccess ? (
                        <>
                          <FaCheck size={14} /> Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy size={14} /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="kyc-info-section">
              <h4 className="section-title">Personal Information</h4>

              <div className="kyc-items-grid">
                <div className="kyc-item">
                  <div className="kyc-label">Full Name</div>
                  <div className="kyc-value">
                    {formData.title} {formData.firstName} {formData.middleName}{" "}
                    {formData.lastName}
                  </div>
                </div>

                {/* Conditional contact display: email if present, else phone */}
                <div className="kyc-item">
                  <div className="kyc-label">{contact.label}</div>
                  <div className="kyc-value">{contact.value}</div>
                </div>
              </div>
            </div>

            {/* Continue to Apply Loan Button – always visible */}
            
          </div>
        </div>
      ) : submitted ? (
        renderPreview()
      ) : (
        <>
          <StepCards />
          <form className="kyc-form" onSubmit={handleFinalSubmit}>
            {renderStep()}

            {checkingNationalId && (
              <div className="national-id-checking">
                <span className="spinner-small"></span>
                Verifying National ID...
              </div>
            )}

            {Object.keys(formErrors).length > 0 && (
              <div className="error-summary">
                <h4>Please fix the following errors:</h4>
                <ul>
                  {Object.values(formErrors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="form-navigation mt-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-crazy btn-crazy-secondary"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-crazy btn-crazy-primary"
                  disabled={
                    checkingNationalId ||
                    !nationalIdAvailable ||
                    !!formErrors.nationalId
                  }
                >
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <button
                  type="submit"
                  disabled={submitting || !nationalIdAvailable}
                  className="btn-crazy btn-crazy-success"
                >
                  {submitting ? "Submitting..." : "Submit KYC"}
                </button>
              )}
            </div>

            {submitMessage && (
              <div
                className={`alert alert-${
                  submitMessage.type === "success" ? "success" : "danger"
                } mt-3`}
              >
                {submitMessage.text}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default KycFormView;