import React, { useState, useEffect } from "react";

const CreditAssessmentWizard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loan-applications/pending`
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      const transformedData = data.map((app) => ({
        id: app.id,
        customerId: app.kycCode,
        applicantName: app.fullName || "N/A",
        contactNumber: app.phone || "N/A",
        creditOfficer: app.creditOfficer || "N/A",
        loanAmount: app.loanAmount || 0,
        applicationDate: app.createdAt
          ? new Date(app.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        status: app.status || "pending",
        open: false,
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
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, open: !app.open } : { ...app, open: false }
      )
    );
  };

  const handleProceed = (id) => {
    alert(`Proceed with application #${id}`);
  };

  const handleSkip = (id) => {
    alert(`Assessment skipped for application #${id}`);
  };

  const handleReprocess = (id) => {
    alert(`Reprocess requested for application #${id}`);
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

      <div className="bg-white py-2">
        <h3 className="mb-1">Loan Applications</h3>
        <h6 className="text-muted mb-3">Applications Pending Assessment</h6>
        <hr />
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-4 text-muted">
          No applications pending assessment
        </div>
      ) : (
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
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
            {applications.map((app) => (
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
                      <div className="dropdown-menu show" style={{ zIndex: 2000 }}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleProceed(app.id)}
                        >
                          Proceed
                        </button>

                        <button
                          className="dropdown-item"
                          onClick={() => handleSkip(app.id)}
                        >
                          Skip Assessment
                        </button>

                        <div className="dropdown-divider"></div>

                        <button
                          className="dropdown-item"
                          onClick={() => handleReprocess(app.id)}
                        >
                          Reprocess
                        </button>
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreditAssessmentWizard;