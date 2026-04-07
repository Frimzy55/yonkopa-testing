import React from "react";

const BusinessLoanApplications = ({onBack}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success">
              <i className="bi bi-building me-2"></i>
              Business Loan Applications
            </h2>
             <button className="btn btn-outline-secondary" onClick={onBack}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Pending Business Loan Applications</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Business Name</th>
                      <th>Loan Amount</th>
                      <th>Business Type</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BL-001</td>
                      <td>ABC Corporation</td>
                      <td>$100,000</td>
                      <td>Retail</td>
                      <td>2024-01-15</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>
                        <button className="btn btn-sm btn-success">Review</button>
                      </td>
                    </tr>
                    <tr>
                      <td>BL-002</td>
                      <td>XYZ Enterprises</td>
                      <td>$250,000</td>
                      <td>Manufacturing</td>
                      <td>2024-01-14</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>
                        <button className="btn btn-sm btn-success">Review</button>
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

export default BusinessLoanApplications;