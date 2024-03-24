import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/admin/categories"
          className="list-group-item list-group-item-action"
        >
          Categories
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminSidebar;
