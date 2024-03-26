import React from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";

const AdminUsers = () => {
  return (
    <Layout title="Admin Users | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">AdminUsers page</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
