import React from "react";
import { useLocation, Link } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  return (
    <div className="footer">
      <h1 className="text-center">
        All Right Reserved &copy;{" "}
        <a href="https://github.com/hemantmewada/" target="_blank">
          Hemant Mewada
        </a>
      </h1>
      <p className="text-center mt-3 d-flex justify-content-center align-items-center">
        <Link
          className={`nav-link${
            location.pathname == "/about" ? " active" : ""
          }`}
          to="/about"
        >
          About
        </Link>
        |
        <Link
          className={`nav-link${
            location.pathname == "/contact" ? " active" : ""
          }`}
          to="/contact"
        >
          Contact
        </Link>
        |
        <Link
          className={`nav-link${
            location.pathname == "/policy" ? " active" : ""
          }`}
          to="/policy"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
