import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import config from "./../../config/config";
import Loader from "react-js-loader";
import InputType from "./../../components/InputType";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import { addEditCategorySchema } from "../../validation/validationSchema";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/Helper";
import { FaTrashAlt } from "react-icons/fa";

const initialValues = {
  name: "",
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState({});
  const [isLoadingCreateCategory, setIsLoadingCreateCategory] = useState(false);
  const [isLoadingEditCategory, setIsLoadingEditCategory] = useState(false);
  const { auth } = useAuth();

  const [editCategory, setEditCategory] = useState({ name: "", _id: "" });
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: addEditCategorySchema,
      onSubmit: (values, state) => {
        addCategory(values, state);
      },
    });

  // get all categories
  const getAllCategories = async () => {
    try {
      setIsLoadingCategory(true);
      const res = await axios.get(`${config.BASE_URL}/category/all`);
      if (res.data.status) {
        setCategories(res.data.data);
      }
      setIsLoadingCategory(false);
    } catch (error) {
      setIsLoadingCategory(false);
      console.log(error);
    }
  };

  // add category
  const addCategory = async (values, state) => {
    try {
      setIsLoadingCreateCategory(true);
      const res = await axios.post(
        `${config.BASE_URL}/category/create`,
        values,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        state.resetForm();
        getAllCategories();
      }
      setIsLoadingCreateCategory(false);
    } catch (error) {
      setIsLoadingCreateCategory(false);
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  // delete category
  const deleteCategory = async (_id) => {
    if (!confirm("Are you sure do you want to delete ?")) {
      return false;
    }
    try {
      setIsLoadingDelete({ _id, status: true });
      const res = await axios.delete(
        `${config.BASE_URL}/category/delete/${_id}`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        getAllCategories();
      }
      setIsLoadingDelete({ _id, status: false });
      // console.log(res);
    } catch (error) {
      setIsLoadingDelete({ _id, status: false });
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };

  // get single category
  const getSingleCategories = async (slug) => {
    try {
      const res = await axios.get(`${config.BASE_URL}/category/single/${slug}`);
      if (res.data.status) {
        setEditCategory({
          name: res.data.data.name,
          _id: res.data.data._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add category
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingEditCategory(true);
      const res = await axios.put(
        `${config.BASE_URL}/category/update/${editCategory._id}`,
        { name: editCategory.name },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        getAllCategories();
      }
      setIsLoadingEditCategory(false);
    } catch (error) {
      setIsLoadingEditCategory(false);
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="Admin Categories | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-7">
            <div className="card w-100 p-3">
              <h2 className="pb-5">All Categories</h2>
              <table className="table table-striped table-hover border">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingCategory ? (
                    <tr className="text-center">
                      <td scope="row" colSpan="4">
                        <Loader
                          type="spinner-cub"
                          bgColor="#2A2C35"
                          color="#2A2C35"
                          size={30}
                        />
                      </td>
                    </tr>
                  ) : (
                    categories?.map((category, index) => (
                      <tr key={category._id}>
                        <th scope="row">{++index}</th>
                        <td>{category.name}</td>
                        <td>
                          {dateFormat(
                            category.createdAt,
                            "d-MM-yyyy h:mm:ss a"
                          )}
                        </td>
                        <td className="">
                          <button
                            type="button"
                            className="btn btn-outline-success me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => getSingleCategories(category.slug)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            type="button"
                            className={`btn btn-outline-danger${
                              isLoadingDelete.status == true &&
                              isLoadingDelete._id == category._id
                                ? " p-0"
                                : ""
                            }`}
                            onClick={() => deleteCategory(category._id)}
                          >
                            {isLoadingDelete.status == true &&
                            isLoadingDelete._id == category._id ? (
                              <img
                                style={{ color: "#2A2C35s" }}
                                src="/images/spinner.gif"
                                alt=""
                                width="40px"
                                height="40px"
                              />
                            ) : (
                              <FaTrashAlt />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card w-100 p-3">
              <h3 className="pb-5">Add Category</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <InputType
                    id="name"
                    labelTitle="Category name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    inputType="text"
                    placeholder="Enter category name"
                    onBlur={handleBlur}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="form-error">{errors.name}</p>
                )}
                <div className="mb-3">
                  <button
                    className="btn btn-outline-primary w-50"
                    type="submit"
                  >
                    {isLoadingCreateCategory ? "Adding..." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={updateCategory}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <InputType
                    id="edit-name"
                    labelTitle="Category name"
                    name="edit-name"
                    value={editCategory.name}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        name: e.target.value,
                      })
                    }
                    inputType="text"
                    placeholder="Enter category name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                >
                  {isLoadingEditCategory ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
    </Layout>
  );
};

export default AdminCategories;
