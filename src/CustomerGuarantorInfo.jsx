// src/pages/CustomerDashboard/GuarantorInfo.jsx
import React from "react";

const GuarantorInfo = ({ formData, handleInputChange }) => {
  return (
    <div className="form-step">
      <h3>Guarantor Info</h3>
      <div className="form-grid">
        <input name="guarantorName" placeholder="Guarantor Full Name" value={formData.guarantorName} onChange={handleInputChange} required />
        <input name="guarantorPhone" placeholder="Guarantor Phone" value={formData.guarantorPhone} onChange={handleInputChange} required />
        <input name="guarantorAddress" placeholder="Guarantor Address" value={formData.guarantorAddress} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default GuarantorInfo;