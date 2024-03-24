import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("auth");
  if (data) {
    return <Outlet />;
  } else {
    return <AccessDenied />;
  }
};

export default ProtectedRoute;
