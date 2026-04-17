// src/pages/CustomerDashboard/ApplicantDetails.jsx
import React from "react";

const ApplicantDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="form-step" style={{ display: "" }}>
      <h3>Applicant Details</h3>
       <input name="user id" value={formData.userId} readOnly />
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
       <input
  type="date"
  name="dob"
  value={formData.dateofbirth || ""} // ensure never undefined
  onChange={handleInputChange}
  required
/>
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input name="nationalId" placeholder="National ID / Passport" value={formData.nationalid} readOnly />
         <select
  name="maritalstatus"
  value={formData.maritalstatus || ""}
  onChange={handleInputChange}
  required
>
  <option value="">Select Marital Status</option>
  <option value="single">Single</option>
  <option value="married">Married</option>
  <option value="divorced">Divorced</option>
  <option value="widowed">Widowed</option>
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