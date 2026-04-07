import { useState, useEffect } from 'react';

const CollateralDetailsWindow = ({ application, formData, setFormData, onBack, onNext }) => {
  const [lendingType, setLendingType] = useState(formData.collateralDetails.lendingType || '');
  const [collateralType, setCollateralType] = useState(formData.collateralDetails.collateralType || '');
  const [details, setDetails] = useState(formData.collateralDetails.details || {}); // For land/vehicle/building/cash

  // Sync local state with main formData whenever it changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      collateralDetails: {
        lendingType,
        collateralType,
        details
      }
    }));
  }, [lendingType, collateralType, details, setFormData]);

  const handleDetailChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 border rounded shadow">
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Profile
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={lendingType === 'secured' && !collateralType}
        >
          Next →
        </button>
      </div>

      <h4>Collateral Details</h4>
      <p>
        Collateral information for <strong>{application.applicantName}</strong>
      </p>

      {/* Lending Type */}
      <div className="mt-4">
        <h6 className="mb-3">Lending Type</h6>
        {['secured', 'unsecured'].map(type => (
          <div className="form-check mb-2" key={type}>
            <input
              className="form-check-input"
              type="radio"
              name="lendingType"
              value={type}
              checked={lendingType === type}
              onChange={(e) => {
                setLendingType(e.target.value);
                setCollateralType('');
                setDetails({});
              }}
            />
            <label className="form-check-label">{type === 'secured' ? 'Secured Lending' : 'Unsecured Lending'}</label>
          </div>
        ))}

        {/* Collateral Type Dropdown */}
        {lendingType === 'secured' && (
          <div className="mt-3">
            <label className="form-label">Collateral Type</label>
            <select
              className="form-select"
              value={collateralType}
              onChange={(e) => {
                setCollateralType(e.target.value);
                setDetails({});
              }}
            >
              <option value="">-- Select Collateral Type --</option>
              <option value="land">Land</option>
              <option value="vehicle">Vehicle</option>
              <option value="building">Building</option>
              <option value="cash_fixed_deposit">Cash / Fixed Deposit</option>
            </select>
          </div>
        )}

        {/* Conditional Forms */}
        {collateralType === 'land' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Land Details</h6>
            <input className="form-control mb-2" placeholder="Land Location" value={details.location || ''} onChange={(e) => handleDetailChange('location', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Land Size (sq. meters)" value={details.size || ''} onChange={(e) => handleDetailChange('size', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Land Value (GHS)" value={details.value || ''} onChange={(e) => handleDetailChange('value', e.target.value)} />
          </div>
        )}

        {collateralType === 'vehicle' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Vehicle Details</h6>
            <input className="form-control mb-2" placeholder="Make" value={details.make || ''} onChange={(e) => handleDetailChange('make', e.target.value)} />
            <input className="form-control mb-2" placeholder="Model" value={details.model || ''} onChange={(e) => handleDetailChange('model', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Value (GHS)" value={details.value || ''} onChange={(e) => handleDetailChange('value', e.target.value)} />
          </div>
        )}

        {collateralType === 'building' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Building Details</h6>
            <input className="form-control mb-2" placeholder="Type" value={details.type || ''} onChange={(e) => handleDetailChange('type', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Size (sq. meters)" value={details.size || ''} onChange={(e) => handleDetailChange('size', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Value (GHS)" value={details.value || ''} onChange={(e) => handleDetailChange('value', e.target.value)} />
          </div>
        )}

        {collateralType === 'cash_fixed_deposit' && (
          <div className="mt-3 border p-3 rounded">
            <h6>Cash / Fixed Deposit Details</h6>
            <input className="form-control mb-2" placeholder="Bank Name" value={details.bankName || ''} onChange={(e) => handleDetailChange('bankName', e.target.value)} />
            <input className="form-control mb-2" placeholder="Account Number" value={details.accountNumber || ''} onChange={(e) => handleDetailChange('accountNumber', e.target.value)} />
            <input type="number" className="form-control mb-2" placeholder="Deposit Amount (GHS)" value={details.amount || ''} onChange={(e) => handleDetailChange('amount', e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollateralDetailsWindow;