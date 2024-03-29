import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
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
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
          onClick={() => setIsActive(false)}
        >
          My Orders
        </NavLink>
      </div>
    </>
  );
};

export default UserSidebar;
