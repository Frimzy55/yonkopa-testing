import React, { useState, useEffect } from 'react';
import ApplicantProfile from './GApplicantProfile';

const CreditAssessmentWizard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppIndex, setSelectedAppIndex] = useState(null);
  const [entries, setEntries] = useState(5); // rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

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
        customerId: app.kycCode || app.customer_id || '',
        applicantName: app.fullName || `${app.first_name || ''} ${app.last_name || ''}`.trim() || 'N/A',
        contactNumber: app.phone || app.telephone_number || 'N/A',
        idNumber: app.nationalId || app.national_id || 'N/A',
        email: app.email || 'N/A',
        loanType: app.loanType || 'other',
        loanAmount: app.loanAmount || app.amount_requested || 0,
        applicationDate: app.createdAt || app.created_at
          ? new Date(app.createdAt || app.created_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : 'N/A',
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
        app.id === id ? { ...app, open: !app.open } : { ...app, open: false }
      )
    );
  };

  const handleProceed = (index) => setSelectedAppIndex(index);
  const handleSkipAssessment = (index) => alert(`Assessment skipped for Application #${applications[index].id}`);
  const handleReprocess = (index) => alert(`Reprocess requested for Application #${applications[index].id}`);

  // Filtered + Search (safe with optional chaining)
  const filteredApps = applications.filter(app =>
    (app.customerId?.toLowerCase().includes(search.toLowerCase()) ||
     app.applicantName?.toLowerCase().includes(search.toLowerCase()) ||
     app.contactNumber?.includes(search) ||
     app.idNumber?.includes(search))
  );

  // Pagination
  const totalPages = Math.ceil(filteredApps.length / entries);
  const paginatedApps = filteredApps.slice((currentPage - 1) * entries, currentPage * entries);

  if (loading) {
    return <div className="text-center py-4"><div className="spinner-border" /></div>;
  }

  return (
    <div className="container">
      {selectedAppIndex !== null ? (
        <ApplicantProfile
          application={applications[selectedAppIndex]}
          onBack={() => setSelectedAppIndex(null)}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-0">Personal Loan Credit Assessment</h3>
              <h6 className="text-muted mb-0">Applications Pending Assessment</h6>
            </div>

            {/* Entries dropdown */}
            <div>
              Show{' '}
              <select
                value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                className="form-select d-inline w-auto mx-2"
              >
                {[5,10,15,20,50].map(num => <option key={num} value={num}>{num}</option>)}
              </select>{' '}
              entries
            </div>
          </div>

          {/* Search */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="form-control w-25"
            />
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Customer Id</th>
                <th>Applicant Name</th>
                <th>Phone</th>
                <th>National Id</th>
                <th>Loan Amount</th>
                <th>Application Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApps.map((app, index) => (
                <tr key={app.id}>
                  <td>#{app.id}</td>
                  <td>{app.customerId}</td>
                  <td>{app.applicantName}</td>
                  <td>{app.contactNumber}</td>
                  <td>{app.idNumber}</td>
                  <td>₵{Number(app.loanAmount).toLocaleString()}</td>
                  <td>{app.applicationDate}</td>
                  <td>
                    <div className="dropdown">
                      <button className="btn btn-sm btn-outline-primary dropdown-toggle" onClick={() => toggleDropdown(app.id)}>
                        Actions
                      </button>
                      {app.open && (
                        <div className="dropdown-menu show">
                          <button className="dropdown-item" onClick={() => handleProceed(index)}>Proceed</button>
                          <button className="dropdown-item" onClick={() => handleSkipAssessment(index)}>Skip Assessment</button>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item" onClick={() => handleReprocess(index)}>Reprocess</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedApps.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Showing {(currentPage - 1) * entries + 1} to {Math.min(currentPage * entries, filteredApps.length)} of {filteredApps.length} entries
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline-secondary mx-1"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map(num => (
                <button
                  key={num+1}
                  className={`btn btn-sm mx-1 ${currentPage === num+1 ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrentPage(num+1)}
                >
                  {num+1}
                </button>
              ))}
              <button
                className="btn btn-sm btn-outline-secondary mx-1"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreditAssessmentWizard;