import React from 'react';

const CustomerRepayloan = () => (
  <div className="content-section">
    <h2>Loan Management</h2>
    <p>Manage your active loans and view payment history.</p>
    <div className="loan-management-section">
      <div className="loan-card">
        <h3>Home Loan</h3>
        <p>Remaining: $245,000</p>
        <p>Next Payment: Mar 15, 2024</p>
        <button className="payment-btn">Make Payment</button>
      </div>
      <div className="loan-card">
        <h3>Personal Loan</h3>
        <p>Remaining: $12,500</p>
        <p>Next Payment: Mar 10, 2024</p>
        <button className="payment-btn">Make Payment</button>
      </div>
    </div>
  </div>
);

export default CustomerRepayloan;
