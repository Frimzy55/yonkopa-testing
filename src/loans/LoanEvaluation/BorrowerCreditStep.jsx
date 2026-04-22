import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Form, Row, Col } from "react-bootstrap";
import { calculateLoanDetails } from "./loanCalculations";
import {
  calculateCostOfGoodsSold,
  calculateGrossProfit,
  calculateTotalOperatingExpenses,
  calculateNetBusinessProfit,
  calculateHouseholdSurplus,
} from "./loanCalculation1";

const BorrowerCreditStep = ({ loan, data, setData, onBack, onNext }) => {
  // Initialize state from props
  const [isCreditworthy, setIsCreditworthy] = useState(data.isCreditworthy || false);
  const [businessOverview, setBusinessOverview] = useState(data.businessOverview || "");
  const [businessLocation, setBusinessLocation] = useState(data.businessLocation || "");
  const [businessStartDate, setBusinessStartDate] = useState(data.businessStartDate || "");
  const [nearestLandmark, setNearestLandmark] = useState(data.nearestLandmark || "");
  const [businessDescription, setBusinessDescription] = useState(data.businessDescription || "");
  const [isAbleToPay, setIsAbleToPay] = useState(data.isAbleToPay || false);
  const [currentStockValue, setCurrentStockValue] = useState(data.currentStockValue || 0);
  const [startedBusinessWith, setStartedBusinessWith] = useState(data.startedBusinessWith || 0);
  const [sourceOfFund, setSourceOfFund] = useState(data.sourceOfFund || "");
  const [principal, setPrincipal] = useState(data.principal || 0);
  const [rate, setRate] = useState(data.rate || 0);
  const [loanTerm, setLoanTerm] = useState(data.loanTerm || 0);
  const [interest, setInterest] = useState(data.interest || 0);
  const [loanAmount, setLoanAmount] = useState(data.loanAmount || 0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(data.monthlyInstallment || 0);
  const [grossMarginPercentage, setGrossMarginPercentage] = useState(data.grossMarginPercentage || 0);
  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState(data.monthlySalesRevenue || 0);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(data.costOfGoodsSold || 0);
  const [grossProfit, setGrossProfit] = useState(data.grossProfit || 0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(data.totalOperatingExpenses || 0);
  const [netBusinessProfit, setNetBusinessProfit] = useState(data.netBusinessProfit || 0);
  const [householdExpenses, setHouseholdExpenses] = useState(data.householdExpenses || 0);
  const [otherIncome, setOtherIncome] = useState(data.otherIncome || 0);
  const [householdSurplus, setHouseholdSurplus] = useState(data.householdSurplus || 0);
  const [loanRecommendation, setLoanRecommendation] = useState(data.loanRecommendation || 0);
  const [payCapacity, setPayCapacity] = useState(null);

  // Calculate loan details
  useEffect(() => {
    const { interest: calcInterest, loanAmount: calcLoan, monthlyInstallment: calcMonthly } =
      calculateLoanDetails({ principal, rate, loanTerm });
    setInterest(calcInterest);
    setLoanAmount(calcLoan);
    setMonthlyInstallment(calcMonthly);
  }, [principal, rate, loanTerm]);

  // Calculate financials
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

  // Sync data to parent
  useEffect(() => {
    setData({
      isCreditworthy, businessOverview, businessLocation, businessStartDate, nearestLandmark, businessDescription,
      isAbleToPay, currentStockValue, startedBusinessWith, sourceOfFund, principal, rate, loanTerm, interest,
      loanAmount, monthlyInstallment, grossMarginPercentage, monthlySalesRevenue, costOfGoodsSold, grossProfit,
      totalOperatingExpenses, netBusinessProfit, householdExpenses, otherIncome, householdSurplus, loanRecommendation
    });
  }, [
    isCreditworthy, businessOverview, businessLocation, businessStartDate, nearestLandmark, businessDescription,
    isAbleToPay, currentStockValue, startedBusinessWith, sourceOfFund, principal, rate, loanTerm, interest,
    loanAmount, monthlyInstallment, grossMarginPercentage, monthlySalesRevenue, costOfGoodsSold, grossProfit,
    totalOperatingExpenses, netBusinessProfit, householdExpenses, otherIncome, householdSurplus, loanRecommendation,
    setData
  ]);

  const handleGeneratePayCapacity = () => {
    const surplus = (parseFloat(loanRecommendation) || 0) - (parseFloat(monthlyInstallment) || 0);
    setPayCapacity(surplus);
  };

  const handleSubmit = () => {
    if (!isCreditworthy) {
      alert("Please confirm if the borrower is creditworthy");
      return;
    }
    onNext();
  };

  // Determine risk level based on financial indicators
  const getRiskLevel = () => {
    if (householdSurplus > monthlyInstallment * 1.5) return { level: "Low Risk", color: "success" };
    if (householdSurplus > monthlyInstallment) return { level: "Medium Risk", color: "warning" };
    return { level: "High Risk", color: "danger" };
  };

  const risk = getRiskLevel();

  return (
    <>
      <h5 className="mb-1">Borrower Credit Assessment</h5>
      <p className="text-muted mb-3">
        Credit information for <strong>{loan?.applicant_fullName}</strong>
      </p>

      {/* Financial Summary Card - Only show if creditworthy */}
      {isCreditworthy && (
        <Card className="p-3 mb-4">
          <Row className="g-3">
            <Col md={4}>
              <div className="text-center">
                <small className="text-muted">Monthly Sales Revenue</small>
                <h6 className="mb-0">GH¢ {monthlySalesRevenue.toLocaleString()}</h6>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <small className="text-muted">Net Business Profit</small>
                <h6 className="mb-0">GH¢ {netBusinessProfit.toLocaleString()}</h6>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <small className="text-muted">Household Surplus</small>
                <h6 className="mb-0">GH¢ {householdSurplus.toLocaleString()}</h6>
              </div>
            </Col>
          </Row>
          <hr className="my-3" />
          <Row className="align-items-center">
            <Col md={6}>
              <div>
                <small className="text-muted">Monthly Installment</small>
                <h6 className="mb-0">GH¢ {monthlyInstallment.toLocaleString()}</h6>
              </div>
            </Col>
            <Col md={6} className="text-end">
              <Badge bg={risk.color} className="p-2">
                {risk.level}
              </Badge>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <small className="text-muted">Loan Recommendation</small>
              <h5 className="text-primary mb-0">GH¢ {loanRecommendation.toLocaleString()}</h5>
            </Col>
          </Row>
        </Card>
      )}

      {/* Is Borrower Creditworthy */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Is the Borrower Creditworthy?</Form.Label>
        <div className="d-flex gap-3">
          <Form.Check
            type="radio"
            label="Yes"
            name="creditworthy"
            checked={isCreditworthy === true}
            onChange={() => setIsCreditworthy(true)}
          />
          <Form.Check
            type="radio"
            label="No"
            name="creditworthy"
            checked={isCreditworthy === false}
            onChange={() => setIsCreditworthy(false)}
          />
        </div>
      </Form.Group>

      {/* Only show the rest if creditworthy is YES */}
      {isCreditworthy && (
        <>
          {/* Business Overview */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Business Overview</Form.Label>
            <Form.Select value={businessOverview} onChange={(e) => setBusinessOverview(e.target.value)}>
              <option value="">Select Business Type</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Retailer">Retailer</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Form.Group>

          <h6 className="mt-3 mb-3 fw-semibold">Business Location & Details</h6>
          <Row className="g-3 mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Business Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter business location"
                  value={businessLocation}
                  onChange={(e) => setBusinessLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Business Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={businessStartDate}
                  onChange={(e) => setBusinessStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nearest Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nearest landmark"
                  value={nearestLandmark}
                  onChange={(e) => setNearestLandmark(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Business Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter business description"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Ability to Pay */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Determine Borrower's Ability to Pay Loan</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label="Yes"
                name="abilityToPay"
                checked={isAbleToPay === true}
                onChange={() => setIsAbleToPay(true)}
              />
              <Form.Check
                type="radio"
                label="No"
                name="abilityToPay"
                checked={isAbleToPay === false}
                onChange={() => setIsAbleToPay(false)}
              />
            </div>
          </Form.Group>

          {/* Financial Fields - Only if Able to Pay */}
          {isAbleToPay && (
            <>
              <Row className="g-3 mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Current Stock Value (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={currentStockValue}
                      onChange={(e) => setCurrentStockValue(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Started Business With (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={startedBusinessWith}
                      onChange={(e) => setStartedBusinessWith(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Source of Fund</Form.Label>
                    <Form.Select value={sourceOfFund} onChange={(e) => setSourceOfFund(e.target.value)}>
                      <option value="">Select Source</option>
                      <option value="Personal Savings">Personal Savings</option>
                      <option value="Loan">Loan</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-3" />
              <h6 className="mb-3 fw-semibold">Principal & Rate Calculation</h6>

              <Row className="g-3 mb-4">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Principal (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Rate (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Loan Term (Months)</Form.Label>
                    <Form.Control
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Interest (GH¢)</Form.Label>
                    <Form.Control type="number" value={interest} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Loan Amount (GH¢)</Form.Label>
                    <Form.Control type="number" value={loanAmount} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Monthly Installment (GH¢)</Form.Label>
                    <Form.Control type="number" value={monthlyInstallment} readOnly disabled />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-3" />
              <h6 className="mb-3 fw-semibold">Business Financial Section</h6>

              <Row className="g-3 mb-4">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Gross Margin Percentage (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={grossMarginPercentage}
                      onChange={(e) => setGrossMarginPercentage(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Monthly Sales Revenue (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={monthlySalesRevenue}
                      onChange={(e) => setMonthlySalesRevenue(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Cost of Goods Sold (GH¢)</Form.Label>
                    <Form.Control type="number" value={costOfGoodsSold} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Gross Profit (GH¢)</Form.Label>
                    <Form.Control type="number" value={grossProfit} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Total Operating Expenses (GH¢)</Form.Label>
                    <Form.Control type="number" value={totalOperatingExpenses} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Net Business Profit (GH¢)</Form.Label>
                    <Form.Control type="number" value={netBusinessProfit} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Household Expenses (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={householdExpenses}
                      onChange={(e) => setHouseholdExpenses(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Other Income (GH¢)</Form.Label>
                    <Form.Control
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Household Surplus (GH¢)</Form.Label>
                    <Form.Control type="number" value={householdSurplus} readOnly disabled />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Loan Recommendation (GH¢)</Form.Label>
                    <Form.Control type="number" value={loanRecommendation} readOnly disabled />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-3" />

              <Row className="g-3">
                <Col md={6}>
                  <Button variant="success" className="w-100" onClick={handleGeneratePayCapacity}>
                    Generate Pay Capacity
                  </Button>
                </Col>
              </Row>

              {payCapacity !== null && (
                <Row className="mt-3">
                  <Col xs={12}>
                    <strong>Pay Capacity Surplus (GH¢): </strong> {payCapacity.toFixed(2)}
                    <div className={payCapacity < 0 ? "text-danger mt-2" : "text-success mt-2"}>
                      {payCapacity < 0
                        ? "Applicant's disposable income to service the loan is less than the system's benchmark. Based on the data submitted, the applicant may not be able to service the loan."
                        : "Applicant's disposable income to service the loan is greater than the system's benchmark. Based on the data submitted, the applicant can be able to service the loan."}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      )}

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={onBack}>
          ← Previous
        </Button>
        <Button onClick={handleSubmit}>
          Next →
        </Button>
      </div>
    </>
  );
};

export default BorrowerCreditStep;