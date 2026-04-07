import { useState, useEffect } from 'react';

const GComments = ({ application, formData, setFormData, onBack, onSubmit }) => {
  const initialComments = formData.comments || {};

  const [internalComment, setInternalComment] = useState(initialComments.internalComment || '');
  const [externalComment, setExternalComment] = useState(initialComments.externalComment || '');
  const [decision, setDecision] = useState(initialComments.decision || '');

  // Sync local state to main formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      comments: {
        internalComment,
        externalComment,
        decision
      }
    }));
  }, [internalComment, externalComment, decision, setFormData]);

  return (
    <div className="p-4 border rounded shadow">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        
      </div>

      <h4>Comments & Decision</h4>
      <p>Comments for <strong>{application.applicantName}</strong></p>

      <div className="mt-3">
        <div className="mb-3">
          <label className="form-label">Internal Comment</label>
          <textarea
            className="form-control"
            rows={3}
            value={internalComment}
            onChange={(e) => setInternalComment(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">External Comment</label>
          <textarea
            className="form-control"
            rows={3}
            value={externalComment}
            onChange={(e) => setExternalComment(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Decision</label>
          <select
            className="form-select"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <option value="">-- Select Decision --</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GComments;