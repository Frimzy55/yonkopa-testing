// LoanOfficerCustomers.jsx
import React, { useState } from "react";
import "./LoanOfficerDashboard.css";
import CustomerForm from "./LoanOfficerCustomerForm";
import CustomerSearchForm from "./LoanOfficerCustomerSearchForm";

const AdminCustomers = () => {
  const [view, setView] = useState("menu"); 
  // menu | registration | search

  return (
    <div className="content-section">

      {/* MENU VIEW */}
      {view === "menu" && (
        <>
          <h2>Customer Menu</h2>
          <p>Manage customer information, registration, and search.</p>

          <div className="feature-grid">
            {/* Customer Registration */}
            <div className="feature-card">
              <h3>Customer Registration</h3>
              <p>Register a new customer into the system.</p>
              <button
                className="feature-btn"
                onClick={() => setView("registration")}
              >
                Open Registration
              </button>
            </div>

            {/* Customer Search */}
            <div className="feature-card">
              <h3>Customer Search</h3>
              <p>Search for an existing customer by name, phone, or ID.</p>
              <button
                className="feature-btn"
                onClick={() => setView("search")}
              >
                Search Customers
              </button>
            </div>
          </div>
        </>
      )}

      {/* REGISTRATION FORM VIEW */}
      {view === "registration" && (
        <>
          <CustomerForm />
          <button
            className="feature-btn"
            onClick={() => setView("menu")}
            style={{ marginTop: "20px" }}
          >
            Back to Menu
          </button>
        </>
      )}

      {/* SEARCH FORM VIEW */}
      {view === "search" && (
        <>
          <CustomerSearchForm />
          <button
            className="feature-btn"
            onClick={() => setView("menu")}
            style={{ marginTop: "20px" }}
          >
            Back to Menu
          </button>
        </>
      )}
    </div>
  );
};

export default AdminCustomers;
