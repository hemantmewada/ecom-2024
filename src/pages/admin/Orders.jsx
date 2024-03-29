import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import config from "../../config/config";
import Loader from "react-js-loader";
import { useAuth } from "../../context/auth";
import { dateFormat } from "../../helpers/Helper";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";
import UserSidebar from "../user/UserSidebar";

const deliveryStatuses = [
  "Pending",
  "Processing",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  // get all orders
  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${config.BASE_URL}/order/all`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (res.data.status) {
        setOrders(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  // change status
  const handleChange = async (status, _id) => {
    try {
      const res = await axios.put(
        `${config.BASE_URL}/order/update-status/${_id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        // getAllOrders();
        // Update the specific order's status without fetching all orders again
        setOrders((prev) =>
          prev.map((order) => (order._id == _id ? { ...order, status } : order))
        );

        // setOrders((prevOrders) =>
        //   prevOrders.map((order) =>
        //     order._id === _id ? { ...order, status: status } : order
        //   )
        // );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Admin Orders | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            {auth?.user?.role == "customer" ? (
              <UserSidebar />
            ) : (
              <AdminSidebar />
            )}
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">
              <h2 className="pb-5">All Products</h2>
              <table className="table table-striped table-hover border">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
                    {/* <th scope="col">Detail</th> */}
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
                    orders?.map((order, index) => (
                      <tr key={order._id}>
                        <td scope="row">{++index}</td>
                        <td scope="row">{order._id}</td>
                        <td scope="row">{order.user.name}</td>
                        <td scope="row">{dateFormat(order.createdAt)}</td>
                        {auth?.user?.role == "customer" ? (
                          <td>{order.status}</td>
                        ) : (
                          <td scope="row">
                            <select
                              className="form-control"
                              name="status"
                              id=""
                              value={order.status}
                              onChange={(e) =>
                                handleChange(e.target.value, order._id)
                              }
                            >
                              {deliveryStatuses.map((status, i) => (
                                <option key={i} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        )}
                        <td scope="row">{order.products.length}</td>
                        {/* <td>
                          <button
                            type="button"
                            className="btn btn-outline-success"
                          >
                            Detail
                          </button>
                        </td> */}
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

export default Orders;
