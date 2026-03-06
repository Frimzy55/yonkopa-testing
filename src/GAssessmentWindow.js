import { useState, useEffect } from 'react';

const AssessmentWindow = ({ application, formData, setFormData, onBack, onNext }) => {
  const initialCreditData = formData.borrowerCredit || {};

  const [isCreditworthy, setIsCreditworthy] = useState(initialCreditData.isCreditworthy || false);
  const [businessOverview, setBusinessOverview] = useState(initialCreditData.businessOverview || '');

  // Sync local state to main formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      borrowerCredit: {
        isCreditworthy,
        businessOverview
      }
    }));
  }, [isCreditworthy, businessOverview, setFormData]);

  return (
    <div className="p-4 border rounded shadow">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>

      <h4>Borrower Credit Assessment</h4>
      <p>Credit information for <strong>{application.applicantName}</strong></p>

      <div className="mt-3">
        {/* Borrower Creditworthy */}
        <div className="mb-3">
          <label className="form-label">Is the Borrower Creditworthy?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="creditworthy"
                value="yes"
                checked={isCreditworthy === true}
                onChange={() => setIsCreditworthy(true)}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="creditworthy"
                value="no"
                checked={isCreditworthy === false}
                onChange={() => setIsCreditworthy(false)}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>

        {/* Business Overview */}
        <div className="mb-3">
          <label className="form-label">Business Overview</label>
          <select
            className="form-select"
            value={businessOverview}
            onChange={(e) => setBusinessOverview(e.target.value)}
          >
            <option value="">Select Business Type</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retailer">Retailer</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWindow;