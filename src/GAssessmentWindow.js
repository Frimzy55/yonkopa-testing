import { useState, useEffect } from 'react';
import { calculateLoanDetails } from './loanCalculations'; // <- import here
import {
  calculateCostOfGoodsSold,
  calculateGrossProfit,
  calculateTotalOperatingExpenses,
  calculateNetBusinessProfit,
  calculateHouseholdSurplus,
  //calculateLoanDetails

} from './loanCalculation1';

const AssessmentWindow = ({ application, formData, setFormData, onBack, onNext }) => {
  const initialCreditData = formData.borrowerCredit || {};

  const [isCreditworthy, setIsCreditworthy] = useState(initialCreditData.isCreditworthy || false);
  const [businessOverview, setBusinessOverview] = useState(initialCreditData.businessOverview || '');
  const [businessLocation, setBusinessLocation] = useState(initialCreditData.businessLocation || '');
  const [businessStartDate, setBusinessStartDate] = useState(initialCreditData.businessStartDate || '');
  const [nearestLandmark, setNearestLandmark] = useState(initialCreditData.nearestLandmark || '');
  const [businessDescription, setBusinessDescription] = useState(initialCreditData.businessDescription || '');

  // New: Borrower's ability to pay
  const [isAbleToPay, setIsAbleToPay] = useState(initialCreditData.isAbleToPay || false);

  // Financial fields
  const [currentStockValue, setCurrentStockValue] = useState(initialCreditData.currentStockValue || 0);
  const [startedBusinessWith, setStartedBusinessWith] = useState(initialCreditData.startedBusinessWith || 0);
  const [sourceOfFund, setSourceOfFund] = useState(initialCreditData.sourceOfFund || '');
  const [principal, setPrincipal] = useState(initialCreditData.principal || 0);
  const [rate, setRate] = useState(initialCreditData.rate || 0);
  const [loanTerm, setLoanTerm] = useState(initialCreditData.loanTerm || 0);
  const [interest, setInterest] = useState(initialCreditData.interest || 0);
  const [loanAmount, setLoanAmount] = useState(initialCreditData.loanAmount || 0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(initialCreditData.monthlyInstallment || 0);
  const [grossMarginPercentage, setGrossMarginPercentage] = useState(initialCreditData.grossMarginPercentage || 0);
  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState(initialCreditData.monthlySalesRevenue || 0);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(initialCreditData.costOfGoodsSold || 0);
  const [grossProfit, setGrossProfit] = useState(initialCreditData.grossProfit || 0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(initialCreditData.totalOperatingExpenses || 0);
  const [netBusinessProfit, setNetBusinessProfit] = useState(initialCreditData.netBusinessProfit || 0);
  const [householdExpenses, setHouseholdExpenses] = useState(initialCreditData.householdExpenses || 0);
  const [otherIncome, setOtherIncome] = useState(initialCreditData.otherIncome || 0);
  const [householdSurplus, setHouseholdSurplus] = useState(initialCreditData.householdSurplus || 0);
  const [loanRecommendation, setLoanRecommendation] = useState(initialCreditData.loanRecommendation || 0);
  const [expectedMonthlyInstallment, setExpectedMonthlyInstallment] = useState(initialCreditData.expectedMonthlyInstallment || 0);
  const [allowableDisposableLoanService, setAllowableDisposableLoanService] = useState(initialCreditData.allowableDisposableLoanService || 0);



  useEffect(() => {
    const { interest: calcInterest, loanAmount: calcLoan, monthlyInstallment: calcMonthly } =
      calculateLoanDetails({ principal, rate, loanTerm });

    setInterest(calcInterest);
    setLoanAmount(calcLoan);
    setMonthlyInstallment(calcMonthly);
  }, [principal, rate, loanTerm]);




  // Recalculate Loan Details when principal, rate, or loanTerm changes
useEffect(() => {
  const { interest: calcInterest, loanAmount: calcLoan, monthlyInstallment: calcMonthly } =
    calculateLoanDetails({ principal, rate, loanTerm });

  setInterest(calcInterest);
  setLoanAmount(calcLoan);
  setMonthlyInstallment(calcMonthly);
}, [principal, rate, loanTerm]);

// Recalculate Financials when related fields change
useEffect(() => {
  const salesRevenue = parseFloat(monthlySalesRevenue) || 0;
  const grossMarginPerc = parseFloat(grossMarginPercentage) || 0;
  const otherIncomeVal = parseFloat(otherIncome) || 0;
  const householdExpensesVal = parseFloat(householdExpenses) || 0;

  const cogs = calculateCostOfGoodsSold(salesRevenue, grossMarginPerc);
  const grossProfitVal = calculateGrossProfit(salesRevenue, cogs);
  const totalExpenses = calculateTotalOperatingExpenses(salesRevenue, cogs, grossProfitVal, grossMarginPerc);
  const netProfit = calculateNetBusinessProfit(grossProfitVal, totalExpenses);
  const surplus = calculateHouseholdSurplus(netProfit, otherIncomeVal, householdExpensesVal);
  const loanRec = surplus * 0.6;

  setCostOfGoodsSold(cogs);
  setGrossProfit(grossProfitVal);
  setTotalOperatingExpenses(totalExpenses);
  setNetBusinessProfit(netProfit);
  setHouseholdSurplus(surplus);
  setLoanRecommendation(loanRec);
}, [monthlySalesRevenue, grossMarginPercentage, otherIncome, householdExpenses]);

  // Sync all form data
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      borrowerCredit: {
        isCreditworthy,businessOverview,businessLocation,businessStartDate,nearestLandmark,businessDescription,
        isAbleToPay,currentStockValue,startedBusinessWith,sourceOfFund,principal,rate,loanTerm,interest,loanAmount,monthlyInstallment,
        grossMarginPercentage,monthlySalesRevenue,costOfGoodsSold,grossProfit,totalOperatingExpenses,netBusinessProfit,householdExpenses,
        otherIncome,householdSurplus,loanRecommendation,expectedMonthlyInstallment,allowableDisposableLoanService
      }
    }));
  }, [
    isCreditworthy,businessOverview,businessLocation,businessStartDate,nearestLandmark,businessDescription,
    isAbleToPay,currentStockValue,startedBusinessWith,sourceOfFund,
    principal,rate,loanTerm,interest,loanAmount,monthlyInstallment,grossMarginPercentage,monthlySalesRevenue,costOfGoodsSold,
    grossProfit,totalOperatingExpenses,netBusinessProfit,householdExpenses,otherIncome,householdSurplus,loanRecommendation,
    expectedMonthlyInstallment,allowableDisposableLoanService,
    setFormData
  ]);

  return (
    <div className="p-4 border rounded shadow">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>

      <h4>Borrower Credit Assessment</h4>
      <p>Credit information for <strong>{application.applicantName}</strong></p>

      {/* Borrower Creditworthy */}
      <div className="mb-3">
        <label className="form-label">Is the Borrower Creditworthy?</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="creditworthy"
              value="yes"
              checked={isCreditworthy === true}
              onChange={() => setIsCreditworthy(true)}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="creditworthy"
              value="no"
              checked={isCreditworthy === false}
              onChange={() => setIsCreditworthy(false)}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      {/* Business Overview */}
      <div className="mb-3">
        <label className="form-label">Business Overview</label>
        <select
          className="form-select"
          value={businessOverview}
          onChange={(e) => setBusinessOverview(e.target.value)}
        >
          <option value="">Select Business Type</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Retailer">Retailer</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Business Location & Details */}
      <h5 className="mt-4">Business Location & Details</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Business Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter business location"
            value={businessLocation}
            onChange={(e) => setBusinessLocation(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Business Start Date</label>
          <input
            type="date"
            className="form-control"
            value={businessStartDate}
            onChange={(e) => setBusinessStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nearest Landmark</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter nearest landmark"
            value={nearestLandmark}
            onChange={(e) => setNearestLandmark(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Business Description</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Enter business description"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Determine Borrower's Ability to Pay Loan */}
      <div className="mt-4 mb-3">
        <label className="form-label">Determine Borrower's Ability to Pay Loan</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="abilityToPay"
              value="yes"
              checked={isAbleToPay === true}
              onChange={() => setIsAbleToPay(true)}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="abilityToPay"
              value="no"
              checked={isAbleToPay === false}
              onChange={() => setIsAbleToPay(false)}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      {/* Conditional Financial Fields */}
      {isAbleToPay && (
        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <label className="form-label">Current Stock Value (GH¢)</label>
            <input
              type="number"
              className="form-control"
              value={currentStockValue}
              onChange={(e) => setCurrentStockValue(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Started Business With (GH¢)</label>
            <input
              type="number"
              className="form-control"
              value={startedBusinessWith}
              onChange={(e) => setStartedBusinessWith(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Source of Fund</label>
            <select
              className="form-select"
              value={sourceOfFund}
              onChange={(e) => setSourceOfFund(e.target.value)}
            >
              <option value="">Select Source</option>
              <option value="Personal Savings">Personal Savings</option>
              <option value="Loan">Loan</option>
              <option value="Others">Others</option>
            </select>
          </div>
            <div className="col-12 my-4">
  <hr />
</div>

          <h5 className="mt-4">Principal & Rate Calculation</h5>

<div className="row g-3">
  <div className="col-md-3">
    <label className="form-label">Principal (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={principal}
      onChange={(e) => setPrincipal(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Rate (%)</label>
    <input
      type="number"
      className="form-control"
      value={rate}
      onChange={(e) => setRate(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Loan Term (Month)</label>
    <input
      type="number"
      className="form-control"
      value={loanTerm}
      onChange={(e) => setLoanTerm(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Interest (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={interest}
      onChange={(e) => setInterest(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Loan Amount (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={loanAmount}
      onChange={(e) => setLoanAmount(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Monthly Installment (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={monthlyInstallment}
      onChange={(e) => setMonthlyInstallment(e.target.value)}
    />
  </div>
</div>
          <div className="col-12 my-4">
  <hr />
</div>

          <h5 className="mt-4">Business Financial Section</h5>
<div className="row g-3">
  <div className="col-md-4">
    <label className="form-label">Gross Margin Percentage (%)</label>
    <input
      type="number"
      className="form-control"
      value={grossMarginPercentage}
      onChange={(e) => setGrossMarginPercentage(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Monthly Sales Revenue (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={monthlySalesRevenue}
      onChange={(e) => setMonthlySalesRevenue(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Cost of Goods Sold (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={costOfGoodsSold}
      onChange={(e) => setCostOfGoodsSold(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Gross Profit (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={grossProfit}
      onChange={(e) => setGrossProfit(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Total Operating Expenses (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={totalOperatingExpenses}
      onChange={(e) => setTotalOperatingExpenses(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Net Business Profit (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={netBusinessProfit}
      onChange={(e) => setNetBusinessProfit(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Household Expenses (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={householdExpenses}
      onChange={(e) => setHouseholdExpenses(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Other Income (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={otherIncome}
      onChange={(e) => setOtherIncome(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Household Surplus (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={householdSurplus}
      onChange={(e) => setHouseholdSurplus(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Loan Recommendation (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={loanRecommendation}
      onChange={(e) => setLoanRecommendation(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Expected Monthly Installment</label>
    <input
      type="number"
      className="form-control"
      value={expectedMonthlyInstallment}
      onChange={(e) => setExpectedMonthlyInstallment(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Allowable Disposable Loan Service (GH¢)</label>
    <input
      type="number"
      className="form-control"
      value={allowableDisposableLoanService}
      onChange={(e) => setAllowableDisposableLoanService(e.target.value)}
    />
  </div>
</div>

           {/* Generate Pay Capacity Button – LAST */}
    <div className="col-12 mt-3">
      <button
        className="btn btn-success"
        onClick={() => {
          // Placeholder for calculation logic
          alert('Generating Pay Capacity...');
          // You can calculate values like monthlyInstallment, householdSurplus, etc. here
        }}
      >
        Generate Pay Capacity
      </button>
    </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentWindow;