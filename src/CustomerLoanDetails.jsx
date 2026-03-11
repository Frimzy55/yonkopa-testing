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

  // Set Rate Per Annum
  useEffect(() => {
    let rate = "";

    if (formData.employmentStatus === "self-employed") {
      rate = 80;
    } else if (formData.employmentStatus === "salary-worker") {
      rate = 72;
    }

    if (formData.ratePerAnnum !== rate) {
      handleInputChange({
        target: { name: "ratePerAnnum", value: rate },
      });
    }
  }, [formData.employmentStatus, formData.ratePerAnnum, handleInputChange]);

 useEffect(() => {
  const loanAmount = parseFloat(formData.loanAmount) || 0;
  const loanTerm = parseFloat(formData.loanTerm) || 0;
  const repaymentFrequency = formData.repaymentFrequency || "Monthly";

  let monthlyRate = 0;

  // NEW RULE
  if (formData.employmentStatus === "self-employed") {
    monthlyRate = 0.0667; // 6.67%
  } else if (formData.employmentStatus === "salary-worker") {
    monthlyRate = 0.06; // 6%
  }

  const interest = loanAmount * monthlyRate * loanTerm;
  const totalInterest = loanAmount + interest;

  const numberOfPayments =
    repaymentFrequency === "Weekly" ? loanTerm * 4 : loanTerm;

  const monthlyPayment =
    numberOfPayments > 0 ? totalInterest / numberOfPayments : 0;

  let loanFees = 0;
  //Calculate Loan Fees
  //let loanFees = 0;
  if (formData.employmentStatus === "self-employed") {
    loanFees = loanAmount * 0.07;
  } else if (formData.employmentStatus === "salary-worker") {
    loanFees = loanAmount * 0.05;
  }
 


  setLoanSummary({
    interest,
    totalInterest,
    numberOfPayments,
    monthlyPayment,
    loanFees,
  });
}, [
  formData.loanAmount,
  formData.loanTerm,
  formData.repaymentFrequency,
  formData.employmentStatus
]);
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

              {formData.employmentStatus === "self-employed" && (
              <option value="Weekly">Weekly</option>
               )}

                {formData.employmentStatus === "salary-worker" && (
               <option value="Monthly">Monthly</option>
              )}
        </select>

        <input
          name="ratePerAnnum"
          type="text"
          value={formData.ratePerAnnum ? `${formData.ratePerAnnum}%` : ""}
          readOnly
        />

        <input
          name="employmentStatus"
          value={formData.employmentStatus}
          readOnly
          hidden
        />
      </div>

      {/* Loan Summary */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Loan Summary</h5>
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
                <strong>Loan Fees:</strong> GHS{" "}
                {loanSummary.loanFees.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;