import { useState, useEffect } from 'react';

const AssessmentWindow = ({ application, formData, setFormData, onBack, onNext }) => {
  const initialCreditData = formData.borrowerCredit || {};

  const [creditScore, setCreditScore] = useState(initialCreditData.creditScore || '');
  const [existingLoans, setExistingLoans] = useState(initialCreditData.existingLoans || '');
  const [remarks, setRemarks] = useState(initialCreditData.remarks || '');

  // Sync local state to main formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      borrowerCredit: {
        creditScore,
        existingLoans,
        remarks
      }
    }));
  }, [creditScore, existingLoans, remarks, setFormData]);

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
        <div className="mb-3">
          <label className="form-label">Credit Score</label>
          <input
            type="number"
            className="form-control"
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Existing Loans (GHS)</label>
          <input
            type="number"
            className="form-control"
            value={existingLoans}
            onChange={(e) => setExistingLoans(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Remarks</label>
          <textarea
            className="form-control"
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentWindow;
