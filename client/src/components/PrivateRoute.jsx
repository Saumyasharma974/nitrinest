// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  

  // If there's no authenticated user, redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
