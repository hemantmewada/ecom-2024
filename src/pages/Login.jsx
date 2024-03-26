import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import InputType from "../components/InputType";
import { useFormik } from "formik";
import { signinSchema } from "../validation/validationSchema";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { values, touched, handleBlur, handleSubmit, handleChange, errors } =
    useFormik({
      initialValues,
      validationSchema: signinSchema,
      onSubmit: (values, action) => {
        login(values, action);
      },
    });

  const login = async (values, action) => {
    try {
      setLoading(true);
      const res = await axios.post(`${config.BASE_URL}/auth/login`, values);
      if (res.data.status) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.data,
          loken: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          action.resetForm();
          navigate(location.state || "/");
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <Layout title="Login | Ecom 2024">
      <div className="register-login">
        <h1 className="text-uppercase text-start border-bottom border-4 border-gray">
          Login here
        </h1>
        <form className="register-login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputType
              id="email"
              labelTitle="Email address"
              name="email"
              inputType="email"
              placeholder="Ente email address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="mb-3">
            <InputType
              id="password"
              labelTitle="Enter password"
              name="password"
              onChange={handleChange}
              value={values.password}
              inputType="password"
              onBlur={handleBlur}
              placeholder="Enter password"
            />
            {touched.password && errors.password && (
              <p className="form-error">{errors.password}</p>
            )}
          </div>
          <p>
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot password ?
            </Link>
          </p>
          <button type="submit" className="btn btn-primary w-100">
            {!loading ? <span>Login</span> : <span>Logging in...</span>}
          </button>
        </form>
        <br />
        <p>
          Don't have a account, click to{" "}
          <Link to="/register" className="text-decoration-none">
            register
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
