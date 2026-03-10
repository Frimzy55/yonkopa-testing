// src/pages/CustomerDashboard/LoanDetails.jsx
import React, { useEffect, useState } from "react";

const LoanDetails = ({ formData, handleInputChange }) => {
  const [loanSummary, setLoanSummary] = useState({
    interest: 0,
    totalInterest: 0,
    numberOfPayments: 0,
    monthlyPayment: 0,
    loanFees: 0,
  });

  // Dynamically set ratePerAnnum based on employmentStatus
  useEffect(() => {
    let rate = "";
    if (formData.employmentStatus === "self-employed") {
      rate = 80;
    } else if (formData.employmentStatus === "salary worker") {
      rate = 72;
    }
    if (formData.ratePerAnnum !== rate) {
      handleInputChange({ target: { name: "ratePerAnnum", value: rate } });
    }
  }, [formData.employmentStatus, formData.ratePerAnnum, handleInputChange]);

  // Calculate Loan Summary
  useEffect(() => {
    const loanAmount = parseFloat(formData.loanAmount) || 0;
    const loanTerm = parseFloat(formData.loanTerm) || 0;
    const repaymentFrequency = formData.repaymentFrequency || "Monthly";

    const interest = loanAmount * 0.06 * loanTerm; // 6% per month interest
    const totalInterest = loanAmount + interest;

    const numberOfPayments =
      repaymentFrequency === "Weekly" ? loanTerm * 4 : loanTerm;

    const monthlyPayment = numberOfPayments ? totalInterest / numberOfPayments : 0;

    const loanFees = 0; // Customize if there are any fees

    setLoanSummary({
      interest,
      totalInterest,
      numberOfPayments,
      monthlyPayment,
      loanFees,
    });
  }, [formData.loanAmount, formData.loanTerm, formData.repaymentFrequency]);

  return (
    <div className="form-step">
      <h3>Loan Details</h3>
      <div className="form-grid">
        <input
          name="loanAmount"
          type="number"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          required
        />
        <input
          name="loanPurpose"
          placeholder="Loan Purpose"
          value={formData.loanPurpose}
          onChange={handleInputChange}
          required
        />
        <input
          name="loanTerm"
          placeholder="Loan Term (months)"
          value={formData.loanTerm}
          onChange={handleInputChange}
          required
        />
        <select
          name="repaymentFrequency"
          value={formData.repaymentFrequency}
          onChange={handleInputChange}
          required
        >
          <option value="">Repayment Frequency</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        {/* Display rate per annum */}
        <input
          name="ratePerAnnum"
          type="text"
          placeholder="Rate Per Annum"
          value={formData.ratePerAnnum ? `${formData.ratePerAnnum}%` : ""}
          readOnly
          required
        />

        <input
          name="employmentStatus"
          value={formData.employmentStatus}
          readOnly
          hidden
        />
      </div>

      {/* Loan Summary */}
      {/* Loan Summary */}
<div className="card shadow-sm mt-4">
  <div className="card-header bg-primary text-white">
    <h5 className="mb-0"> </h5>
  </div>

  <div className="card-body">
    <div className="row text-center">

      <div className="col-md-3 mb-3">
        <div className="border rounded p-3 bg-light">
          <h6 className="text-muted">Interest</h6>
          <h5 className="text-danger">
            GHS {loanSummary.interest.toFixed(2)}
          </h5>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="border rounded p-3 bg-light">
          <h6 className="text-muted">Total Amount</h6>
          <h5 className="text-success">
            GHS {loanSummary.totalInterest.toFixed(2)}
          </h5>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="border rounded p-3 bg-light">
          <h6 className="text-muted">Monthly Payment</h6>
          <h5 className="text-primary">
            GHS {loanSummary.monthlyPayment.toFixed(2)}
          </h5>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="border rounded p-3 bg-light">
          <h6 className="text-muted">Number of Payments</h6>
          <h5>{loanSummary.numberOfPayments}</h5>
        </div>
      </div>

      <div className="col-md-12 mt-2">
        <div className="alert alert-warning">
          <strong>Loan Fees:</strong> GHS {loanSummary.loanFees.toFixed(2)}
        </div>
      </div>

    </div>
  </div>
</div>
    </div>
  );
};

export default LoanDetails;