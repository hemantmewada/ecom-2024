import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import Loader from "react-js-loader";

const CategoryProducts = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  // get category wise products
  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${config.BASE_URL}/product/category-products/${params.slug}`
      );
      if (res.data.status) {
        setProducts(res.data.data);
        setCategoryName(res.data.category);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [params.slug]);

  return (
    <Layout title="Category Products | Ecom 2024">
      <div className="space"></div>
      <div className="container-fluid">
        <p className="text-center">
          {categoryName?.name && `${categoryName?.name} (${products?.length})`}
        </p>
        <div className="row">
          {loading ? (
            <div className="text-center">
              <Loader
                type="spinner-cub"
                bgColor="#2A2C35"
                color="#2A2C35"
                size={30}
              />
            </div>
          ) : (
            products?.map((product) => (
              <Product product={product} key={product._id} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
