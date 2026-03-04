import React, { useState } from "react";
import LoanForm from "./CutomerLoanForm"; // ⬅ KEEP YOUR IMPORT

const CustomerApplyLoan = () => {
  const [formData, setFormData] = useState({
    phone: "",
    kycCode: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verify");

  // ✅ NEW: store verified customer
  const [verifiedCustomer, setVerifiedCustomer] = useState(null);

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
      //const response = await fetch("http://localhost:5000/api/verify-customer", {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-customer`, {
      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (data.verified) {
        setVerifiedCustomer(data.customer); // ✅ SAVE CUSTOMER DATA
        setStatus("verified");
      } else {
        setStatus("not-found");
      }

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
    setVerifiedCustomer(null); // ✅ CLEAR CUSTOMER
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
            <label className="form-label">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">KYC Code</label>
            <input
              name="kycCode"
              type="text"
              value={formData.kycCode}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">
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

      {/* ERROR MESSAGE */}
      {status && status !== "verified" && step === "verify" && currentStatus && (
        <div style={{ color: currentStatus.color, marginTop: "20px" }}>
          {currentStatus.message}
        </div>
      )}

      {/* LOAN FORM WITH AUTOFILL */}
      {step === "loan-form" && (
        <LoanForm user={verifiedCustomer} handleReset={handleReset} />
      )}
    </div>
  );
};

export default CustomerApplyLoan;
