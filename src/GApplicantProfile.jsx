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

  if (!application) return null;

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleNext = async () => {
    try {
      const formattedDate = new Date(application.applicationDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/applications/save-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanId: application.id,
            customerId: application.customerId,
            applicantName: application.applicantName,
            contactNumber: application.contactNumber,
            creditOfficer: application.creditOfficer,
            loanType: application.loanType,
            loanAmount: application.loanAmount,
            applicationDate: formattedDate,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Profile saved:", data);
        nextStep();
      } else {
        alert("Error saving profile: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Backend may not be running.");
    }
  };

  return (
    <div className="container mt-4">

      {/* ===== WIZARD HEADER ===== */}
      <div className="bg-white py-2">
        <h4>Credit Assessment</h4>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>
            Step {currentStep + 1} of {STEPS.length}
          </strong>
          <span>{STEPS[currentStep]}</span>
        </div>

        <ul className="nav nav-pills justify-content-between mb-3">
          {STEPS.map((step, index) => (
            <li className="nav-item flex-fill text-center" key={index}>
              <span
                className={`nav-link ${
                  index === currentStep ? "active" : "disabled"
                }`}
              >
                {step}
              </span>
            </li>
          ))}
        </ul>

        <hr />
      </div>

      {/* ===== STEP 1: PROFILE ===== */}
      {currentStep === 0 && (
        <div className="p-4 border rounded shadow-sm">

          <button className="btn btn-secondary mb-3 me-2" onClick={onBack}>
            ← Back to Table
          </button>

          <button className="btn btn-primary mb-3" onClick={handleNext}>
            Next →
          </button>

          <h5>Applicant Profile</h5>

          <table className="table table-bordered mt-3">
            <tbody>
              <tr>
                <th>Loan ID</th>
                <td>#{application.id}</td>
              </tr>
              <tr>
                <th>Customer ID</th>
                <td>{application.customerId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{application.applicantName}</td>
              </tr>
              <tr>
                <th>Contact Number</th>
                <td>{application.contactNumber}</td>
              </tr>
              <tr>
                <th>Credit Officer</th>
                <td>{application.creditOfficer}</td>
              </tr>
              <tr>
                <th>Loan Type</th>
                <td>{application.loanType}</td>
              </tr>
              <tr>
                <th>Loan Amount</th>
                <td>₵{Number(application.loanAmount).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Application Date</th>
                <td>{application.applicationDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ===== STEP 2 ===== */}
      {currentStep === 1 && (
        <CollateralDetailsWindow
          application={application}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {/* ===== STEP 3 ===== */}
      {currentStep === 2 && (
        <AssessmentWindow
          application={application}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {/* ===== STEP 4 ===== */}
      {currentStep === 3 && (
        <GComments
          application={application}
          onBack={prevStep}
          onSubmit={() => {
            alert("Assessment submitted successfully!");
            onBack(); // return to table
          }}
        />
      )}
    </div>
  );
};

export default ApplicantProfile;