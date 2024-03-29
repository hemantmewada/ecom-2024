import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useSearch } from "../../context/search";
import axios from "axios";
import config from "../../config/config";
import { useCategory } from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const { values, setValues } = useSearch();
  const { cart } = useCart();
  const navigate = useNavigate();
  const categories = useCategory();

  const handleLogout = () => {
    toast.success("Logged out successfully.");
    setTimeout(() => {
      navigate("/login");
      localStorage.clear();
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${config.BASE_URL}/product/search/${values?.keyword}`
      );
      if (res.data.status) {
        setValues({ ...values, result: res.data.data });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img width="200px" src="/images/logo.png" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              value={values.keyword}
              placeholder="Search"
              aria-label="Search"
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname == "/" ? " active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname == "/about" ? " active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname == "/contact" ? " active" : ""
                }`}
                aria-current="page"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <li className="nav-item">
                  <Link className="nav-link" to="/all-categories">
                    ALl Categories
                  </Link>
                </li>
                {categories?.map((category) => (
                  <li key={category._id} className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/category/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${
                      location.pathname == "/login" ? " active" : ""
                    }`}
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link${
                      location.pathname == "/register" ? " active" : ""
                    }`}
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name.toUpperCase()}
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="nav-item">
                    <Link className="nav-link" to={`/dashboard/home`}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname == "/cart" ? " active" : ""
                }`}
                aria-current="page"
                to="/cart"
              >
                Cart ({cart.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
