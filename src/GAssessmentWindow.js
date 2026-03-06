import { useState, useEffect, useCallback } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import Expenses from "./GExpenses";
import axios from "axios";

const CreditWorthDetail = ({ application, formData, setFormData, onBack, onNext }) => {
  const initialData = formData.creditAssessment || {};

  // ===== States =====
  const [isCreditworthy, setIsCreditworthy] = useState(initialData.isCreditworthy || "");
  const [businessType, setBusinessType] = useState(initialData.businessType || "");
  const [businessLocation, setBusinessLocation] = useState(initialData.businessLocation || "");
  const [businessStartDate, setBusinessStartDate] = useState(initialData.businessStartDate || "");
  const [nearestLandmark, setNearestLandmark] = useState(initialData.nearestLandmark || "");
  const [businessDescription, setBusinessDescription] = useState(initialData.businessDescription || "");
  const [canPayLoan, setCanPayLoan] = useState(initialData.canPayLoan || "");

  const [currentStockValue, setCurrentStockValue] = useState(initialData.currentStockValue || "");
  const [startedBusinessWith, setStartedBusinessWith] = useState(initialData.startedBusinessWith || "");
  const [sourceOfFund, setSourceOfFund] = useState(initialData.sourceOfFund || "");

  const [principal, setPrincipal] = useState(initialData.principal || "");
  const [rate, setRate] = useState(initialData.rate || "");
  const [loanTerm, setLoanTerm] = useState(initialData.loanTerm || "");
  const [interest, setInterest] = useState(initialData.interest || "");
  const [loanAmount, setLoanAmount] = useState(initialData.loanAmount || "");
  const [monthlyInstallment, setMonthlyInstallment] = useState(initialData.monthlyInstallment || "");

  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState(initialData.monthlySalesRevenue || "");
  const [grossMarginInput, setGrossMarginInput] = useState(initialData.grossMarginInput || "");

  const [costOfGoodsSold, setCostOfGoodsSold] = useState(initialData.costOfGoodsSold || 0);
  const [grossProfit, setGrossProfit] = useState(initialData.grossProfit || 0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(initialData.totalOperatingExpenses || 0);
  const [netBusinessProfit, setNetBusinessProfit] = useState(initialData.netBusinessProfit || 0);

  const [householdExpensesInput, setHouseholdExpensesInput] = useState(initialData.householdExpensesInput || "");
  const [otherIncomeInput, setOtherIncomeInput] = useState(initialData.otherIncomeInput || "");

  const [householdSurplus, setHouseholdSurplus] = useState(initialData.householdSurplus || 0);
  const [loanRecommendation, setLoanRecommendation] = useState(initialData.loanRecommendation || 0);
  const [surplusInterpretation, setSurplusInterpretation] = useState(initialData.surplusInterpretation || "");

  const [submitStatus, setSubmitStatus] = useState(null);

  // ===== Handlers for radio buttons =====
  const handleCreditworthinessChange = (e) => setIsCreditworthy(e.target.value);
  const handleBusinessTypeChange = (e) => setBusinessType(e.target.value);
  const handleLoanAbilityChange = (e) => setCanPayLoan(e.target.value);
  const handleSourceOfFundChange = (e) => setSourceOfFund(e.target.value);

  // ===== Sync state to main wizard =====
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      creditAssessment: {
        isCreditworthy,
        businessType,
        businessLocation,
        businessStartDate,
        nearestLandmark,
        businessDescription,
        canPayLoan,
        currentStockValue,
        startedBusinessWith,
        sourceOfFund,
        principal,
        rate,
        loanTerm,
        interest,
        loanAmount,
        monthlyInstallment,
        monthlySalesRevenue,
        grossMarginInput,
        costOfGoodsSold,
        grossProfit,
        totalOperatingExpenses,
        netBusinessProfit,
        householdExpensesInput,
        otherIncomeInput,
        householdSurplus,
        loanRecommendation,
        surplusInterpretation
      }
    }));
  }, [
    isCreditworthy, businessType, businessLocation, businessStartDate,
    nearestLandmark, businessDescription, canPayLoan, currentStockValue,
    startedBusinessWith, sourceOfFund, principal, rate, loanTerm, interest,
    loanAmount, monthlyInstallment, monthlySalesRevenue, grossMarginInput,
    costOfGoodsSold, grossProfit, totalOperatingExpenses, netBusinessProfit,
    householdExpensesInput, otherIncomeInput, householdSurplus, loanRecommendation,
    surplusInterpretation, setFormData
  ]);

  // ===== Financial calculations =====
  const recalculateResults = useCallback(() => {
    const salesRevenue = parseFloat(monthlySalesRevenue) || 0;
    const grossMargin = parseFloat(grossMarginInput) || 0;

    const cogs = (salesRevenue * (100 - grossMargin)) / 100;
    setCostOfGoodsSold(cogs);

    const grossProfitValue = salesRevenue - cogs;
    setGrossProfit(grossProfitValue);

    const expenses = grossProfitValue * 0.3;
    setTotalOperatingExpenses(expenses);

    const netProfit = grossProfitValue - expenses;
    setNetBusinessProfit(netProfit);

    const otherIncome = parseFloat(otherIncomeInput) || 0;
    const householdExpenses = parseFloat(householdExpensesInput) || 0;

    const surplus = netProfit + otherIncome - householdExpenses;
    setHouseholdSurplus(surplus);
    setLoanRecommendation(surplus * 0.6);

    setSurplusInterpretation(surplus > 0 ? "Borrower can repay loan." : "Borrower cannot repay loan.");
  }, [monthlySalesRevenue, grossMarginInput, householdExpensesInput, otherIncomeInput]);

  useEffect(() => { recalculateResults(); }, [recalculateResults]);

  // ===== Submit =====
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5001/api/credit", formData.creditAssessment);
      setSubmitStatus({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      setSubmitStatus({ success: false, message: "Error submitting form." });
    }
  };

  const handleOkClick = () => setSubmitStatus(null);

  if (!application) return null;

  // ===== Render =====
  return (
    <div className="container my-4 md-1" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      <div className="card shadow-lg rounded">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
          <h3 className="mb-0"><FaRegCreditCard className="me-2" /> Assess Borrower's Credit Worthiness</h3>
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={onBack}>Back</button>
            <button className="btn btn-success btn-sm" onClick={onNext}>Next</button>
          </div>
        </div>
        <div className="card-body">

          {/* Creditworthy */}
          <div className="mb-4">
            <label className="form-label text-primary">Is the Borrower Creditworthy?</label>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" value="yes" checked={isCreditworthy === 'yes'} onChange={handleCreditworthinessChange} id="creditworthyYes" />
              <label className="form-check-label" htmlFor="creditworthyYes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" value="no" checked={isCreditworthy === 'no'} onChange={handleCreditworthinessChange} id="creditworthyNo" />
              <label className="form-check-label" htmlFor="creditworthyNo">No</label>
            </div>
          </div>

          {isCreditworthy === 'yes' && (
            <>
              {/* Business Overview */}
              <div className="mb-4">
                <h5 className="text-primary">Business Overview</h5>
                {['wholesale','retailer','others'].map(type => (
                  <div className="form-check form-check-inline" key={type}>
                    <input type="radio" className="form-check-input" value={type} checked={businessType === type} onChange={handleBusinessTypeChange} id={type} />
                    <label className="form-check-label" htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label text-primary">Business Location</label>
                  <input type="text" className="form-control form-control-sm" value={businessLocation} onChange={(e)=>setBusinessLocation(e.target.value)} placeholder="Enter business location" required/>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label text-primary">Business Start Date</label>
                  <input type="date" className="form-control form-control-sm" value={businessStartDate} onChange={(e)=>setBusinessStartDate(e.target.value)} required/>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label text-primary">Nearest Landmark</label>
                  <input type="text" className="form-control form-control-sm" value={nearestLandmark} onChange={(e)=>setNearestLandmark(e.target.value)} placeholder="Enter nearest landmark" required/>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label text-primary">Business Description</label>
                  <textarea className="form-control form-control-sm" rows="3" value={businessDescription} onChange={(e)=>setBusinessDescription(e.target.value)} placeholder="Enter business description" required/>
                </div>
              </div>

              {/* Ability to pay loan */}
              <div className="mb-4">
                <h5 className="text-primary">Determine Borrower's Ability to Pay Loan</h5>
                {['yes','no'].map(val => (
                  <div className="form-check form-check-inline" key={val}>
                    <input type="radio" className="form-check-input" value={val} checked={canPayLoan === val} onChange={handleLoanAbilityChange} id={`canPay${val}`} />
                    <label className="form-check-label" htmlFor={`canPay${val}`}>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
                  </div>
                ))}
              </div>

              {canPayLoan === 'yes' && (
                <>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label text-primary">Current Stock Value</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted">GH¢</span>
                        <input type="number" className="form-control form-control-sm" value={currentStockValue} onChange={(e)=>setCurrentStockValue(e.target.value)} placeholder="0.00" required/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label text-primary">Started Business With</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted">GH¢</span>
                        <input type="number" className="form-control form-control-sm" value={startedBusinessWith} onChange={(e)=>setStartedBusinessWith(e.target.value)} placeholder="0.00" required/>
                      </div>
                    </div>
                  </div>

                  {/* Source of Fund */}
                  <div className="mb-4">
                    <h5 className="text-primary">Source of Fund</h5>
                    {['personalSavings','loan','others'].map(val => (
                      <div className="form-check form-check-inline" key={val}>
                        <input type="radio" className="form-check-input" value={val} checked={sourceOfFund === val} onChange={handleSourceOfFundChange} id={val}/>
                        <label className="form-check-label" htmlFor={val}>{val === 'others' ? 'Others' : val === 'loan' ? 'Loan' : 'Personal Savings'}</label>
                      </div>
                    ))}
                  </div>

                  {/* Expenses Component */}
                  <Expenses
                    principal={principal} setPrincipal={setPrincipal}
                    rate={rate} setRate={setRate}
                    loanTerm={loanTerm} setLoanTerm={setLoanTerm}
                    interest={interest} setInterest={setInterest}
                    loanAmount={loanAmount} setLoanAmount={setLoanAmount}
                    monthlyInstallment={monthlyInstallment} setMonthlyInstallment={setMonthlyInstallment}
                    monthlySalesRevenue={monthlySalesRevenue} setMonthlySalesRevenue={setMonthlySalesRevenue}
                    grossMarginInput={grossMarginInput} setGrossMarginInput={setGrossMarginInput}
                    costOfGoodsSold={costOfGoodsSold} setCostOfGoodsSold={setCostOfGoodsSold}
                    grossProfit={grossProfit} setGrossProfit={setGrossProfit}
                    totalOperatingExpenses={totalOperatingExpenses} setTotalOperatingExpenses={setTotalOperatingExpenses}
                    netBusinessProfit={netBusinessProfit} setNetBusinessProfit={setNetBusinessProfit}
                    householdExpensesInput={householdExpensesInput} setHouseholdExpensesInput={setHouseholdExpensesInput}
                    otherIncomeInput={otherIncomeInput} setOtherIncomeInput={setOtherIncomeInput}
                    householdSurplus={householdSurplus} setHouseholdSurplus={setHouseholdSurplus}
                    loanRe={loanRecommendation} setLoanRecommendation={setLoanRecommendation}
                    surplusInterpretation={surplusInterpretation} setSurplusInterpretation={setSurplusInterpretation}
                  />

                  {submitStatus && (
                    <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                      {submitStatus.message}
                      <button type="button" className="btn btn-sm btn-link float-end" onClick={handleOkClick}>OK</button>
                    </div>
                  )}

                  <div className="card-footer">
                    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreditWorthDetail;