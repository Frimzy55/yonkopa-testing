import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";

// PUBLIC
const CustomerLanding = lazy(() => import("../cls/CustomerLanding"));
const LoginPage = lazy(() => import("../cls/StaffLoginPage"));
const DefaultSuper = lazy(() => import("../cls/DefaultSuper"));

// PROTECTED
const Customerview = lazy(() => import("../customerpage/CustomerPage"));
const AdminDashboard = lazy(() => import("../AdminDashboard"));

/* =========================
   LOADING SCREEN (OPTION 1)
========================= */
const LoadingScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f8f9fa",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #e0e0e0",
          borderTop: "5px solid #0d6efd",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
        Loading, please wait...
      </p>

      {/* Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<CustomerLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<DefaultSuper />} />

        {/* CUSTOMER */}
        <Route
          path="/customer-page"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Customerview />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;