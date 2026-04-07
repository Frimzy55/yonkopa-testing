import React, { useState } from "react";

const CreditCommitteeWizard = ({ onFinish }) => {

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {

    switch (currentStep) {

      // STEP 1
      case 1:
        return (
          <div>
            <h4 className="mb-3">Customer Information</h4>

            <div className="row">

              <div className="col-md-4 mb-2">
                <strong>Customer ID:</strong> CUST-001
              </div>

              <div className="col-md-4 mb-2">
                <strong>Full Name:</strong> John Doe
              </div>

              <div className="col-md-4 mb-2">
                <strong>Phone Number:</strong> +233 55 123 4567
              </div>

              <div className="col-md-4 mb-2">
                <strong>Email:</strong> johndoe@email.com
              </div>

              <div className="col-md-4 mb-2">
                <strong>Occupation:</strong> Trader
              </div>

              <div className="col-md-4 mb-2">
                <strong>Branch:</strong> Koforidua Branch
              </div>

            </div>
          </div>
        );

      // STEP 2
      case 2:
        return (
          <div>
            <h4 className="mb-3">Loan Information</h4>

            <div className="row">

              <div className="col-md-4 mb-2">
                <strong>Loan ID:</strong> LN-1023
              </div>

              <div className="col-md-4 mb-2">
                <strong>Loan Amount:</strong> GHS 10,000
              </div>

              <div className="col-md-4 mb-2">
                <strong>Loan Product:</strong> Business Loan
              </div>

              <div className="col-md-4 mb-2">
                <strong>Interest Rate:</strong> 18%
              </div>

              <div className="col-md-4 mb-2">
                <strong>Loan Term:</strong> 12 Months
              </div>

              <div className="col-md-4 mb-2">
                <strong>Repayment Method:</strong> Monthly
              </div>

            </div>
          </div>
        );

        // STEP 3
case 3:
  return (
    <div>
      <h4 className="mb-3">Guarantor Information</h4>

      <div className="row">

        <div className="col-md-4 mb-2">
          <strong>Guarantor Name:</strong> Michael Mensah
        </div>

        <div className="col-md-4 mb-2">
          <strong>Phone Number:</strong> +233 24 555 8899
        </div>

        <div className="col-md-4 mb-2">
          <strong>Email:</strong> michaelmensah@email.com
        </div>

        <div className="col-md-4 mb-2">
          <strong>Relationship:</strong> Brother
        </div>

        <div className="col-md-4 mb-2">
          <strong>Occupation:</strong> Civil Engineer
        </div>

        <div className="col-md-4 mb-2">
          <strong>Address:</strong> East Legon, Accra
        </div>

        <div className="col-md-4 mb-2">
          <strong>ID Type:</strong> Ghana Card
        </div>

        <div className="col-md-4 mb-2">
          <strong>ID Number:</strong> GHA-123456789-1
        </div>

      </div>
    </div>
  );

  // STEP 4
case 4:
  return (
    <div>
      <h4 className="mb-3">Credit Assessment</h4>

      <div className="row">

        <div className="col-md-4 mb-2">
          <strong>Monthly Income:</strong> GHS 3,500
        </div>

        <div className="col-md-4 mb-2">
          <strong>Monthly Expenses:</strong> GHS 1,800
        </div>

        <div className="col-md-4 mb-2">
          <strong>Disposable Income:</strong> GHS 1,700
        </div>

        <div className="col-md-4 mb-2">
          <strong>Existing Loans:</strong> None
        </div>

        <div className="col-md-4 mb-2">
          <strong>Credit Score:</strong> 720
        </div>

        <div className="col-md-4 mb-2">
          <strong>Debt-to-Income Ratio:</strong> 25%
        </div>

        <div className="col-md-4 mb-2">
          <strong>Repayment Capacity:</strong> Strong
        </div>

        <div className="col-md-4 mb-2">
          <strong>Risk Level:</strong> Low
        </div>

        <div className="col-md-8 mb-2">
          <strong>Loan Officer Recommendation:</strong> Approve Loan
        </div>

      </div>
    </div>
  );
  // STEP 5
case 5:
  return (
    <div>
      <h4 className="mb-3">Collateral Information</h4>

      <div className="row">

        <div className="col-md-4 mb-2">
          <strong>Collateral Type:</strong> Land Title
        </div>

        <div className="col-md-4 mb-2">
          <strong>Asset Owner:</strong> John Doe
        </div>

        <div className="col-md-4 mb-2">
          <strong>Asset Value:</strong> GHS 25,000
        </div>

        <div className="col-md-4 mb-2">
          <strong>Collateral Location:</strong> Kasoa, Central Region
        </div>

        <div className="col-md-4 mb-2">
          <strong>Document Type:</strong> Land Title Certificate
        </div>

        <div className="col-md-4 mb-2">
          <strong>Document Number:</strong> LT-983244
        </div>

        <div className="col-md-4 mb-2">
          <strong>Verification Status:</strong> Verified
        </div>

        <div className="col-md-8 mb-2">
          <strong>Description:</strong> Residential land used as collateral for the loan
        </div>

      </div>
    </div>
  );

  // STEP 6
case 6:
  return (
    <div>
      <h4 className="mb-3">Credit Committee Decision</h4>

      <div className="row">

        <div className="col-md-4 mb-3">
          <label className="form-label"><strong>Decision</strong></label>
          <select className="form-control">
            <option value="">Select Decision</option>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="defer">Defer</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label"><strong>Approved Amount</strong></label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Approved Amount"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label"><strong>Interest Rate (%)</strong></label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Interest Rate"
          />
        </div>

        <div className="col-md-12 mb-3">
          <label className="form-label"><strong>Committee Comments</strong></label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter committee comments or reasons for decision"
          />
        </div>

      </div>
    </div>
  );

      default:
        return (
          <div>
            <h5>Step {currentStep}</h5>
            <p>Content for step {currentStep} of 6</p>
          </div>
        );
    }

  };

  return (

    <div className="wizard-section border p-4 rounded shadow-sm">

      {/* Step Indicator */}
      <div className="d-flex justify-content-between mb-3">
        {[1,2,3,4,5,6].map((step) => (
          <div
            key={step}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: currentStep === step ? "#0d6efd" : "#ccc",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold"
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ minHeight: "200px" }}>
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between">

        <button
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>

        {currentStep < 6 ? (
          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={onFinish}>
            Finish
          </button>
        )}

      </div>

    </div>

  );
};

export default CreditCommitteeWizard;