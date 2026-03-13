// src/components/admin/AdminApplicationProgress.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminViewLoanModal from "./AdminViewLoanModal";
import "./AdminApplicationProgress.css";

const AdminProgressApplication = () => {

  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);

  // MODAL STATE
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/loan-progress`)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.error("Error fetching applications", err);
      });

  }, []);

  const filteredApps = applications.filter((app) =>
    app.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="application-progress-container">

      <div className="page-header">
        <h2>Loan Application Progress</h2>
        <p>Track and manage loan applications currently in progress</p>
      </div>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="progress-table-wrapper">

        <table className="progress-table">

          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Customer Name</th>
              <th>Loan Purpose</th>
              <th>Loan Amount</th>
              <th>Date Submitted</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No applications found
                </td>
              </tr>
            ) : (

              filteredApps.map((app) => (

                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.fullName}</td>
                  <td>{app.loanPurpose}</td>
                  <td>
                    GHS {Number(app.loanAmount).toLocaleString()}
                  </td>
                  <td>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedApp(app)}
                    >
                      View
                    </button>
                  </td>
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* SEPARATE VIEW COMPONENT */}
      <AdminViewLoanModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
      />

    </div>
  );
};

export default AdminProgressApplication;