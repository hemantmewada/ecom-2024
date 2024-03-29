import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
import Loader from "react-js-loader";
import { numberFormat, shortStr } from "../helpers/Helper";
import { FaCartShopping } from "react-icons/fa6";
import Product from "../components/Product";

const prices = [
  {
    _id: 0,
    name: "Under ₹1000",
    value: [0, 1000],
  },
  {
    _id: 1,
    name: "₹1000-₹3000",
    value: [1000, 3000],
  },
  {
    _id: 2,
    name: "₹3000-₹8000",
    value: [3000, 8000],
  },
  {
    _id: 3,
    name: "₹8000-₹15000",
    value: [8000, 15000],
  },
  {
    _id: 4,
    name: "Over ₹15000",
    value: [15000, 999999],
  },
];
const Home = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [checked, setChecked] = useState([]);
  const [price, setPrice] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const res = await axios.get(
        `${config.BASE_URL}/product/product-list/${page}`
      );
      if (res.data.status) {
        setProducts(res.data.data);
      }
      setIsLoadingProducts(false);
    } catch (error) {
      setIsLoadingProducts(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page != 1) loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const res = await axios.get(
        `${config.BASE_URL}/product/product-list/${page}`
      );
      if (res.data.status) {
        setProducts([...products, ...res.data.data]);
      }
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  };

  // get  products with filter
  const getFilteredProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const res = await axios.post(`${config.BASE_URL}/product/filter`, {
        checked,
        price,
      });
      if (res.data.status) {
        setProducts(res.data.data);
      }
      setIsLoadingProducts(false);
    } catch (error) {
      setIsLoadingProducts(false);
      console.log(error);
    }
  };

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
  // get all totao
  const getAllTotal = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/product/product-count`);
      if (res.data.status) {
        setTotal(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !price.length) getAllProducts();
  }, [checked.length, price.length]);

  useEffect(() => {
    if (checked.length || price.length) getFilteredProducts();
  }, [checked, price]);

  const handleFilter = (isChecked, _id) => {
    let all = [...checked];
    if (isChecked) {
      all.push(_id);
    } else {
      all = all.filter((a) => a != _id);
    }
    setChecked(all);
  };

  const clearFilter = () => {
    setPrice([]);
    setChecked([]);
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((check) => {
        check.checked = false;
      });
    // console.log(document.querySelector('input[type="radio"]:checked'));
    let price = document.querySelector('input[type="radio"]:checked');
    if (price) price.checked = false;
  };

  return (
    <Layout title="Home | Ecom 2024">
      <div className="space"></div>
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <h6 className="text-uppercase">Filters</h6>
                <span
                  className="text-uppercase clear-all"
                  onClick={clearFilter}
                >
                  Clear all
                </span>
              </div>
              <hr />
              <div className="category-data">
                <h6 className="text-uppercase pb-2">Categories</h6>
                {isLoadingCategory ? (
                  <div className="text-center">
                    <Loader
                      type="spinner-cub"
                      bgColor="#2A2C35"
                      color="#2A2C35"
                      size={30}
                    />
                  </div>
                ) : (
                  categories?.map((category) => (
                    <div
                      className="d-flex align-items-start mb-2"
                      key={category._id}
                    >
                      <input
                        value={category._id}
                        type="checkbox"
                        name=""
                        id={`category-${category._id}`}
                        className="me-3 mt-1"
                        onChange={(e) =>
                          handleFilter(e.target.checked, category._id)
                        }
                      />
                      <label htmlFor={`category-${category._id}`}>
                        {category.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <hr />
              <div className="category-data">
                <h6 className="text-uppercase pb-2">Price</h6>
                {prices.map((price) => (
                  <div
                    key={price._id}
                    className="d-flex align-items-start mb-2"
                  >
                    <input
                      value={price.value}
                      type="radio"
                      name="price"
                      id={price._id}
                      className="me-3 mt-1"
                      onChange={(e) => setPrice(price.value)}
                    />
                    <label htmlFor={price._id}>{price.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="p-3">
              <h2 className="text-center">All Products</h2>
              <hr />
              {isLoadingProducts ? (
                <div className="text-center">
                  <Loader
                    type="spinner-cub"
                    bgColor="#2A2C35"
                    color="#2A2C35"
                    size={30}
                  />
                </div>
              ) : (
                <div className="row products-home">
                  {products.length === 0 ? (
                    <h6 className="text-center">No products found.</h6>
                  ) : (
                    products?.map((product) => (
                      <Product product={product} key={product._id} />
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="col-md-12 text-center p-3">
              {products &&
                products.length < total &&
                (loadingMore ? (
                  <Loader
                    type="spinner-cub"
                    bgColor="#2A2C35"
                    color="#2A2C35"
                    size={30}
                  />
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    Load more
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
