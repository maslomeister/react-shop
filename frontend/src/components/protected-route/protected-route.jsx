import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ authenticated, isUser, children }) => {
  if (!authenticated || (authenticated && !isUser)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
