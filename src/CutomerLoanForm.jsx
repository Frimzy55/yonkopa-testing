// src/pages/CustomerDashboard/CutomerLoanForm.jsx
import React, { useState, useEffect } from "react";
import "./LoanForm.css";

const CutomerLoanForm = ({ user, handleReset }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Applicant Details
    fullName: "",
    phone: "",
    email: "",
    kycCode: "", // <-- Add this
    dob: "",
    gender: "",
    nationalId: "",
    maritalStatus: "",
    dependents: "",
    residentialAddress: "",
    residentialGPS: "",

    // Employment / Business Info
    loanType: "",
    employerName: "",
    jobTitle: "",
    monthlySalary: "",
    employmentType: "",
    lengthOfEmployment: "",
    businessName: "",
    businessType: "",
    businessRegNo: "",
    businessAddress: "",
    businessRevenue: "",
    yearsInBusiness: "",

    // Loan Details
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    repaymentFrequency: "",

    // Guarantor Info
    guarantorName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorRelationship: "",
    guarantorNationality: "",
    guarantorGender: "",
    guarantorDOB: ""
  });

  useEffect(() => {
    if (!user) return;

    // Combine firstName + lastName if available
    const fullName =
      user.fullName ||
      user.fullname ||
      (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "");

    const phone = user.phone || user.mobileNumber || "";
    //const dob = user.dob || user.dateOfBirth || ""; // <-- declare dob here
    let dob = "";
  if (user.dob || user.dateOfBirth) {
    const date = new Date(user.dob || user.dateOfBirth);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dob = `${year}-${month}-${day}`;
  }


    setFormData(prev => ({
      ...prev,
      fullName,
      phone,
      dob,
       kycCode: user.kyc_code || "" ,// <-- Autofill KYC Code
      email: user.email || "",
      
    }));
  }, [user]);

  const steps = [
    { number: 1, title: "Applicant Details" },
    { number: 2, title: "Employment / Business" },
    { number: 3, title: "Loan Details" },
    { number: 4, title: "Guarantor Info" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () =>
    setCurrentStep(prev => Math.min(prev + 1, steps.length));

  const prevStep = () =>
    setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     // const res = await fetch("http://localhost:5000/api/loan/apply-loan", {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/loan/apply-loan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("Loan application submitted successfully!");
        handleReset && handleReset();
      } else {
        alert("Failed to submit loan application.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again!");
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Applicant Details</h3>
            <input
             name="kycCode"
                value={formData.kycCode}
                readOnly // users shouldn't edit KYC Code
                placeholder="KYC Code"
                />
            <div className="form-grid">
              <input
                name="fullName"
                value={formData.fullName}
                readOnly
              />

              <input
                name="phone"
                value={formData.phone}
                readOnly
              />

              <input
                name="email"
                value={formData.email}
                readOnly
              />

             <input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleInputChange}
  required
/>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                name="nationalId"
                placeholder="National ID / Passport"
                value={formData.nationalId}
                onChange={handleInputChange}
                required
              />

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>

              <input
                name="dependents"
                type="number"
                placeholder="Dependents"
                value={formData.dependents}
                onChange={handleInputChange}
              />

              <input
                name="residentialAddress"
                placeholder="Residential Address"
                value={formData.residentialAddress}
                onChange={handleInputChange}
                required
              />

              <input
                name="residentialGPS"
                placeholder="Residential GPS (optional)"
                value={formData.residentialGPS}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h3>Employment / Business</h3>
            <div className="form-grid">
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Loan Type</option>
                <option value="salary">Salary Loan</option>
                <option value="business">Business Loan</option>
                <option value="personal">Personal Loan</option>
              </select>

              {(formData.loanType === "salary" ||
                formData.loanType === "personal") && (
                <>
                  <input
                    name="employerName"
                    placeholder="Employer Name"
                    value={formData.employerName}
                    onChange={handleInputChange}
                  />

                  <input
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />

                  <input
                    name="monthlySalary"
                    type="number"
                    placeholder="Monthly Salary"
                    value={formData.monthlySalary}
                    onChange={handleInputChange}
                  />
                </>
              )}

              {formData.loanType === "business" && (
                <>
                  <input
                    name="businessName"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />

                  <input
                    name="businessType"
                    placeholder="Business Type"
                    value={formData.businessType}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3>Loan Details</h3>
            <div className="form-grid">
              <input
                name="loanAmount"
                type="number"
                placeholder="Loan Amount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                required
              />

              <input
                name="loanPurpose"
                placeholder="Loan Purpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                required
              />

              <input
                name="loanTerm"
                placeholder="Loan Term"
                value={formData.loanTerm}
                onChange={handleInputChange}
                required
              />

              <select
                name="repaymentFrequency"
                value={formData.repaymentFrequency}
                onChange={handleInputChange}
                required
              >
                <option value="">Repayment Frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h3>Guarantor Info</h3>
            <div className="form-grid">
              <input
                name="guarantorName"
                placeholder="Guarantor Full Name"
                value={formData.guarantorName}
                onChange={handleInputChange}
                required
              />

              <input
                name="guarantorPhone"
                placeholder="Guarantor Phone"
                value={formData.guarantorPhone}
                onChange={handleInputChange}
                required
              />

              <input
                name="guarantorAddress"
                placeholder="Guarantor Address"
                value={formData.guarantorAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-section">
      <h2>Loan Application</h2>

      {/* Progress Bar Section */}
      <div className="progress-section">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Step Indicators */}
        <div className="step-indicators">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`step-indicator ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
        
        {/* Progress Text */}
        <div className="progress-text">
          Step {currentStep} of {steps.length} - {steps[currentStep - 1]?.title}
          <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
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
            <button type="submit" className="btn-submit">
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CutomerLoanForm;