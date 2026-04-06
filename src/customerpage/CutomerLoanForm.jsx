// src/pages/CustomerDashboard/CustomerLoanForm.jsx
import React, { useState, useEffect } from "react";
import ApplicantDetails from "./CustomerApplicantDetails";
import LoanDetails from "./CustomerLoanDetails";
import GuarantorInfo from "./CustomerGuarantorInfo";
import CustomerMomoDetails from "./CustomerMomoDetails";
import "./LoanForm.css";

const CustomerLoanForm = ({ user, handleReset }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    phone: "",
    email: "",
    kycCode: "",
    dateofbirth:"",// Must be a valid date or null
    gender: "",
    nationalid: "",
    maritalstatus: "",
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

 // src/pages/CustomerDashboard/CustomerLoanForm.jsx
useEffect(() => {
  if (!user?.userId) return;

  const fetchKyc = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/kyc-view/${user.userId}`);
      const data = await res.json();

      if (data.success && data.data) {
        const kyc = data.data;
        const fullName = kyc.fullName || `${kyc.firstname || ""} ${kyc.lastname || ""}`.trim();

        // Format dob safely for <input type="date">
        let dobFormatted = "";
        if (kyc.dateofbirth) {
          // Try parsing as Date first
          const dateObj = new Date(kyc.dateofbirth);
          if (!isNaN(dateObj)) {
            const yyyy = dateObj.getFullYear();
            const mm = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
            const dd = String(dateObj.getDate()).padStart(2, "0");
            dobFormatted = `${yyyy}-${mm}-${dd}`;
          }
        }

        setFormData((prev) => ({
          ...prev,
          userId: kyc.userId || "",
          fullName,
          phone: kyc.mobileNumber || "",
          email: kyc.email || "",
          kycCode: kyc.kycCode || "",
          gender: kyc.gender || "",
          nationalid: kyc.nationalid || "",
          maritalstatus: kyc.maritalstatus || "",
          employmentStatus: kyc.employmentStatus || "",
          residentialAddress: kyc.residentialAddress || kyc.residentiallocation || "",
          dateofbirth: dobFormatted,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch KYC:", err);
    }
  };

  fetchKyc();
}, [user]);




  const steps = [
    { number: 1, title: "Applicant Details" },
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

  const prevStep = (e) => {
    if (e) e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();

      // Append all formData values, ensuring empty strings are handled
      Object.keys(formData).forEach((key) => {
        let value = formData[key];

        // For dates, prevent empty string
       // if (key === "dob" && !value) value = null;
        if (key === "dob" && (!value || value === "")) value = null;

        formPayload.append(key, value ?? "");
      });

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loan/submit-full-application`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);

      if (data.success) {
        alert("✅ Loan Application Completed!");
        handleReset?.();
        setCurrentStep(1);
      } else {
        alert(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

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

      {isSubmitting && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="spinner"></div>
            <h5>Submitting your loan application...</h5>
            <p>Please wait...</p>
          </div>
        </div>
      )}

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
              className={`step-indicator ${
                currentStep >= step.number ? "active" : ""
              } ${currentStep === step.number ? "current" : ""}`}
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

export default CustomerLoanForm;