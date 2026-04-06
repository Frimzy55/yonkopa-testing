// src/pages/CustomerDashboard/KYCVerification/steps/ContactInfo.jsx
import React from "react";
import "./ContactInfo.css";

const ContactInfo = ({
  formData = {},
  handleInputChange,
  formErrors = {},
  isMobileLocked = false,
  isEmailLocked = false,
}) => {
  return (
    <div className="form-step">
      <h3>Contact Information</h3>

      <div className="form-grid">

        {/* Mobile Number */}
        <div>
          <label>Mobile Number *</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number *"
            required
            disabled={isMobileLocked} // ✅ controlled locking
            className={isMobileLocked ? "bg-light" : ""}
          />
          {formErrors?.mobileNumber && (
            <span className="error-message">{formErrors.mobileNumber}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Enter Email Address *"
            required
            disabled={isEmailLocked} // ✅ controlled locking
            className={isEmailLocked ? "bg-light" : ""}
          />
          {formErrors?.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>

        {/* Residential GPS Address */}
        <div>
          <label>Residential GPS Address *</label>
          <input
            type="text"
            name="residentialAddress"
            value={formData.residentialAddress || ""}
            onChange={handleInputChange}
            placeholder="Residential GPS Address"
          />
          {formErrors?.residentialAddress && (
            <span className="error-message">
              {formErrors.residentialAddress}
            </span>
          )}
        </div>

        {/* Residential Landmark */}
        <div>
          <label>Residential Landmark</label>
          <input
            type="text"
            name="residentialLandmark"
            value={formData.residentialLandmark || ""}
            onChange={handleInputChange}
            placeholder="Residential Landmark"
          />
          {formErrors?.residentialLandmark && (
            <span className="error-message">
              {formErrors.residentialLandmark}
            </span>
          )}
        </div>

        {/* City/Town */}
        <div>
          <label>City/Town *</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            placeholder="City/Town"
          />
          {formErrors?.city && (
            <span className="error-message">{formErrors.city}</span>
          )}
        </div>

        {/* Suburb/Area */}
        <div>
          <label>Suburb/Area *</label>
          <input
            type="text"
            name="state"
            value={formData.state || ""}
            onChange={handleInputChange}
            placeholder="Suburb/Area"
          />
          {formErrors?.state && (
            <span className="error-message">{formErrors.state}</span>
          )}
        </div>

        {/* Alternate Phone Number */}
        <div>
          <label>Alternate Phone Number *</label>
          <input
            type="text"
            name="alternatePhone"
            value={formData.alternatePhone || ""}
            onChange={handleInputChange}
            placeholder="Alternate Phone Number"
          />
          {formErrors?.alternatePhone && (
            <span className="error-message">
              {formErrors.alternatePhone}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;