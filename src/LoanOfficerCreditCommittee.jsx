import React, { useState } from "react";
import CreditCommitteeWizard from "./LoanOfficerCreditCommitteeWizard";

const LoanOfficerCreditCommittee = () => {

  const [showWizard, setShowWizard] = useState(false);

  const handlePendingApprovals = () => {
    setShowWizard(true);
  };

  const handleApproveFiles = () => {
    alert("Approve files clicked");
  };

  return (

    <div className="content-section">

      <h2>Credit Committee</h2>

      {/* Buttons */}
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

      {/* Wizard Component */}
      {showWizard && (
        <CreditCommitteeWizard
          onFinish={() => setShowWizard(false)}
        />
      )}

    </div>

  );
};

export default LoanOfficerCreditCommittee;