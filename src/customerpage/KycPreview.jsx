// KycPreview.js
import React from "react";

const KycPreview = ({ formData }) => {
  // Helper function to format full name
  const getFullName = () => {
    const { firstName, middleName, lastName } = formData;
    return [firstName, middleName, lastName].filter(Boolean).join(" ");
  };

  // Helper function to get employer/business name
  const getEmployerOrBusiness = () => {
    const { employmentStatus, employerName, businessName } = formData;
    
    if (employmentStatus === "employed" || employmentStatus === "Employed") {
      return employerName || "Not provided";
    } else if (employmentStatus === "self-employed" || employmentStatus === "Self-Employed" || employmentStatus === "business-owner") {
      return businessName || "Not provided";
    }
    return "Not applicable";
  };

  return (
    <div className="kyc-preview">
      <h3>✅ KYC Submitted Successfully!</h3>
      
      <div className="preview-section">
        <h4>Personal Information</h4>
        <p>
          <strong>Name:</strong> {getFullName() || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {formData.email || "Not provided"}
        </p>
        <p>
          <strong>Phone:</strong> {formData.mobileNumber || "Not provided"}
        </p>
      </div>

      <div className="preview-section">
        <h4>Employment Information</h4>
        <p>
          <strong>Employment Status:</strong> {formData.employmentStatus || "Not provided"}
        </p>
        <p>
          <strong>Employer / Business:</strong> {getEmployerOrBusiness()}
        </p>
        
        {formData.employmentStatus === "employed" && formData.jobTitle && (
          <p>
            <strong>Job Title:</strong> {formData.jobTitle}
          </p>
        )}
        
        {formData.employmentStatus === "self-employed" && formData.businessType && (
          <p>
            <strong>Business Type:</strong> {formData.businessType}
          </p>
        )}
      </div>

      <div className="preview-section">
        <h4>References</h4>
        <ul>
          <li>
            {formData.referenceName1 || "Not provided"} -{" "}
            {formData.referencePhone1 || "Not provided"} (
            {formData.referenceRelationship1 || "Not provided"})
          </li>
          <li>
            {formData.referenceName2 || "Not provided"} -{" "}
            {formData.referencePhone2 || "Not provided"} (
            {formData.referenceRelationship2 || "Not provided"})
          </li>
        </ul>
      </div>

      {formData.kycCode && (
        <div className="preview-section kyc-code-section">
          <h4>KYC Code</h4>
          <p className="kyc-code">
            <strong>{formData.kycCode}</strong>
          </p>
          <p className="kyc-note">
            Please keep this code safe. It may be required for verification purposes.
          </p>
        </div>
      )}
    </div>
  );
};

export default KycPreview;