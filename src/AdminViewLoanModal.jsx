// src/components/admin/AdminViewLoanModal.jsx

import React from "react";
import "./AdminApplicationProgress.css";

const AdminViewLoanModal = ({ application, onClose }) => {

  if (!application) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <h3>Loan Application Details</h3>
        <hr />

        <p><b>ID:</b> {application.id}</p>
        <p><b>Name:</b> {application.fullName}</p>
        <p><b>Email:</b> {application.email}</p>
        <p><b>Phone:</b> {application.phone}</p>
        <p><b>Loan Purpose:</b> {application.loanPurpose}</p>

        <p>
          <b>Loan Amount:</b> GHS{" "}
          {Number(application.loanAmount).toLocaleString()}
        </p>

        <p><b>Loan Term:</b> {application.loanTerm}</p>
        <p><b>Employment Status:</b> {application.employmentStatus}</p>
        <p><b>Residential Address:</b> {application.residentialAddress}</p>
        <p><b>Guarantor Name:</b> {application.guarantorName}</p>
        <p><b>Guarantor Phone:</b> {application.guarantorPhone}</p>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  );
};

export default AdminViewLoanModal;