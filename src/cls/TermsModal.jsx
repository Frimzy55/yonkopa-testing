import React from "react";

const TermsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1060 }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4"
        style={{ width: "520px", maxWidth: "90%", maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-semibold">Terms and Conditions</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="terms-content" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
          <h5 className="mt-3">1. Acceptance of Terms</h5>
          <p className="text-muted">
            By creating an account, you agree to comply with and be bound by these Terms and Conditions.
          </p>

          <h5 className="mt-3">2. Account Registration</h5>
          <p className="text-muted">
            You must provide accurate and complete information when creating your account.
          </p>

          <h5 className="mt-3">3. User Conduct</h5>
          <p className="text-muted">
            You agree not to misuse the service or engage in unlawful activities.
          </p>

          <h5 className="mt-3">4. Privacy Policy</h5>
          <p className="text-muted">
            Please review our Privacy Policy to understand how your data is used.
          </p>

          <h5 className="mt-3">5. Loan Terms</h5>
          <p className="text-muted">
            Loans are subject to approval and terms may vary based on eligibility.
          </p>

          <h5 className="mt-3">6. Termination</h5>
          <p className="text-muted">
            We may suspend or terminate accounts that violate our terms.
          </p>

          <h5 className="mt-3">7. Changes to Terms</h5>
          <p className="text-muted">
            We may update these terms at any time without prior notice.
          </p>

          <h5 className="mt-3">8. Contact</h5>
          <p className="text-muted">
            Contact us at <a href="mailto:support@yonkopa.com">support@yonkopa.com</a>
          </p>
        </div>

        <div className="mt-4">
          <button className="btn btn-primary w-100 rounded-pill" onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;