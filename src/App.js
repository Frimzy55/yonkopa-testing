// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLanding from './CustomerLanding';
import LoginPage from './StaffLoginPage';
import CustomerDashboard from './CustomerDashboard';
import LoanOfficerDashboard from './LoanOfficerDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard'; // ✅ Added
import LoanSupervisorDashboard from './LoanSupervisorDashboard'; // ✅ Added

import DefaultSuper from './DefaultSuper';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CustomerLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<DefaultSuper />} />

          {/* Protected Role-Based Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/loan-officer-dashboard" element={<LoanOfficerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/loan-manager" element={<ManagerDashboard />} /> {/* ✅ Correct */}
            <Route path="/loan-supervisor" element={<LoanSupervisorDashboard />} /> {/* ✅ Added */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
