import React from "react";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";
import { useAuth } from "../../context/auth";

const UserRoutes = () => {
  const { auth } = useAuth();
  if (auth?.user?.role == undefined || auth?.user?.role == "customer") {
    return <Outlet />;
  } else {
    return <AccessDenied path="" />;
  }
};

export default UserRoutes;
