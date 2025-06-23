import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Dummy auth check (replace with real auth logic)
const isAuthenticated = () => {
  return localStorage.getItem("lumina_user") === "true";
};

export default function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
}
