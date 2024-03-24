import React from "react";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";

const ProtectedRoute = () => {
  const data = localStorage.getItem("auth");
  if (data) {
    return <Outlet />;
  } else {
    return <AccessDenied />;
  }
};

export default ProtectedRoute;
