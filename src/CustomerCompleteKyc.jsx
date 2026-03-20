// src/pages/CustomerDashboard/KYCVerification/CustomerCompleteKyc.jsx

import React, { useState, useEffect } from "react";
import PersonalInfo from "./KycPersonalInfo";
import ContactInfo from "./KycContactInfo";
import EmploymentInfo from "./KycEmploymentInfos";
import "./CustomerCompleteKyc.css";
import ReferenceInfo from "./KycReferenceInfo";
//mport { io } from "socket.io-client";

const CustomerCompleteKyc = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [checkingNationalId, setCheckingNationalId] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const [formData, setFormData] = useState({
     // userId: "", // ✅ ADD THIS

  userId: user?.id || user?.userId || "", // ✅ ADD THIS
  kycCode:"",
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


      // REFERENCES
  referenceName1: "",
  referencePhone1: "",
  referenceRelationship1: "",

  referenceName2: "",
  referencePhone2: "",
  referenceRelationship2: "",
  });

  // Autofill user info
  useEffect(() => {
    if (!user) return;

    const fullname = user.fullname || user.fullName || "";
    const nameParts = fullname.trim().split(" ");

    setFormData((prev) => ({
      ...prev,
       //userId: user.id, // ✅ VERY IMPORTANT
      // userId: user?.id || user?.userId || null, // ✅ safe fallback
        //userId: user?.id || user?.userId || "", // ✅ ADD THIS
          userId: user?.id || user?.userId || "", // ✅ IMPORTANT
           kycCode: user.kycCode || "",
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
      const ghanaCardRegex = /^GHA-\d{9}-\d$/;
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
    const ghanaCardRegex = /^GHA-\d{9}-\d$/;
   // const id = formData.nationalId.trim();
    const id = formData.nationalId.trim().toUpperCase(); // trim + uppercase
     //const exists = await checkNationalIdExists(id);

    if (!formData.avatar) errors.avatar = "Profile picture required";
    if (!formData.title) errors.title = "Title required";
    if (!formData.firstName) errors.firstName = "First name required";
    if (!formData.lastName) errors.lastName = "Last name required";
    //if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth required";
    const today = new Date();
    const dob = new Date(formData.dateOfBirth);

if (!formData.dateOfBirth) {
  errors.dateOfBirth = "Date of birth required";
} else {
  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    errors.dateOfBirth = "You must be at least 18 years old";
  } else if (age > 60) {
    errors.dateOfBirth = "Age must not be more than 60 years";
  }
}
    if (!formData.gender) errors.gender = "Gender required";
     if (!formData.gender) errors.gender = "Gender required";


    if (!id) errors.nationalId = "National ID required";
    else if (!ghanaCardRegex.test(id)) errors.nationalId = "Invalid format. Example: GHA-123456789-1";
    else {
      const exists = await checkNationalIdExists(id);
      if (exists) errors.nationalId = "This National ID is already registered";
    }

    //if (!formData.residentialLocation) errors.residentialLocation = "Residential location required";
  

    if (formData.maritalStatus === "married") {
      if (!formData.spouseName) errors.spouseName = "Spouse name required";
      if (!formData.spouseContact) errors.spouseContact = "Spouse contact required";
    }

    // if (!formData.residentialLandmark) errors.residentialLandmark = "Residential landmark required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };



   // ----------------------------
  // STEP 2 VALIDATION (Contact Info)
  const validateStep2 = () => {
    const errors = {};
    if (!formData.residentialAddress) errors.residentialAddress = "Residential address required";
    if (!formData.city) errors.city = "City/Town required";
    if (!formData.state) errors.state = "Suburb/Area required";
    if (!formData.alternatePhone)
      errors.alternatePhone = "Alternate phone number required";
    else if (!/^\d{10,15}$/.test(formData.alternatePhone))
      errors.alternatePhone = "Enter valid phone number (10-15 digits)";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const validateStep3 = () => {
  const errors = {};

  if (!formData.employmentStatus) {
    errors.employmentStatus = "Employment status required";
  } else if (formData.employmentStatus === "salary-worker") {
    if (!formData.employerName) errors.employerName = "Employer name required";
    if (!formData.jobTitle) errors.jobTitle = "Job title required";
    if (!formData.monthlyIncome) errors.monthlyIncome = "Monthly income required";
    if (!formData.yearsInCurrentEmployment) errors.yearsInCurrentEmployment = "Years in employment required";
    if (!formData.workPlaceLocation) errors.workPlaceLocation = "Workplace location required";
    if (!formData.payslip) errors.payslip = "Recent payslip required";
    if (!formData.ghanaCardFront) errors.ghanaCardFront = "Ghana card required";
    if (!formData.ghanaCardBack) errors.ghanaCardBack = "Ghana card  required";
    if (!formData.employmentId) errors.employmentId = "Employment Id required";
  } else if (formData.employmentStatus === "self-employed") {
    if (!formData.businessName) errors.businessName = "Business name required";
    if (!formData.businessType) errors.businessType = "Business type required";
    if (!formData.monthlyBusinessIncome) errors.monthlyBusinessIncome = "Monthly business income required";
    if (!formData.businessLocation) errors.businessLocation = "Business location required";
    if (!formData.businessGpsAddress) errors.businessGpsAddress = "Business GPS address required";
    if (!formData.numberOfWorkers) errors.numberOfWorkers = "Number of workers required";
    if (!formData.yearsInBusiness) errors.yearsInBusiness = "Years in business required";
    if (!formData.workingCapital) errors.workingCapital = "Working capital required";
    if (!formData.businessPicture) errors.businessPicture = "Business picture required";
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};



const validateStep4 = () => {
  const errors = {};

  if (!formData.referenceName1)
    errors.referenceName1 = "Reference 1 name required";

  if (!formData.referencePhone1)
    errors.referencePhone1 = "Reference 1 phone required";
  else if (!/^\d{10,15}$/.test(formData.referencePhone1))
    errors.referencePhone1 = "Invalid phone number";

  if (!formData.referenceName2)
    errors.referenceName2 = "Reference 2 name required";

  if (!formData.referencePhone2)
    errors.referencePhone2 = "Reference 2 phone required";
  else if (!/^\d{10,15}$/.test(formData.referencePhone2))
    errors.referencePhone2 = "Invalid phone number";

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
    if (currentStep === 2) {
      const valid = validateStep2();
      if (!valid) return;
    }

    if (currentStep === 3) {
    const valid = validateStep3();
    if (!valid) return;
  }

  if (currentStep === 4) {
  const valid = validateStep4();
  if (!valid) return;
}
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };



  
  // ----------------------------
 const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setSubmitMessage(null); // clear old messages

  // Validate Step 3
  const step4Valid = validateStep4();
  if (!step4Valid) {
    setSubmitting(false);
    return;
  }

  try {
    const data = new FormData();

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

    if (result.success || result.message === "KYC Submitted") {
      setSubmitMessage({
        type: "success",
        text: "🎉 KYC Submitted Successfully!",
      });

      // Optional: reset form or go to step 1
      // setCurrentStep(1);

    } else {
      setSubmitMessage({
        type: "error",
        text: result.message || "Submission failed",
      });
    }
  } catch (err) {
    console.error("Error submitting KYC:", err);

    setSubmitMessage({
      type: "error",
      text: "Something went wrong. Please try again.",
    });
  } finally {
    setSubmitting(false);
  }
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
        return <ContactInfo formData={formData}
         handleInputChange={handleInputChange} 
          formErrors={formErrors}
         />;
      case 3:
        return (
          <EmploymentInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
             formErrors={formErrors}
          />
        );

        case 4:
  return (
    <ReferenceInfo
      formData={formData}
      handleInputChange={handleInputChange}
      formErrors={formErrors}
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

        <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
  <div className="step-circle">4</div>
  <div className="step-label">References</div>
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

          {currentStep < 4 && (
            <button
              type="button"
              className="btn-next"
              onClick={nextStep}
              disabled={checkingNationalId} // Disable while checking National ID
            >
              {checkingNationalId ? "Checking..." : "Next"}
            </button>
          )}

          {currentStep === 4 && (
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}

          
        </div>
          {submitMessage && (
  <div
    className={`submit-message ${
      submitMessage.type === "success"
        ? "success-message"
        : "error-message"
    }`}
  >
    {submitMessage.text}
  </div>
)}
      </form>
    </div>
  );
};

export default CustomerCompleteKyc;