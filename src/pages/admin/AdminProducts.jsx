import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import config from "./../../config/config";
import { format } from "date-fns";
import Loader from "react-js-loader";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { dateFormat, numberFormat } from "../../helpers/Helper";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  // get all products
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${config.BASE_URL}/product/all`);
      if (res.data.status) {
        setProducts(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // delete product
  const deleteProduct = async (_id) => {
    if (!confirm("Are you sure do you want to delete ?")) {
      return false;
    }
    try {
      const res = await axios.delete(
        `${config.BASE_URL}/product/delete/${_id}`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        getAllProducts();
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Admin Products | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">
              <div className="d-flex justify-content-between align-items-start">
                <h2 className="pb-5">All Products</h2>
                <Link
                  to="/dashboard/admin/products/add"
                  className="btn btn-outline-primary"
                >
                  Add product
                </Link>
              </div>
              <table className="table table-striped table-hover border">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="text-center">
                      <td scope="row" colSpan="8">
                        <Loader
                          type="spinner-cub"
                          bgColor="#2A2C35"
                          color="#2A2C35"
                          size={30}
                        />
                      </td>
                    </tr>
                  ) : (
                    products?.map((product, index) => (
                      <tr key={product._id}>
                        <th scope="row">{++index}</th>
                        <th scope="row">
                          <Link
                            // target="_blank"
                            to={`/dashboard/admin/products/show/${product.slug}`}
                          >
                            <img
                              width={100}
                              src={`${config.BASE_URL}/product/single-image/${product._id}`}
                              alt={product.name}
                            />
                          </Link>
                        </th>
                        <td>
                          {product.name.length > 30
                            ? `${product.name.substring(0, 30)}...`
                            : product.name}
                        </td>
                        <td>{product.category?.name}</td>
                        <td>{numberFormat(product.price)}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {dateFormat(product.createdAt, "d-MM-yyyy h:mm:ss a")}
                        </td>
                        <td className="">
                          <Link
                            to={`/dashboard/admin/products/edit/${product.slug}`}
                            className="btn btn-outline-success me-1"
                          >
                            <FiEdit />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
