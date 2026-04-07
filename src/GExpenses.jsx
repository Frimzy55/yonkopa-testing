
//import React, { useState } from "react";
import React, { useState, useEffect,useCallback, } from "react";


const Expenses = ({
  
  principal,
  setPrincipal,
  rate,
  setRate,
  loanTerm,
  setLoanTerm,
  interest,
  setInterest,
  loanAmount,
  setLoanAmount,
  monthlyInstallment,
  setMonthlyInstallment,
  grossMarginInput,
  setGrossMarginInput,
  monthlySalesRevenue,
  setMonthlySalesRevenue,
  handleSalesRevenueChange,
  setHandleSalesRevenueChange,
  costOfGoodsSold,
  grossProfit,
  totalOperatingExpenses,
  netBusinessProfit,
  householdExpensesInput,
  setHouseholdExpensesInput,
  otherIncomeInput,
  setOtherIncomeInput,
  householdSurplus,
  
  loanRe,
  surplus,
  setSurplus,
  
  surplusValue,
  setSurplusValue,
  handleSurplusCalculation,
  surplusInterpretation,
  setSurplusInterpretation
   // Accept customer as a prop


// ...restProps
  
  
 // handleDisplayResult,
 // result,
}) => {
  
    const [showSurplus, setShowSurplus] = useState(false); 
  // const [surplusInterpretation, setSurplusInterpretation] = useState(""); // New state




const calculateLoanDetails = useCallback(() => {
  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) / 100 || 0;
  const t = parseFloat(loanTerm) || 0;

  const calculatedInterest = p * r * t;
  const calculatedLoanAmount = p + calculatedInterest;
  const calculatedMonthlyInstallment = t > 0 ? calculatedLoanAmount / t : 0;

  setInterest(calculatedInterest.toFixed(2));
  setLoanAmount(calculatedLoanAmount.toFixed(2));
  setMonthlyInstallment(calculatedMonthlyInstallment.toFixed(2));
}, [principal, rate, loanTerm, setInterest, setLoanAmount, setMonthlyInstallment]);

useEffect(() => {
  calculateLoanDetails();
}, [calculateLoanDetails]); // ESLint happy

     

      const calculateSurplusOrDeficit = () => {
        const surplusDeficit = parseFloat(loanRe || 0) - parseFloat(monthlyInstallment || 0);
        setSurplusValue(surplusDeficit.toFixed(2)); // Set the numeric value
    
        if (surplusDeficit < 0) {
          setSurplus(`Deficit (GH¢ ${surplusDeficit.toFixed(2)})`);
          setSurplusInterpretation(
            "Applicant's disposable income to service the loan is less than the system's benchmark. Based on the data submitted, the applicant may not be able to service the loan."
          );
        } else {
          setSurplus(`Surplus (GH¢ ${surplusDeficit.toFixed(2)})`);
          setSurplusInterpretation(
            "Applicant's disposable income to service the loan is greater than the system's benchmark. Based on the data submitted, the applicant may be able to service the loan."
          );
        }
    
        setShowSurplus(true);
      };

  return (
    <div className="container">
     
      <div className="row"> 

      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label ">Principal</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="number"
            className="form-control form-control-sm"
            id="principal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Rate */}
      <div className="col-md-6 mb-4">
        <label htmlFor="rate" className="form-label ">Rate</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">%</div>
          <input
            type="number"
            className="form-control form-control-sm"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Loan Term */}
      <div className="col-md-6 mb-4">
        <label htmlFor="loanTerm" className="form-label ">Loan Term (Month)</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control form-control-sm"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Calculated Interest */}
      <div className="col-md-6 mb-4">
        <label className="form-label ">Interest</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="text"
            className="form-control form-control-sm"
            value={interest}
            readOnly
          />
        </div>
      </div>
      {/* Loan Amount */}
      <div className="col-md-6 mb-4">
        <label className="form-label ">Loan Amount</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <input
            type="text"
            className="form-control form-control-sm"
            value={loanAmount}
            readOnly
          />
        </div>
      </div>

       {/* Monthly Installment */}
       <div className="col-md-6 mb-4">
        <label className="form-label ">Monthly Installment</label>
        <div className="input-group">
        <div className="input-group-text text-dark" style={{ backgroundColor: 'yellow' }}>GH¢</div>

          <input
            type="text"
            className="form-control form-control-sm"
            value={monthlyInstallment}
            readOnly
          />
        </div>
      </div>

      {/* Calculate Button 
      <div className="col-md-12">
        <button
          type="button"
          className="btn btn-primary"
          onClick={calculateLoanDetails}
        >
          Calculate
        </button>
      </div> */}

    
      <div style={{ borderTop: '2px solid darkgray', width: '95%', margin: '10px auto' }}></div>

        {/* Gross Margin */}
        <div className="col-md-6 mb-4">
          <label htmlFor="grossMargin" className="form-label ">
            Gross Margin Percentage
          </label>
          <div className="input-group">
            <div className="input-group-text bg-success text-white">%</div>
            <input
              type="number"
              className="form-control form-control-sm"
              id="grossMargin"
              value={grossMarginInput}
              onChange={(e) => setGrossMarginInput(e.target.value)}
              placeholder="Enter percentage (e.g., 80)"
              required
            />
          </div>
        </div>

        {/* Monthly Sales Revenue */}
        <div className="col-md-6 mb-4">
          <label htmlFor="monthlySalesRevenue" className="form-label ">
            Monthly Sales Revenue
          </label>
          <div className="input-group">
          <div className="input-group-text bg-success text-white">GH¢</div>
            <input
              type="number"
              className="form-control form-control-sm"
              id="monthlySalesRevenue"
              value={monthlySalesRevenue}
              /* onChange={handleSalesRevenueChange}*/
              onChange={(e) =>  setMonthlySalesRevenue(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Cost of Goods Sold */}
        <div className="col-md-6 mb-4">
          <label htmlFor="costOfGoodsSold" className="form-label ">
            Cost of Goods Sold
          </label>
          <div className="input-group">
            <div className="input-group-text bg-light text-muted">GH¢</div>
            <input
              type="number"
              className="form-control form-control-sm "
              id="costOfGoodsSold"
              value={costOfGoodsSold}
              readOnly
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="col-md-6 mb-4">
                <label htmlFor="householdExpenses" className="form-label ">Gross Profit</label>
                <div className="input-group">
                  <div className="input-group-text bg-light text-muted">GH¢</div>
                  <input
                    type="number"
                    className="form-control form-control-sm "
                    id="grossProfit"
   
                     value={grossProfit}
                     readOnly
                     placeholder="0.00"
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                   <label htmlFor="totalOperatingExpenses" className="form-label ">
                        Total Operating Expenses
                   </label>
                    <div className="input-group">
                    <div className="input-group-text bg-light text-muted">GH¢</div>
                    <input
                        type="number"
                         className="form-control form-control-sm "
                         id="totalOperatingExpenses"
                         value={totalOperatingExpenses}
                         readOnly
                          placeholder="0.00"
                          />
                         </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <label htmlFor="netBusinessProfit" className="form-label ">
                          Net Business Profit
                       </label>
                       <div className="input-group">
                       <div className="input-group-text bg-light text-muted">GH¢</div>
                      <input
                       type="number"
                        className="form-control form-control-sm "
                        id="netBusinessProfit"
                       value={netBusinessProfit}
                       readOnly
                      placeholder="0.00"
                      />
                   </div>
                </div>

                <div className="col-md-6 mb-4">
                <label htmlFor="householdExpenses" className="form-label ">Household Expenses</label>
                <div className="input-group">
                <div className="input-group-text bg-success text-white">GH¢</div>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="householdExpensesInput"
                    value={householdExpensesInput}
                    onChange={(e) => setHouseholdExpensesInput(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="householdExpenses" className="form-label ">Other Income</label>
                <div className="input-group">
                <div className="input-group-text bg-success text-white">GH¢</div>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="otherIncomeInput"
                    value={otherIncomeInput}
                    onChange={(e) => setOtherIncomeInput(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                 <label htmlFor="householdSurplus" className="form-label ">
                  Household Surplus
                </label>
                 <div className="input-group">
                 <div className="input-group-text bg-light text-muted">GH¢</div>
                <input
                  type="number"
                     className="form-control form-control-sm "
                   id="householdSurplus"
                   value={householdSurplus}
                 readOnly
                   placeholder="0.00"
                   />
                </div>
            </div>

            <div className="col-md-6 mb-4">
                 <label htmlFor="householdSurplus" className="form-label ">
                  Loan Recommendation
                </label>
                 <div className="input-group">
                 <div className="input-group-text text-dark" style={{ backgroundColor: 'yellow' }}>GH¢</div>

                <input
                  type="number"
                     className="form-control form-control-sm "
                   id="loanRe"
                   value={loanRe}
                 readOnly
                   placeholder="0.00"
                   />
                </div>
            </div>  

            <div className="col-md-6 mb-4">
                <label className="form-label ">Expected Monthly Installment</label>
                <div className="p-1 border bg-secondary text-white mb-2">
                 {monthlyInstallment || "GH¢ 0.00"}
                 </div>

                 <label className="form-label "> Allowable Disposable Loan Service</label>
 
                   <div className="p-1 border bg-secondary text-white mb-2">
                     {loanRe || "GH¢ 0.00"}
                    </div>
                   </div>
        
         {/* Calculate Surplus Button */}
         <div className="col-md-12">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              calculateLoanDetails();
              calculateSurplusOrDeficit();
            }}
          >
            Generate Capacity to pay Analysis
          </button>
        </div>


        {showSurplus && (
    <>
        <div className="col-md-6 mb-4">
          <label htmlFor="surplus" className="form-label ">
            Surplus/Deficit
          </label>
          <div className="input-group">
            <div className="input-group-text bg-light text-muted">GH¢</div>
            <input
              type="text"
              className={`form-control form-control-sm ${
              surplusValue < 0 ? "text-danger" : "text-success"
              }`}
             id="surplus"
              value={surplus}
              readOnly
             />
          </div>
        </div>

        <div className="col-md-6 mb-4 bg-white">
                <label htmlFor="surplus" className="form-label text-white">
                 Surplus Interpretation
               </label>
               <div className="input-group">
               <div className="input-group-text bg-white text-white">
                GH¢
              </div>
             <input
             type="text"
             className={`form-control form-control-sm bg-white text-white ${
            surplusValue < 0 ? "text-danger" : "text-success"
             }`}
             id="surplus"
                 value={surplusInterpretation}
              readOnly
              />
           </div>
          </div>



        {/* Interpretation Display */}
        <div className="col-md-12 mt-3">
              <div
                className={`alert ${
                  surplusValue < 0 ? "alert-danger" : "alert-success"
                }`}
              >
                {surplusInterpretation}
              </div>
            </div>
          </>


        )}
      </div>
    </div>
  );
};

export default Expenses;
