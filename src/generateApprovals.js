const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "src/my-approvals");

// create folder if not exists
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

const files = [
  "ApproveUserCreation",
  "ApproveUserEdit",
  "ApproveRoleCreation",
  "ApproveRoleEdit",
  "ApproveUserRole",
  "ApproveUserToRoleEdit",
  "ApproveUserPermissions",
  "ApproveRoleAssignment",
  "ApproveTellerLimit",
  "ApproveLoanThreshold",
  "ApproveNewLoanProduct",
  "ApproveLoanProductEdit",
  "ApproveNewBranch",
  "ApproveBranchEdit",
  "ApproveNewCustomer",
  "ApproveCustomerMaintenance",
  "ApproveROAssigning",
  "ApproveBatchUpload",
  "ApproveNewAccounts",
  "ApproveAccountMaintenance",
  "ApproveLien",
  "ApproveWebLoanApplication",
  "ApproveNewIndividualLoan",
  "ApproveCorporateLoan",
  "ApproveGroupLoan",
  "ApproveLoanMaintenance",
  "ApproveLoanDisbursement",
  "ApproveDailyCollections",
  "ApproveTillTransfer",
  "ApproveBackdatedTillTransfer",
  "ApproveCashDepositReversal",
  "ApproveCashWithdrawalReversal",
  "ApproveTellerShortageOverage",
  "ApproveGLAccountCreation",
  "ApproveGLAccountEdit",
  "ApproveInternalTransfers",
  "ApproveManualGLPostings",
  "ApproveCustomerUpload",
  "ApproveAccountUpload",
  "ApproveLoanUpload",
  "ApproveDisbursementUpload",
  "ApproveRepaymentUpload",
  "ApproveChargesUpload",
  "ApproveGLAdjustments",
  "ApproveBranchReassignment",
  "ApproveROReassignment",
  "ApprovePictureUploads",
  "ApproveIDUploads"
];

files.forEach((file) => {
  const content = `
import React from "react";

const ${file} = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>${file.replace(/([A-Z])/g, " $1")}</h2>
      <p>This is the ${file} page.</p>
    </div>
  );
};

export default ${file};
`;

  fs.writeFileSync(path.join(folder, `${file}.jsx`), content.trim());
});

console.log("✅ All approval files created successfully!");