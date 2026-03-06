import React, { useState, useEffect } from 'react';
import ApplicantProfile from './GApplicantProfile';

const CreditAssessmentWizard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppIndex, setSelectedAppIndex] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loan-applications/pending`
      );

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      const transformedData = data.map(app => ({
        id: app.id,
        customerId: app.kycCode,
        applicantName: app.fullName || 'N/A',
        contactNumber: app.phone || 'N/A',
        creditOfficer: app.creditOfficer || 'N/A',
        loanType: app.loanType || 'other',
        loanAmount: app.loanAmount || 0,
        applicationDate: app.createdAt
          ? new Date(app.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : 'N/A',
        creditScore: app.creditScore ?? 0,
        status: app.status || 'pending',
        open: false
      }));

      setApplications(transformedData);
    } catch (err) {
      console.error(err);
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

  const handleProceed = (index) => {
    setSelectedAppIndex(index);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container">

      {/* SHOW PROFILE PAGE */}
      {selectedAppIndex !== null && (
        <ApplicantProfile
          application={applications[selectedAppIndex]}
          onBack={() => setSelectedAppIndex(null)}
        />
      )}

      {/* SHOW TABLE */}
      {selectedAppIndex === null && (
        <>
          <h3 className="mb-1">Personal Loan Credit Assessment</h3>
          <h6 className="text-muted mb-3">Applications Pending Assessment</h6>

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Customer Id</th>
                <th>Applicant Name</th>
                <th>Phone</th>
                <th>Credit Officer</th>
                <th>Loan Amount</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>
                  <td>#{app.id}</td>
                  <td>{app.customerId}</td>
                  <td>{app.applicantName}</td>
                  <td>{app.contactNumber}</td>
                  <td>{app.creditOfficer}</td>
                  <td>₵{Number(app.loanAmount).toLocaleString()}</td>
                  <td>{app.status}</td>
                  <td>{app.applicationDate}</td>

                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                        onClick={() => toggleDropdown(app.id)}
                      >
                        Actions
                      </button>

                      {app.open && (
                        <div className="dropdown-menu show">
                          <button
                            className="dropdown-item"
                            onClick={() => handleProceed(index)}
                          >
                            Proceed
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </div>
  );
};

export default CreditAssessmentWizard;