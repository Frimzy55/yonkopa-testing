// src/pages/CustomerDashboard/GuarantorInfo.jsx
import React, { useState, useEffect } from "react";

const GuarantorInfo = ({ formData, handleInputChange }) => {
  const employeeType = formData.guarantorEmployeeType || "";

  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    if (formData.guarantorProfilePicture) {
      const file = formData.guarantorProfilePicture;
      const objectUrl = URL.createObjectURL(file);
      setProfilePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePreview(null);
    }
  }, [formData.guarantorProfilePicture]);

  const handleEmployeeTypeChange = (e) => {
    const value = e.target.value;
    handleInputChange(e);

    if (value === "salary worker") {
      handleInputChange({ target: { name: "guarantorBusinessName", value: "" } });
      handleInputChange({ target: { name: "guarantorBusinessLocation", value: "" } });
      handleInputChange({ target: { name: "guarantorYearsInBusiness", value: "" } });
      handleInputChange({ target: { name: "guarantorBusinessPicture", value: null } });
      handleInputChange({ target: { name: "guarantorGhanaCardFront", value: null } });
      handleInputChange({ target: { name: "guarantorGhanaCardBack", value: null } });
    } else if (value === "self-employed") {
      handleInputChange({ target: { name: "guarantorRank", value: "" } });
      handleInputChange({ target: { name: "guarantorWorkLocation", value: "" } });
      handleInputChange({ target: { name: "guarantorYearsInService", value: "" } });
      handleInputChange({ target: { name: "guarantorPayslip", value: null } });
    }
  };

  return (
    <div className="form-step">
      <h3>Guarantor Info</h3>

      {/* Profile Picture Upload with Button Inside */}
      <div className="mb-3 text-center" style={{ position: "relative" }}>
        <label
          htmlFor="guarantorProfilePicture"
          style={{
            display: "inline-block",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="Guarantor Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#555",
                fontSize: "12px",
                textAlign: "center",
                padding: "5px",
              }}
            >
              Upload Picture
            </div>
          )}
          <input
            id="guarantorProfilePicture"
            type="file"
            accept=".jpg,.jpeg,.png"
            style={{
              display: "block",
              opacity: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              cursor: "pointer",
            }}
            onChange={(e) =>
              handleInputChange({
                target: { name: "guarantorProfilePicture", value: e.target.files[0] },
              })
            }
          />
        </label>
      </div>

      <div className="form-grid">
        <input
          name="guarantorName"
          placeholder="Guarantor Full Name"
          value={formData.guarantorName || ""}
          onChange={handleInputChange}
          required
        />

        <input
          name="guarantorPhone"
          placeholder="Guarantor Contact"
          value={formData.guarantorPhone || ""}
          onChange={handleInputChange}
          required
        />

        <input
          name="guarantorAddress"
          placeholder="Guarantor GPS Address"
          value={formData.guarantorAddress || ""}
          onChange={handleInputChange}
        />

        <input
          name="guarantorResidenceLocation"
          placeholder="Guarantor Residential Location"
          value={formData.guarantorResidenceLocation || ""}
          onChange={handleInputChange}
        />

        <input
          name="guarantorIdNumber"
          placeholder="Guarantor ID Number"
          value={formData.guarantorIdNumber || ""}
          onChange={handleInputChange}
        />

        <select
          name="guarantorEmployeeType"
          value={employeeType}
          onChange={handleEmployeeTypeChange}
          required
        >
          <option value="">Guarantor Type of Employee</option>
          <option value="salary worker">Salary Worker</option>
          <option value="self-employed">Self Employed</option>
        </select>

        {/* Salary Worker Fields */}
        {employeeType === "salary worker" && (
          <>
            <input
              name="guarantorRank"
              placeholder="Rank / Position"
              value={formData.guarantorRank || ""}
              onChange={handleInputChange}
            />

            <input
              name="guarantorWorkLocation"
              placeholder="Location of Work"
              value={formData.guarantorWorkLocation || ""}
              onChange={handleInputChange}
            />

             <input
              name="guarantorNameOfEmployer"
              placeholder="Name of Employer"
              value={formData.guarantorNameOfEmployer || ""}
              onChange={handleInputChange}
            />


            <input
              type="number"
              name="guarantorYearsInService"
              placeholder="Years in Service"
              value={formData.guarantorYearsInService || ""}
              onChange={handleInputChange}
            />

            <div>
              <label>Recent Payslip</label>
              <input
                type="file"
                name="guarantorPayslip"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Ghana Card Front</label>
              <input
                type="file"
                name="guarantorGhanaCardFront"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Ghana Card Back</label>
              <input
                type="file"
                name="guarantorGhanaCardBack"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {/* Self Employed Fields */}
        {employeeType === "self-employed" && (
          <>
            <input
              name="guarantorBusinessName"
              placeholder="Business Name"
              value={formData.guarantorBusinessName || ""}
              onChange={handleInputChange}
            />

            <input
              name="guarantorBusinessLocation"
              placeholder="Business Location"
              value={formData.guarantorBusinessLocation || ""}
              onChange={handleInputChange}
            />

            <input
              type="number"
              name="guarantorYearsInBusiness"
              placeholder="Years in Business"
              value={formData.guarantorYearsInBusiness || ""}
              onChange={handleInputChange}
            />

            <div>
              <label>Business Picture</label>
              <input
                type="file"
                name="guarantorBusinessPicture"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Ghana Card Front</label>
              <input
                type="file"
                name="guarantorGhanaCardFront"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Ghana Card Back</label>
              <input
                type="file"
                name="guarantorGhanaCardBack"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GuarantorInfo;