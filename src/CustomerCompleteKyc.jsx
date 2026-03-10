// src/pages/CustomerDashboard/KYCVerification/CustomerCompleteKyc.jsx
import React, { useState, useEffect } from "react";
import PersonalInfo from "./KycPersonalInfo";
import ContactInfo from "./KycContactInfo";
import EmploymentInfo from "./KycEmploymentInfos";
import "./CustomerCompleteKyc.css";

const CustomerCompleteKyc = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Info
    
    avatar: null, // added for avatar
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationalId: "",
    taxId: "",
    residentialLocation: "",
    residentialLandmark: "",
    spouseName: "",
    spouseContact: "",
    //avatar: null, // added for avatar
    // Contact Info
    mobileNumber: "",
    email: "",
    residentialAddress: "",
    city: "",
    state: "",
    zipCode: "",
    postalAddress: "",
    // Employment Info
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    yearsInCurrentEmployment: "",
    workPlaceLocation: "",
    payslip: null,
    ghanaCardFront: null,
    ghanaCardBack: null,
    employmentId: null,
    businessName: "",
    businessType: "",
    monthlyBusinessIncome: "",
    businessLocation: "",
    businessGpsAddress: "",
    numberOfWorkers: "",
    yearsInBusiness: "",
    workingCapital: "",
    businessPicture: null,
  });

  // Autofill from user data
  useEffect(() => {
    if (!user) return;
    const fullname = user.fullname || user.fullName || "";
    const nameParts = fullname.trim().split(" ");

    setFormData((prev) => ({
      ...prev,
      firstName: nameParts[0] || "",
      middleName: nameParts.length === 3 ? nameParts[1] : "",
      lastName: nameParts.length >= 2 ? nameParts[nameParts.length - 1] : "",
      email: user.email || "",
      mobileNumber: user.phone || "",
    }));
  }, [user]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads (avatar, payslip, etc.)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Submit KYC form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();

      // Append all fields to FormData
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/kyc/submit`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("KYC Submitted Successfully");
        console.log(result);
      } else {
        alert(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      alert("Error submitting KYC. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            user={user}
          />
        );
      case 2:
        return (
          <ContactInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <EmploymentInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="content-section">
      <h2>KYC Verification</h2>

      {/* Progress Stepper */}
      <div className="kyc-progress">
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
          <div className="step-circle">1</div>
          <div className="step-label">Personal Info</div>
        </div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
          <div className="step-circle">2</div>
          <div className="step-label">Contact Info</div>
        </div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-circle">3</div>
          <div className="step-label">Employment Info</div>
        </div>
      </div>

      <form className="kyc-form" onSubmit={handleSubmit}>
        {renderStep()}

        <div className="form-navigation mt-3">
          {currentStep > 1 && (
            <button type="button" className="btn-prev" onClick={prevStep}>
              Previous
            </button>
          )}

          {currentStep < 3 && (
            <button type="button" className="btn-next" onClick={nextStep}>
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerCompleteKyc;