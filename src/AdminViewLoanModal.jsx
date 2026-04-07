// src/components/admin/AdminViewLoanModal.jsx

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// React Icons
import { FaUser, FaBriefcase, FaUserFriends, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

const AdminViewLoanModal = ({ application, onClose }) => {
  const [step, setStep] = useState(1);

  if (!application) return null;

  const steps = [
    { title: "Personal", icon: <FaUser /> },
    { title: "Employment", icon: <FaBriefcase /> },
    { title: "Guarantor", icon: <FaUserFriends /> },
    { title: "Loan", icon: <FaMoneyBillWave /> },
    { title: "Documents", icon: <FaFileAlt /> },
  ];

  const Field = ({ label, value }) => (
    <div className="col-md-6">
      <div className="bg-light p-3 rounded">
        <small className="text-muted d-block">{label}</small>
        <div className="fw-semibold">{value || "N/A"}</div>
      </div>
    </div>
  );

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header bg-white border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                📄
              </div>

              <div>
                <h5 className="modal-title fw-bold mb-0">
                  Loan Application Review
                </h5>
                <small className="text-muted">
                  Step {step} of 5
                </small>
              </div>
            </div>

            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* STEP NAVIGATION */}
            <ul className="nav nav-pills mb-3">
              {steps.map((item, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`nav-link step-btn ${
                      step === index + 1 ? "active" : ""
                    }`}
                    onClick={() => setStep(index + 1)}
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="row g-3">

              {step === 1 && (
                <>
                  <Field label="Full Name" value={application.fullName} />
                  <Field label="Email" value={application.email} />
                  <Field label="Phone" value={application.phone} />
                  <Field label="Gender" value={application.gender} />
                  <Field label="Marital Status" value={application.maritalStatus} />
                  <Field label="Address" value={application.residentialAddress} />
                </>
              )}

              {step === 2 && (
                <>
                  <Field label="Employment Status" value={application.employmentStatus} />
                  <Field label="Occupation" value={application.occupation} />
                  <Field
                    label="Monthly Income"
                    value={
                      application.monthlyIncome
                        ? `GHS ${Number(application.monthlyIncome).toLocaleString()}`
                        : "N/A"
                    }
                  />
                  <Field label="Employer" value={application.employerName} />
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Guarantor Name" value={application.guarantorName} />
                  <Field label="Guarantor Phone" value={application.guarantorPhone} />
                  <Field label="Guarantor Address" value={application.guarantorAddress} />
                </>
              )}

              {step === 4 && (
                <>
                  <Field label="Loan Purpose" value={application.loanPurpose} />
                  <Field
                    label="Loan Amount"
                    value={
                      application.loanAmount
                        ? `GHS ${Number(application.loanAmount).toLocaleString()}`
                        : "N/A"
                    }
                  />
                  <Field label="Loan Term" value={application.loanTerm} />
                  <Field
                    label="Interest Rate"
                    value={
                      application.interestRate
                        ? `${application.interestRate}%`
                        : "N/A"
                    }
                  />
                </>
              )}

              {step === 5 && (
                <div className="col-12">
                  <div className="bg-light p-3 rounded">
                    <strong>Documents</strong>
                    <br />

                    {application.documentUrl ? (
                      <a
                        href={application.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary btn-sm mt-2"
                      >
                        View Document
                      </a>
                    ) : (
                      <p className="text-muted mt-2 mb-0">
                        No document uploaded
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">

            {step > 1 && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}

            {step < 5 && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}

            <button
              className="btn btn-light btn-sm border"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>

      {/* LIGHT BLUE HOVER STYLE */}
      <style>
{`
  .step-btn {
    font-size: 16px;           /* Bigger text */
    font-weight: 600;
    padding: 10px 16px;
    border-radius: 8px;
    color: #495057;            /* Neutral dark gray */
    transition: all 0.2s ease-in-out;
  }

  /* Hover Effect (Light Blue Background Only) */
  .step-btn:hover {
    background-color: #f0f8ff !important;  /* Very light blue */
    color: #0a58ca !important;             /* Soft blue text */
  }

  /* Active Step (Not Deep Blue) */
  .step-btn.active {
    background-color: #e7f3ff !important;  /* Soft light blue */
    color: #0a58ca !important;             /* Soft blue text */
    font-weight: 700;
    box-shadow: none;
  }
`}
</style>

    </div>
  );
};

export default AdminViewLoanModal;