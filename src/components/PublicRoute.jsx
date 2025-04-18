import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = auth?.isloggedIn || false;

  return isLoggedIn ? <Navigate to="/expense-tracker" replace /> : children;
};

export default PublicRoute;
