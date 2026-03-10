// src/pages/CustomerDashboard/ApplicantDetails.jsx
import React from "react";

const ApplicantDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="form-step" style={{ display: "none" }}>
      <h3>Applicant Details</h3>
      <input
        name="kycCode"
        value={formData.kycCode}
        readOnly
        placeholder="KYC Code"
      />
      <div className="form-grid">
        <input name="fullName" value={formData.fullName} readOnly />
        <input name="phone" value={formData.phone} readOnly />
        <input name="email" value={formData.email} readOnly />
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="nationalId" placeholder="National ID / Passport" value={formData.nationalId} readOnly />
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
        <input name="dependents" type="number" placeholder="Dependents" value={formData.dependents} onChange={handleInputChange} />
        <input name="residentialAddress" placeholder="Residential Address" value={formData.residentialAddress} onChange={handleInputChange} required />
        <input name="residentialGPS" placeholder="Residential GPS (optional)" value={formData.residentialGPS} onChange={handleInputChange} />
         <input name="employmentStatus" value={formData.employmentStatus} readOnly />
      </div>
   </div>
  );
};

export default ApplicantDetails;