import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/access-denied.css";
const AccessDenied = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login", { state: location.pathname });
    }, 3000);
  }, []);

  return (
    <Layout>
      <div className="box">
        <div className="super-wrapper">
          <div className="no-no-no">
            You are not authorized to access this page.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccessDenied;
