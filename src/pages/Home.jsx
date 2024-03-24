import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";

const Home = () => {
  const { auth } = useAuth();
  return (
    <Layout title="Home | Ecom 2024">
      <h1>home comp</h1>
      <p>{JSON.stringify(auth.user)}</p>
    </Layout>
  );
};

export default Home;
