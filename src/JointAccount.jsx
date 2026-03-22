// JointAccount.jsx
import React, { useState } from 'react';

const JointAccount = () => {
  const [primaryHolder, setPrimaryHolder] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idType: 'National ID',
    idNumber: ''
  });
  
  const [secondaryHolders, setSecondaryHolders] = useState([
    { id: 1, firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', idType: 'National ID', idNumber: '' }
  ]);
  
  const [accountDetails, setAccountDetails] = useState({
    accountType: 'Joint Savings',
    accountName: '',
    initialDeposit: '',
    branchCode: '',
    operationType: 'Any One to Sign',
    relationship: ''
  });

  const [errors, setErrors] = useState({});

  const addSecondaryHolder = () => {
    setSecondaryHolders([
      ...secondaryHolders,
      { id: Date.now(), firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', idType: 'National ID', idNumber: '' }
    ]);
  };

  const removeSecondaryHolder = (id) => {
    if (secondaryHolders.length > 1) {
      setSecondaryHolders(secondaryHolders.filter(holder => holder.id !== id));
    }
  };

  const updateSecondaryHolder = (id, field, value) => {
    setSecondaryHolders(secondaryHolders.map(holder =>
      holder.id === id ? { ...holder, [field]: value } : holder
    ));
  };

  const handlePrimaryChange = (e) => {
    const { name, value } = e.target;
    setPrimaryHolder(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!primaryHolder.firstName) newErrors.primaryFirstName = 'First name is required';
    if (!primaryHolder.lastName) newErrors.primaryLastName = 'Last name is required';
    if (!primaryHolder.email) newErrors.primaryEmail = 'Email is required';
    if (!accountDetails.accountName) newErrors.accountName = 'Account name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const jointAccountData = {
        primaryHolder,
        secondaryHolders,
        accountDetails
      };
      console.log('Joint Account Data:', jointAccountData);
      alert('Joint account created successfully!');
    }
  };

  const handleReset = () => {
    setPrimaryHolder({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      idType: 'National ID',
      idNumber: ''
    });
    setSecondaryHolders([
      { id: 1, firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', idType: 'National ID', idNumber: '' }
    ]);
    setAccountDetails({
      accountType: 'Joint Savings',
      accountName: '',
      initialDeposit: '',
      branchCode: '',
      operationType: 'Any One to Sign',
      relationship: ''
    });
    setErrors({});
  };

  return (
    <div>
      <div className="mb-4">
        <h6 className="text-primary">Create Joint Account</h6>
        <p className="text-muted small">Register a joint account with multiple account holders</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Primary Account Holder */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Primary Account Holder</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.primaryFirstName ? 'is-invalid' : ''}`}
                  name="firstName"
                  value={primaryHolder.firstName}
                  onChange={handlePrimaryChange}
                />
                {errors.primaryFirstName && <div className="invalid-feedback">{errors.primaryFirstName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.primaryLastName ? 'is-invalid' : ''}`}
                  name="lastName"
                  value={primaryHolder.lastName}
                  onChange={handlePrimaryChange}
                />
                {errors.primaryLastName && <div className="invalid-feedback">{errors.primaryLastName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  className={`form-control ${errors.primaryEmail ? 'is-invalid' : ''}`}
                  name="email"
                  value={primaryHolder.email}
                  onChange={handlePrimaryChange}
                />
                {errors.primaryEmail && <div className="invalid-feedback">{errors.primaryEmail}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" name="phone" value={primaryHolder.phone} onChange={handlePrimaryChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" name="dateOfBirth" value={primaryHolder.dateOfBirth} onChange={handlePrimaryChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">ID Type</label>
                <select className="form-select" name="idType" value={primaryHolder.idType} onChange={handlePrimaryChange}>
                  <option>National ID</option>
                  <option>Passport</option>
                  <option>Driver's License</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">ID Number</label>
                <input type="text" className="form-control" name="idNumber" value={primaryHolder.idNumber} onChange={handlePrimaryChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Account Holders */}
        <div className="card mb-3">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Secondary Account Holders</h6>
            <button type="button" className="btn btn-sm btn-primary" onClick={addSecondaryHolder}>
              <i className="bi bi-plus-circle me-1"></i>Add Holder
            </button>
          </div>
          <div className="card-body">
            {secondaryHolders.map((holder, index) => (
              <div key={holder.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <strong>Holder {index + 1}</strong>
                  {secondaryHolders.length > 1 && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeSecondaryHolder(holder.id)}>
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  )}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={holder.firstName}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'firstName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={holder.lastName}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'lastName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={holder.email}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'email', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={holder.phone}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'phone', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={holder.dateOfBirth}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">ID Type</label>
                    <select
                      className="form-select"
                      value={holder.idType}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'idType', e.target.value)}
                    >
                      <option>National ID</option>
                      <option>Passport</option>
                      <option>Driver's License</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">ID Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={holder.idNumber}
                      onChange={(e) => updateSecondaryHolder(holder.id, 'idNumber', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Details */}
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h6 className="mb-0">Joint Account Details</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Account Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.accountName ? 'is-invalid' : ''}`}
                  name="accountName"
                  value={accountDetails.accountName}
                  onChange={handleAccountChange}
                  placeholder="e.g., John and Jane Doe"
                />
                {errors.accountName && <div className="invalid-feedback">{errors.accountName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Account Type</label>
                <select className="form-select" name="accountType" value={accountDetails.accountType} onChange={handleAccountChange}>
                  <option>Joint Savings</option>
                  <option>Joint Current</option>
                  <option>Joint Fixed Deposit</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Operation Type</label>
                <select className="form-select" name="operationType" value={accountDetails.operationType} onChange={handleAccountChange}>
                  <option>Any One to Sign</option>
                  <option>All to Sign</option>
                  <option>Majority to Sign</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  className="form-control"
                  name="relationship"
                  value={accountDetails.relationship}
                  onChange={handleAccountChange}
                  placeholder="e.g., Spouse, Business Partners"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Initial Deposit</label>
                <input type="number" className="form-control" name="initialDeposit" value={accountDetails.initialDeposit} onChange={handleAccountChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Branch Code</label>
                <input type="text" className="form-control" name="branchCode" value={accountDetails.branchCode} onChange={handleAccountChange} />
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
            <i className="bi bi-save me-2"></i>Create Joint Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default JointAccount;