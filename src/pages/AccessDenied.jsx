import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/access-denied.css";
const AccessDenied = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      navigate(`/${path}`, { state: location.pathname });
    }, 700);
  }, []);

  return (
    <Layout title="Access Denied | Ecom 2024">
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
