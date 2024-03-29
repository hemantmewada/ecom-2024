import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/home"
          className={`list-group-item list-group-item-action${
            isActive && "active"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/admin/categories"
          className="list-group-item list-group-item-action"
          onClick={() => setIsActive(false)}
        >
          Categories
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
          onClick={() => setIsActive(false)}
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className="list-group-item list-group-item-action"
          onClick={() => setIsActive(false)}
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
          onClick={() => setIsActive(false)}
        >
          Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminSidebar;
