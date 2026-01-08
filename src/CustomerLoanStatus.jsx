import React from 'react';

const CustomerLoanStatus = () => (
  <div className="content-section">
    <h2>Loan Application</h2>
    <p>Apply for new loans and view existing applications.</p>
    <div className="loan-application-section">
      <div className="application-card">
        <h3>Personal Loan</h3>
        <p>Up to $50,000 with competitive rates</p>
        <button className="apply-btn">Apply Now</button>
      </div>
      <div className="application-card">
        <h3>Home Loan</h3>
        <p>Flexible home financing options</p>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  </div>
);

export default CustomerLoanStatus;
