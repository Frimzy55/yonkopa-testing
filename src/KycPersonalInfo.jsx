// src/pages/CustomerDashboard/KYCVerification/steps/PersonalInfo.jsx
import React, { useState } from "react";
import defaultAvatar from "./image/av.png"; // adjust path
import "./PersonalInfo.css";

const PersonalInfo = ({ formData, handleInputChange, handleFileChange, formErrors, user }) => {
  const [preview, setPreview] = useState(formData?.avatar || defaultAvatar);

  // Handle avatar change and live preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    handleFileChange({ target: { name: "avatar", files: [file] } });
  };

  return (
    <div className="form-step">
      <p className="welcome-text">Welcome, {user?.fullName || "User"}!</p>
      <h3 className="form-title">Personal Information</h3>

      {/* Avatar Upload */}
      <div className="avatar-container">
        <label className="avatar-title">Profile Picture</label>
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
      </div>

      {/* Form Grid */}
      <div className="form-grid">
        <select name="title" value={formData?.title || ""} onChange={handleInputChange} required>
          <option value="">Select Title</option>
          <option value="mr">Mr.</option>
          <option value="mrs">Mrs.</option>
          <option value="miss">Miss</option>
          <option value="dr">Dr</option>
        </select>

        <input type="text" name="firstName" value={formData?.firstName || ""} readOnly placeholder="First Name *" />
        <input type="text" name="middleName" value={formData?.middleName || ""} onChange={handleInputChange} placeholder="Middle Name" />
        <input type="text" name="lastName" value={formData?.lastName || ""} readOnly placeholder="Last Name *" />

        <input type="date" name="dateOfBirth" value={formData?.dateOfBirth || ""} onChange={handleInputChange} required />

        <select name="gender" value={formData?.gender || ""} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select name="maritalStatus" value={formData?.maritalStatus || ""} onChange={handleInputChange}>
          <option value="">Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>

        <input type="text" name="nationalId" value={formData?.nationalId || ""} onChange={handleInputChange} placeholder="National ID *" required />
        {formErrors?.nationalId && <span className="error-message">{formErrors.nationalId}</span>}

        <input type="text" name="residentialLocation" value={formData?.residentialLocation || ""} onChange={handleInputChange} placeholder="Residential Location *" required />
        <input type="text" name="residentialLandmark" value={formData?.residentialLandmark || ""} onChange={handleInputChange} placeholder="Residential Landmark" />

        <input type="text" name="spouseName" value={formData?.spouseName || ""} onChange={handleInputChange} placeholder="Name of Spouse" />
        <input type="tel" name="spouseContact" value={formData?.spouseContact || ""} onChange={handleInputChange} placeholder="Spouse Contact" />
      </div>
    </div>
  );
};

export default PersonalInfo;