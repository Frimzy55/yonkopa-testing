import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in
  if (!token) {
    return <Navigate to="/access" replace />;
  }

  // If role not allowed
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/access" replace />;
  }

  return children;
};

export default ProtectedRoute;