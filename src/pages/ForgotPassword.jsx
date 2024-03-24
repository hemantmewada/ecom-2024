import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import InputType from "../components/InputType";
import { useFormik } from "formik";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../validation/validationSchema";

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [data, setData] = useState(initialValues);

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  const { errors, touched, handleBlur, handleChange, values, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values, action) => {
        forgotPassword(values, action);
      },
    });

  const forgotPassword = async (values, action) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${config.BASE_URL}/auth/forgot-password`,
        values
      );
      if (res.data.status) {
        toast.success(res.data.message);
        setTimeout(() => {
          action.resetForm();
          navigate("/otp-verification", { state: { email: values.email } });
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  // };

  return (
    <Layout title="Forgot Password | Ecom 2024">
      <div className="register-login">
        <h1 className="text-uppercase text-start border-bottom border-4 border-gray">
          forgot password
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
            />
            {touched.email && errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {!loading ? "Forgot password" : "Loading..."}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
