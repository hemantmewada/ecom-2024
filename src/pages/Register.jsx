import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import InputType from "../components/InputType";
import { useFormik } from "formik";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../validation/validationSchema";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  role: "",
};
const Register = () => {
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
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        register(values, action);
      },
    });

  const register = async (values, action) => {
    try {
      const res = await axios.post(`${config.BASE_URL}/auth/register`, {
        ...values,
        phone: values.phone.toString(),
      });
      if (res.data.status) {
        toast.success(res.data.message);
        action.resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
      // console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      console.log(`Error in register api call: ${error}`);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(data);
  // };

  return (
    <Layout title="Register | Ecom 2024">
      <div className="register-login">
        <h1 className="text-uppercase text-start border-bottom border-4 border-gray">
          Register here
        </h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputType
              id="name"
              labelTitle="Name"
              name="name"
              inputType="name"
              value={values.name}
              onChange={handleChange}
              placeholder="enter name here"
              onBlur={handleBlur}
              // autoFocus
            />
            {touched.name && errors.name && (
              <p className="form-error">{errors.name}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="email"
              labelTitle="Email address"
              name="email"
              inputType="email"
              value={values.email}
              onChange={handleChange}
              placeholder="enter email here"
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="password"
              labelTitle="password"
              name="password"
              inputType="password"
              value={values.password}
              onChange={handleChange}
              placeholder="enter password here"
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="form-error">{errors.password}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="phone"
              labelTitle="phone"
              name="phone"
              inputType="number"
              value={values.phone}
              onChange={handleChange}
              placeholder="enter phone here"
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && (
              <p className="form-error">{errors.phone}</p>
            )}
          </div>
          <div className="mb-3">
            <InputType
              id="address"
              labelTitle="address"
              name="address"
              inputType="address"
              value={values.address}
              onChange={handleChange}
              placeholder="enter address here"
              onBlur={handleBlur}
            />
            {touched.address && errors.address && (
              <p className="form-error">{errors.address}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Select role
            </label>
            <select
              name="role"
              id="role"
              onChange={handleChange}
              className="form-control"
              onBlur={handleBlur}
            >
              <option value="">Please select role</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
            {touched.role && errors.role && (
              <p className="form-error">{errors.role}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
