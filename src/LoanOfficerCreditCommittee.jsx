import React, { useState } from "react";

const LoanOfficerCreditCommittee = () => {
  const [showWizard, setShowWizard] = useState(false); // Show/hide wizard
  const [currentStep, setCurrentStep] = useState(1); // Track step (1-5)

  const handlePendingApprovals = () => {
    setShowWizard(true);
    setCurrentStep(1);
  };

  const handleApproveFiles = () => {
    alert("Approve files clicked");
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="content-section">
      <h2>Credit Committee</h2>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          className="btn btn-primary"
          style={{ flex: 1, padding: "1rem", fontSize: "1rem" }}
          onClick={handlePendingApprovals}
        >
          Pending Approvals
        </button>

        <button
          className="btn btn-primary"
          style={{ flex: 1, padding: "1rem", fontSize: "1rem" }}
          onClick={handleApproveFiles}
        >
          Approve Files
        </button>
      </div>

      {/* INLINE WIZARD */}
      {showWizard && (
        <div className="wizard-section border p-4 rounded shadow-sm">
          {/* Step Indicator */}
          <div className="d-flex justify-content-between mb-3">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: currentStep === step ? "#0d6efd" : "#ccc",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div style={{ minHeight: "150px" }}>
            <h5>Step {currentStep}</h5>
            <p>
              {/* Replace this with real content like approval forms */}
              Content for step {currentStep} of 5
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 5 ? (
              <button className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => setShowWizard(false)}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOfficerCreditCommittee;