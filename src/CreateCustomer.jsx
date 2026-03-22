// CreateCustomer.jsx
import React, { useState } from 'react';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    idType: 'National ID',
    idNumber: '',
    occupation: '',
    annualIncome: '',
    nationality: ''
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
      // API call to create customer
      console.log('Customer Data:', formData);
      alert('Customer created successfully!');
      // Reset form or redirect
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        idType: 'National ID',
        idNumber: '',
        occupation: '',
        annualIncome: '',
        nationality: ''
      });
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      idType: 'National ID',
      idNumber: '',
      occupation: '',
      annualIncome: '',
      nationality: ''
    });
    setErrors({});
  };

  return (
    <div>
      <h6 className="mb-4">Create New Customer</h6>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Personal Information Section */}
          <div className="col-12">
            <h6 className="text-primary mb-3">Personal Information</h6>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Phone Number <span className="text-danger">*</span></label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          
          <div className="col-md-12">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              placeholder="Enter residential address"
            ></textarea>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Nationality</label>
            <input
              type="text"
              className="form-control"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Enter nationality"
            />
          </div>
          
          {/* Identification Section */}
          <div className="col-12 mt-3">
            <h6 className="text-primary mb-3">Identification Details</h6>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">ID Type</label>
            <select
              className="form-select"
              name="idType"
              value={formData.idType}
              onChange={handleChange}
            >
              <option>National ID</option>
              <option>Passport</option>
              <option>Driver's License</option>
              <option>Voter's Card</option>
            </select>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">ID Number <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Enter ID number"
            />
            {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
          </div>
          
          {/* Employment Information */}
          <div className="col-12 mt-3">
            <h6 className="text-primary mb-3">Employment Information</h6>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Occupation</label>
            <input
              type="text"
              className="form-control"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Enter occupation"
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Annual Income</label>
            <input
              type="number"
              className="form-control"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              placeholder="Enter annual income"
            />
          </div>
          
          {/* Form Actions */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary me-2">
              <i className="bi bi-save me-2"></i>Create Customer
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              <i className="bi bi-arrow-repeat me-2"></i>Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;