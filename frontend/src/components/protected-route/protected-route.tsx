import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  authenticated: boolean;
  isUser: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProps> = ({ authenticated, isUser, children }) => {
  if (!authenticated || (authenticated && !isUser)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
