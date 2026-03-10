// src/pages/CustomerDashboard/KYCVerification/KycEmploymentInfos.jsx
import React from "react";

const EmploymentInfo = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <div className="form-step">
      <h3>Employment and Income</h3>
      <div className="form-grid">

        {/* Employment Status */}
        <select
          name="employmentStatus"
          value={formData.employmentStatus || ""}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Employment Status</option>
          <option value="salary-worker">Salary Worker</option>
          <option value="self-employed">Self-Employed</option>
        </select>

        {/* Salary Worker */}
        {formData.employmentStatus === "salary-worker" && (
          <>
            <input type="text" name="employerName" value={formData.employerName || ""} onChange={handleInputChange} placeholder="Employer Name"/>
            <input type="text" name="jobTitle" value={formData.jobTitle || ""} onChange={handleInputChange} placeholder="Job Title / Position"/>
            <input type="number" name="monthlyIncome" value={formData.monthlyIncome || ""} onChange={handleInputChange} placeholder="Monthly Income"/>
            <input type="number" name="yearsInCurrentEmployment" value={formData.yearsInCurrentEmployment || ""} onChange={handleInputChange} placeholder="Years in Current Employment"/>
            <input type="text" name="workPlaceLocation" value={formData.workPlaceLocation || ""} onChange={handleInputChange} placeholder="Workplace Location"/>

            <div className="form-group">
              <label>Recent Payslip</label>
              <input type="file" name="payslip" onChange={handleFileChange}/>
            </div>
            <div className="form-group">
              <label>Ghana Card Front</label>
              <input type="file" name="ghanaCardFront" onChange={handleFileChange}/>
            </div>
            <div className="form-group">
              <label>Ghana Card Back</label>
              <input type="file" name="ghanaCardBack" onChange={handleFileChange}/>
            </div>
            <div className="form-group">
              <label>Employment ID</label>
              <input type="file" name="employmentId" onChange={handleFileChange}/>
            </div>
          </>
        )}

       {/* Self-Employed */}
{formData.employmentStatus === "self-employed" && (
  <>
    <input
      type="text"
      name="businessName"
      value={formData.businessName || ""}
      onChange={handleInputChange}
      placeholder="Business Name"
    />

    <input
      type="text"
      name="businessType"
      value={formData.businessType || ""}
      onChange={handleInputChange}
      placeholder="Type of Business"
    />

    <input
      type="number"
      name="monthlyBusinessIncome"
      value={formData.monthlyBusinessIncome || ""}
      onChange={handleInputChange}
      placeholder="Monthly Business Income"
    />

    <input
      type="text"
      name="businessLocation"
      value={formData.businessLocation || ""}
      onChange={handleInputChange}
      placeholder="Business Location"
    />

    <input
      type="text"
      name="businessGpsAddress"
      value={formData.businessGpsAddress || ""}
      onChange={handleInputChange}
      placeholder="Business GPS Address"
    />

    <input
      type="number"
      name="numberOfWorkers"
      value={formData.numberOfWorkers || ""}
      onChange={handleInputChange}
      placeholder="Number of Workers"
    />

    <input
      type="number"
      name="yearsInBusiness"
      value={formData.yearsInBusiness || ""}
      onChange={handleInputChange}
      placeholder="Years in Business"
    />

    <input
      type="number"
      name="workingCapital"
      value={formData.workingCapital || ""}
      onChange={handleInputChange}
      placeholder="Working Capital"
    />

    {/* Business Picture Upload */}
    <div className="form-group">
      <label>Upload Business Picture</label>
      <input
        type="file"
        name="businessPicture"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
    </div>
  </>
)}
      </div>
    </div>
  );
};

export default EmploymentInfo;