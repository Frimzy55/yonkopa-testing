import React, { useState } from "react";

const LoanOfficerCreditCommittee = () => {
  const [showWizard, setShowWizard] = useState(false); // Show/hide wizard
  const [currentStep, setCurrentStep] = useState(1); // Track step (1-5)

  const handlePendingApprovals = () => {
    setShowWizard(true); // Open wizard
    setCurrentStep(1);   // Start from step 1
  };

  const handleApproveFiles = () => {
    alert("Approve files clicked");
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const closeWizard = () => {
    setShowWizard(false);
  };

  return (
    <div className="content-section">
      <h2>Credit Committee</h2>

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

      {/* WIZARD MODAL */}
      {showWizard && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="bg-white rounded p-4"
            style={{ width: "90%", maxWidth: "600px" }}
          >
            <h4>Pending Approvals - Step {currentStep} of 5</h4>
            <div style={{ minHeight: "150px", margin: "1rem 0" }}>
              {/* Example content per step */}
              <p>Content for step {currentStep}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <button className="btn btn-success" onClick={closeWizard}>
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOfficerCreditCommittee;