import React, { useState } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";

import LoanDetailsStep from "./LoanDetailsStep";
import CollateralStep from "./CollateralStep";
import BorrowerCreditStep from "./BorrowerCreditStep";
import FinalDecisionStep from "./FinalDecisionStep";

const STEPS = [
  { number: 1, title: "Loan Details" },
  { number: 2, title: "Collateral" },
  { number: 3, title: "Borrower Credit" },
  { number: 4, title: "Recommendation" },
];

const LoanEvaluation = ({ loan, onBack }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    loanDetails: {},
    collateral: {},
    credit: {},
    decision: {}
  });

  if (!loan) return null;

  const stepProgress = (step / 4) * 100;

  /*const handleSubmit = async () => {
  const res = await fetch("http://localhost:5000/api/loans/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      loanId: loan.loan_id,
      loanDetails: formData.loanDetails,
      collateral: formData.collateral,
      credit: formData.credit,
      decision: formData.decision
    })
  });

  

  const data = await res.json();
  alert(data.message);
};
*/

const handleSubmit = async (overrideData) => {
  const payload = {
    loan,
    collateral: formData.collateral,
    creditData: formData.credit,
    finalDecision: overrideData?.decision || formData.decision
  };

  const res = await fetch("http://localhost:5000/api/loan/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  alert(data.message);
};

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Loan Evaluation</h4>
        <Button variant="outline-secondary" size="sm" onClick={onBack}>
          ← Back
        </Button>
      </div>

      {/* MULTI-STEP INDICATOR */}
      <div className="d-flex justify-content-between mb-4">
        {STEPS.map((s) => (
          <div
            key={s.number}
            className={`text-center flex-grow-1 ${
              s.number === step ? "fw-bold text-primary" : "text-muted"
            }`}
            style={{ fontSize: "14px" }}
          >
            <div
              className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-1 ${
                s.number === step
                  ? "bg-primary text-white"
                  : "bg-light text-muted"
              }`}
              style={{ width: "32px", height: "32px", fontSize: "14px" }}
            >
              {s.number}
            </div>
            <div>{s.title}</div>
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      <ProgressBar now={stepProgress} className="mb-4" />

      <Card className="shadow-sm border-0">
        <Card.Body>

          {/* STEP 1 */}
          {step === 1 && (
            <LoanDetailsStep
              loan={loan}
              data={formData.loanDetails}
              setData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  loanDetails: data
                }))
              }
              onNext={() => setStep(2)}
            />
          )}

          {/* STEP 2 */}
         {step === 2 && (
  <CollateralStep
    loan={loan}
    data={formData.collateral}
    setData={(data) =>
      setFormData((prev) => ({
        ...prev,
        collateral: data
      }))
    }
    onBack={() => setStep(1)}
    onNext={(data) => {
      setFormData((prev) => ({
        ...prev,
        collateral: data
      }));
      setStep(3);
    }}
  />
)}

          {/* STEP 3 */}
          {step === 3 && (
            <BorrowerCreditStep
             loan={loan}   // ✅ ADD THIS LINE
              data={formData.credit}
              setData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  credit: data
                }))
              }
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}

          {/* STEP 4 */}
         {step === 4 && (
  <FinalDecisionStep
    loan={loan}
    onBack={() => setStep(3)}
    onSubmit={(data) => {
      setFormData((prev) => ({
        ...prev,
        decision: data   // ✅ SAVE IT FIRST
      }));

      handleSubmit({
        ...formData,
        decision: data   // ✅ SEND CORRECT DATA
      });
    }}
  />
)}

        </Card.Body>
      </Card>
    </div>
  );
};

export default LoanEvaluation;