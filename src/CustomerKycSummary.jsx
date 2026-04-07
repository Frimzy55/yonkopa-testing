import React from "react";
//import "./KycSummary.css";

const KycSummary = ({ formData }) => {
  return (
    <div className="kyc-summary">
      <h2>🎉 KYC Submission Summary</h2>

      <div className="summary-section">
        <h4>Personal Information</h4>
        <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.mobileNumber}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
        <p><strong>National ID:</strong> {formData.nationalId}</p>
      </div>

      <div className="summary-section">
        <h4>Contact Information</h4>
        <p><strong>Address:</strong> {formData.residentialAddress}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>Area:</strong> {formData.state}</p>
      </div>

      <div className="summary-section">
        <h4>Employment Information</h4>
        <p><strong>Status:</strong> {formData.employmentStatus}</p>

        {formData.employmentStatus === "salary-worker" && (
          <>
            <p><strong>Employer:</strong> {formData.employerName}</p>
            <p><strong>Job Title:</strong> {formData.jobTitle}</p>
            <p><strong>Monthly Income:</strong> {formData.monthlyIncome}</p>
          </>
        )}

        {formData.employmentStatus === "self-employed" && (
          <>
            <p><strong>Business Name:</strong> {formData.businessName}</p>
            <p><strong>Business Type:</strong> {formData.businessType}</p>
            <p><strong>Monthly Income:</strong> {formData.monthlyBusinessIncome}</p>
          </>
        )}
      </div>

      <div className="summary-section">
        <h4>References</h4>
        <p><strong>Ref 1:</strong> {formData.referenceName1} ({formData.referencePhone1})</p>
        <p><strong>Ref 2:</strong> {formData.referenceName2} ({formData.referencePhone2})</p>
      </div>

      <div className="success-note">
        ✅ Your KYC has been submitted successfully. Our team will review it shortly.
      </div>
    </div>
  );
};

export default KycSummary;