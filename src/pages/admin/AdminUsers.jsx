import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import config from "./../../config/config";
import { format } from "date-fns";
import Loader from "react-js-loader";
import InputType from "./../../components/InputType";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/Helper";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, seLoading] = useState(false);
  const { auth } = useAuth();

  // get all users
  const getAllUsers = async () => {
    try {
      seLoading(true);
      const res = await axios.get(`${config.BASE_URL}/auth/all-users`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (res.data.status) {
        setUsers(res.data.data);
      }
      seLoading(false);
    } catch (error) {
      seLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  return (
    <Layout title="Admin Users | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">
              <h2 className="pb-5">All Categories</h2>
              <table className="table table-striped table-hover border">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created At</th>
                    {/* <th scope="col">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td scope="row" colSpan="5">
                        <Loader
                          type="spinner-cub"
                          bgColor="#2A2C35"
                          color="#2A2C35"
                          size={30}
                        />
                      </td>
                    </tr>
                  ) : (
                    users?.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{++index}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {dateFormat(user.createdAt, "d-MM-yyyy h:mm:ss a")}
                        </td>
                        {/* <td className="">
                          <button
                            type="button"
                            className="btn btn-outline-success me-2"
                          >
                            <FiEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            <FaTrashAlt />
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

export default AdminUsers;
