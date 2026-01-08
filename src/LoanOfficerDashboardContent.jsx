const LoanOfficerDashboardContent = () => {
  return (
    <div className="content-section">
      <h2>Loan Officer Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <p className="stat-number">12</p>
          <span className="stat-label">Awaiting review</span>
        </div>

        <div className="stat-card">
          <h3>Active Customers</h3>
          <p className="stat-number">45</p>
          <span className="stat-label">Managed accounts</span>
        </div>

        <div className="stat-card">
          <h3>Committee Reviews</h3>
          <p className="stat-number">8</p>
          <span className="stat-label">Pending approval</span>
        </div>

        <div className="stat-card">
          <h3>Total Portfolio</h3>
          <p className="stat-number">$2.4M</p>
          <span className="stat-label">Managed loans</span>
        </div>
      </div>
    </div>
  );
};

export default LoanOfficerDashboardContent;
