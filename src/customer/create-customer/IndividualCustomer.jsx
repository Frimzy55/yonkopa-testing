// IndividualCustomer.jsx
import React, { useState } from "react";
import "./IndividualCustomer.css";

const IndividualCustomer = () => {
  const [activeSection, setActiveSection] = useState("biodata");
  const [registrationType, setRegistrationType] = useState("detailed");
  const [formData, setFormData] = useState({
    // Biodata
    title: '',
    firstName: '',
    lastName: '',
    otherNames: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    maritalStatus: '',
    religion: '',
    education: '',
    nationalId: '',
    // Contact
    email: '',
    phone: '',
    altPhone: '',
    address: '',
    city: '',
    postalCode: '',
    // Occupation
    employer: '',
    jobTitle: '',
    industry: '',
    monthlyIncome: '',
    yearsEmployed: '',
    // References
    referenceName: '',
    referenceContact: '',
    referenceRelation: '',
    secondReferenceName: '',
    secondReferenceContact: '',
    // PEP
    isPEP: 'No',
    pepDetails: '',
    pepPosition: '',
    pepCountry: ''
  });

  // Define steps based on registration type
  const getSteps = () => {
    if (registrationType === "express") {
      return ["biodata", "contact", "uploads"];
    }
    return ["biodata", "contact", "occupation", "references", "pep", "uploads"];
  };

  const steps = getSteps();
  const currentIndex = steps.indexOf(activeSection);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationTypeChange = (e) => {
    const newType = e.target.value;
    setRegistrationType(newType);
    // Reset to first section when changing registration type
    setActiveSection("biodata");
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setActiveSection(steps[currentIndex + 1]);
      // Scroll to top of form content
      const formContent = document.querySelector('.individual-customer-container .form-content');
      if (formContent) {
        formContent.scrollTop = 0;
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(steps[currentIndex - 1]);
      // Scroll to top of form content
      const formContent = document.querySelector('.individual-customer-container .form-content');
      if (formContent) {
        formContent.scrollTop = 0;
      }
    }
  };

  const handleCreateCustomer = () => {
    // Here you would typically submit the form data to your API
    console.log('Form Data:', formData);
    console.log('Registration Type:', registrationType);
    alert("Customer created successfully!");
  };

  return (
    <div className="individual-customer-container">
      {/* HEADER */}
      <div className="customer-panel-header">
        <div>
          <h2>Create Customer</h2>
          <p>Individual Customer Registration</p>
        </div>
      </div>

      {/* BODY */}
      <div className="customer-panel-body">
        {/* TOP BAR */}
        <div className="form-topbar">
          <label>Registration Type</label>
          <select 
            value={registrationType}
            name="registrationType"
            onChange={handleRegistrationTypeChange}
          >
            <option value="express">Express</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>

        {/* STEP BAR */}
        <div className="step-bar">
          {steps.map((step) => (
            <button
              key={step}
              className={activeSection === step ? "active" : ""}
              onClick={() => {
                setActiveSection(step);
                // Scroll to top when changing steps
                const formContent = document.querySelector('.individual-customer-container .form-content');
                if (formContent) {
                  formContent.scrollTop = 0;
                }
              }}
            >
              {step.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SCROLLABLE CONTENT - ONLY THIS PART SCROLLS */}
        <div className="form-content">
          {/* BIODATA */}
          {activeSection === "biodata" && (
            <section className="form-section">
              <h3>Personal Details</h3>
              <select 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              >
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
              </select>
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="otherNames"
                placeholder="Other Names" 
                value={formData.otherNames}
                onChange={handleInputChange}
              />
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input 
                type="date" 
                name="dateOfBirth"
                placeholder="Date of Birth" 
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="placeOfBirth"
                placeholder="Place of Birth" 
                value={formData.placeOfBirth}
                onChange={handleInputChange}
              />
              <select 
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              <select 
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
              >
                <option value="">Select Religion</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Other">Other</option>
              </select>
              <select 
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              >
                <option value="">Select Education Level</option>
                <option value="No Formal Education">No Formal Education</option>
                <option value="Primary School">Primary School</option>
                <option value="Secondary School">Secondary School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
              </select>
              <input 
                type="text" 
                name="nationalId"
                placeholder="National ID / Passport" 
                value={formData.nationalId}
                onChange={handleInputChange}
              />
            </section>
          )}

          {/* CONTACT */}
          {activeSection === "contact" && (
            <section className="form-section">
              <h3>Contact Details</h3>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input 
                type="tel" 
                name="altPhone"
                placeholder="Alternative Phone" 
                value={formData.altPhone}
                onChange={handleInputChange}
              />
              <textarea 
                name="address"
                placeholder="Physical Address"
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
              <input 
                type="text" 
                name="city"
                placeholder="City / Town" 
                value={formData.city}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="postalCode"
                placeholder="Postal Code" 
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </section>
          )}

          {/* OCCUPATION - Only shown in detailed mode */}
          {registrationType === "detailed" && activeSection === "occupation" && (
            <section className="form-section">
              <h3>Occupation & Employment</h3>
              <input 
                type="text" 
                name="employer"
                placeholder="Employer Name" 
                value={formData.employer}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="jobTitle"
                placeholder="Job Title" 
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="industry"
                placeholder="Industry" 
                value={formData.industry}
                onChange={handleInputChange}
              />
              <input 
                type="number" 
                name="monthlyIncome"
                placeholder="Monthly Income (USD)" 
                value={formData.monthlyIncome}
                onChange={handleInputChange}
              />
              <input 
                type="number" 
                name="yearsEmployed"
                placeholder="Years of Employment" 
                value={formData.yearsEmployed}
                onChange={handleInputChange}
              />
            </section>
          )}

          {/* REFERENCES - Only shown in detailed mode */}
          {registrationType === "detailed" && activeSection === "references" && (
            <section className="form-section">
              <h3>References</h3>
              <input 
                type="text" 
                name="referenceName"
                placeholder="Reference Name" 
                value={formData.referenceName}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="referenceContact"
                placeholder="Reference Contact" 
                value={formData.referenceContact}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="referenceRelation"
                placeholder="Reference Relationship" 
                value={formData.referenceRelation}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="secondReferenceName"
                placeholder="Second Reference Name" 
                value={formData.secondReferenceName}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="secondReferenceContact"
                placeholder="Second Reference Contact" 
                value={formData.secondReferenceContact}
                onChange={handleInputChange}
              />
            </section>
          )}

          {/* PEP - Only shown in detailed mode */}
          {registrationType === "detailed" && activeSection === "pep" && (
            <section className="form-section">
              <h3>PEP (Politically Exposed Person)</h3>
              <select 
                name="isPEP"
                value={formData.isPEP}
                onChange={handleInputChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {formData.isPEP === "Yes" && (
                <>
                  <input 
                    type="text" 
                    name="pepDetails"
                    placeholder="Please provide details" 
                    value={formData.pepDetails}
                    onChange={handleInputChange}
                  />
                  <input 
                    type="text" 
                    name="pepPosition"
                    placeholder="Position Held" 
                    value={formData.pepPosition}
                    onChange={handleInputChange}
                  />
                  <input 
                    type="text" 
                    name="pepCountry"
                    placeholder="Country" 
                    value={formData.pepCountry}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </section>
          )}

          {/* UPLOADS */}
          {activeSection === "uploads" && (
            <section className="form-section">
              <h3>Document Uploads</h3>
              <div className="upload-field">
                <label>National ID / Passport</label>
                <input type="file" accept="image/*,.pdf" />
              </div>
              <div className="upload-field">
                <label>Proof of Address</label>
                <input type="file" accept="image/*,.pdf" />
              </div>
              <div className="upload-field">
                <label>Passport Photo</label>
                <input type="file" accept="image/*" />
              </div>
              {registrationType === "detailed" && (
                <div className="upload-field">
                  <label>Employment Letter / Payslip</label>
                  <input type="file" accept="image/*,.pdf" />
                </div>
              )}
            </section>
          )}
        </div>

        {/* ACTIONS - FIXED AT BOTTOM */}
        <div className="form-actions">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={currentIndex === 0 ? 'disabled' : ''}
          >
            Previous
          </button>
          {currentIndex < steps.length - 1 ? (
            <button onClick={handleNext}>
              Next
            </button>
          ) : (
            <button onClick={handleCreateCustomer} className="create-btn">
              Create Customer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualCustomer;