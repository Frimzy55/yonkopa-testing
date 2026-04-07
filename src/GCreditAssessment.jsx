import React, { useState, useEffect, useCallback } from 'react';
import CreditAssessmentTable from './GCreditAssessmentTable';
import AssessmentForm from './AssessmentForm';

const CreditAssessment = ({ assessmentType, onBack }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/credit-assessment/${assessmentType}`
      );
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [assessmentType]); // ✅ include assessmentType dependency

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]); // ✅ include fetchApplications in dependencies

  const handleAssessApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleAssessmentSubmit = (assessmentData) => {
    console.log('Assessment submitted:', assessmentData);
    setSelectedApplication(null);
    fetchApplications();
  };

  const getAssessmentTitle = () => {
    switch (assessmentType) {
      case 'personal': return 'Personal Loan Credit Assessment';
      case 'business': return 'Business Loan Credit Assessment';
      case 'salary': return 'Salary Loan Credit Assessment';
      case 'all': return 'All Loan Credit Assessments';
      default: return 'Credit Assessment';
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <AssessmentForm
        application={selectedApplication}
        onSubmit={handleAssessmentSubmit}
        onCancel={() => setSelectedApplication(null)}
      />
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">{getAssessmentTitle()}</h2>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">
            <i className="bi bi-clipboard-data me-2"></i>
            Applications Pending Assessment
          </h5>
        </div>

        <div className="card-body">
          <CreditAssessmentTable
            applications={applications}
            onAssess={handleAssessApplication}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditAssessment;