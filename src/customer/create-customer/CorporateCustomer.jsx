// CorporateCustomer.jsx
import React, { useState } from 'react';

const CorporateCustomer = () => {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    registrationNumber: '',
    taxId: '',
    dateOfIncorporation: '',
    companyType: '',
    industry: '',
    website: '',
    // Contact Information
    email: '',
    phone: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    // Authorized Signatories
    authorizedPersonName: '',
    authorizedPersonTitle: '',
    authorizedPersonEmail: '',
    authorizedPersonPhone: '',
    // Banking Details
    accountType: 'Business',
    initialDeposit: '',
    branchCode: '',
    currency: 'USD',
    // Business Information
    numberOfEmployees: '',
    annualTurnover: '',
    businessLicense: ''
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
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Corporate Customer Data:', formData);
      alert('Corporate customer created successfully!');
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      registrationNumber: '',
      taxId: '',
      dateOfIncorporation: '',
      companyType: '',
      industry: '',
      website: '',
      email: '',
      phone: '',
      fax: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      authorizedPersonName: '',
      authorizedPersonTitle: '',
      authorizedPersonEmail: '',
      authorizedPersonPhone: '',
      accountType: 'Business',
      initialDeposit: '',
      branchCode: '',
      currency: 'USD',
      numberOfEmployees: '',
      annualTurnover: '',
      businessLicense: ''
    });
    setErrors({});
  };

  return (
    <div>
      <div className="mb-4">
        <h6 className="text-primary">Create Corporate Customer</h6>
        <p className="text-muted small">Register a new business or corporate entity</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Company Information */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Company Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Company Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Registration Number <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.registrationNumber ? 'is-invalid' : ''}`}
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
                {errors.registrationNumber && <div className="invalid-feedback">{errors.registrationNumber}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Tax ID</label>
                <input type="text" className="form-control" name="taxId" value={formData.taxId} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date of Incorporation</label>
                <input type="date" className="form-control" name="dateOfIncorporation" value={formData.dateOfIncorporation} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Company Type</label>
                <select className="form-select" name="companyType" value={formData.companyType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Private Limited</option>
                  <option>Public Limited</option>
                  <option>Partnership</option>
                  <option>Sole Proprietorship</option>
                  <option>LLC</option>
                  <option>Non-Profit</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Industry</label>
                <input type="text" className="form-control" name="industry" value={formData.industry} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Website</label>
                <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
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
                <label className="form-label">Fax</label>
                <input type="tel" className="form-control" name="fax" value={formData.fax} onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
              </div>
              <div className="col-md-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Postal Code</label>
                <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Authorized Signatory */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Authorized Signatory</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="authorizedPersonName" value={formData.authorizedPersonName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Title/Position</label>
                <input type="text" className="form-control" name="authorizedPersonTitle" value={formData.authorizedPersonTitle} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="authorizedPersonEmail" value={formData.authorizedPersonEmail} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" name="authorizedPersonPhone" value={formData.authorizedPersonPhone} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Banking & Business Details */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Banking & Business Details</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Account Type</label>
                <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange}>
                  <option>Business</option>
                  <option>Corporate</option>
                  <option>Merchant</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Currency</label>
                <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Initial Deposit</label>
                <input type="number" className="form-control" name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Branch Code</label>
                <input type="text" className="form-control" name="branchCode" value={formData.branchCode} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Number of Employees</label>
                <input type="number" className="form-control" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Annual Turnover</label>
                <input type="number" className="form-control" name="annualTurnover" value={formData.annualTurnover} onChange={handleChange} placeholder="USD" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Business License</label>
                <input type="file" className="form-control" name="businessLicense" onChange={handleChange} />
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
            <i className="bi bi-save me-2"></i>Register Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorporateCustomer;