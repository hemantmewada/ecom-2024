import React from "react";
import Layout from "../../components/layout/Layout";
import Profile from "../../components/Profile";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  return (
    <Layout title="User Dashboard | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <UserSidebar />
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

export default UserDashboard;
