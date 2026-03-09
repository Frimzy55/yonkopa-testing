import React, { useState } from "react";
import CollateralDetailsWindow from "./GCollateralDetailsWindow";
import AssessmentWindow from "./GAssessmentWindow";
import GComments from "./GComments";

const STEPS = [
  "Applicant Profile",
  "Collateral Details",
  "Borrower Credit",
  "Comments",
];

const ApplicantProfile = ({ application, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // ✅ Collect data from all steps here
  const [formData, setFormData] = useState({
    applicantProfile: {
      loanId: application?.id || "",
      customerId: application?.customerId || "",
      applicantName: application?.applicantName || "",
      contactNumber: application?.contactNumber || "",
       idNumber: application?.idNumber || "",
      creditOfficer: application?.creditOfficer || "",
      loanType: application?.loanType || "",
      loanAmount: application?.loanAmount || "",
      applicationDate: application?.applicationDate || "",
       email: application?.email|| "",
    },
    collateralDetails: {},
    borrowerCredit: {},
    comments: {},
  });

  if (!application) return null;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // ✅ Submit all steps at once
 const handleSubmitAll = async () => {
  try {
    const formattedDate = new Date(formData.applicantProfile.applicationDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const payload = {
      ...formData.applicantProfile,
      applicationDate: formattedDate,
      ...formData.collateralDetails,
      ...formData.borrowerCredit,
      ...formData.comments,
    };

    // 1️⃣ Submit all steps to the backend
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/applications/submit-all`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("All steps submitted successfully!");

      // 2️⃣ Delete the corresponding loan from the 'loans' table
      const deleteResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loans/delete/${formData.applicantProfile.loanId}`,
        {
          method: "DELETE",
        }
      );

      if (deleteResponse.ok) {
       // alert("Loan record deleted successfully!");
      } else {
        const delData = await deleteResponse.json();
        alert("Error deleting loan: " + delData.message);
      }

      onBack(); // go back to table
    } else {
      alert("Error submitting: " + data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Network error. Backend may not be running.");
  }
};
  return (
    <div className="container mt-4">
      <div className="bg-white py-2">
        <h4>Credit Assessment</h4>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>Step {currentStep + 1} of {STEPS.length}</strong>
          <span>{STEPS[currentStep]}</span>
        </div>

        <ul className="nav nav-pills justify-content-between mb-3">
          {STEPS.map((step, index) => (
            <li className="nav-item flex-fill text-center" key={index}>
              <span className={`nav-link ${index === currentStep ? "active" : "disabled"}`}>
                {step}
              </span>
            </li>
          ))}
        </ul>

        <hr />
      </div>

      {/* ===== STEP CONTENT ===== */}
      {currentStep === 0 && (
        <div className="p-4 border rounded shadow-sm">
          <button className="btn btn-secondary mb-3 me-2" onClick={onBack}>
            ← Back to Table
          </button>
          <button className="btn btn-primary mb-3" onClick={nextStep}>
            Next → 
          </button>

          <h5>Applicant Profile</h5>
          <table className="table table-bordered mt-3">
            <tbody>
              <tr>
                <th>Loan ID</th>
                <td>#{formData.applicantProfile.loanId}</td>
              </tr>
              <tr>
                <th>Customer ID</th>
                <td>{formData.applicantProfile.customerId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{formData.applicantProfile.applicantName}</td>
              </tr>
              <tr>
                <th>Contact Number</th>
                <td>{formData.applicantProfile.contactNumber}</td>
              </tr>
               <tr>
                <th>ID Number</th>
                <td>{formData.applicantProfile.idNumber}</td>
              </tr>
              <tr>
                <th>Credit Officer</th>
                <td>{formData.applicantProfile.creditOfficer}</td>
              </tr>
              <tr>
                <th>Loan Type</th>
                <td>{formData.applicantProfile.loanType}</td>
              </tr>
              <tr>
                <th>Loan Amount</th>
                <td>₵{Number(formData.applicantProfile.loanAmount).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Application Date</th>
                <td>{formData.applicantProfile.applicationDate}</td>
              </tr>
               <tr>
                <th>Email</th>
                <td>{formData.applicantProfile.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {currentStep === 1 && (
        <CollateralDetailsWindow
          application={application}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <AssessmentWindow
          application={application}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {currentStep === 3 && (
        <GComments
          application={application}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
          onSubmit={handleSubmitAll} // ✅ submit all
        />
      )}

      {/* Optional: global "Submit All" button visible on last step */}
      {currentStep === 3 && (
        <div className="mt-3">
          <button className="btn btn-success" onClick={handleSubmitAll}>
            Submit All Steps
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;