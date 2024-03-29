import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import config from "../../config/config";
import Loader from "react-js-loader";
import { useAuth } from "../../context/auth";
import { dateFormat } from "../../helpers/Helper";
import AdminSidebar from "./AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  // get all orders
  const getAllProducts = async () => {
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
    if (auth?.token) getAllProducts();
  }, [auth?.token]);

  return (
    <Layout title="User Orders | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
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
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
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
                        <td scope="row">{order.status}</td>
                        <td scope="row">{order.products.length}</td>
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

export default AdminOrders;
