import { useState, useEffect } from "react";

const CollateralDetailsWindow = ({ application, onBack, onNext }) => {
  const [isCreditworthy, setIsCreditworthy] = useState("");
  const [abilityToPay, setAbilityToPay] = useState("");

  // Business Overview Fields
  const [businessType, setBusinessType] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessStartDate, setBusinessStartDate] = useState("");
  const [nearestLandmark, setNearestLandmark] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  // New fields for "Determine Borrower's Ability to Pay Loan"
  const [currentStockValue, setCurrentStockValue] = useState(0);
  const [startedBusinessWith, setStartedBusinessWith] = useState(0);
  const [sourceOfFund, setSourceOfFund] = useState("");

  // Loan & Financial Fields
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [term, setTerm] = useState(0); // months
  const [monthlySales, setMonthlySales] = useState(0);
  const [cogs, setCogs] = useState(0);
  const [operatingExpenses, setOperatingExpenses] = useState(0);
  const [householdExpenses, setHouseholdExpenses] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  // Computed Fields
  const [interest, setInterest] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [grossMargin, setGrossMargin] = useState(0);
  const [householdSurplus, setHouseholdSurplus] = useState(0);

  // Auto-calculation effect
  useEffect(() => {
    const gp = monthlySales - cogs;
    setGrossProfit(gp);
    setGrossMargin(monthlySales > 0 ? (gp / monthlySales) * 100 : 0);

    const i = (principal * rate * term) / 1200;
    setInterest(i);
    setMonthlyInstallment(term > 0 ? (principal + i) / term : 0);

    const hs = gp + otherIncome - (operatingExpenses + householdExpenses);
    setHouseholdSurplus(hs);
  }, [
    principal,
    rate,
    term,
    monthlySales,
    cogs,
    operatingExpenses,
    householdExpenses,
    otherIncome,
  ]);

  return (
    <div className="p-4 border rounded shadow">
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Profile
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>

      <h4>Assessment Details</h4>
      <p>
        Assessment information for <strong>{application.applicantName}</strong>
      </p>

      {/* Creditworthy */}
      <div className="mt-4">
        <label className="form-label fw-bold">
          Is the Borrower Creditworthy?
        </label>
        <div className="d-flex gap-4 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="creditworthy"
              onChange={() => setIsCreditworthy("yes")}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="creditworthy"
              onChange={() => setIsCreditworthy("no")}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      {/* Business Overview */}
      {isCreditworthy === "yes" && (
        <div className="mt-4">
          <h5>Business Overview</h5>

          <div className="row">
            {/* Business Type */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Business Type</label>
              <select
                className="form-select"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="wholesale">Wholesale</option>
                <option value="retailer">Retailer</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Business Location */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Business Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter business location"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
              />
            </div>

            {/* Business Start Date */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Business Start Date</label>
              <input
                type="date"
                className="form-control"
                value={businessStartDate}
                onChange={(e) => setBusinessStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {/* Nearest Landmark */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Nearest Landmark</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nearest landmark"
                value={nearestLandmark}
                onChange={(e) => setNearestLandmark(e.target.value)}
              />
            </div>

            {/* Business Description */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Business Description</label>
              <textarea
                className="form-control"
                placeholder="Enter business description"
                rows={3}
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Ability to Pay */}
          <div className="mt-3">
            <label className="form-label fw-bold">
              Determine Borrower's Ability to Pay Loan
            </label>
            <div className="d-flex gap-4 mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="abilityToPay"
                  onChange={() => setAbilityToPay("yes")}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="abilityToPay"
                  onChange={() => setAbilityToPay("no")}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {/* New fields under "Determine Borrower's Ability to Pay Loan" */}
          {abilityToPay === "yes" && (
            <div className="mt-4 p-3 border rounded">
              <h6 className="mb-3">Business Capital Details</h6>
              
              <div className="row">
                {/* Current Stock Value */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Current Stock Value (GH¢)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentStockValue}
                    onChange={(e) => setCurrentStockValue(parseFloat(e.target.value) || 0)}
                  />
                  <div className="form-text">0.00</div>
                </div>

                {/* Started Business With */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Started Business With (GH¢)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={startedBusinessWith}
                    onChange={(e) => setStartedBusinessWith(parseFloat(e.target.value) || 0)}
                  />
                  <div className="form-text">0.00</div>
                </div>

                {/* Source of Fund */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Source of Fund</label>
                  <select
                    className="form-select"
                    value={sourceOfFund}
                    onChange={(e) => setSourceOfFund(e.target.value)}
                  >
                    <option value="">Select Source</option>
                    <option value="personal-savings">Personal Savings</option>
                    <option value="loan">Loan</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Financial Assessment */}
      {abilityToPay === "yes" && (
        <div className="mt-5">
          <h5>Loan & Financial Assessment</h5>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Principal (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Loan Term (Months)</label>
              <input
                type="number"
                className="form-control"
                value={term}
                onChange={(e) => setTerm(parseFloat(e.target.value))}
              />
            </div>


            <div className="col-md-3 mb-3">
              <label className="form-label">Loan Amount (Months)</label>
              <input
                type="number"
                className="form-control"
                value={term}
                onChange={(e) => setTerm(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Interest (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={interest.toFixed(2)}
                readOnly
              />
            </div>


            <div className="col-md-3 mb-3">
              <label className="form-label">Monthly Installment</label>
              <input
                type="number"
                className="form-control"
                value={term}
                onChange={(e) => setTerm(parseFloat(e.target.value))}
              />
            </div>
          </div>


          

          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Monthly Sales Revenue (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={monthlySales}
                onChange={(e) => setMonthlySales(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Cost of Goods Sold (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={cogs}
                onChange={(e) => setCogs(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Gross Profit (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={grossProfit.toFixed(2)}
                readOnly
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Gross Margin (%)</label>
              <input
                type="number"
                className="form-control"
                value={grossMargin.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Operating Expenses (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={operatingExpenses}
                onChange={(e) => setOperatingExpenses(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Household Expenses (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={householdExpenses}
                onChange={(e) => setHouseholdExpenses(parseFloat(e.target.value))}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Other Income (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={otherIncome}
                onChange={(e) => setOtherIncome(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Household Surplus (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={householdSurplus.toFixed(2)}
                readOnly
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Expected Monthly Installment (GH¢)</label>
              <input
                type="number"
                className="form-control"
                value={monthlyInstallment.toFixed(2)}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollateralDetailsWindow;