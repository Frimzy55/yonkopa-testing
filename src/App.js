import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import ForgotPassword from "./ForgotPassword";

import CustomerLanding from "./cls/CustomerLanding";
import LoginPage from "./cls/StaffLoginPage";
import DefaultSuper from "./cls/DefaultSuper";

import Customerview from "./customerpage/CustomerPage";
//import LoanOfficerDashboard from "./LoanOfficerDashboard";
import AdminDashboard from "./AdminDashboard";
//import ManagerDashboard from "./ManagerDashboard";
//import LoanSupervisorDashboard from "./LoanSupervisorDashboard";

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

          {/* <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= PROTECTED ROUTES ================= */}

          
          <Route
            path="/customer-page"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Customerview />
              </ProtectedRoute>
            }
          />


          
           
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          {/* Loan Officer *
          <Route
            path="/loan-officer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["loan_officer"]}>
                <LoanOfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin 
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Manager 
          <Route
            path="/loan-manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Supervisor 
          <Route
            path="/loan-supervisor"
            element={
              <ProtectedRoute allowedRoles={["supervisor"]}>
                <LoanSupervisorDashboard />
              </ProtectedRoute>
            } 
          />  */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;