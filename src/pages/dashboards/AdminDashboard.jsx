import React from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "../admin/AdminSidebar";
import Profile from "../../components/Profile";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
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

export default AdminDashboard;
