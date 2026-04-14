// Step 1: Personal Info Validation
export const validatePersonalInfo = (formData) => {
  const errors = {};
  
  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required";
  }
  
  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }
  
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else {
    // Validate age (minimum 18 years)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      errors.dateOfBirth = "You must be at least 18 years old";
    }
  }
  
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }
  
  if (!formData.maritalStatus) {
    errors.maritalStatus = "Marital status is required";
  }
  
  if (!formData.nationalId?.trim()) {
    errors.nationalId = "National ID is required";
  } else if (formData.nationalId.length < 8) {
    errors.nationalId = "Valid National ID is required";
  }
  
  if (!formData.residentialLocation?.trim()) {
    errors.residentialLocation = "Residential location is required";
  }
  
  // Conditional validation for spouse info if married
  if (formData.maritalStatus === "Married") {
    if (!formData.spouseName?.trim()) {
      errors.spouseName = "Spouse name is required for married applicants";
    }
    if (!formData.spouseContact?.trim()) {
      errors.spouseContact = "Spouse contact is required for married applicants";
    }
  }
  
  // Avatar validation (optional but recommended)
  if (!formData.avatar && !formData.avatar instanceof File) {
    errors.avatar = "Profile picture is recommended";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Step 2: Contact Info Validation
export const validateContactInfo = (formData) => {
  const errors = {};
  
  // Mobile number validation (Ghana format)
  if (!formData.mobileNumber?.trim()) {
    errors.mobileNumber = "Mobile number is required";
  } else {
    const phoneRegex = /^(0[2-9]\d{8})$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      errors.mobileNumber = "Valid Ghana phone number is required (e.g., 024XXXXXXX)";
    }
  }
  
  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email address is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Valid email address is required";
    }
  }
  
  if (!formData.residentialAddress?.trim()) {
    errors.residentialAddress = "Residential address is required";
  }
  
  if (!formData.city?.trim()) {
    errors.city = "City is required";
  }
  
  if (!formData.state?.trim()) {
    errors.state = "Region/State is required";
  }
  
  if (!formData.zipCode?.trim()) {
    errors.zipCode = "Zip/Postal code is required";
  }
  
  // Optional: Alternate phone validation if provided
  if (formData.alternatePhone && formData.alternatePhone.trim()) {
    const phoneRegex = /^(0[2-9]\d{8})$/;
    if (!phoneRegex.test(formData.alternatePhone)) {
      errors.alternatePhone = "Valid alternate phone number is required";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Step 3: Employment Info Validation
export const validateEmploymentInfo = (formData) => {
  const errors = {};
  
  if (!formData.employmentStatus) {
    errors.employmentStatus = "Employment status is required";
  }
  
  // Employed validation
  if (formData.employmentStatus === "Employed") {
    if (!formData.employerName?.trim()) {
      errors.employerName = "Employer name is required";
    }
    if (!formData.jobTitle?.trim()) {
      errors.jobTitle = "Job title is required";
    }
    if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
      errors.monthlyIncome = "Valid monthly income is required";
    }
    if (!formData.yearsInCurrentEmployment || formData.yearsInCurrentEmployment < 0) {
      errors.yearsInCurrentEmployment = "Years in current employment is required";
    }
    if (!formData.workPlaceLocation?.trim()) {
      errors.workPlaceLocation = "Workplace location is required";
    }
    if (!formData.payslip) {
      errors.payslip = "Payslip upload is required for employed applicants";
    }
  }
  
  // Self-employed validation
  if (formData.employmentStatus === "Self-Employed") {
    if (!formData.businessName?.trim()) {
      errors.businessName = "Business name is required";
    }
    if (!formData.businessType?.trim()) {
      errors.businessType = "Business type is required";
    }
    if (!formData.monthlyBusinessIncome || formData.monthlyBusinessIncome <= 0) {
      errors.monthlyBusinessIncome = "Valid monthly business income is required";
    }
    if (!formData.businessLocation?.trim()) {
      errors.businessLocation = "Business location is required";
    }
    if (!formData.businessGpsAddress?.trim()) {
      errors.businessGpsAddress = "Business GPS address is required";
    }
    if (!formData.numberOfWorkers || formData.numberOfWorkers < 0) {
      errors.numberOfWorkers = "Number of workers is required";
    }
    if (!formData.yearsInBusiness || formData.yearsInBusiness < 0) {
      errors.yearsInBusiness = "Years in business is required";
    }
    if (!formData.businessPicture) {
      errors.businessPicture = "Business picture is required";
    }
  }
  
  // Required documents for everyone
  if (!formData.ghanaCardFront) {
    errors.ghanaCardFront = "Ghana Card (Front) is required";
  }
  if (!formData.ghanaCardBack) {
    errors.ghanaCardBack = "Ghana Card (Back) is required";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Step 4: Reference Info Validation
export const validateReferenceInfo = (formData) => {
  const errors = {};
  
  // Reference 1 validation
  if (!formData.referenceName1?.trim()) {
    errors.referenceName1 = "First reference name is required";
  }
  
  if (!formData.referencePhone1?.trim()) {
    errors.referencePhone1 = "First reference phone number is required";
  } else {
    const phoneRegex = /^(0[2-9]\d{8})$/;
    if (!phoneRegex.test(formData.referencePhone1)) {
      errors.referencePhone1 = "Valid Ghana phone number is required";
    }
  }
  
  if (!formData.referenceRelationship1?.trim()) {
    errors.referenceRelationship1 = "Relationship with first reference is required";
  }
  
  // Reference 2 validation
  if (!formData.referenceName2?.trim()) {
    errors.referenceName2 = "Second reference name is required";
  }
  
  if (!formData.referencePhone2?.trim()) {
    errors.referencePhone2 = "Second reference phone number is required";
  } else {
    const phoneRegex = /^(0[2-9]\d{8})$/;
    if (!phoneRegex.test(formData.referencePhone2)) {
      errors.referencePhone2 = "Valid Ghana phone number is required";
    }
  }
  
  if (!formData.referenceRelationship2?.trim()) {
    errors.referenceRelationship2 = "Relationship with second reference is required";
  }
  
  // Check if references are the same person
  if (formData.referencePhone1 === formData.referencePhone2 && 
      formData.referencePhone1 && formData.referencePhone2) {
    errors.referencePhone2 = "References must be different people";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};