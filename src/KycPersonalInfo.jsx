// src/pages/CustomerDashboard/KYCVerification/steps/PersonalInfo.jsx

import React, { useState, useEffect } from "react";
import defaultAvatar from "./image/av.png";
import "./PersonalInfo.css";

const PersonalInfo = ({
  formData,
  handleInputChange,
  handleFileChange,
  formErrors,
  checkingNationalId,
  user,
}) => {
  const [preview, setPreview] = useState(
    formData?.avatar ? formData.avatar : defaultAvatar
  );

  // Avatar preview
  useEffect(() => {
    if (!formData?.avatar) return;

    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData?.avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    handleFileChange({
      target: { name: "avatar", files: [file] },
    });
  };

  return (
    <div className="form-step">
      <p className="welcome-text">
        Welcome, {user?.fullName || "User"}!
        
      </p>

      <h3 className="form-title">Personal Information</h3>

      {/* Avatar Upload */}
      <div className="avatar-container">
        <label className="avatar-title">
          Profile Picture *
        </label>

        <div className="avatar-upload-wrapper">
          <label htmlFor="avatarUpload">
            <img
              src={preview}
              alt="avatar"
              className="avatar-preview"
            />
            <div className="avatar-overlay">
              Click to Upload
            </div>
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

        {formErrors?.avatar && (
          <span className="error-message">
            {formErrors.avatar}
          </span>
        )}
      </div>

      {/* Form Grid */}
      <div className="form-grid">

        {/* Title */}
        <div>
          <label>Title *</label>
          <select
            name="title"
            value={formData?.title || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Title *</option>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="miss">Miss</option>
            <option value="dr">Dr</option>
          </select>
          {formErrors?.title && (
            <span className="error-message">
              {formErrors.title}
            </span>
          )}
        </div>

        <div hidden>
          <label>Id *</label>
          <div  className="form-control bg-light">
            {formData?.userId || "-"}
          </div>
        </div>

        {/* First Name */}
        <div>
          <label>First Name *</label>
          <div className="form-control bg-light">
            {formData?.firstName || "-"}
          </div>
        </div>


        {/* Middle Name */}
        <div>
          <label>Middle Name (optional)</label>
          <input
            type="text"
            name="middleName"
            value={formData?.middleName || ""}
            onChange={handleInputChange}
            placeholder="Middle Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name *</label>
          <div className="form-control bg-light">
            {formData?.lastName || "-"}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData?.dateOfBirth || ""}
            onChange={handleInputChange}
            required
          />
          {formErrors?.dateOfBirth && (
            <span className="error-message">
              {formErrors.dateOfBirth}
            </span>
          )}
        </div>

        {/* Gender */}
        <div>
          <label>Gender *</label>
          <select
            name="gender"
            value={formData?.gender || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formErrors?.gender && (
            <span className="error-message">
              {formErrors.gender}
            </span>
          )}
        </div>

        {/* Marital Status */}
        <div>
          <label>Marital Status</label>
          <select
            name="maritalStatus"
            value={formData?.maritalStatus || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* National ID */}
        <div>
          <label>National ID *</label>
          <input
            type="text"
            name="nationalId"
            value={formData?.nationalId || ""}
            onChange={handleInputChange}
            placeholder="National ID *"
          />
          {checkingNationalId && (
            <small className="checking-message">
              Checking National ID...
            </small>
          )}
          {formErrors?.nationalId && (
            <span className="error-message">
              {formErrors.nationalId}
            </span>
          )}
        </div>

        {/* Residential Location */}
        <div>
          <label>Residential Location *</label>
          <input
            type="text"
            name="residentialLocation"
            value={formData?.residentialLocation || ""}
            onChange={handleInputChange}
            placeholder="Residential Location *"
          />
          {formErrors?.residentialLocation && (
            <span className="error-message">
              {formErrors.residentialLocation}
            </span>
          )}
        </div>

        {/* Spouse Details */}
        {formData?.maritalStatus === "married" && (
          <>
            <div>
              <label>Name of Spouse</label>
              <input
                type="text"
                name="spouseName"
                value={formData?.spouseName || ""}
                onChange={handleInputChange}
                placeholder="Name of Spouse"
              />
            </div>

            <div>
              <label>Spouse Contact</label>
              <input
                type="tel"
                name="spouseContact"
                value={formData?.spouseContact || ""}
                onChange={handleInputChange}
                placeholder="Spouse Contact"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;