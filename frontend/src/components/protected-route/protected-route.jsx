import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ authenticated, children }) => {
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
