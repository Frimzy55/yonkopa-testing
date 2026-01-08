// CustomerForm.jsx
//import React from "react";

/*const CustomerForm = () => {
  return (
    <div className="form-container">
      <h2>Customer Registration Form</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Customer ID" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerForm;*/



// src/pages/CustomerDashboard/KYCVerification.jsx
import React, { useState } from 'react';
import './CustomerCompleteKyc.css'; // CSS for form + progress bar

const CustomerForm = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '',
    nationality: '', maritalStatus: '', nationalId: '', passportNumber: '', taxId: '',
    // Contact Info
    mobileNumber: '', email: '', residentialAddress: '', city: '', state: '',
    zipCode: '', postalAddress: '',
    // Employment/Income
    employmentStatus: '', employerName: '', jobTitle: '', monthlyIncome: '',
    businessType: '', yearsInCurrentEmployment: '',
    // Bank Details
    bankName: '', bankAccountNumber: '', accountType: '', branch: '',
    // Loan Info
    loanPurpose: '', existingLoans: '',
    // Documents
    idDocument: null, addressProof: null, incomeProof: null
  });

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic personal details' },
    { number: 2, title: 'Contact Info', description: 'Contact information' },
    { number: 3, title: 'Employment Info', description: 'Employment status' },
    { number: 4, title: 'Bank Details', description: 'Bank account information' },
    { number: 5, title: 'Loan Info', description: 'Loan purpose and details' },
    { number: 6, title: 'Document Upload', description: 'Upload required documents' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formToSend = new FormData();
  for (const key in formData) {
    formToSend.append(key, formData[key]);
  }

  try {
    const res = await fetch("http://localhost:5000/api/kyc/submit", {
      method: "POST",
      body: formToSend,
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("KYC submitted successfully!");
    } else {
      alert("Error submitting KYC");
    }

  } catch (error) {
    console.error("Submit error:", error);
  }
};


  const renderStep = () => {
    switch (currentStep) {
      case 1: return (
        <div className="form-step">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name *" required />
            <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name *" required />
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Nationality *" required />
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
              <option value="">Marital Status</option>
              <option value="single">Single</option><option value="married">Married</option>
              <option value="divorced">Divorced</option><option value="widowed">Widowed</option>
            </select>
            <input type="text" name="nationalId" value={formData.nationalId} onChange={handleInputChange} placeholder="National ID *" required />
            <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} placeholder="Passport Number" />
            <input type="text" name="taxId" value={formData.taxId} onChange={handleInputChange} placeholder="Tax ID" />
          </div>
        </div>
      );
      case 2: return (
        <div className="form-step">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number *" required />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" required />
            <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleInputChange} placeholder="Residential Address *" required />
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City *" required />
            <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State/Province *" required />
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP/Postal Code *" required />
            <input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleInputChange} placeholder="Postal Address (if different)" />
          </div>
        </div>
      );
      case 3: return (
        <div className="form-step">
          <h3>Employment and Income </h3>
          <div className="form-grid">
            <select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} required>
              <option value="">Employment Status</option>
              <option value="employed">Employed</option><option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option><option value="student">Student</option>
            </select>
            <input type="text" name="employerName" value={formData.employerName} onChange={handleInputChange} placeholder="Employer Name" />
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Job Title/Position" />
            <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange} placeholder="Monthly Income *" required />
            <input type="text" name="businessType" value={formData.businessType} onChange={handleInputChange} placeholder="Business Type" />
            <input type="number" name="yearsInCurrentEmployment" value={formData.yearsInCurrentEmployment} onChange={handleInputChange} placeholder="Years in Current Employment" step="0.1" min="0" />
          </div>
        </div>
      );
      case 4: return (
        <div className="form-step">
          <h3>Bank Details</h3>
          <div className="form-grid">
            <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Bank Name *" required />
            <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleInputChange} placeholder="Bank Account Number *" required />
            <select name="accountType" value={formData.accountType} onChange={handleInputChange} required>
              <option value="">Account Type *</option>
              <option value="savings">Savings</option><option value="current">Current/Checking</option>
            </select>
            <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Branch" />
          </div>
        </div>
      );
      case 5: return (
        <div className="form-step">
          <h3>Loan Information</h3>
          <textarea name="loanPurpose" value={formData.loanPurpose} onChange={handleInputChange} placeholder="Purpose of Loan" rows="3" />
          <textarea name="existingLoans" value={formData.existingLoans} onChange={handleInputChange} placeholder="Existing Loans/Debts" rows="3" />
        </div>
      );
      case 6: return (
        <div className="form-step">
          <h3>Document Upload</h3>
          <input type="file" name="idDocument" onChange={handleInputChange} accept=".jpg,.jpeg,.png,.pdf" required />
          <input type="file" name="addressProof" onChange={handleInputChange} accept=".jpg,.jpeg,.png,.pdf" required />
          <input type="file" name="incomeProof" onChange={handleInputChange} accept=".jpg,.jpeg,.png,.pdf" required />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="content-section">
      <h2>KYC Verification</h2>

      {/* Modern Horizontal Progress Bar */}
      <div className="kyc-progress-container">
        {steps.map((step, index) => {
          const stepCompleted = currentStep > step.number;
          const stepActive = currentStep === step.number;
          return (
            <div key={step.number} className="progress-step-wrapper">
              {index !== 0 && <div className={`progress-line ${stepCompleted ? 'completed' : ''}`}></div>}
              <div className={`progress-step-circle ${stepCompleted ? 'completed' : ''} ${stepActive ? 'active' : ''}`}>
                {stepCompleted ? '✓' : step.number}
              </div>
              <div className="progress-step-label">
                <span className="title">{step.title}</span>
                <span className="desc">{step.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="kyc-form">
        {renderStep()}
        <div className="form-navigation">
          {currentStep > 1 && <button type="button" onClick={prevStep} className="nav-btn prev-btn">Previous</button>}
          {currentStep < steps.length ? <button type="button" onClick={nextStep} className="nav-btn next-btn">Next</button>
            : <button type="submit" className="nav-btn submit-btn">Submit for Verification</button>}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;



