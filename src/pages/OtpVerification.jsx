import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import InputType from "../components/InputType";
import { useFormik } from "formik";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { otpVerificationSchema } from "../validation/validationSchema";

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  if (!location.state) {
    return <Navigate to="/forgot-password" />;
  }

  const initialValues = {
    email: location.state.email,
    otp: "",
  };

  const { errors, touched, handleBlur, handleChange, values, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: otpVerificationSchema,
      onSubmit: (values, action) => {
        otpVerification(values, action);
      },
    });

  const otpVerification = async (values, action) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${config.BASE_URL}/auth/otp-verification`,
        values
      );
      if (res.data.status) {
        toast.success(res.data.message);
        setTimeout(() => {
          action.resetForm();
          navigate("/reset-password", {
            state: { email: values.email, otp: values.otp },
          });
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
      // console.log(res);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
      console.log(error);
      console.log(`Error in forgot-password api call: ${error}`);
    }
  };
  const sendOtp = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${config.BASE_URL}/auth/forgot-password`,
        values
      );
      if (res.data.status) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
      // console.log(res);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
      console.log(error);
      console.log(`Error in forgot-password api call: ${error}`);
    }
  };

  return (
    <Layout title="OTP Verification | Ecom 2024">
      <div className="register-login">
        <h1 className="text-uppercase text-start border-bottom border-4 border-gray">
          otp verification
        </h1>
        <form className="register-login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputType
              id="email"
              labelTitle="Email address"
              name="email"
              inputType="email"
              value={values.email}
              onChange={handleChange}
              placeholder="enter email address"
              onBlur={handleBlur}
              disabled={true}
            />
            {touched.email && errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="otp"
              labelTitle="OTP"
              name="otp"
              inputType="number"
              value={values.otp}
              onChange={handleChange}
              placeholder="enter otp"
              onBlur={handleBlur}
            />
            {touched.otp && errors.otp && (
              <p className="form-error">{errors.otp}</p>
            )}
          </div>
          <p>
            Didn't receive the otp click to{" "}
            <span
              className="text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={() => sendOtp(values)}
            >
              Resend
            </span>
          </p>
          <button type="submit" className="btn btn-primary w-100">
            {!loading ? "Verify" : "Loading..."}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default OtpVerification;
