import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerLanding from "./CustomerLanding";
import LoginPage from "./StaffLoginPage";
import DefaultSuper from "./DefaultSuper";

import CustomerDashboard from "./CustomerDashboard";
import LoanOfficerDashboard from "./LoanOfficerDashboard";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import LoanSupervisorDashboard from "./LoanSupervisorDashboard";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<CustomerLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<DefaultSuper />} />

          {/* ================= PROTECTED ROUTES ================= */}

          {/* Customer */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Loan Officer */}
          <Route
            path="/loan-officer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["loan_officer"]}>
                <LoanOfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Manager */}
          <Route
            path="/loan-manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Supervisor */}
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