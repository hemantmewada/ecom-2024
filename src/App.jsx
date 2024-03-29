import React from "react";
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
import VendorDashboard from "./pages/dashboards/VendorDashboard";
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import VendorRoutes from "./components/routes/VendorRoutes";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminShowProduct from "./pages/admin/AdminShowProduct";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import AllCategories from "./pages/AllCategories";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/admin/Orders";
import OrderDetail from "./pages/OrderDetail";

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
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-detail/:orderId" element={<OrderDetail />} />
          <Route path="" element={<UserRoutes />}></Route>
          <Route path="" element={<AdminRoutes />}>
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/products/add" element={<AdminAddProduct />} />
            <Route
              path="admin/products/edit/:slug"
              element={<AdminEditProduct />}
            />
            <Route
              path="admin/products/show/:slug"
              element={<AdminShowProduct />}
            />
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
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;
