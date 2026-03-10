// src/pages/CustomerDashboard/KYCVerification/steps/ContactInfo.jsx
import React from "react";

const ContactInfo = ({ formData, handleInputChange }) => {
  return (
    <div className="form-step">
      <h3>Contact Information</h3>
      <div className="form-grid">
        <input type="tel" name="mobileNumber" value={formData.mobileNumber} readOnly placeholder="Mobile Number *" />
        <input type="email" name="email" value={formData.email} readOnly placeholder="Email Address *" />
        <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleInputChange} placeholder="Residential GPS Address *" required />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City/Town *" required />
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="Suburb/Area *" required />
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Alternate Phone Number *" required />
      </div>
    </div>
  );
};

export default ContactInfo;