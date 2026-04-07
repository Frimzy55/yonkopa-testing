const LoanOfficerReports = () => {
  const handleDisbursedReports = () => {
    alert("Disbursed loan reports clicked");
    // TODO: Navigate or fetch disbursed loan reports
  };

  const handleRejectedReports = () => {
    alert("Rejected loan reports clicked");
    // TODO: Navigate or fetch rejected loan reports
  };

  return (
    <div className="content-section">
      <h2>Reports & Analytics</h2>

      <div
        className="report-buttons"
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          className="btn btn-primary"
          style={{ flex: '1 1 45%', padding: '1rem', fontSize: '1rem' }}
          onClick={handleDisbursedReports}
        >
          Disbursed Loan Reports
        </button>

        <button
          className="btn btn-danger"
          style={{ flex: '1 1 45%', padding: '1rem', fontSize: '1rem' }}
          onClick={handleRejectedReports}
        >
          Rejected Loan Reports
        </button>
      </div>
    </div>
  );
};

export default LoanOfficerReports;