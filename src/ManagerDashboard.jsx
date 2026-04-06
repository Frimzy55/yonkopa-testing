import React, { useState, useEffect } from "react";
import PersonalInfo from "./KycPersonalInfo";
import ContactInfo from "./KycContactInfo";
import EmploymentInfo from "./KycEmploymentInfos";
import ReferenceInfo from "./KycReferenceInfo";
import "./CustomerCompleteKyc.css";

const CustomerCompleteKyc = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false); // ✅ new flag
  const [formData, setFormData] = useState({
    userId: "",
    kycCode: "",
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
    alternatePhone: "",
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
      kycCode: user.kycCode || "",
      userId: user.userId || "",
      firstName: nameParts[0] || "",
      middleName: nameParts.length === 3 ? nameParts[1] : "",
      lastName: nameParts.length >= 2 ? nameParts[nameParts.length - 1] : "",
      email: user.email || "",
      mobileNumber: user.phone || "",
    }));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // ==========================
  // SAVE FUNCTIONS
  // ==========================
  const savePersonalInfo = async () => {
    try {
      const data = new FormData();
      data.append("userId", formData.userId);
      data.append("title", formData.title);
      data.append("firstname", formData.firstName);
      data.append("middlename", formData.middleName);
      data.append("lastname", formData.lastName);
      data.append("dateofbirth", formData.dateOfBirth);
      data.append("gender", formData.gender);
      data.append("maritalstatus", formData.maritalStatus);
      data.append("nationalid", formData.nationalId);
      data.append("residentiallocation", formData.residentialLocation);
      data.append("spousename", formData.spouseName);
      data.append("spousecontact", formData.spouseContact);
      if (formData.avatar) data.append("avatar", formData.avatar);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/kyc/save-personal`,
        { method: "POST", body: data }
      );
      const result = await res.json();
      return result.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const saveContactInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/kyc/save-contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: formData.userId,
            mobileNumber: formData.mobileNumber,
            email: formData.email,
            residentialAddress: formData.residentialAddress,
            residentialLandmark: formData.residentialLandmark,
            city: formData.city,
            state: formData.state,
            alternatePhone: formData.alternatePhone,
          }),
        }
      );
      const result = await res.json();
      return result.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const saveEmploymentInfo = async () => {
    try {
      const data = new FormData();
      data.append("userId", formData.userId);
      data.append("employmentStatus", formData.employmentStatus);
      data.append("employerName", formData.employerName);
      data.append("jobTitle", formData.jobTitle);
      data.append("monthlyIncome", formData.monthlyIncome);
      data.append("yearsInCurrentEmployment", formData.yearsInCurrentEmployment);
      data.append("workPlaceLocation", formData.workPlaceLocation);
      data.append("businessName", formData.businessName);
      data.append("businessType", formData.businessType);
      data.append("monthlyBusinessIncome", formData.monthlyBusinessIncome);
      data.append("businessLocation", formData.businessLocation);
      data.append("businessGpsAddress", formData.businessGpsAddress);
      data.append("numberOfWorkers", formData.numberOfWorkers);
      data.append("yearsInBusiness", formData.yearsInBusiness);
      data.append("workingCapital", formData.workingCapital);
      if (formData.payslip) data.append("payslip", formData.payslip);
      if (formData.ghanaCardFront) data.append("ghanaCardFront", formData.ghanaCardFront);
      if (formData.ghanaCardBack) data.append("ghanaCardBack", formData.ghanaCardBack);
      if (formData.employmentId) data.append("employmentId", formData.employmentId);
      if (formData.businessPicture) data.append("businessPicture", formData.businessPicture);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/kyc/save-employment`,
        { method: "POST", body: data }
      );
      const result = await res.json();
      return result.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const saveReferenceInfo = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/kyc/save-reference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: formData.userId,
          referenceName1: formData.referenceName1,
          referencePhone1: formData.referencePhone1,
          referenceRelationship1: formData.referenceRelationship1,
          referenceName2: formData.referenceName2,
          referencePhone2: formData.referencePhone2,
          referenceRelationship2: formData.referenceRelationship2,
        }),
      });
      const result = await res.json();
      return result.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // ==========================
  // STEP NAVIGATION
  // ==========================
  const nextStep = async () => {
    setSubmitting(true);
    let success = true;
    if (currentStep === 1) success = await savePersonalInfo();
    if (currentStep === 2) success = await saveContactInfo();
    if (currentStep === 3) success = await saveEmploymentInfo();
    setSubmitting(false);
    if (!success) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // ==========================
  // FINAL SUBMIT
  // ==========================
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await saveReferenceInfo();
    setSubmitting(false);
    if (success) {
      setSubmitMessage({ type: "success", text: "✅ KYC submitted successfully!" });
      setSubmitted(true); // ✅ switch to preview mode
    } else {
      setSubmitMessage({ type: "error", text: "❌ Failed to submit KYC. Try again." });
    }
  };

  // ==========================
  // RENDER STEPS
  // ==========================
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} user={user} />;
      case 2:
        return <ContactInfo formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <EmploymentInfo formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} />;
      case 4:
        return <ReferenceInfo formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  // ==========================
  // PREVIEW AFTER SUBMIT
  // ==========================
  const renderPreview = () => (
    <div className="kyc-preview">
      <h3>✅ KYC Submitted Successfully!</h3>
      <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone:</strong> {formData.mobileNumber}</p>
      <p><strong>Employment Status:</strong> {formData.employmentStatus}</p>
      <p><strong>Employer / Business:</strong> {formData.employerName || formData.businessName}</p>
      <p><strong>References:</strong></p>
      <ul>
        <li>{formData.referenceName1} - {formData.referencePhone1} ({formData.referenceRelationship1})</li>
        <li>{formData.referenceName2} - {formData.referencePhone2} ({formData.referenceRelationship2})</li>
      </ul>
    </div>
  );




  // ==========================
// STEP CARDS (PROGRESS BAR)
// ==========================
const StepCards = () => {
  const steps = [
    { number: 1, label: "Personal" },
    { number: 2, label: "Contact" },
    { number: 3, label: "Employment" },
    { number: 4, label: "Reference" },
  ];

  return (
    <div className="step-cards-container">
      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        const isLocked = step.number > currentStep;

        return (
          <div
            key={step.number}
            className={`step-card ${
              isActive ? "active" : isCompleted ? "completed" : ""
            }`}
            onClick={() => !isLocked && setCurrentStep(step.number)}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-title">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};

  return (
    <div className="content-section">
      <h2>KYC Forms</h2>
      {submitted ? (
        renderPreview()
      ) : (
        <>
        {/* ✅ STEP CARDS ADDED HERE */}
        <StepCards />
        <form className="kyc-form" onSubmit={handleFinalSubmit}>
          {renderStep()}
          <div className="form-navigation mt-3">
            {currentStep > 1 && <button type="button" onClick={prevStep}>Previous</button>}
            {currentStep < 4 && <button type="button" onClick={nextStep} disabled={submitting}>{submitting ? "Saving..." : "Next"}</button>}
            {currentStep === 4 && <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>}
          </div>
          {submitMessage && <div className={submitMessage.type + "-message"}>{submitMessage.text}</div>}
        </form>
         </>
      )}
    </div>
  );
};

export default CustomerCompleteKyc;