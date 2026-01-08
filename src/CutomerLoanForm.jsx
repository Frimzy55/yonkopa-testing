// src/pages/CustomerDashboard/LoanForm.jsx
import React, { useState } from 'react';
import './LoanForm.css'; // Add your CSS for form + progress bar

const LoanForm = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Applicant Details
    fullName: '', dob: '', gender: '', nationalId: '', phone: '', email: '',
    maritalStatus: '', dependents: '', residentialAddress: '', residentialGPS: '',
    // Employment / Business Info
    loanType: '', employerName: '', jobTitle: '', monthlySalary: '', employmentType: '',
    lengthOfEmployment: '', businessName: '', businessType: '', businessRegNo: '',
    businessAddress: '', businessRevenue: '', yearsInBusiness: '',
    // Loan Details
    loanAmount: '', loanPurpose: '', loanTerm: '', repaymentFrequency: '',
    // Guarantor Info
    guarantorName: '', guarantorPhone: '', guarantorAddress: '',
    guarantorRelationship: '', guarantorNationality: '', guarantorGender: '', guarantorDOB: ''
  });

  const steps = [
    { number: 1, title: 'Applicant Details', description: 'Personal information' },
    { number: 2, title: 'Employment / Business', description: 'Work or business details' },
    { number: 3, title: 'Loan Details', description: 'Loan amount and purpose' },
    { number: 4, title: 'Guarantor Info', description: 'Guarantor details' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Loan application submitted:', formData);
    alert('Loan application submitted successfully!');
  };*/



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/loan/apply-loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      alert("Loan application submitted successfully!");
    } else {
      alert("Something went wrong!");
    }

  } catch (error) {
    console.error("Error submitting loan:", error);
    alert("Server error. Try again!");
  }
};


  const renderStep = () => {
    switch (currentStep) {
      case 1: return (
        <div className="form-step">
          <h3>Applicant Details</h3>
          <div className="form-grid">
            <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleInputChange} required />
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
            </select>
            <input type="text" name="nationalId" placeholder="National ID / Passport *" value={formData.nationalId} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required />
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
              <option value="">Marital Status</option>
              <option value="Single">Single</option><option value="Married">Married</option>
              <option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
            </select>
            <input type="number" name="dependents" placeholder="Number of Dependents" value={formData.dependents} onChange={handleInputChange} />
            <input type="text" name="residentialAddress" placeholder="Residential Address *" value={formData.residentialAddress} onChange={handleInputChange} required />
            <input type="text" name="residentialGPS" placeholder="Residential GPS (Optional)" value={formData.residentialGPS} onChange={handleInputChange} />
          </div>
        </div>
      );
      case 2: return (
        <div className="form-step">
          <h3>Employment / Business Info</h3>
          <div className="form-grid">
            <select name="loanType" value={formData.loanType} onChange={handleInputChange} required>
              <option value="">Select Loan Type</option>
              <option value="salary">Salary Loan</option>
              <option value="business">Business Loan</option>
              <option value="personal">Personal Loan</option>
            </select>

            {(formData.loanType === "salary" || formData.loanType === "personal") && (
              <>
                <input type="text" name="employerName" placeholder="Employer Name" value={formData.employerName} onChange={handleInputChange} />
                <input type="text" name="jobTitle" placeholder="Job Title / Position" value={formData.jobTitle} onChange={handleInputChange} />
                <input type="number" name="monthlySalary" placeholder="Monthly Salary" value={formData.monthlySalary} onChange={handleInputChange} />
                <select name="employmentType" value={formData.employmentType} onChange={handleInputChange}>
                  <option value="">Employment Type</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                </select>
                <input type="text" name="lengthOfEmployment" placeholder="Length of Employment" value={formData.lengthOfEmployment} onChange={handleInputChange} />
              </>
            )}

            {formData.loanType === "business" && (
              <>
                <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleInputChange} />
                <input type="text" name="businessType" placeholder="Business Type / Sector" value={formData.businessType} onChange={handleInputChange} />
                <input type="text" name="businessRegNo" placeholder="Business Registration Number" value={formData.businessRegNo} onChange={handleInputChange} />
                <input type="text" name="businessAddress" placeholder="Business Address" value={formData.businessAddress} onChange={handleInputChange} />
                <input type="number" name="businessRevenue" placeholder="Monthly / Annual Revenue" value={formData.businessRevenue} onChange={handleInputChange} />
                <input type="text" name="yearsInBusiness" placeholder="Years in Business" value={formData.yearsInBusiness} onChange={handleInputChange} />
              </>
            )}
          </div>
        </div>
      );
      case 3: return (
        <div className="form-step">
          <h3>Loan Details</h3>
          <div className="form-grid">
            <input type="number" name="loanAmount" placeholder="Loan Amount *" value={formData.loanAmount} onChange={handleInputChange} required />
            <input type="text" name="loanPurpose" placeholder="Loan Purpose *" value={formData.loanPurpose} onChange={handleInputChange} required />
            <input type="text" name="loanTerm" placeholder="Loan Term / Duration *" value={formData.loanTerm} onChange={handleInputChange} required />
            <select name="repaymentFrequency" value={formData.repaymentFrequency} onChange={handleInputChange} required>
              <option value="">Repayment Frequency</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      );
      case 4: return (
        <div className="form-step">
          <h3>Guarantor Information</h3>
          <div className="form-grid">
            <input type="text" name="guarantorName" placeholder="Full Name *" value={formData.guarantorName} onChange={handleInputChange} required />
            <input type="tel" name="guarantorPhone" placeholder="Phone Number *" value={formData.guarantorPhone} onChange={handleInputChange} required />
            <input type="text" name="guarantorAddress" placeholder="Address" value={formData.guarantorAddress} onChange={handleInputChange} />
            <input type="text" name="guarantorRelationship" placeholder="Relationship with Applicant" value={formData.guarantorRelationship} onChange={handleInputChange} />
            <input type="text" name="guarantorNationality" placeholder="Nationality" value={formData.guarantorNationality} onChange={handleInputChange} />
            <select name="guarantorGender" value={formData.guarantorGender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option><option value="Female">Female</option>
            </select>
            <input type="date" name="guarantorDOB" value={formData.guarantorDOB} onChange={handleInputChange} />
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="content-section">
      <h2>Loan Application</h2>
      <div className="progress-container">
        {steps.map((s, index) => {
          const completed = currentStep > s.number;
          const active = currentStep === s.number;
          return (
            <div key={s.number} className="progress-step-wrapper">
              {index !== 0 && <div className={`progress-line ${completed ? 'completed' : ''}`}></div>}
              <div className={`progress-step-circle ${completed ? 'completed' : ''} ${active ? 'active' : ''}`}>
                {completed ? '✓' : s.number}
              </div>
              <div className="progress-step-label">
                <span className="title">{s.title}</span>
                <span className="desc">{s.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="loan-form">
        {renderStep()}
        <div className="form-navigation">
          {currentStep > 1 && <button type="button" onClick={prevStep} className="nav-btn prev-btn">Previous</button>}
          {currentStep < steps.length ? <button type="button" onClick={nextStep} className="nav-btn next-btn">Next</button>
            : <button type="submit" className="nav-btn submit-btn">Submit Application</button>}
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
