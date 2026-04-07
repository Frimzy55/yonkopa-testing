import React from "react";

const SalaryLoanApplications = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-info">
              <i className="bi bi-cash-coin me-2"></i>
              Salary Loan Applications
            </h2>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Pending Salary Loan Applications</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Employee Name</th>
                      <th>Employer</th>
                      <th>Loan Amount</th>
                      <th>Monthly Salary</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SL-001</td>
                      <td>Mike Johnson</td>
                      <td>Tech Solutions Inc.</td>
                      <td>$8,000</td>
                      <td>$4,000</td>
                      <td>2024-01-15</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>
                        <button className="btn btn-sm btn-info">Review</button>
                      </td>
                    </tr>
                    <tr>
                      <td>SL-002</td>
                      <td>Sarah Wilson</td>
                      <td>Global Services Ltd.</td>
                      <td>$12,000</td>
                      <td>$6,000</td>
                      <td>2024-01-14</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>
                        <button className="btn btn-sm btn-info">Review</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryLoanApplications;