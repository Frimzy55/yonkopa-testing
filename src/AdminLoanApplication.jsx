import React, { useState } from "react";
import PersonalLoanApplications from "./GPersonalLoan";
import BusinessLoanApplications from "./GBusinessLoan";
import SalaryLoanApplications from "./GSalaryLoan";
import CreditAssessment from "./GCreditAssessment"; // You'll need to create this component

const LoanOfficerLoanApplication = () => {
  const [showLoanTypes, setShowLoanTypes] = useState(false);
  const [showCreditAssessmentTypes, setShowCreditAssessmentTypes] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);

  const handleOpenApplications = () => {
    setShowLoanTypes(!showLoanTypes);
    setShowCreditAssessmentTypes(false); // Close other menu
  };

  const handleCreditAssessment = () => {
    setShowCreditAssessmentTypes(!showCreditAssessmentTypes);
    setShowLoanTypes(false); // Close other menu
  };

  const handleLoanTypeSelect = (loanType) => {
    setSelectedLoanType(loanType);
    setShowLoanTypes(false);
  };

  const handleAssessmentTypeSelect = (assessmentType) => {
    setSelectedAssessmentType(assessmentType);
    setShowCreditAssessmentTypes(false);
  };

  const handleBackToDashboard = () => {
    setSelectedLoanType(null);
    setSelectedAssessmentType(null);
  };

  

  // Render the selected loan type component
  if (selectedLoanType) {
    switch (selectedLoanType) {
      case 'personal':
        return <PersonalLoanApplications onBack={handleBackToDashboard} />;
      case 'business':
        return <BusinessLoanApplications onBack={handleBackToDashboard} />;
      case 'salary':
        return <SalaryLoanApplications onBack={handleBackToDashboard} />;
      default:
        return null;
    }
  }

  // Render the credit assessment component if a type is selected
  if (selectedAssessmentType) {
    return (
      <CreditAssessment 
        assessmentType={selectedAssessmentType} 
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary mb-4">Loan Application Management</h2>
        </div>
      </div>

      <div className="row">
        {/* Open New Applications Card */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column">
              <div className="text-center mb-3">
                <i className="bi bi-folder-plus text-primary" style={{ fontSize: '2.5rem' }}></i>
              </div>
              <h5 className="card-title text-center">Open New Applications</h5>
              <p className="card-text text-muted text-center">
                Review submitted loan applications
              </p>
              
              {/* Loan Type Sub-menu */}
              {showLoanTypes && (
                <div className="loan-types-menu mb-3 p-3 border rounded bg-light">
                  <h6 className="text-center mb-3">Select Loan Type</h6>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleLoanTypeSelect('personal')}
                    >
                      <i className="bi bi-person me-2"></i>
                      Personal Loan
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleLoanTypeSelect('business')}
                    >
                      <i className="bi bi-briefcase me-2"></i>
                      Business Loan
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleLoanTypeSelect('salary')}
                    >
                      <i className="bi bi-cash-coin me-2"></i>
                      Salary Loan
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <button 
                  className="btn btn-primary w-100"
                  onClick={handleOpenApplications}
                >
                  <i className={`bi ${showLoanTypes ? 'bi-x-circle' : 'bi-eye'} me-2`}></i>
                  {showLoanTypes ? 'Close Menu' : 'New Applications'}
                </button>
              </div>
            </div>
          </div>
        </div>

       
        {/* Credit Assessment Card */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column">
              <div className="text-center mb-3">
                <i className="bi bi-graph-up text-success" style={{ fontSize: '2.5rem' }}></i>
              </div>
              <h5 className="card-title text-center">Credit Assessment</h5>
              <p className="card-text text-muted text-center">
                Credit Assessment documents
              </p>
              
              {/* Credit Assessment Sub-menu */}
              {showCreditAssessmentTypes && (
                <div className="assessment-types-menu mb-3 p-3 border rounded bg-light">
                  <h6 className="text-center mb-3">Select Assessment Type</h6>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleAssessmentTypeSelect('personal')}
                    >
                      <i className="bi bi-person me-2"></i>
                      Personal Loan Assessment
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleAssessmentTypeSelect('business')}
                    >
                      <i className="bi bi-briefcase me-2"></i>
                      Business Loan Assessment
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleAssessmentTypeSelect('salary')}
                    >
                      <i className="bi bi-cash-coin me-2"></i>
                      Salary Loan Assessment
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleAssessmentTypeSelect('all')}
                    >
                      <i className="bi bi-list-ul me-2"></i>
                      All Loan Assessments
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <button 
                  className="btn btn-success w-100"
                  onClick={handleCreditAssessment}
                >
                  <i className={`bi ${showCreditAssessmentTypes ? 'bi-x-circle' : 'bi-clipboard-data'} me-2`}></i>
                  {showCreditAssessmentTypes ? 'Close Menu' : 'Access Assessment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOfficerLoanApplication;