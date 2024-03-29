import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import config from "../../config/config";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addProductCategorySchema } from "../../validation/validationSchema";
import InputType from "../../components/InputType";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: {},
  quantity: "",
  productId: "",
};
const AdminEditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: addProductCategorySchema,
      onSubmit: (values, state) => {
        updateProduct(values, state);
      },
    });

  // update category
  const updateProduct = async (values, state) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("quantity", values.quantity);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      // console.log(formData);
      // return;
      const res = await axios.put(
        `${config.BASE_URL}/product/update/${values.productId}`,
        formData,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        state.resetForm();
        navigate("/dashboard/admin/products");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  // get all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/category/all`);
      if (res.data.status) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/product/single/${params.slug}`
      );
      if (res.data.status) {
        // console.log(res.data.data);
        initialValues.name = res.data.data.name;
        initialValues.description = res.data.data.description;
        initialValues.price = res.data.data.price;
        initialValues.category = res.data.data.category._id;
        initialValues.quantity = res.data.data.quantity;
        initialValues.productId = res.data.data._id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

  return (
    <Layout title="Admin Edit Product | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">
              <h2 className="pb-5">Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <InputType
                      id="name"
                      labelTitle="Product Name"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      inputType="text"
                      placeholder="Enter name"
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <p className="form-error">{errors.name}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="category" className="form-label">
                      Select category
                    </label>
                    <select
                      name="category"
                      id="category"
                      onChange={handleChange}
                      className="form-control"
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      <option value="">Please select Category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {touched.category && errors.category && (
                      <p className="form-error">{errors.category}</p>
                    )}
                  </div>
                  <div className="space"></div>
                  <div className="col-sm-6">
                    <InputType
                      id="description"
                      labelTitle="Description"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      inputType="text"
                      placeholder="Enter description"
                      onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                      <p className="form-error">{errors.description}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <InputType
                      id="price"
                      labelTitle="Price"
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                      inputType="number"
                      placeholder="Enter price"
                      onBlur={handleBlur}
                    />
                    {touched.price && errors.price && (
                      <p className="form-error">{errors.price}</p>
                    )}
                  </div>
                  <div className="space"></div>
                  <div className="col-sm-6">
                    <InputType
                      id="quantity"
                      labelTitle="Quantity"
                      name="quantity"
                      onChange={handleChange}
                      value={values.quantity}
                      inputType="number"
                      placeholder="Enter quantity"
                      onBlur={handleBlur}
                    />
                    {touched.quantity && errors.quantity && (
                      <p className="form-error">{errors.quantity}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="image" className="form-label">
                      Product image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="form-control"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="space"></div>
                  <div className="col-sm-6">
                    <button
                      type="submit"
                      className="btn btn-outline-primary px-5"
                    >
                      Update
                    </button>
                    <Link
                      to="/dashboard/admin/products"
                      className="btn btn-outline-danger ms-3 px-5"
                    >
                      Back
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    {selectedImage ? (
                      <div className="mt-2 d-flex align-items-start justify-content-end">
                        <button
                          className="btn btn-outline-danger me-2"
                          onClick={() => {
                            setSelectedImage(null);
                            document.getElementById("image").value = "";
                          }}
                        >
                          Remove
                        </button>
                        <img
                          alt="not found"
                          width={"200px"}
                          height={"200px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                      </div>
                    ) : (
                      values.productId && (
                        <div className="mt-2 text-end">
                          <img
                            alt="not found"
                            width={"200px"}
                            height={"200px"}
                            src={`${config.BASE_URL}/product/single-image/${values.productId}`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEditProduct;
