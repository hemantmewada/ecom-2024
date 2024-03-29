import React from "react";
import Layout from "../components/layout/Layout";
import AdminSidebar from "./admin/AdminSidebar";
import Profile from "../components/Profile";
import { useAuth } from "../context/auth";
import UserSidebar from "./user/UserSidebar";

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title="Dashboard Profile | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            {auth?.user?.role == "customer" ? (
              <UserSidebar />
            ) : (
              <AdminSidebar />
            )}
          </div>
          <div className="col-md-7">
            <div className="card w-100 p-3">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
