// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CustomerLanding from "./auth/CustomerLanding";
import LoginPage from "./auth/StaffLoginPage";
import DefaultSuper from "./auth/DefaultSuper";

import Customerview from "./customerpage/CustomerPage";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./managerpage/ManagerDashboard";

import LoanOfficerDashboard from "./loanofficerpage/LoanOfficerDashboard";
import LoanSupervisorDashboard from "./supervisorpage/LoanSupervisorDashboard";

import ProtectedRoute from "./ProtectedRoute";

import AutoLogout from "./components/AutoLogout";

function App() {
  return (
    <Router>
      <AutoLogout />

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