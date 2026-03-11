// src/pages/CustomerDashboard/KYCVerification/CustomerCompleteKyc.jsx

import React, { useState, useEffect } from "react";
import PersonalInfo from "./KycPersonalInfo";
import ContactInfo from "./KycContactInfo";
import EmploymentInfo from "./KycEmploymentInfos";
import "./CustomerCompleteKyc.css";

const CustomerCompleteKyc = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [checkingNationalId, setCheckingNationalId] = useState(false);

  const [formData, setFormData] = useState({
    avatar: null,
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
    mobileNumber: "",
    email: "",
    residentialAddress: "",
    city: "",
    state: "",
    zipCode: "",
    postalAddress: "",
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

  // Autofill user info
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[name]) delete newErrors[name];
      return newErrors;
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // ----------------------------
  // Reusable National ID check
  const checkNationalIdExists = (nationalId) => {
    return new Promise((resolve) => {
      const url = `${process.env.REACT_APP_API_URL}/api/kyc/checks-national-id?nationalId=${encodeURIComponent(
        nationalId
      )}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data.exists))
        .catch((err) => {
          console.error("Error checking National ID:", err);
          resolve(false);
        });
    });
  };

  // LIVE NATIONAL ID CHECK
  useEffect(() => {
    if (!formData.nationalId) return;

    const timer = setTimeout(async () => {
      const ghanaCardRegex = /^GHA-\d{10}-\d$/;
      const id = formData.nationalId.trim();
      if (!ghanaCardRegex.test(id)) return;

      setCheckingNationalId(true);
      const exists = await checkNationalIdExists(id);

      setFormErrors((prev) => {
        const newErrors = { ...prev };
        if (exists) newErrors.nationalId = "This National ID is already registered";
        else delete newErrors.nationalId;
        return newErrors;
      });

      setCheckingNationalId(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.nationalId]);

  // ----------------------------
  // STEP 1 VALIDATION
  const validateStep1 = async () => {
    let errors = {};
    const ghanaCardRegex = /^GHA-\d{10}-\d$/;
   // const id = formData.nationalId.trim();
    const id = formData.nationalId.trim().toUpperCase(); // trim + uppercase
     //const exists = await checkNationalIdExists(id);

    if (!formData.avatar) errors.avatar = "Profile picture required";
    if (!formData.title) errors.title = "Title required";
    if (!formData.firstName) errors.firstName = "First name required";
    if (!formData.lastName) errors.lastName = "Last name required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth required";
    if (!formData.gender) errors.gender = "Gender required";

    if (!id) errors.nationalId = "National ID required";
    else if (!ghanaCardRegex.test(id)) errors.nationalId = "Invalid format. Example: GHA-1234567890-1";
    else {
      const exists = await checkNationalIdExists(id);
      if (exists) errors.nationalId = "This National ID is already registered";
    }

    if (!formData.residentialLocation) errors.residentialLocation = "Residential location required";

    if (formData.maritalStatus === "married") {
      if (!formData.spouseName) errors.spouseName = "Spouse name required";
      if (!formData.spouseContact) errors.spouseContact = "Spouse contact required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ----------------------------
  // STEP NAVIGATION
  const nextStep = async () => {
    if (currentStep === 1) {
      const valid = await validateStep1();
      if (!valid) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // ----------------------------
  // SUBMIT KYC
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/kyc/submit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success || result.message === "KYC Submitted") {
          alert("KYC Submitted Successfully");
          console.log(result);
        } else {
          alert(result.message || "Submission failed");
        }
      })
      .catch((err) => {
        console.error("Error submitting KYC:", err);
        alert("Error submitting KYC");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // ----------------------------
  // RENDER STEP
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            formErrors={formErrors}
            checkingNationalId={checkingNationalId}
            user={user}
          />
        );
      case 2:
        return <ContactInfo formData={formData} handleInputChange={handleInputChange} />;
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
      <h2>KYC forms</h2>

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
            <button
              type="button"
              className="btn-next"
              onClick={nextStep}
              disabled={checkingNationalId} // Disable while checking National ID
            >
              {checkingNationalId ? "Checking..." : "Next"}
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