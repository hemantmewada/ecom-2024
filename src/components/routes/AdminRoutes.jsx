import React from "react";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";
import { useAuth } from "../../context/auth";

const AdminRoutes = () => {
  const { auth } = useAuth();
  if (auth?.user?.role == undefined || auth?.user?.role == "admin") {
    // alert("admin if");
    return <Outlet />;
  } else {
    // alert("admin else");
    return <AccessDenied path="" />;
  }
};

export default AdminRoutes;
