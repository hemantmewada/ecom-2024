import React from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Policy from "./pages/Policy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorDashboard from "./pages/dashboards/VendorDashboard";
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import VendorRoutes from "./components/routes/VendorRoutes";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import UserOrders from "./pages/user/UserOrders";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<UserRoutes />}>
            <Route path="user/home" element={<UserDashboard />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>
          <Route path="" element={<AdminRoutes />}>
            <Route path="admin/home" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/users" element={<AdminUsers />} />
          </Route>
          <Route path="" element={<VendorRoutes />}>
            <Route path="vendor/home" element={<VendorDashboard />} />
          </Route>
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;
