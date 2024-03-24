import React from "react";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";
import { useAuth } from "../../context/auth";

const VendorRoutes = () => {
  const { auth } = useAuth();
  if (auth?.user?.role == "vendor") {
    return <Outlet />;
  } else {
    return <AccessDenied path="" />;
  }
};

export default VendorRoutes;
