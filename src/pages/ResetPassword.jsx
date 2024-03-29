import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import InputType from "../components/InputType";
import { useFormik } from "formik";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../validation/validationSchema";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  if (!location.state) {
    return <Navigate to="/forgot-password" />;
  }
  const initialValues = {
    email: location.state.email,
    otp: location.state.otp,
    newPassword: "",
    confirmPassword: "",
  };
  const { errors, touched, handleBlur, handleChange, values, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values, action) => {
        resetPassword(values, action);
      },
    });

  const resetPassword = async (values, action) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${config.BASE_URL}/auth/reset-password`,
        values
      );
      if (res.data.status) {
        toast.success(res.data.message);
        setTimeout(() => {
          action.resetForm();
          navigate("/login");
        }, 700);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
      // console.log(res);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  // };

  return (
    <Layout title="Forgot Password | Ecom 2024">
      <div className="register-login">
        <h1 className="text-uppercase text-start border-bottom border-4 border-gray">
          reset password
        </h1>
        <form className="register-login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputType
              id="newPassword"
              labelTitle="New password"
              name="newPassword"
              inputType="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              placeholder="enter new password address"
              onBlur={handleBlur}
            />
            {touched.newPassword && errors.newPassword && (
              <p className="form-error">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="confirmPassword"
              labelTitle="Confirm password"
              name="confirmPassword"
              inputType="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="enter confirm password address"
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className="btn btn-outline-primary w-100">
            {!loading ? "Reset password" : "Loading..."}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
