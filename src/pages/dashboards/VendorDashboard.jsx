import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const VendorDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <h1>Vendor Dashboard {auth?.user?.name}</h1>
    </Layout>
  );
};

export default VendorDashboard;
