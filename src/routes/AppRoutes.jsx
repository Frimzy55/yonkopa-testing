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

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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