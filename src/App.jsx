// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CustomerLanding from "./cls/CustomerLanding";
import LoginPage from "./cls/StaffLoginPage";
import DefaultSuper from "./cls/DefaultSuper";

import Customerview from "./customerpage/CustomerPage";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./managerpage/ManagerDashboard";

// Add these if you already have them created
import LoanOfficerDashboard from "./loanofficerpage/LoanOfficerDashboard";
import LoanSupervisorDashboard from "./supervisorpage/LoanSupervisorDashboard";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/apply" element={<CustomerLanding />} />
          <Route path="/access" element={<LoginPage />} />
          <Route path="/signup" element={<DefaultSuper />} />

          {/* CUSTOMER ROUTE */}
          <Route
            path="/customer-page"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Customerview />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTE */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* MANAGER ROUTE */}
          <Route
            path="/loan-manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* LOAN OFFICER ROUTE */}
          <Route
            path="/loan-officer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["loan_officer"]}>
                <LoanOfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* SUPERVISOR ROUTE */}
          <Route
            path="/loan-supervisor"
            element={
              <ProtectedRoute allowedRoles={["supervisor"]}>
                <LoanSupervisorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;