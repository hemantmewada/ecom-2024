import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useFormik } from "formik";
import InputType from "./InputType";
import { updateProfileSchema } from "../validation/validationSchema";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
};
const Profile = () => {
  const { auth, setAuth } = useAuth();
  initialValues.name = auth?.user?.name;
  initialValues.email = auth?.user?.email;
  initialValues.phone = auth?.user?.phone;
  initialValues.address = auth?.user?.address;
  initialValues.city = auth?.user?.city;
  initialValues.zip = auth?.user?.zip;
  const { errors, touched, handleBlur, handleChange, values, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: updateProfileSchema,
      onSubmit: (values, state) => {
        updateProfile(values);
      },
    });
  // get Profile
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        `${config.BASE_URL}/auth/update-profile`,
        values,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.data,
        });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls = { ...ls, data: res.data.data };
        localStorage.setItem("auth", JSON.stringify(ls));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // // get Profile
  // const getProfile = async () => {
  //   try {
  //     const res = await axios.get(`${config.BASE_URL}/auth/profile`, {
  //       headers: { Authorization: `Bearer ${auth?.token}` },
  //     });
  //     console.log(res);
  //     if (res.data.status) {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <InputType
            id="name"
            labelTitle="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
            inputType="text"
            onBlur={handleBlur}
            placeholder="Enter name"
          />
          {touched.name && errors.name && (
            <p className="form-error">{errors.name}</p>
          )}
        </div>
        <div className="col-md-6">
          <InputType
            id="email"
            labelTitle="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            inputType="email"
            onBlur={handleBlur}
            placeholder="Enter email"
            disabled
          />
        </div>
        <div className="col-12">
          <InputType
            id="address"
            labelTitle="Address"
            name="address"
            onChange={handleChange}
            value={values.address}
            inputType="text"
            onBlur={handleBlur}
            placeholder="Enter address"
          />
          {touched.address && errors.address && (
            <p className="form-error">{errors.address}</p>
          )}
        </div>
        <div className="col-md-6">
          <InputType
            id="city"
            labelTitle="city"
            name="city"
            onChange={handleChange}
            value={values.city}
            inputType="text"
            onBlur={handleBlur}
            placeholder="Enter city"
          />
        </div>
        <div className="col-md-2">
          <InputType
            id="zip"
            labelTitle="zip"
            name="zip"
            onChange={handleChange}
            value={values.zip}
            inputType="number"
            onBlur={handleBlur}
            placeholder="Enter zip"
          />
        </div>
        <div className="col-md-4">
          <InputType
            id="phone"
            labelTitle="phone"
            name="phone"
            onChange={handleChange}
            value={values.phone}
            inputType="number"
            onBlur={handleBlur}
            placeholder="Enter phone"
          />
          {touched.phone && errors.phone && (
            <p className="form-error">{errors.phone}</p>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-outline-success w-25">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
