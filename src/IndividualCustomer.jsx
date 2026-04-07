// IndividualCustomer.jsx
import React, { useState } from 'react';

const IndividualCustomer = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    // Contact Information
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    // Identification
    idType: 'National ID',
    idNumber: '',
    idExpiryDate: '',
    // Employment
    employmentStatus: '',
    occupation: '',
    employerName: '',
    annualIncome: '',
    // Banking Preferences
    accountType: 'Savings',
    initialDeposit: '',
    branchCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.idNumber) newErrors.idNumber = 'ID number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Individual Customer Data:', formData);
      alert('Individual customer created successfully!');
      // Reset form or redirect
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      email: '',
      phone: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      idType: 'National ID',
      idNumber: '',
      idExpiryDate: '',
      employmentStatus: '',
      occupation: '',
      employerName: '',
      annualIncome: '',
      accountType: 'Savings',
      initialDeposit: '',
      branchCode: ''
    });
    setErrors({});
  };

  return (
    <div>
      <div className="mb-4">
        <h6 className="text-primary">Create Individual Customer</h6>
        <p className="text-muted small">Fill in the details below to register a new individual customer</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Personal Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Title</label>
                <select className="form-select" name="title" value={formData.title} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">First Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-5">
                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Nationality</label>
                <input type="text" className="form-control" name="nationality" value={formData.nationality} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Contact Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone <span className="text-danger">*</span></label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Postal Code</label>
                <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Identification */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Identification</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">ID Type</label>
                <select className="form-select" name="idType" value={formData.idType} onChange={handleChange}>
                  <option>National ID</option>
                  <option>Passport</option>
                  <option>Driver's License</option>
                  <option>Voter's Card</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">ID Number <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
                {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">ID Expiry Date</label>
                <input type="date" className="form-control" name="idExpiryDate" value={formData.idExpiryDate} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Employment Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Employment Status</label>
                <select className="form-select" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Employed</option>
                  <option>Self-Employed</option>
                  <option>Unemployed</option>
                  <option>Retired</option>
                  <option>Student</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Occupation</label>
                <input type="text" className="form-control" name="occupation" value={formData.occupation} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Employer Name</label>
                <input type="text" className="form-control" name="employerName" value={formData.employerName} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Annual Income</label>
                <input type="number" className="form-control" name="annualIncome" value={formData.annualIncome} onChange={handleChange} placeholder="USD" />
              </div>
            </div>
          </div>
        </div>

        {/* Banking Preferences */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Banking Preferences</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Account Type</label>
                <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange}>
                  <option>Savings</option>
                  <option>Current</option>
                  <option>Fixed Deposit</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Initial Deposit</label>
                <input type="number" className="form-control" name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} placeholder="Amount" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Branch Code</label>
                <input type="text" className="form-control" name="branchCode" value={formData.branchCode} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            <i className="bi bi-arrow-repeat me-2"></i>Reset
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-save me-2"></i>Create Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndividualCustomer;