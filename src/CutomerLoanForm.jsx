// src/pages/CustomerDashboard/CutomerLoanForm.jsx

import React, { useState, useEffect } from "react";
import ApplicantDetails from "./CustomerApplicantDetails";
import LoanDetails from "./CustomerLoanDetails";
import GuarantorInfo from "./CustomerGuarantorInfo";
import CustomerMomoDetails from "./CustomerMomoDetails";
import "./LoanForm.css";

const CutomerLoanForm = ({ user, handleReset }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId:"",
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

    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    repaymentFrequency: "",
    ratePerAnnum: "",

    interest: "",
    totalInterest: "",
    numberOfPayments: "",
    monthlyPayment: "",
    loanFees: "",

    guarantorProfilePicture: null,
    guarantorName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorResidenceLocation: "",
    guarantorIdNumber: "",
    guarantorEmployeeType: "",

    guarantorRank: "",
    guarantorWorkLocation: "",
    guarantorNameOfEmployer: "",
    guarantorYearsInService: "",
    guarantorPayslip: null,

    guarantorBusinessName: "",
    guarantorBusinessLocation: "",
    guarantorYearsInBusiness: "",
    guarantorBusinessPicture: null,

    guarantorGhanaCardFront: null,
    guarantorGhanaCardBack: null,

    momoProvider: "",
    momoNumber: "",
    momoAccountName: "",
  });

  // PREFILL USER DATA
  useEffect(() => {
    if (!user) return;

    const fullName =
      user.fullName ||
      user.fullname ||
      (user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : "");

    const phone = user.phone || user.mobileNumber || "";
    // const userId = user.userId || user.userId || "";

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
      kycCode: user.kycCode || "",
       userId: user.userId || "",
      email: user.email || "",
      nationalId: user.nationalId || "",
      employmentStatus: user.employmentStatus || "",
      maritalStatus: user.maritalStatus || "",
    }));
  }, [user]);

  const steps = [
    { number: 1, title: "" },
    { number: 2, title: "Loan Details" },
    { number: 3, title: "Guarantor Info" },
    { number: 4, title: "Momo Details" },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = (e) => {
    if (e) e.preventDefault();
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // ✅ SUBMIT WITH ALERT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

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
        alert("✅ Loan application submitted successfully!");

        if (handleReset) handleReset();
      } else {
        alert("❌ Failed to submit loan application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage =
    ((currentStep - 1) / (steps.length - 1)) * 100;

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

      case 4:
        return (
          <CustomerMomoDetails
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

      {/* LOADING */}
      {isSubmitting && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="spinner"></div>
            <h5>Submitting your loan application...</h5>
            <p>Please wait...</p>
          </div>
        </div>
      )}

      {/* PROGRESS */}
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
          Step {currentStep} of {steps.length}
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
            <button type="button" onClick={prevStep} className="btn-prev">
              Previous
            </button>
          )}

          {currentStep < steps.length ? (
            <button type="button" onClick={nextStep} className="btn-next">
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
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