import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = auth?.isloggedIn || false;

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
