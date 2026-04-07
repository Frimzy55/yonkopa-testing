import React, { useState } from "react";
import LoanForm from "./CutomerLoanForm";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerApplyLoan = ({ user }) => {
  const [formData, setFormData] = useState({
    phone: "",
    kycCode: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verify");
  const [verifiedCustomer, setVerifiedCustomer] = useState(null);

  const statusMessages = {
    verified: {
      type: "success",
      title: "Verification Successful!",
      message: "Your identity has been confirmed. You may now proceed with your loan application.",
      icon: "🎉",
    },
    "not-found": {
      type: "danger",
      title: "Verification Failed",
      message: "The phone number or KYC code you entered is incorrect. Please check and try again.",
      icon: "❌",
    },
    error: {
      type: "warning",
      title: "System Error",
      message: "Unable to process your request at this time. Please try again later or contact support.",
      icon: "⚠️",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers for phone field
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/verify-customer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

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

  const handleProceed = () => {
    setStep("loan-form");
  };

  const handleReset = () => {
    setFormData({
      phone: "",
      kycCode: "",
    });
    setStatus("");
    setStep("verify");
    setVerifiedCustomer(null);
  };

  const currentStatus = statusMessages[status];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          
          {/* Progress Steps - Bootstrap styled */}
          <div className="d-flex justify-content-center align-items-center mb-5">
            <div className="text-center">
              <div className={`
                d-flex align-items-center justify-content-center rounded-circle bg-${step === 'loan-form' ? 'success' : (step === 'verify' ? 'primary' : 'secondary')} 
                text-white fw-bold mx-auto mb-2
              `} style={{ width: '40px', height: '40px' }}>
                {step === 'loan-form' ? '✓' : '1'}
              </div>
              <small className={`fw-${step === 'verify' ? 'bold' : 'normal'} text-${step === 'verify' ? 'primary' : 'secondary'}`}>
                Verify Identity
              </small>
            </div>
            <div className={`mx-3 ${step === 'loan-form' ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '80px', height: '2px' }}></div>
            <div className="text-center">
              <div className={`
                d-flex align-items-center justify-content-center rounded-circle bg-${step === 'loan-form' ? 'primary' : 'secondary'} 
                text-white fw-bold mx-auto mb-2
              `} style={{ width: '40px', height: '40px' }}>
                2
              </div>
              <small className={`fw-${step === 'loan-form' ? 'bold' : 'normal'} text-${step === 'loan-form' ? 'primary' : 'secondary'}`}>
                Loan Details
              </small>
            </div>
          </div>

          {/* Main Card */}
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-light border-0 text-center p-4">
              <h2 className="h3 mb-2">Apply for a Loan</h2>
              <p className="text-muted mb-0">Complete the verification process to access our loan products</p>
            </div>

            <div className="card-body p-4 p-md-5">
              
              {/* VERIFICATION FORM */}
              {step === "verify" && status !== "verified" && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      <span className="me-2">📱</span>Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="form-control form-control-lg rounded-3"
                      placeholder="0565656578"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      inputMode="numeric"
                    />
                    <small className="text-muted mt-1 d-block">
                      Enter the 10-digit phone number linked to your account (e.g., 0565656578)
                    </small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="kycCode" className="form-label fw-semibold">
                      <span className="me-2">🔐</span>KYC Verification Code
                    </label>
                    <input
                      id="kycCode"
                      name="kycCode"
                      type="text"
                      value={formData.kycCode}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="form-control form-control-lg rounded-3"
                      placeholder="e.g., 00001"
                    />
                    <small className="text-muted mt-1 d-block">
                      Enter the 5-digit code provided during registration
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-3 position-relative d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <span>Verify Identity</span>
                        <span className="fs-5">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* VERIFICATION SUCCESS */}
              {step === "verify" && status === "verified" && (
                <div className="text-center">
                  <div className="display-1 mb-3">✅</div>
                  <h3 className="h4 mb-2">Welcome back, {verifiedCustomer?.full_name || 'Valued Customer'}!</h3>
                  <p className="text-muted mb-4">
                    Your identity has been successfully verified. You're now ready to apply for a loan.
                  </p>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                      <div className="bg-light p-3 rounded-3">
                        <small className="text-muted d-block mb-1">Member Since</small>
                        <strong className="fs-6">
                          {new Date(verifiedCustomer?.created_at || Date.now()).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </strong>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="bg-light p-3 rounded-3">
                        <small className="text-muted d-block mb-1">KYC Status</small>
                        <span className="badge bg-success bg-opacity-10 text-success p-2">
                          Verified ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button 
                      onClick={handleProceed} 
                      className="btn btn-success btn-lg px-4 d-flex align-items-center gap-2"
                    >
                      Continue to Loan Application
                      <span className="fs-5">→</span>
                    </button>
                    <button 
                      onClick={() => setStatus("")} 
                      className="btn btn-outline-secondary btn-lg px-4"
                    >
                      ← Go Back
                    </button>
                  </div>
                </div>
              )}

              {/* STATUS MESSAGES */}
              {status && status !== "verified" && step === "verify" && currentStatus && (
                <div className={`alert alert-${currentStatus.type} d-flex align-items-start gap-3 mt-4 p-4`} role="alert">
                  <span className="fs-1">{currentStatus.icon}</span>
                  <div className="flex-grow-1">
                    <h5 className="alert-heading mb-2">{currentStatus.title}</h5>
                    <p className="mb-3">{currentStatus.message}</p>
                    {status === "not-found" && (
                      <button 
                        onClick={() => setStatus("")} 
                        className={`btn btn-outline-${currentStatus.type} btn-sm`}
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* LOAN FORM */}
              {step === "loan-form" && (
                <div className="loan-form-wrapper">
                  <LoanForm
                    user={verifiedCustomer}
                    handleReset={handleReset}
                  />
                </div>
              )}

              {/* Trust Badges */}
              {step === "verify" && status !== "verified" && (
                <div className="d-flex justify-content-center gap-4 mt-5 pt-4 border-top">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <span className="fs-5">🔒</span>
                    <span>256-bit SSL Secure</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <span className="fs-5">⚡</span>
                    <span>Instant Verification</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <span className="fs-5">🛡️</span>
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerApplyLoan;