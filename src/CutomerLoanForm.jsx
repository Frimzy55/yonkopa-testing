
// src/pages/CustomerDashboard/CutomerLoanForm.jsx

import React, { useState, useEffect } from "react";
import ApplicantDetails from "./CustomerApplicantDetails";
import LoanDetails from "./CustomerLoanDetails";
import GuarantorInfo from "./CustomerGuarantorInfo";
import "./LoanForm.css";

const CutomerLoanForm = ({ user, handleReset }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // =========================
    // APPLICANT DETAILS
    // =========================
    fullName: "",
    phone: "",
    email: "",
    kycCode: "",
    dob: "",
    gender: "",
    nationalId: "",
    maritalStatus: "",
    dependents: "",
    residentialAddress: "",
    residentialGPS: "",
    employmentStatus: "",

    // =========================
    // LOAN DETAILS
    // =========================
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    repaymentFrequency: "",
    ratePerAnnum: "",

    // =========================
    // LOAN SUMMARY
    // =========================
    interest: 0,
    totalInterest: 0,
    numberOfPayments: 0,
    monthlyPayment: 0,
    loanFees: 0,

    // =========================
    // GUARANTOR DETAILS
    // =========================
    guarantorProfilePicture: null,

    guarantorName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorResidenceLocation: "",
    guarantorIdNumber: "",

    guarantorEmployeeType: "",

    // Salary Worker
    guarantorRank: "",
    guarantorWorkLocation: "",
    guarantorNameOfEmployer: "",
    guarantorYearsInService: "",
    guarantorPayslip: null,

    // Self Employed
    guarantorBusinessName: "",
    guarantorBusinessLocation: "",
    guarantorYearsInBusiness: "",
    guarantorBusinessPicture: null,

    // Documents
    guarantorGhanaCardFront: null,
    guarantorGhanaCardBack: null,
  });

  // =========================
  // PREFILL USER DATA
  // =========================
  useEffect(() => {
    if (!user) return;

    const fullName =
      user.fullName ||
      user.fullname ||
      (user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "");

    const phone = user.phone || user.mobileNumber || "";

    let dob = "";
    if (user.dob || user.dateOfBirth) {
      const date = new Date(user.dob || user.dateOfBirth);
      dob = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
    }

    setFormData((prev) => ({
      ...prev,
      fullName,
      phone,
      dob,
      kycCode: user.kyc_code || "",
      email: user.email || "",
      nationalId: user.nationalId || "",
      employmentStatus: user.employmentStatus || "",
    }));
  }, [user]);

  // =========================
  // STEPS
  // =========================
  const steps = [
    { number: 1,title: "" },
    { number: 2, title: "Loan Details" },
    { number: 3, title: "Guarantor Info" },
  ];

  // =========================
  // INPUT HANDLER
  // =========================
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // =========================
  // STEP NAVIGATION
  // =========================
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // =========================
  // FORM SUBMISSION
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formPayload.append(key, formData[key]);
        }
      });

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/apply-loan`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Loan application submitted successfully!");
        if (handleReset) handleReset();
      } else {
        alert("Failed to submit loan application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error. Please try again.");
    }
  };

  // =========================
  // PROGRESS BAR
  // =========================
  const progressPercentage =
    ((currentStep - 1) / (steps.length - 1)) * 100;

  // =========================
  // RENDER STEP
  // =========================
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ApplicantDetails
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );

      case 2:
        return (
          <LoanDetails
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );

      case 3:
        return (
          <GuarantorInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-section">
      <h2>Loan Application</h2>

      {/* Progress Section */}
      <div className="progress-section">

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="step-indicators">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step-indicator 
              ${currentStep >= step.number ? "active" : ""} 
              ${currentStep === step.number ? "current" : ""}`}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        <div className="progress-text">
          Step {currentStep} of {steps.length} —{" "}
          {steps[currentStep - 1]?.title}
          <span className="progress-percentage">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="loan-form">

        {renderStep()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn-prev"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-next"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn-submit"
            >
              Submit Application
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default CutomerLoanForm;

