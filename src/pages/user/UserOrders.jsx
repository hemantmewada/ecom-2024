import React from "react";
import Layout from "../../components/layout/Layout";
import Profile from "../../components/Profile";
import UserSidebar from "./UserSidebar";

const UserOrders = () => {
  return (
    <Layout title="User Orders | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <UserSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">UserOrders page</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
