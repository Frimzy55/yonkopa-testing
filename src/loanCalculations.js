// src/utils/loanCalculations.js

export const calculateLoanDetails = ({ principal, rate, loanTerm }) => {
  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100; // Convert rate to decimal
  const t = parseFloat(loanTerm) || 0;

  const interest = p * r * t;
  const loanAmount = p + interest;
  const monthlyInstallment = t > 0 ? loanAmount / t : 0;

  // Return all calculated values as numbers (optional: rounded to 2 decimals)
  return {
    interest: parseFloat(interest.toFixed(2)),
    loanAmount: parseFloat(loanAmount.toFixed(2)),
    monthlyInstallment: parseFloat(monthlyInstallment.toFixed(2)),
  };
};





















