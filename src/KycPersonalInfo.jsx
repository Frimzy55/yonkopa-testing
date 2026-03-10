// src/pages/CustomerDashboard/KYCVerification/steps/PersonalInfo.jsx
import React from "react";

const PersonalInfo = ({ formData, handleInputChange, formErrors, user }) => {
  return (
    <div className="form-step">
      <p>Welcome, {user?.fullName || "User"}!</p>

      <h3>Personal Information</h3>

      <div className="form-grid">

        <select
          name="title"
          value={formData?.title || ""}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Title</option>
          <option value="mr">Mr.</option>
          <option value="mrs">Mrs.</option>
          <option value="miss">Miss</option>
          <option value="dr">Dr</option>
        </select>

        <input
          type="text"
          name="firstName"
          value={formData?.firstName || ""}
          readOnly
          placeholder="First Name *"
        />

        <input
          type="text"
          name="middleName"
          value={formData?.middleName || ""}
          onChange={handleInputChange}
          placeholder="Middle Name"
        />

        <input
          type="text"
          name="lastName"
          value={formData?.lastName || ""}
          readOnly
          placeholder="Last Name *"
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth || ""}
          onChange={handleInputChange}
          required
        />

        <select
          name="gender"
          value={formData?.gender || ""}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="maritalStatus"
          value={formData?.maritalStatus || ""}
          onChange={handleInputChange}
        >
          <option value="">Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>

        <input
          type="text"
          name="nationalId"
          value={formData?.nationalId || ""}
          onChange={handleInputChange}
          placeholder="National ID *"
          required
        />

        {formErrors?.nationalId && (
          <span className="error-message">{formErrors.nationalId}</span>
        )}

        <input
          type="text"
          name="residentialLocation"
          value={formData?.residentialLocation || ""}
          onChange={handleInputChange}
          placeholder="Residential Location *"
          required
        />

        <input
          type="text"
          name="residentialLandmark"
          value={formData?.residentialLandmark || ""}
          onChange={handleInputChange}
          placeholder="Residential Landmark"
        />

        <input
          type="text"
          name="spouseName"
          value={formData?.spouseName || ""}
          onChange={handleInputChange}
          placeholder="Name of Spouse"
        />

        <input
          type="tel"
          name="spouseContact"
          value={formData?.spouseContact || ""}
          onChange={handleInputChange}
          placeholder="Spouse Contact"
        />

      </div>
    </div>
  );
};

export default PersonalInfo;