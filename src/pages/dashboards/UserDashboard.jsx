import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <h1>user Dashboard {auth?.user?.name}</h1>
    </Layout>
  );
};

export default UserDashboard;
