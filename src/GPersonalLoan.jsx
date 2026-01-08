import React, { useState } from "react";
import LoanForm from "./CutomerLoanForm"; // ⬅ IMPORTED HERE

const CustomerApplyLoan = ({onBack}) => {
  const [formData, setFormData] = useState({
    phone: "",
    kycCode: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verify");

  const statusMessages = {
    verified: {
      type: "success",
      message: "✔ Your details have been VERIFIED.",
      color: "green"
    },
    "not-found": {
      type: "error",
      message: "✖ Invalid phone number or KYC code.",
      color: "red"
    },
    error: {
      type: "warning",
      message: "⚠ Server error. Please try again later.",
      color: "orange"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/verify-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setStatus(data.verified ? "verified" : "not-found");

    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => setStep("loan-form");

  const handleReset = () => {
    setFormData({ phone: "", kycCode: "" });
    setStatus("");
    setStep("verify");
  };

  const currentStatus = statusMessages[status];

  return (
    <div className="content-section">
      <div className="loan-application-header">
        <h2 className="section-title">Apply for Loan</h2>
        <p className="section-description">
          Please enter your phone number and KYC code to proceed.
        </p>
      </div>

      {/* VERIFICATION FORM */}
      {step === "verify" && status !== "verified" && (
        <form onSubmit={handleSubmit} className="loan-form">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="kycCode" className="form-label">KYC Code</label>
            <input
              id="kycCode"
              name="kycCode"
              type="text"
              placeholder="Enter KYC code"
              value={formData.kycCode}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`}>
            {loading ? "Verifying..." : "Verify Details"}
          </button>
        </form>
      )}

      {/* SUCCESS MESSAGE */}
      {step === "verify" && status === "verified" && (
        <div className="verification-success">
          <div className="success-icon">✅</div>
          <h3>Verification Successful!</h3>
          <p>You can now proceed with your loan application.</p>

          <div className="action-buttons">
            <button onClick={handleProceed} className="proceed-btn">
              Proceed to Loan Application
            </button>
            <button onClick={handleReset} className="reset-btn">
              Verify Another Customer
            </button>
          </div>
        </div>
      )}

      {/* ERROR MESSAGES */}
      {status && status !== "verified" && step === "verify" && currentStatus && (
        <div
          className={`status-message status-${currentStatus.type}`}
          style={{ color: currentStatus.color, marginTop: "20px" }}
        >
          {currentStatus.message}
        </div>
      )}


        <button className="btn btn-outline-secondary" onClick={onBack}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>

      {/* SHOW LOAN FORM PAGE */}
      {step === "loan-form" && <LoanForm handleReset={handleReset} />}
    </div>
  );
};

export default CustomerApplyLoan;
