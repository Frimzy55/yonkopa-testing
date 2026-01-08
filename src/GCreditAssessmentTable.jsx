import React, { useState, useEffect } from 'react';

const CreditAssessmentTable = ({ onAssess }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/loan-applications/pending'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();

      const transformedData = data.map(app => ({
        id: app.id,
        applicantName: app.fullName || 'N/A',
        loanType: app.loanType || 'other',
        loanAmount: app.loanAmount || 0,
        applicationDate: app.created_at || new Date().toISOString(),
        creditScore: app.creditScore ?? 0,
        status: app.status || 'pending',
        open: false // for React-controlled dropdown
      }));

      setApplications(transformedData);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, open: !app.open }
          : { ...app, open: false }
      )
    );
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-4">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: '3rem' }}
        ></i>
        <p className="mt-3 text-muted">
          No applications pending assessment
        </p>
      </div>
    );
  }

  return (
    <div>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Application ID</th>
            <th>Applicant Name</th>
            <th>Loan Type</th>
            <th>Loan Amount</th>
            <th>Application Date</th>
            <th>Credit Score</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>#{app.id}</td>
              <td>{app.applicantName}</td>

              <td>
                <span
                  className={`badge ${
                    app.loanType === 'personal'
                      ? 'bg-primary'
                      : app.loanType === 'business'
                      ? 'bg-success'
                      : 'bg-info'
                  }`}
                >
                  {app.loanType}
                </span>
              </td>

              <td>₵{Number(app.loanAmount).toLocaleString()}</td>

              <td>
                {new Date(app.applicationDate).toLocaleDateString()}
              </td>

              <td>
                <span
                  className={`badge ${
                    app.creditScore >= 700
                      ? 'bg-success'
                      : app.creditScore >= 600
                      ? 'bg-warning text-dark'
                      : 'bg-danger'
                  }`}
                >
                  {app.creditScore || 'N/A'}
                </span>
              </td>

              <td>
                <span
                  className={`badge ${
                    app.status === 'pending'
                      ? 'bg-warning text-dark'
                      : app.status === 'approved'
                      ? 'bg-success'
                      : app.status === 'skipped'
                      ? 'bg-secondary'
                      : 'bg-danger'
                  }`}
                >
                  {app.status}
                </span>
              </td>

              {/* ACTIONS - React-controlled dropdown */}
              <td style={{ position: 'relative', minWidth: '150px' }}>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleDropdown(app.id)}
                >
                  Actions
                </button>

                {app.open && (
                  <div
                    className="dropdown-menu show"
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      display: 'block'
                    }}
                  >
                    <button
                      className="dropdown-item text-success"
                      onClick={() => onAssess(app, 'proceed')}
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      Proceed
                    </button>

                    <button
                      className="dropdown-item text-warning"
                      onClick={() => onAssess(app, 'skip')}
                    >
                      <i className="bi bi-skip-forward me-2"></i>
                      Skip Assessment
                    </button>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-item text-danger"
                      onClick={() => onAssess(app, 'reprocess')}
                    >
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Reprocess
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditAssessmentTable;
