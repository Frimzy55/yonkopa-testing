// src/pages/CustomerDashboard/KYCVerification/steps/PersonalInfo.jsx

import React, { useState, useEffect } from "react";
import defaultAvatar from "./image/av.png";
import "./PersonalInfo.css";

const PersonalInfo = ({
  formData,
  handleInputChange,
  handleFileChange,
  formErrors,
  checkingNationalId, // NEW PROP
  user,
}) => {
  const [preview, setPreview] = useState(formData?.avatar || defaultAvatar);

  useEffect(() => {
    if (formData.avatar) {
      setPreview(URL.createObjectURL(formData.avatar));
    }
  }, [formData.avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    handleFileChange({ target: { name: "avatar", files: [file] } });
  };

  return (
    <div className="form-step">
      <p className="welcome-text">Welcome, {user?.fullName || "User"}!</p>
      <h3 className="form-title">Personal Information</h3>

      {/* Avatar Upload */}
      <div className="avatar-container">
        <label className="avatar-title">Profile Picture *</label>
        <div className="avatar-upload-wrapper">
          <label htmlFor="avatarUpload">
            <img src={preview} alt="avatar" className="avatar-preview" />
            <div className="avatar-overlay">Click to Upload</div>
          </label>
          <input
            type="file"
            id="avatarUpload"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>
        {formErrors?.avatar && <span className="error-message">{formErrors.avatar}</span>}
      </div>

      {/* Form Grid */}
      <div className="form-grid">
        <div>
          <select name="title" value={formData?.title || ""} onChange={handleInputChange}>
            <option value="">Select Title *</option>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="miss">Miss</option>
            <option value="dr">Dr</option>
          </select>
          {formErrors?.title && <span className="error-message">{formErrors.title}</span>}
        </div>

        <div>
          <input type="text" name="firstName" value={formData?.firstName || ""} readOnly placeholder="First Name *" />
          {formErrors?.firstName && <span className="error-message">{formErrors.firstName}</span>}
        </div>

        <div>
          <input type="text" name="middleName" value={formData?.middleName || ""} onChange={handleInputChange} placeholder="Middle Name" />
        </div>

        <div>
          <input type="text" name="lastName" value={formData?.lastName || ""} readOnly placeholder="Last Name *" />
          {formErrors?.lastName && <span className="error-message">{formErrors.lastName}</span>}
        </div>

        <div>
          <input type="date" name="dateOfBirth" value={formData?.dateOfBirth || ""} onChange={handleInputChange} placeholder="Date of birth *" />
          {formErrors?.dateOfBirth && <span className="error-message">{formErrors.dateOfBirth}</span>}
        </div>

        <div>
          <select name="gender" value={formData?.gender || ""} onChange={handleInputChange}>
            <option value="">Select Gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formErrors?.gender && <span className="error-message">{formErrors.gender}</span>}
        </div>

        <div>
          <select name="maritalStatus" value={formData?.maritalStatus || ""} onChange={handleInputChange}>
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* National ID with live check */}
        <div>
          <input
            type="text"
            name="nationalId"
            value={formData?.nationalId || ""}
            onChange={handleInputChange}
            placeholder="National ID *"
          />
          {checkingNationalId && <small className="checking-message">Checking National ID...</small>}
          {formErrors?.nationalId && <span className="error-message">{formErrors.nationalId}</span>}
        </div>

        <div>
          <input type="text" name="residentialLocation" value={formData?.residentialLocation || ""} onChange={handleInputChange} placeholder="Residential Location *" />
          {formErrors?.residentialLocation && <span className="error-message">{formErrors.residentialLocation}</span>}
        </div>

        <div>
          <input type="text" name="residentialLandmark" value={formData?.residentialLandmark || ""} onChange={handleInputChange} placeholder="Residential Landmark" />
        </div>

        <div>
          <input type="text" name="spouseName" value={formData?.spouseName || ""} onChange={handleInputChange} placeholder="Name of Spouse" />
          {formErrors?.spouseName && <span className="error-message">{formErrors.spouseName}</span>}
        </div>

        <div>
          <input type="tel" name="spouseContact" value={formData?.spouseContact || ""} onChange={handleInputChange} placeholder="Spouse Contact" />
          {formErrors?.spouseContact && <span className="error-message">{formErrors.spouseContact}</span>}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;