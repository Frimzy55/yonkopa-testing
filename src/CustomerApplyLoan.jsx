import React, { useState, useEffect } from "react";
import LoanForm from "./CutomerLoanForm";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerApplyLoan = ({ user }) => {
  const [formData, setFormData] = useState({ phone: "", kycCode: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verify");
  const [verifiedCustomer, setVerifiedCustomer] = useState(null);

  // Autofill phone number on component mount
  useEffect(() => {
    if (user?.phone) {
      setFormData((prev) => ({ ...prev, phone: user.phone }));
    }
  }, [user]);

  const statusMessages = {
    verified: { type: "success", message: "✔ Your details have been VERIFIED." },
    "not-found": { type: "danger", message: "✖ Invalid phone number or KYC code." },
    error: { type: "warning", message: "⚠ Server error. Please try again later." },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      if (data.verified) {
        setVerifiedCustomer(data.customer);
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
    setFormData({ phone: user?.phone || "", kycCode: "" }); // Reset keeps autofill
    setStatus("");
    setStep("verify");
    setVerifiedCustomer(null);
  };

  const currentStatus = statusMessages[status];

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Apply for Loan</h2>
          <p className="text-center text-muted mb-4">
            Enter your phone number and KYC code to proceed.
          </p>

          {/* Verification Form */}
          {step === "verify" && status !== "verified" && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label  hidden className="form-label">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading} // Optional: keep disabled if you don't want edits
                  className="form-control"
                  placeholder="e.g. 0551234567"
                  readOnly
                  hidden
                  
                />
              </div>

              <div className="mb-3">
                <label className="form-label">KYC Code</label>
                <input
                  name="kycCode"
                  type="text"
                  value={formData.kycCode}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="form-control"
                  placeholder="e.g. 00001"
                />
              </div>
                {/* Message for user */}
  <small className="text-muted">
    Please check your notifications to find your KYC verification code.
  </small>

              <button type="submit" className="btn btn-primary w-100">
                {loading ? "Verifying..." : "Verify Details"}
              </button>
            </form>
          )}

  {/* Verification Success */}
{step === "verify" && status === "verified" && (
  <div className="text-center mt-4">
    <div className="display-4 text-success mb-3">✅</div>
    <h4 className="text-success mb-2">Verification Successful!</h4>
    <p>You can now proceed with your loan application.</p>

    <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
      <button onClick={handleProceed} className="btn btn-success">
        Proceed to Loan Application
      </button>
      <button
        onClick={() => setStatus("")} // Reset status to go back to form
        className="btn btn-secondary"
      >
        Back
      </button>
    </div>
  </div>
)}

          {/* Status Messages */}
          {status && status !== "verified" && step === "verify" && currentStatus && (
            <div className={`alert alert-${currentStatus.type} mt-3`} role="alert">
              {currentStatus.message}
            </div>
          )}

          {/* Loan Form */}
          {step === "loan-form" && (
            <LoanForm user={verifiedCustomer} handleReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerApplyLoan;  